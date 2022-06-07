import { Inject, Injectable } from "@cameleo/core";
import { Body, Get, Post, Redirection, Req, Request, Ses, Session, TemplateEngine } from "@cameleo/http";
import { AdminsRepository, Email, parseToEmail, parseToPassword, Password } from "../domain";
import { ADMINS_REPOSITORY } from "../utils/providers";

@Injectable()
export class AuthController {
    constructor(
        private templateEngine: TemplateEngine,
        @Inject(ADMINS_REPOSITORY)
        private adminsRepository: AdminsRepository
    ) { }

    @Get('login')
    @Post('login')
    async login(
        @Req request: Request,
        @Ses session: Session,
        @Body('email', parseToEmail) email: Email,
        @Body('password', parseToPassword) password: Password
    ) {
        if (!!session.get('admin')) {
            return new Redirection('/')
        }

        let status = 200;
        let data = {
            email: '',
            errors: new Array<string>()
        }

        if (request.method === "POST") {
            validationBlock: {
                if (!email.value || !password.value) {
                    status = 403;
                    data.errors.push("Email or password missing");
                    break validationBlock;
                }

                data.email = email.value;

                const admin = await this.adminsRepository.findOneByEmail(email);

                if (!admin || !admin.password.isEquals(password)) {
                    status = 401;
                    data.errors.push('Email or password wrong');
                    break validationBlock;
                }

                session.set('admin', data.email);
                return new Redirection('/')
            }
        }

        return this.templateEngine.render('login', { status, data })
    }

    @Get('logout')
    logout(@Ses session: Session) {
        session.purge();
        return new Redirection('/login')
    }
}