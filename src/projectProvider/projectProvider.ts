/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ThemedIconPath } from 'azdata';
import * as dataworkspace from 'dataworkspace';
import * as pgdbproj from 'pgdbproj';
import * as vscode from 'vscode';
import * as constants from '../common/constants';
import { IconPathHelper } from '../common/iconHelper';
import { SqlDatabaseProjectTreeViewProvider } from '../controllers/databaseProjectTreeViewProvider';
import { ProjectsController } from '../controllers/projectController';
import { Project } from '../models/project';
import { BaseProjectTreeItem } from '../models/tree/baseTreeItem';

export class PGSqlDatabaseProjectProvider implements dataworkspace.IProjectProvider, pgdbproj.IExtension {
	constructor(private projectController: ProjectsController) {

	}
	openProject(projectFilePath: string): Promise<pgdbproj.ISqlProject> {
		return Project.openProject(projectFilePath);
	}
	async getProjectTreeDataProvider(projectFilePath: vscode.Uri): Promise<vscode.TreeDataProvider<any>> {
		const provider = new SqlDatabaseProjectTreeViewProvider();
		const project = await Project.openProject(projectFilePath.fsPath);
		provider.load([project]);
		return provider;
	}

	RemoveProject(projectFile: vscode.Uri): Promise<void> {
		throw new Error('RemoveProject Method not implemented.');
	}
	async createProject(name: string, location: vscode.Uri, projectTypeId: string): Promise<vscode.Uri> {
		const projectFile = await this.projectController.createNewProject({
			newProjName: name,
			folderUri: location,
			projectTypeId: projectTypeId
		});

		return vscode.Uri.file(projectFile);
	}
	getDashboardComponents(projectFile: string): dataworkspace.IDashboardTable[] {
		throw new Error('Method not implemented.');
	}
	/**
	 * Gets the supported project types
	 */
	 get supportedProjectTypes(): dataworkspace.IProjectType[] {
		return [{
			id: constants.emptyPGSqlDatabaseProjectTypeId,
			projectFileExtension: constants.pgProjExtension.replace(/\./g, ''),
			displayName: constants.emptyProjectTypeDisplayName,
			description: constants.emptyProjectTypeDescription,
			icon: IconPathHelper.colorfulSqlProject
		}];
	}
	projectToolbarActions: (dataworkspace.IProjectAction | dataworkspace.IProjectActionGroup)[];

	get image(): ThemedIconPath {
		return IconPathHelper.dashboardSqlProj;
	}

}
