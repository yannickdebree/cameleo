import { Article } from "./Article";
import { ID } from "./ID";

export interface ArticlesRepository {
    save(article: Article): Promise<ID>;
    findAll(): Promise<Array<Article>>;
    findOne(id: ID): Promise<Article | undefined>;
}