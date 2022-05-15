import { Inject, Injectable } from "@leo/core";
import { Get, TemplateEngine } from "@leo/http";
import { ArticlesRepository } from "../domain";
import { ARTICLES_REPOSITORY } from '../utils/providers';

@Injectable()
export class BlogController {
    constructor(
        @Inject(ARTICLES_REPOSITORY)
        private articlesRepository: ArticlesRepository,
        private templateEngine: TemplateEngine
    ) {
        console.log(this);
    }

    @Get()
    async findAll() {
        const data = await this.articlesRepository.findAll();
        return this.templateEngine.render('home', { data });
    }

    // @Get(":id")
    // async findOne() {
    //     const id = new ID(0);
    //     const article = await this.articlesRepository.findOne(id);
    //     return new Response({ status: 200, body: article })
    // }
}