import { IncomingMessage } from "http";
import { PathDefinition } from "./router";

export class Request {
    public readonly pathDefinition: PathDefinition;

    constructor(pathname: string) {
        this.pathDefinition = new PathDefinition(pathname);
    }

    static createFromGlobals(message: IncomingMessage) {
        if (!message.url) {
            throw new Error()
        }
        const protocol = message.url.split('://')[0].includes('https') ? 'https' : 'http';
        const url = new URL(message.url, `${protocol}://${message.headers.host}`);

        return new Request(url.pathname);
    }
}