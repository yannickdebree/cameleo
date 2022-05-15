import { Inject, Injectable } from "@leo/core";
import { Get, TemplateEngine } from "@leo/http";
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
    async findOne() {
        const article = await this.articlesRepository.findOne(new ID(0));
        return this.templateEngine.render('article', { data: { article } });
    }
}