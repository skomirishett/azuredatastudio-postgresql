/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

// Placeholder values
export const dataSourcesFileName = 'datasources.json';
export const pgProjExtension = '.pgproj';
export const sqlFileExtension = '.sql';
export const schemaCompareExtensionId = 'microsoft.schema-compare';
export const pgSqlDatabaseProjectExtensionId = 'microsoft.pg-sql-database-projects';
export const mssqlExtensionId = 'microsoft.mssql';
export const master = 'master';
export const masterDacpac = 'master.dacpac';
export const msdb = 'msdb';
export const msdbDacpac = 'msdb.dacpac';
export const MicrosoftDatatoolsSchemaSqlSql = 'Microsoft.Data.Tools.Schema.Sql.Sql';
export const databaseSchemaProvider = 'DatabaseSchemaProvider';

// Project Provider
export const emptyPGSqlDatabaseProjectTypeId = 'EmptyPgDbProj';
export const emptyProjectTypeDisplayName = localize('emptyProjectTypeDisplayName', "Postgre SQL Database");
export const emptyProjectTypeDescription = localize('emptyProjectTypeDescription', "Develop and publish schemas for Postgre SQL databases starting from an empty project");


// Dashboard
export const addItemAction = localize('addItemAction', "Add Item");
export const schemaCompareAction = localize('schemaCompareAction', "Schema Compare");
export const buildAction = localize('buildAction', "Build");
export const publishAction = localize('publishAction', "Publish");
export const changeTargetPlatformAction = localize('changeTargetPlatformAction', "Change Target Platform");

export const Status = localize('Status', "Status");
export const Time = localize('Time', "Time");
export const Date = localize('Date', "Date");
export const TargetPlatform = localize('TargetPlatform', "Target Platform");
export const TargetServer = localize('TargetServer', "Target Server");
export const TargetDatabase = localize('TargetDatabase', "Target Database");
export const BuildHistory = localize('BuildHistory', "Build History");
export const PublishHistory = localize('PublishHistory', "Publish History");

export const Success = localize('Success', "Success");
export const Failed = localize('Failed', "Failed");
export const InProgress = localize('InProgress', "In progress");

export const hr = localize('hr', "hr");
export const min = localize('min', "min");
export const sec = localize('sec', "sec");
export const msec = localize('msec', "msec");

export const at = localize('at', "at");

// commands
export const revealFileInOsCommand = 'revealFileInOS';
export const schemaCompareStartCommand = 'schemaCompare.start';
export const vscodeOpenCommand = 'vscode.open';

// UI Strings

export const dataSourcesNodeName = localize('dataSourcesNodeName', "Data Sources");
export const databaseReferencesNodeName = localize('databaseReferencesNodeName', "Database References");
export const sqlConnectionStringFriendly = localize('sqlConnectionStringFriendly', "SQL connection string");
export const yesString = localize('yesString', "Yes");
export const noString = localize('noString', "No");
export const okString = localize('okString', "Ok");
export const selectString = localize('selectString', "Select");
export const dacpacFiles = localize('dacpacFiles', "dacpac Files");
export const publishSettingsFiles = localize('publishSettingsFiles', "Publish Settings File");
export const file = localize('file', "File");
export const flat = localize('flat', "Flat");
export const objectType = localize('objectType', "Object Type");
export const schema = localize('schema', "Schema");
export const schemaObjectType = localize('schemaObjectType', "Schema/Object Type");
export const defaultProjectNameStarter = localize('defaultProjectNameStarter', "DatabaseProject");
export const reloadProject = localize('reloadProject', "Would you like to reload your database project?");
export function newObjectNamePrompt(objectType: string) { return localize('newObjectNamePrompt', 'New {0} name:', objectType); }
export function deleteConfirmation(toDelete: string) { return localize('deleteConfirmation', "Are you sure you want to delete {0}?", toDelete); }
export function deleteConfirmationContents(toDelete: string) { return localize('deleteConfirmationContents', "Are you sure you want to delete {0} and all of its contents?", toDelete); }
export function deleteReferenceConfirmation(toDelete: string) { return localize('deleteReferenceConfirmation', "Are you sure you want to delete the reference to {0}?", toDelete); }
export function selectTargetPlatform(currentTargetPlatform: string) { return localize('selectTargetPlatform', "Current target platform: {0}. Select new target platform", currentTargetPlatform); }
export function currentTargetPlatform(projectName: string, currentTargetPlatform: string) { return localize('currentTargetPlatform', "Target platform of the project {0} is now {1}", projectName, currentTargetPlatform); }

// Add Database Reference dialog strings

export const addDatabaseReferenceDialogName = localize('addDatabaseReferencedialogName', "Add database reference");
export const addDatabaseReferenceOkButtonText = localize('addDatabaseReferenceOkButtonText', "Add reference");
export const referenceRadioButtonsGroupTitle = localize('referenceRadioButtonsGroupTitle', "Type");
export const projectRadioButtonTitle = localize('projectRadioButtonTitle', "Project");
export const systemDatabaseRadioButtonTitle = localize('systemDatabaseRadioButtonTitle', "System database");
export const dacpacText = localize('dacpacText', "Data-tier application (.dacpac)");
export const dacpacPlaceholder = localize('dacpacPlaceholder', "Select .dacpac");
export const loadDacpacButton = localize('loadDacpacButton', "Select .dacpac");
export const locationDropdown = localize('locationDropdown', "Location");
export const sameDatabase = localize('sameDatabase', "Same database");
export const differentDbSameServer = localize('differentDbSameServer', "Different database, same server");
export const differentDbDifferentServer = localize('differentDbDifferentServer', "Different database, different server");
export const systemDbLocationDropdownValues = [differentDbSameServer];
export const locationDropdownValues = [sameDatabase, differentDbSameServer, differentDbDifferentServer];
export const databaseName = localize('databaseName', "Database name");
export const databaseVariable = localize('databaseVariable', "Database variable");
export const serverName = localize('serverName', "Server name");
export const serverVariable = localize('serverVariable', "Server variable");
export const suppressMissingDependenciesErrors = localize('suppressMissingDependenciesErrors', "Suppress errors caused by unresolved references in the referenced project");
export const exampleUsage = localize('exampleUsage', "Example Usage");
export const enterSystemDbName = localize('enterSystemDbName', "Enter a database name for this system database");
export const databaseNameRequiredVariableOptional = localize('databaseNameRequiredVariableOptional', "A database name is required. The database variable is optional.");
export const databaseNameServerNameVariableRequired = localize('databaseNameServerNameVariableRequired', "A database name, server name, and server variable are required. The database variable is optional");
export const otherServer = 'OtherServer';
export const otherSeverVariable = 'OtherServer';
export const databaseProject = localize('databaseProject', "Database project");
export const dacpacNotOnSameDrive = (projectLocation: string): string => { return localize('dacpacNotOnSameDrive', "Dacpac references need to be located on the same drive as the project file. The project file is located at {0}", projectLocation); };

// Create Project From Database dialog strings

export const createProjectFromDatabaseDialogName = localize('createProjectFromDatabaseDialogName', "Create project from database");
export const createProjectDialogOkButtonText = localize('createProjectDialogOkButtonText', "Create");
export const sourceDatabase = localize('sourceDatabase', "Source database");
export const targetProject = localize('targetProject', "Target project");
export const createProjectSettings = localize('createProjectSettings', "Settings");
export const projectNameLabel = localize('projectNameLabel', "Name");
export const projectNamePlaceholderText = localize('projectNamePlaceholderText', "Enter project name");
export const projectLocationLabel = localize('projectLocationLabel', "Location");
export const projectLocationPlaceholderText = localize('projectLocationPlaceholderText', "Select location to create project");
export const browseButtonText = localize('browseButtonText', "Browse folder");
export const folderStructureLabel = localize('folderStructureLabel', "Folder structure");
export const addProjectToCurrentWorkspace = localize('addProjectToCurrentWorkspace', "This project will be added to the current workspace.");
export const newWorkspaceWillBeCreated = localize('newWorkspaceWillBeCreated', "A new workspace will be created for this project.");
export const workspaceLocationTitle = localize('workspaceLocationTitle', "Workspace location");
export const workspace = localize('workspace', "Workspace");
export const WorkspaceFileExtension = '.code-workspace';
export const ProjectParentDirectoryNotExistError = (location: string): string => { return localize('dataworkspace.projectParentDirectoryNotExistError', "The selected project location '{0}' does not exist or is not a directory.", location); };
export const ProjectDirectoryAlreadyExistError = (projectName: string, location: string): string => { return localize('dataworkspace.projectDirectoryAlreadyExistError', "There is already a directory named '{0}' in the selected location: '{1}'.", projectName, location); };
export const WorkspaceFileInvalidError = (workspace: string): string => { return localize('dataworkspace.workspaceFileInvalidError', "The selected workspace file path '{0}' does not have the required file extension {1}.", workspace, WorkspaceFileExtension); };
export const WorkspaceParentDirectoryNotExistError = (location: string): string => { return localize('dataworkspace.workspaceParentDirectoryNotExistError', "The selected workspace location '{0}' does not exist or is not a directory.", location); };
export const WorkspaceFileAlreadyExistsError = (file: string): string => { return localize('dataworkspace.workspaceFileAlreadyExistsError', "The selected workspace file '{0}' already exists. To add the project to an existing workspace, use the Open Existing dialog to first open the workspace.", file); };


// Error messages

export const multipleSqlProjFiles = localize('multipleSqlProjFilesSelected', "Multiple .sqlproj files selected; please select only one.");
export const noSqlProjFiles = localize('noSqlProjFilesSelected', "No .sqlproj file selected; please select one.");
export const noDataSourcesFile = localize('noDataSourcesFile', "No {0} found", dataSourcesFileName);
export const missingVersion = localize('missingVersion', "Missing 'version' entry in {0}", dataSourcesFileName);
export const unrecognizedDataSourcesVersion = localize('unrecognizedDataSourcesVersion', "Unrecognized version: ");
export const unknownDataSourceType = localize('unknownDataSourceType', "Unknown data source type: ");
export const invalidSqlConnectionString = localize('invalidSqlConnectionString', "Invalid SQL connection string");
export const extractTargetRequired = localize('extractTargetRequired', "Target information for extract is required to create database project.");
export const schemaCompareNotInstalled = localize('schemaCompareNotInstalled', "Schema compare extension installation is required to run schema compare");
export const buildFailedCannotStartSchemaCompare = localize('buildFailedCannotStartSchemaCompare', "Schema compare could not start because build failed");
export const updateProjectForRoundTrip = localize('updateProjectForRoundTrip', "To build this project, Azure Data Studio needs to update targets, references, and system database references. If the project is created in SSDT, it will continue to work in both tools. Do you want Azure Data Studio to update the project?");
export const updateProjectDatabaseReferencesForRoundTrip = localize('updateProjectDatabaseReferencesForRoundTrip', "To build this project, Azure Data Studio needs to update system database references. If the project is created in SSDT, it will continue to work in both tools. Do you want Azure Data Studio to update the project?");
export const databaseReferenceTypeRequired = localize('databaseReferenceTypeRequired', "Database reference type is required for adding a reference to a database");
export const systemDatabaseReferenceRequired = localize('systemDatabaseReferenceRequired', "System database selection is required for adding a reference to a system database");
export const dacpacFileLocationRequired = localize('dacpacFileLocationRequired', "Dacpac file location is required for adding a reference to a database");
export const databaseLocationRequired = localize('databaseLocation', "Database location is required for adding a reference to a database");
export const databaseNameRequired = localize('databaseNameRequired', "Database name is required for adding a reference to a different database");
export const invalidDataSchemaProvider = localize('invalidDataSchemaProvider', "Invalid DSP in .sqlproj file");
export const invalidDatabaseReference = localize('invalidDatabaseReference', "Invalid database reference in .sqlproj file");
export const databaseSelectionRequired = localize('databaseSelectionRequired', "Database selection is required to create a project from a database");
export const databaseReferenceAlreadyExists = localize('databaseReferenceAlreadyExists', "A reference to this database already exists in this project");
export const ousiderFolderPath = localize('outsideFolderPath', "Items with absolute path outside project folder are not supported. Please make sure the paths in the project file are relative to project folder.");
export const parentTreeItemUnknown = localize('parentTreeItemUnknown', "Cannot access parent of provided tree item");
export const prePostDeployCount = localize('prePostDeployCount', "To successfully build, update the project to have one pre-deployment script and/or one post-deployment script");
export const invalidProjectReload = localize('invalidProjectReload', "Cannot access provided database project. Only valid, open database projects can be reloaded.");
export const externalStreamingJobValidationPassed = localize('externalStreamingJobValidationPassed', "Validation of external streaming job passed.");
export function projectAlreadyOpened(path: string) { return localize('projectAlreadyOpened', "Project '{0}' is already opened.", path); }
export function projectAlreadyExists(name: string, path: string) { return localize('projectAlreadyExists', "A project named {0} already exists in {1}.", name, path); }
export function noFileExist(fileName: string) { return localize('noFileExist', "File {0} doesn't exist", fileName); }
export function fileOrFolderDoesNotExist(name: string) { return localize('fileOrFolderDoesNotExist', "File or directory '{0}' doesn't exist", name); }
export function cannotResolvePath(path: string) { return localize('cannotResolvePath', "Cannot resolve path {0}", path); }
export function fileAlreadyExists(filename: string) { return localize('fileAlreadyExists', "A file with the name '{0}' already exists on disk at this location. Please choose another name.", filename); }
export function folderAlreadyExists(filename: string) { return localize('folderAlreadyExists', "A folder with the name '{0}' already exists on disk at this location. Please choose another name.", filename); }
export function fileAlreadyAddedToProject(filepath: string) { return localize('fileAlreadyAddedToProject', "A file with the path '{0}' has already been added to the project", filepath); }
export function folderAlreadyAddedToProject(folderpath: string) { return localize('folderAlreadyAddedToProject', "A folder with the path '{0}' has already been added to the project", folderpath); }
export function invalidInput(input: string) { return localize('invalidInput', "Invalid input: {0}", input); }
export function invalidProjectPropertyValue(propertyName: string) { return localize('invalidPropertyValue', "Invalid value specified for the property '{0}' in .sqlproj file", propertyName); }
export function unableToCreatePublishConnection(input: string) { return localize('unableToCreatePublishConnection', "Unable to construct connection: {0}", input); }
export function circularProjectReference(project1: string, project2: string) { return localize('cicularProjectReference', "Circular reference from project {0} to project {1}", project1, project2); }
export function mssqlNotFound(mssqlConfigDir: string) { return localize('mssqlNotFound', "Could not get mssql extension's install location at {0}", mssqlConfigDir); }
export function projBuildFailed(errorMessage: string) { return localize('projBuildFailed', "Build failed. Check output pane for more details. {0}", errorMessage); }
export function unexpectedProjectContext(uri: string) { return localize('unexpectedProjectContext', "Unable to establish project context.  Command invoked from unexpected location: {0}", uri); }
export function unableToPerformAction(action: string, uri: string) { return localize('unableToPerformAction', "Unable to locate '{0}' target: '{1}'", action, uri); }
export function unableToFindObject(path: string, objType: string) { return localize('unableToFindFile', "Unable to find {1} with path '{0}'", path, objType); }
export function deployScriptExists(scriptType: string) { return localize('deployScriptExists', "A {0} script already exists. The new script will not be included in build.", scriptType); }
export function notValidVariableName(name: string) { return localize('notValidVariableName', "The variable name '{0}' is not valid.", name); }
export function cantAddCircularProjectReference(project: string) { return localize('cantAddCircularProjectReference', "A reference to project '{0}' cannot be added. Adding this project as a reference would cause a circular dependency", project); }
export function unableToFindSqlCmdVariable(variableName: string) { return localize('unableToFindSqlCmdVariable', "Unable to find SQLCMD variable '{0}'", variableName); }
export function unableToFindDatabaseReference(reference: string) { return localize('unableToFindReference', "Unable to find database reference {0}", reference); }

// Action types
export const deleteAction = localize('deleteAction', 'Delete');
export const excludeAction = localize('excludeAction', 'Exclude');

// Project tree object types
export const fileObject = localize('fileObject', "file");
export const folderObject = localize('folderObject', "folder");

// Project script types

export const folderFriendlyName = localize('folderFriendlyName', "Folder");
export const scriptFriendlyName = localize('scriptFriendlyName', "Script");
export const tableFriendlyName = localize('tableFriendlyName', "Table");
export const viewFriendlyName = localize('viewFriendlyName', "View");
export const storedProcedureFriendlyName = localize('storedProcedureFriendlyName', "Stored Procedure");
export const dataSourceFriendlyName = localize('dataSource', "Data Source");
export const fileFormatFriendlyName = localize('fileFormat', "File Format");
export const externalStreamFriendlyName = localize('externalStream', "External Stream");
export const externalStreamingJobFriendlyName = localize('externalStreamingJobFriendlyName', "External Streaming Job");
export const preDeployScriptFriendlyName = localize('preDeployScriptFriendlyName', "Script.PreDeployment");
export const postDeployScriptFriendlyName = localize('postDeployScriptFriendlyName', "Script.PostDeployment");

// SqlProj file XML names
export const ItemGroup = 'ItemGroup';
export const Build = 'Build';
export const Folder = 'Folder';
export const Include = 'Include';
export const Import = 'Import';
export const Project = 'Project';
export const Condition = 'Condition';
export const Target = 'Target';
export const Name = 'Name';
export const BeforeBuildTarget = 'BeforeBuild';
export const Delete = 'Delete';
export const Files = 'Files';
export const PackageReference = 'PackageReference';
export const Version = 'Version';
export const PrivateAssets = 'PrivateAssets';
export const SqlCmdVariable = 'SqlCmdVariable';
export const DefaultValue = 'DefaultValue';
export const Value = 'Value';
export const ArtifactReference = 'ArtifactReference';
export const SuppressMissingDependenciesErrors = 'SuppressMissingDependenciesErrors';
export const DatabaseVariableLiteralValue = 'DatabaseVariableLiteralValue';
export const DatabaseSqlCmdVariable = 'DatabaseSqlCmdVariable';
export const ServerSqlCmdVariable = 'ServerSqlCmdVariable';
export const DSP = 'DSP';
export const Properties = 'Properties';
export const RelativeOuterPath = '..';
export const ProjectReference = 'ProjectReference';
export const TargetConnectionString = 'TargetConnectionString';
export const PreDeploy = 'PreDeploy';
export const PostDeploy = 'PostDeploy';
export const None = 'None';
export const True = 'True';
export const False = 'False';
export const Private = 'Private';
export const ProjectGuid = 'ProjectGuid';
export const Type = 'Type';
export const ExternalStreamingJob: string = 'ExternalStreamingJob';

/** Name of the property item in the project file that defines default database collation. */
export const DefaultCollationProperty = 'DefaultCollation';

/** Default database collation to use when none is specified in the project */
export const DefaultCollation = 'SQL_Latin1_General_CP1_CI_AS';

// SqlProj File targets
export const NetCoreTargets = '$(NETCoreTargetsPath)\\Microsoft.Data.Tools.Schema.SqlTasks.targets';
export const SqlDbTargets = '$(SQLDBExtensionsRefPath)\\Microsoft.Data.Tools.Schema.SqlTasks.targets';
export const MsBuildtargets = '$(MSBuildExtensionsPath)\\Microsoft\\VisualStudio\\v$(VisualStudioVersion)\\SSDT\\Microsoft.Data.Tools.Schema.SqlTasks.targets';
export const NetCoreCondition = '\'$(NetCoreBuild)\' == \'true\'';
export const NotNetCoreCondition = '\'$(NetCoreBuild)\' != \'true\'';
export const SqlDbPresentCondition = '\'$(SQLDBExtensionsRefPath)\' != \'\'';
export const SqlDbNotPresentCondition = '\'$(SQLDBExtensionsRefPath)\' == \'\'';
export const RoundTripSqlDbPresentCondition = '\'$(NetCoreBuild)\' != \'true\' AND \'$(SQLDBExtensionsRefPath)\' != \'\'';
export const RoundTripSqlDbNotPresentCondition = '\'$(NetCoreBuild)\' != \'true\' AND \'$(SQLDBExtensionsRefPath)\' == \'\'';
export const DacpacRootPath = '$(DacPacRootPath)';
export const ProjJsonToClean = '$(BaseIntermediateOutputPath)\\project.assets.json';

// SqlProj Reference Assembly Information
export const NETFrameworkAssembly = 'Microsoft.NETFramework.ReferenceAssemblies';
export const VersionNumber = '1.0.0';
export const All = 'All';

// Profile XML names
export const targetDatabaseName = 'TargetDatabaseName';
export const targetConnectionString = 'TargetConnectionString';

// SQL connection string components
export const initialCatalogSetting = 'Initial Catalog';
export const dataSourceSetting = 'Data Source';
export const integratedSecuritySetting = 'Integrated Security';
export const authenticationSetting = 'Authentication';
export const activeDirectoryInteractive = 'active directory interactive';
export const userIdSetting = 'User ID';
export const passwordSetting = 'Password';

// Authentication types
export const integratedAuth = 'Integrated';
export const azureMfaAuth = 'AzureMFA';
export const sqlAuth = 'SqlAuth';

// Tree item types
export enum DatabaseProjectItemType {
	project = 'pgDatabaseProject.itemType.project',
	folder = 'pgDatabaseProject.itemType.folder',
	file = 'pgDatabaseProject.itemType.file',
	externalStreamingJob = 'pgDatabaseProject.itemType.file.externalStreamingJob',
	referencesRoot = 'pDatabaseProject.itemType.referencesRoot',
	reference = 'pgDatabaseProject.itemType.reference',
	dataSourceRoot = 'pgDatabaseProject.itemType.dataSourceRoot',
}

// System dbs
export const systemDbs = ['master', 'msdb', 'tempdb', 'model'];

// SQL queries
export const sameDatabaseExampleUsage = 'SELECT * FROM [Schema1].[Table1]';
export function differentDbSameServerExampleUsage(db: string) { return `SELECT * FROM [${db}].[Schema1].[Table1]`; }
export function differentDbDifferentServerExampleUsage(server: string, db: string) { return `SELECT * FROM [${server}].[${db}].[Schema1].[Table1]`; }

export const sqlServer2005 = 'SQL Server 2005';
export const sqlServer2008 = 'SQL Server 2008';
export const sqlServer2012 = 'SQL Server 2012';
export const sqlServer2014 = 'SQL Server 2014';
export const sqlServer2016 = 'SQL Server 2016';
export const sqlServer2017 = 'SQL Server 2017';
export const sqlServer2019 = 'SQL Server 2019';
export const sqlAzure = 'Microsoft Azure SQL Database';
export const sqlDW = 'Microsoft Azure SQL Data Warehouse';

export const targetPlatformToVersion: Map<string, string> = new Map<string, string>([
	[sqlServer2005, '90'],
	[sqlServer2008, '100'],
	[sqlServer2012, '110'],
	[sqlServer2014, '120'],
	[sqlServer2016, '130'],
	[sqlServer2017, '140'],
	[sqlServer2019, '150'],
	[sqlAzure, 'AzureV12'],
	[sqlDW, 'Dw']
]);

// DW is special since the system dacpac folder has a different name from the target platform
export const AzureDwFolder = 'AzureDw';

export function getTargetPlatformFromVersion(version: string): string {
	return Array.from(targetPlatformToVersion.keys()).filter(k => targetPlatformToVersion.get(k) === version)[0];
}



export const serviceName = localize('extension.serviceName', 'ossdbToolsService');
export const providerId = localize('extension.providerId', 'PGSQL');
export const serviceCrashMessage = localize('extension.serviceCrashMessage', 'OSS DB Tools Service component exited unexpectedly. Please restart Azure Data Studio.');
export const serviceCrashButton = localize('extension.serviceCrashButton', 'View Known Issues');
export const serviceCrashLink = localize('extension.serviceCrashLink', 'https://github.com/microsoft/pgtoolsservice/issues?q=is%3Aopen+is%3Aissue+label%3Aknown-issues');
export const projectOutputChannel = localize('extension.projectOutputChannel', 'pgSQLProject');
export const templateDoesNotExistMessage = localize('extension.templateDoesNotExistMessage', 'No templates matched the input template name: pgproj.');

