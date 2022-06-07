import { Inject, Injectable } from "@cameleo/core";
import { Get, Param, Response, Ses, Session, TemplateEngine } from "@cameleo/http";
import { ArticlesRepository, ID, parseToID } from "../domain";
import { ARTICLES_REPOSITORY } from '../utils/providers';

@Injectable()
export class BlogController {
    constructor(
        @Inject(ARTICLES_REPOSITORY)
        private articlesRepository: ArticlesRepository,
        private templateEngine: TemplateEngine
    ) { }

    @Get()
    async findAll(@Ses session: Session) {
        const admin = session.get("admin");
        const articles = await this.articlesRepository.findAll();
        return this.templateEngine.render('articles', { data: { articles, admin } });
    }

    @Get(':id')
    async findOne(
        @Ses session: Session,
        @Param('id', parseToID) id: ID
    ) {
        const admin = session.get("admin");
        const article = await this.articlesRepository.findOne(id);
        if (!article) {
            return new Response({ status: 404 })
        }
        return this.templateEngine.render('article', { data: { article, admin } });
    }
}