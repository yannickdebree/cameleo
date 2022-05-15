import { existsSync } from 'fs';
import { join } from "path";
import { Response } from "../Response";
import { TemplateEngineConstructorOptions } from './TemplateEngineConstructorOptions';

interface TemplateEngineRenderingOptions {
    status?: number;
    data?: any;
}

export abstract class TemplateEngine {
    constructor(private options: TemplateEngineConstructorOptions) { }

    addViewsDirectory(viewDirectory: string) {
        this.options.viewsDirectories.push(viewDirectory);
    }

    abstract renderFile(fileName: string, data?: any): Promise<string>;

    async render(view: string, options?: TemplateEngineRenderingOptions) {
        let fileName: string | undefined;

        for (let i = 0; i < this.options.viewsDirectories.length; i++) {
            fileName = join(this.options.viewsDirectories[i], `${view}.${this.options.extension}`);
            if (existsSync(fileName)) {
                break;
            }
        }

        if (!fileName) {
            throw new Error();
        }

        const body = await this.renderFile(fileName, options?.data);
        return new Response({ status: options?.status || 200, body })
    }
}