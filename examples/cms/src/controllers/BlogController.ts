import { Inject, Injectable } from "@cameleo/core";
import { Get, NotFoundResponse, Param, TemplateEngine } from "@cameleo/http";
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
    async findAll() {
        const articles = await this.articlesRepository.findAll();
        return this.templateEngine.render('articles', { data: { articles } });
    }

    @Get(':id')
    async findOne(
        @Param('id', parseToID) id: ID
    ) {
        const article = await this.articlesRepository.findOne(id);
        if (!article) {
            return new NotFoundResponse()
        }
        return this.templateEngine.render('article', { data: { article } });
    }
}