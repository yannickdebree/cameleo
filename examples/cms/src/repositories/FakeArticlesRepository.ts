import { Article, ArticlesRepository, ID } from "../domain";

export class FakeArticlesRepository implements ArticlesRepository {
    private data = new Array<Article>();
    private lastIndex = 0;

    constructor() {
        for (let i = 0; i < 10; ++i) {
            this.data.push(new Article().setId(new ID(this.lastIndex++)).setTitle(`My beautiful article ${i + 1}`).setContent("Lorem ipsum..."));
        }
    }

    save(article: Article) {
        const id = new ID(this.lastIndex++);
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

    updateOne(article: Article) {
        const articleId = article.getId();
        if (!articleId) {
            throw new Error();
        }
        this.data.forEach((d, index) => {
            if (d.getId()?.isEquals(articleId)) {
                this.data[index] = article;
            }
        });
        return Promise.resolve();
    }

    removeOne(id: ID) {
        this.data = this.data.filter(d => !d.getId()?.isEquals(id));
        return Promise.resolve();
    }
}