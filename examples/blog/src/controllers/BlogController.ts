import { Get, Response } from "@leo/http";
import { FakeArticlesRepository } from "../repositories";
// import { ID } from "../domain/ID";
// import { FakeArticlesRepository } from "../repositories";

export class BlogController {
    private articlesRepository = new FakeArticlesRepository()

    @Get()
    async findAll() {
        const articles = await this.articlesRepository.findAll();
        return new Response({ status: 200, body: articles })
    }

    //     @Get(":id")
    //     async findOne() {
    //         const id = new ID(0);
    //         const article = await this.articlesRepository.findOne(id);
    //         return new Response({ status: 200, body: article })
    //     }
}