export interface TemplateEngineConstructorOptions {
    viewsDirectories: string[];
    extension: string;
    errorPages?: {
        notFound?: string;
    }
}
