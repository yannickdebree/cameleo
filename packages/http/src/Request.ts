import { IncomingMessage } from "http";
import { HttpMethod } from "./HttpMethod";
import { PathDefinition } from "./router";
import { Session } from "./Session";

export class Request {
    private params: any;
    private body: any;
    public readonly method: HttpMethod;
    public readonly pathDefinition: PathDefinition;

    constructor(
        message: IncomingMessage
    ) {
        if (!message.url || !message.method) {
            throw new Error()
        }
        const protocol = message.url.split('://')[0].includes('https') ? 'https' : 'http';
        const url = new URL(message.url, `${protocol}://${message.headers.host}`);

        this.method = message.method as HttpMethod;
        this.pathDefinition = new PathDefinition(url.pathname);
    }

    getParams() {
        return this.params;
    }

    setParams(params: any) {
        this.params = Object.freeze(params);
    }

    getBody() {
        return this.body
    }

    setBody(body: any) {
        this.body = body;
    }
}