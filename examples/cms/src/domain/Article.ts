import { ID } from "./ID";

export class Article {
    private id?: ID;
    private title?: string;
    private content?: string;

    public getId() {
        return this.id;
    }

    public setId(id: ID) {
        this.id = id;
        return this;
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
        return this;
    }

    public getContent() {
        return this.content;
    }

    public setContent(content: string) {
        this.content = content;
        return this;
    }
}