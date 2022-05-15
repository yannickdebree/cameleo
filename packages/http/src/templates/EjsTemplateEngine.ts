import { compile, renderFile } from "ejs";
import { TemplateEngine } from "./TemplateEngine";
import { TemplateEngineConstructorOptions } from "./TemplateEngineConstructorOptions";

export class EjsTemplateEngine extends TemplateEngine {
    constructor(options: Omit<TemplateEngineConstructorOptions, 'extension'>) {
        super({ ...options, extension: 'ejs' });
    }

    renderFile(fileName: string, data?: any) {
        return renderFile(fileName, data, {});
    }
}