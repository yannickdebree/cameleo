import { Inject, Injectable } from "@cameleo/core";
import { Get, Param, Response, TemplateEngine } from "@cameleo/http";
import { ArticlesRepository, ID } from "../domain";
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
        @Param('id') id: string
    ) {
        const article = await this.articlesRepository.findOne(new ID(+id));
        if (!article) {
            return new Response({ status: 404 })
        }
        return this.templateEngine.render('article', { data: { article } });
    }
}