import { Inject, Injectable } from "@cameleo/core";
import { Body, Get, NotFoundResponse, Param, Post, Redirection } from "@cameleo/http";
import { Article, ArticlesRepository, ID, parseToID } from "../domain";
import { ARTICLES_REPOSITORY } from "../utils/providers";

@Injectable()
export class AdminController {
    constructor(
        @Inject(ARTICLES_REPOSITORY)
        private articlesRepository: ArticlesRepository
    ) { }

    @Get('create')
    async create() {
        const article = new Article();
        const id = await this.articlesRepository.save(article);
        return new Redirection(id.value.toString());
    }

    @Post(':id/edit')
    async edit(
        @Param("id", parseToID) id: ID,
        @Body('title') title: string,
        @Body('content') content: string,
    ) {
        const article = await this.articlesRepository.findOne(id);

        if (!article) {
            return new NotFoundResponse()
        }

        article.setTitle(title);
        article.setContent(content);
        await this.articlesRepository.updateOne(article);

        return new Redirection('/')
    }

    @Get(':id/remove')
    async remove(
        @Param('id', parseToID) id: ID
    ) {
        const article = await this.articlesRepository.findOne(id);

        if (!article) {
            return new NotFoundResponse()
        }
        await this.articlesRepository.removeOne(id);
        return new Redirection('/')
    }
}