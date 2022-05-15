import { Injectable } from "@leo/core";
import { Get, NotFound } from "../router";
import { TemplateEngine } from "../TemplateEngine";

@Injectable()
export class DeveloperPagesController {
    constructor(
        private templateEngine: TemplateEngine
    ) { }

    @Get()
    welcome() {
        return this.templateEngine.render('welcome');
    }

    @NotFound
    error404() {
        return this.templateEngine.render('404', { status: 404 });
    }
}