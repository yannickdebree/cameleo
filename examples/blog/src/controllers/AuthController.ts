import { Injectable } from "@cameleo/core";
import { Get, TemplateEngine } from "@cameleo/http";

@Injectable()
export class AuthController {
    constructor(
        private templateEngine: TemplateEngine
    ) { }

    @Get('login')
    login() {
        return this.templateEngine.render('login')
    }
}