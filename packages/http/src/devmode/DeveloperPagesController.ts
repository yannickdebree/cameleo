import { Injectable } from "@leo/core";
import { Get } from "../router";
import { TemplateEngine } from "../templates";

@Injectable()
export class DeveloperPagesController {
    constructor(
        private templateEngine: TemplateEngine
    ) { }

    @Get()
    welcome() {
        return this.templateEngine.render('welcome');
    }
}