export interface ProjectConfiguration {
    name: string;
    root: string;
    main: string;
}

export interface WorkspaceConfiguration {
    projects: ProjectConfiguration[];
    defaultProject: string;
}