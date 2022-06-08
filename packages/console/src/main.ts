import { CliConnexion } from '@cameleo/cli';
import { Kernel } from '@cameleo/core';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { ConsoleController } from './controllers';
import { PROJECT_CONFIGURATION } from './providers';
import { WorkspaceConfiguration } from './WorkspaceConfiguration';

async function main() {
    const projectPath = process.cwd();

    const workspaceConfiguration: WorkspaceConfiguration = JSON.parse(await readFile(join(projectPath, 'cameleo.json'), { encoding: 'utf-8' }));
    // TODO: implement project checking
    const defaultProject = workspaceConfiguration.defaultProject;
    const projectConfiguration = workspaceConfiguration.projects.find(project => project.name === defaultProject);
    if (!projectConfiguration) {
        throw new Error();
    }

    const kernel = await Kernel.create({
        controllers: [ConsoleController], injectables: {
            [PROJECT_CONFIGURATION]: projectConfiguration
        }
    });

    await kernel.open(new CliConnexion());
}

main();