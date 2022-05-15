import { renderFile } from "ejs";
import { TemplateEngine } from "./TemplateEngine";
import { TemplateEngineConstructorOptions } from "./TemplateEngineConstructorOptions";

export class EjsTemplateEngine extends TemplateEngine {
    constructor(options: Omit<TemplateEngineConstructorOptions, 'extension'>) {
        super({ ...options, extension: 'ejs' });
    }

    renderFile(fileName: string): Promise<string> {
        return renderFile(fileName);
    }
}