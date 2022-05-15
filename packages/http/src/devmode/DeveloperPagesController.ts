import { Get } from "../router";
import { TemplateEngine } from "../TemplateEngine";

export class DeveloperPagesController {
    constructor(
        private templateEngine: TemplateEngine
    ) { }

    @Get()
    welcome() {
        return this.templateEngine.render('welcome');
    }

    @Get('test')
    error404() {
        return this.templateEngine.render('404', { status: 404 });
    }
}