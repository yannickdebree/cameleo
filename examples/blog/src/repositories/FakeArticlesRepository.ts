import { Article, ArticlesRepository, ID } from "../domain";

export class FakeArticlesRepository implements ArticlesRepository {
    private data = new Array<Article>();

    constructor() {
        this.data.push(new Article().setId(new ID(this.data.length)).setTitle("My beautiful article").setContent("Lorem ipsum..."));
        this.data.push(new Article().setId(new ID(this.data.length)).setTitle("My beautiful article").setContent("Lorem ipsum..."));
    }

    save(article: Article) {
        const id = new ID(this.data.length);
        article.setId(id);
        this.data.push(article);
        return Promise.resolve(id);
    }

    findAll() {
        return Promise.resolve(this.data);
    }

    findOne(id: ID) {
        return Promise.resolve(this.data.find(d => d.getId()?.isEquals(id)))
    }
}