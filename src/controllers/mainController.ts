/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import * as templates from '../templates/templates';
import * as path from 'path';

import { ProjectsController } from './projectController';
import { IconPathHelper } from '../common/iconHelper';
import { WorkspaceTreeItem } from 'dataworkspace';
import { PGSqlDatabaseProjectProvider } from '../projectProvider/projectProvider';

/**
 * The main controller class that initializes the extension
 */
export default class MainController implements vscode.Disposable {
	protected projectsController: ProjectsController;

	public constructor(private context: vscode.ExtensionContext) {
			this.projectsController = new ProjectsController();
	}

	public get extensionContext(): vscode.ExtensionContext {
		return this.context;
	}

	public get projController(): ProjectsController {
		return this.projectsController;
	}

	public deactivate(): void {
	}

	public async activate(): Promise<PGSqlDatabaseProjectProvider> {
		await this.initializeDatabaseProjects();
		return new PGSqlDatabaseProjectProvider(this.projectsController);
	}

	private async initializeDatabaseProjects(): Promise<void> {

		vscode.commands.registerCommand('pgsqlDatabaseProjects.newScript', async (node: WorkspaceTreeItem) => { await this.projectsController.addItemPromptFromNode(node, templates.script); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.newPreDeploymentScript', async (node: WorkspaceTreeItem) => { await this.projectsController.addItemPromptFromNode(node, templates.preDeployScript); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.newPostDeploymentScript', async (node: WorkspaceTreeItem) => { await this.projectsController.addItemPromptFromNode(node, templates.postDeployScript); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.newTable', async (node: WorkspaceTreeItem) => { await this.projectsController.addItemPromptFromNode(node, templates.table); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.newView', async (node: WorkspaceTreeItem) => { await this.projectsController.addItemPromptFromNode(node, templates.view); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.newStoredProcedure', async (node: WorkspaceTreeItem) => { await this.projectsController.addItemPromptFromNode(node, templates.storedProcedure); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.newExternalStreamingJob', async (node: WorkspaceTreeItem) => { await this.projectsController.addItemPromptFromNode(node, templates.externalStreamingJob); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.newItem', async (node: WorkspaceTreeItem) => { await this.projectsController.addItemPromptFromNode(node); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.newFolder', async (node: WorkspaceTreeItem) => { await this.projectsController.addFolderPrompt(node); });

		vscode.commands.registerCommand('pgsqlDatabaseProjects.editProjectFile', async (node: WorkspaceTreeItem) => { await this.projectsController.editProjectFile(node); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.openContainingFolder', async (node: WorkspaceTreeItem) => { await this.projectsController.openContainingFolder(node); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.delete', async (node: WorkspaceTreeItem) => { await this.projectsController.delete(node); });
		vscode.commands.registerCommand('pgsqlDatabaseProjects.exclude', async (node: WorkspaceTreeItem) => { await this.projectsController.exclude(node); });

		IconPathHelper.setExtensionContext(this.extensionContext);

		await templates.loadTemplates(path.join(this.context.extensionPath, 'resources', 'templates'));


	}

	public dispose(): void {
		this.deactivate();
	}
}
