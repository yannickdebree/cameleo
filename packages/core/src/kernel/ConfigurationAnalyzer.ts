import { readFile } from "fs/promises";
import { join } from "path";

interface WorkspaceConfiguration {
    projects: {
        name: string;
        mainFile: string;
    }[];
    defaultProject: string;
}

export class ConfigurationAnalyzer {
    private constructor(public readonly workspaceConfiguration: WorkspaceConfiguration) { }

    static async fromGlobals() {
        const projectPath = process.cwd();
        const workspaceConfiguration: WorkspaceConfiguration = JSON.parse(await readFile(join(projectPath, 'cameleo.json'), { encoding: 'utf-8' }));
        return new ConfigurationAnalyzer(workspaceConfiguration)
    }
}