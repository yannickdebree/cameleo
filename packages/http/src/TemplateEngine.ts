import { renderFile } from "ejs";
import { join } from "path";
import { Response } from "./Response";

interface TemplateEngineConstructorOptions {
    viewsDirectories: string[];
}

interface TemplateEngineRenderingOptions {
    status: number;
}

export class TemplateEngine {
    constructor(private options: TemplateEngineConstructorOptions) { }

    async render(view: string, options?: TemplateEngineRenderingOptions) {
        // TODO: search good file inside several directories
        const body = await renderFile(join(this.options.viewsDirectories[0], `${view}.ejs`));
        return new Response({ status: options?.status || 200, body })
    }
}