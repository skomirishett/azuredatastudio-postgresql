/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as constants from '../common/constants';
import * as path from 'path';
import * as utils from '../common/utils';
import * as UUID from 'vscode-languageclient/lib/utils/uuid';
import * as templates from '../templates/templates';
import * as vscode from 'vscode';
import * as dataworkspace from 'dataworkspace';

import { promises as fs } from 'fs';
import { Project, reservedProjectFolders, FileProjectEntry, SqlProjectReferenceProjectEntry, IDatabaseReferenceProjectEntry } from '../models/project';
import { SqlDatabaseProjectTreeViewProvider } from './databaseProjectTreeViewProvider';
import { FolderNode, FileNode } from '../models/tree/fileFolderTreeItem';
import { BaseProjectTreeItem } from '../models/tree/baseTreeItem';
import { ProjectRootTreeItem } from '../models/tree/projectTreeItem';
import { DatabaseReferenceTreeItem } from '../models/tree/databaseReferencesTreeItem';
import { TelemetryActions, TelemetryReporter, TelemetryViews } from '../common/telemetry';
import { DashboardData, PublishData, Status } from '../models/dashboardData/dashboardData';

const maxTableLength = 10;

/**
 * Controller for managing lifecycle of projects
 */
export class ProjectsController {
	private buildInfo: DashboardData[] = [];
	private publishInfo: PublishData[] = [];

	projFileWatchers = new Map<string, vscode.FileSystemWatcher>();

	constructor() {
	}

	public getDashboardPublishData(projectFile: string): (string | dataworkspace.IconCellValue)[][] {
		const infoRows: (string | dataworkspace.IconCellValue)[][] = [];

		return infoRows;
	}

	public getDashboardBuildData(projectFile: string): (string | dataworkspace.IconCellValue)[][] {
		const infoRows: (string | dataworkspace.IconCellValue)[][] = [];


		return infoRows;
	}

	public refreshProjectsTree(workspaceTreeItem: dataworkspace.WorkspaceTreeItem): void {
		(workspaceTreeItem.treeDataProvider as SqlDatabaseProjectTreeViewProvider).notifyTreeDataChanged();
	}

	/**
	 * Creates a new folder with the project name in the specified location, and places the new .sqlproj inside it
	 * @param newProjName
	 * @param folderUri
	 * @param projectGuid
	 */
	public async createNewProject(creationParams: NewProjectParams): Promise<string> {



		const macroDict: Record<string, string> = {
			'PROJECT_NAME': creationParams.newProjName,
			'PROJECT_GUID': creationParams.projectGuid ?? UUID.generateUuid().toUpperCase()
		};

		let newProjFileContents = templates.macroExpansion(templates.newSqlProjectTemplate, macroDict);

		let newProjFileName = creationParams.newProjName;

		if (!newProjFileName.toLowerCase().endsWith(constants.pgProjExtension)) {
			newProjFileName += constants.pgProjExtension;
		}

		const newProjFilePath = path.join(creationParams.folderUri.fsPath, path.parse(newProjFileName).name, newProjFileName);

		if (await utils.exists(newProjFilePath)) {
			throw new Error(constants.projectAlreadyExists(newProjFileName, path.parse(newProjFilePath).dir));
		}

		await fs.mkdir(path.dirname(newProjFilePath), { recursive: true });
		await fs.writeFile(newProjFilePath, newProjFileContents);

		await this.addTemplateFiles(newProjFilePath, creationParams.projectTypeId);

		return newProjFilePath;
	}

	private async addTemplateFiles(newProjFilePath: string, projectTypeId: string): Promise<void> {
		if (projectTypeId === constants.emptyPGSqlDatabaseProjectTypeId || newProjFilePath === '') {
			return;
		}
	}

/*	private async addTemplateFiles(newProjFilePath: string, projectTypeId: string): Promise<void> {
		if (projectTypeId === constants.emptyPGSqlDatabaseProjectTypeId || newProjFilePath === '') {
			return;
		}
	}*/

	public async addFolderPrompt(treeNode: dataworkspace.WorkspaceTreeItem): Promise<void> {
		const project = this.getProjectFromContext(treeNode);
		const relativePathToParent = this.getRelativePath(treeNode.element);
		const absolutePathToParent = path.join(project.projectFolderPath, relativePathToParent);
		const newFolderName = await this.promptForNewObjectName(new templates.ProjectScriptType(templates.folder, constants.folderFriendlyName, ''),
			project, absolutePathToParent);

		if (!newFolderName) {
			return; // user cancelled
		}

		const relativeFolderPath = path.join(relativePathToParent, newFolderName);

		try {
			// check if folder already exists or is a reserved folder
			const absoluteFolderPath = path.join(absolutePathToParent, newFolderName);
			const folderExists = await utils.exists(absoluteFolderPath);

			if (folderExists || this.isReservedFolder(absoluteFolderPath, project.projectFolderPath)) {
				throw new Error(constants.folderAlreadyExists(path.parse(absoluteFolderPath).name));
			}

			await project.addFolderItem(relativeFolderPath);
			this.refreshProjectsTree(treeNode);
		} catch (err) {
			vscode.window.showErrorMessage(utils.getErrorMessage(err));
		}
	}

	public isReservedFolder(absoluteFolderPath: string, projectFolderPath: string): boolean {
		return false;
	}

	public async addItemPromptFromNode(treeNode: dataworkspace.WorkspaceTreeItem, itemTypeName?: string): Promise<void> {
		await this.addItemPrompt(this.getProjectFromContext(treeNode), this.getRelativePath(treeNode.element), itemTypeName, treeNode.treeDataProvider as SqlDatabaseProjectTreeViewProvider);
	}

	public async addItemPrompt(project: Project, relativePath: string, itemTypeName?: string, treeDataProvider?: SqlDatabaseProjectTreeViewProvider): Promise<void> {
		if (!itemTypeName) {
			const items: vscode.QuickPickItem[] = [];

			for (const itemType of templates.projectScriptTypes()) {
				items.push({ label: itemType.friendlyName });
			}

			itemTypeName = (await vscode.window.showQuickPick(items, {
				canPickMany: false
			}))?.label;

			if (!itemTypeName) {
				return; // user cancelled
			}
		}

		const itemType = templates.get(itemTypeName);
		const absolutePathToParent = path.join(project.projectFolderPath, relativePath);
		let itemObjectName = await this.promptForNewObjectName(itemType, project, absolutePathToParent, constants.sqlFileExtension);

		itemObjectName = itemObjectName?.trim();

		if (!itemObjectName) {
			return; // user cancelled
		}

		const newFileText = templates.macroExpansion(itemType.templateScript, { 'OBJECT_NAME': itemObjectName });
		const relativeFilePath = path.join(relativePath, itemObjectName + constants.sqlFileExtension);

		const telemetryProps: Record<string, string> = { itemType: itemType.type };
		const telemetryMeasurements: Record<string, number> = {};

		if (itemType.type === templates.preDeployScript) {
			telemetryMeasurements.numPredeployScripts = project.preDeployScripts.length;
		} else if (itemType.type === templates.postDeployScript) {
			telemetryMeasurements.numPostdeployScripts = project.postDeployScripts.length;
		}

		try {
			const newEntry = await project.addScriptItem(relativeFilePath, newFileText, itemType.type);

			TelemetryReporter.createActionEvent(TelemetryViews.ProjectTree, TelemetryActions.addItemFromTree)
				.withAdditionalProperties(telemetryProps)
				.withAdditionalMeasurements(telemetryMeasurements)
				.send();

			await vscode.commands.executeCommand(constants.vscodeOpenCommand, newEntry.fsUri);
			treeDataProvider?.notifyTreeDataChanged();
		} catch (err) {
			vscode.window.showErrorMessage(utils.getErrorMessage(err));

			TelemetryReporter.createErrorEvent(TelemetryViews.ProjectTree, TelemetryActions.addItemFromTree)
				.withAdditionalProperties(telemetryProps)
				.withAdditionalMeasurements(telemetryMeasurements)
				.send();
		}
	}
	public async exclude(context: dataworkspace.WorkspaceTreeItem): Promise<void> {
		const node = context.element as BaseProjectTreeItem;
		const project = this.getProjectFromContext(node);

		const fileEntry = this.getFileProjectEntry(project, node);

		if (fileEntry) {
			TelemetryReporter.sendActionEvent(TelemetryViews.ProjectTree, TelemetryActions.excludeFromProject);
			await project.exclude(fileEntry);
		} else {
			TelemetryReporter.sendErrorEvent(TelemetryViews.ProjectTree, TelemetryActions.excludeFromProject);
			vscode.window.showErrorMessage(constants.unableToPerformAction(constants.excludeAction, node.projectUri.path));
		}

		this.refreshProjectsTree(context);
	}

	private getFileProjectEntry(project: Project, context: BaseProjectTreeItem): FileProjectEntry | undefined {
		const root = context.root as ProjectRootTreeItem;
		const fileOrFolder = context as FileNode ? context as FileNode : context as FolderNode;

		if (root && fileOrFolder) {
			// use relative path and not tree paths for files and folder
			const allFileEntries = project.files.concat(project.preDeployScripts).concat(project.postDeployScripts).concat(project.noneDeployScripts);
			return allFileEntries.find(x => utils.getPlatformSafeFileEntryPath(x.relativePath) === utils.getPlatformSafeFileEntryPath(utils.trimUri(root.fileSystemUri, fileOrFolder.fileSystemUri)));
		}
		return project.files.find(x => utils.getPlatformSafeFileEntryPath(x.relativePath) === utils.getPlatformSafeFileEntryPath(utils.trimUri(context.root.projectUri, context.projectUri)));
	}

	public async delete(context: dataworkspace.WorkspaceTreeItem): Promise<void> {
		const node = context.element as BaseProjectTreeItem;
		const project = this.getProjectFromContext(node);

		let confirmationPrompt;
		if (node instanceof DatabaseReferenceTreeItem) {
			confirmationPrompt = constants.deleteReferenceConfirmation(node.friendlyName);
		} else if (node instanceof FolderNode) {
			confirmationPrompt = constants.deleteConfirmationContents(node.friendlyName);
		} else {
			confirmationPrompt = constants.deleteConfirmation(node.friendlyName);
		}

		const response = await vscode.window.showWarningMessage(confirmationPrompt, { modal: true }, constants.yesString);

		if (response !== constants.yesString) {
			return;
		}

		let success = false;

		if (node instanceof DatabaseReferenceTreeItem) {
			const databaseReference = this.getDatabaseReference(project, node);

			if (databaseReference) {
				await project.deleteDatabaseReference(databaseReference);
				success = true;
			}
		} else if (node instanceof FileNode || FolderNode) {
			const fileEntry = this.getFileProjectEntry(project, node);

			if (fileEntry) {
				await project.deleteFileFolder(fileEntry);
				success = true;
			}
		}

		if (success) {
			TelemetryReporter.createActionEvent(TelemetryViews.ProjectTree, TelemetryActions.deleteObjectFromProject)
				.withAdditionalProperties({ objectType: node.constructor.name })
				.send();

			this.refreshProjectsTree(context);
		} else {
			TelemetryReporter.createErrorEvent(TelemetryViews.ProjectTree, TelemetryActions.deleteObjectFromProject)
				.withAdditionalProperties({ objectType: node.constructor.name })
				.send();

			vscode.window.showErrorMessage(constants.unableToPerformAction(constants.deleteAction, node.projectUri.path));
		}
	}

	private getDatabaseReference(project: Project, context: BaseProjectTreeItem): IDatabaseReferenceProjectEntry | undefined {
		const root = context.root as ProjectRootTreeItem;
		const databaseReference = context as DatabaseReferenceTreeItem;

		if (root && databaseReference) {
			return project.databaseReferences.find(r => r.databaseName === databaseReference.treeItem.label);
		}

		return undefined;
	}

	private getRelativePath(treeNode: BaseProjectTreeItem): string {
		return treeNode instanceof FolderNode ? utils.trimUri(treeNode.root.projectUri, treeNode.projectUri) : '';
	}

	private getProjectFromContext(context: Project | BaseProjectTreeItem | dataworkspace.WorkspaceTreeItem): Project {
		if ('element' in context) {
			return context.element.root.project;
		}

		if (context instanceof Project) {
			return context;
		}

		if (context.root instanceof ProjectRootTreeItem) {
			return (<ProjectRootTreeItem>context.root).project;
		} else {
			throw new Error(constants.unexpectedProjectContext(context.projectUri.path));
		}
	}

	private async promptForNewObjectName(itemType: templates.ProjectScriptType, _project: Project, folderPath: string, fileExtension?: string): Promise<string | undefined> {
		const suggestedName = itemType.friendlyName.replace(/\s+/g, '');
		let counter: number = 0;

		do {
			counter++;
		} while (counter < Number.MAX_SAFE_INTEGER
			&& await utils.exists(path.join(folderPath, `${suggestedName}${counter}${(fileExtension ?? '')}`)));

		const itemObjectName = await vscode.window.showInputBox({
			prompt: constants.newObjectNamePrompt(itemType.friendlyName),
			value: `${suggestedName}${counter}`,
			ignoreFocusOut: true,
		});

		return itemObjectName;
	}


	/**
	 * Opens the folder containing the project
	 * @param context a treeItem in a project's hierarchy, to be used to obtain a Project
	 */
	public async openContainingFolder(context: dataworkspace.WorkspaceTreeItem): Promise<void> {
		const project = this.getProjectFromContext(context);
		await vscode.commands.executeCommand(constants.revealFileInOsCommand, vscode.Uri.file(project.projectFilePath));
	}

	/**
	 * Opens the .sqlproj file for the given project. Upon update of file, prompts user to
	 * reload their project.
	 * @param context a treeItem in a project's hierarchy, to be used to obtain a Project
	 */
	public async editProjectFile(context: dataworkspace.WorkspaceTreeItem): Promise<void> {
		const project = this.getProjectFromContext(context);

		try {
			await vscode.commands.executeCommand(constants.vscodeOpenCommand, vscode.Uri.file(project.projectFilePath));

			TelemetryReporter.sendActionEvent(TelemetryViews.ProjectTree, TelemetryActions.editProjectFile);

			const projFileWatcher: vscode.FileSystemWatcher = vscode.workspace.createFileSystemWatcher(project.projectFilePath);
			this.projFileWatchers.set(project.projectFilePath, projFileWatcher);

			projFileWatcher.onDidChange(async () => {
				const result = await vscode.window.showInformationMessage(constants.reloadProject, constants.yesString, constants.noString);

				if (result === constants.yesString) {
					this.reloadProject(context);
				}
			});

			// stop watching for changes to the sqlproj after it's closed
			const closeSqlproj = vscode.workspace.onDidCloseTextDocument((d) => {
				if (this.projFileWatchers.has(d.uri.fsPath)) {
					this.projFileWatchers.get(d.uri.fsPath)!.dispose();
					this.projFileWatchers.delete(d.uri.fsPath);
					closeSqlproj.dispose();
				}
			});
		} catch (err) {
			vscode.window.showErrorMessage(utils.getErrorMessage(err));
		}

	}

		/**
	 * Reloads the given project. Throws an error if given project is not a valid open project.
	 * @param projectFileUri the uri of the project to be reloaded
	 */
		 public async reloadProject(context: dataworkspace.WorkspaceTreeItem): Promise<void> {
			const project = this.getProjectFromContext(context);
			if (project) {
				// won't open any newly referenced projects, but otherwise matches the behavior of reopening the project
				await project.readProjFile();
				this.refreshProjectsTree(context);
			} else {
				throw new Error(constants.invalidProjectReload);
			}
		}


	/**
	 * Generate a flat list of all files and folder under a folder.
	 */
	public async generateList(absolutePath: string): Promise<vscode.Uri[]> {
		let fileFolderList: vscode.Uri[] = [];

		return fileFolderList;
	}

}


export interface NewProjectParams {
	newProjName: string;
	folderUri: vscode.Uri;
	projectTypeId: string;
	projectGuid?: string;
}