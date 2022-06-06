import { IncomingMessage } from "http";
import { PathDefinition } from "./router";

export class Request {
    private params: any;

    constructor(
        public readonly pathDefinition: PathDefinition
    ) { }

    static createFromGlobals(message: IncomingMessage) {
        if (!message.url) {
            throw new Error()
        }
        const protocol = message.url.split('://')[0].includes('https') ? 'https' : 'http';
        const url = new URL(message.url, `${protocol}://${message.headers.host}`);

        const pathDefinition = new PathDefinition(url.pathname);
        return new Request(pathDefinition);
    }

    getParams() {
        return this.params;
    }

    setParams(params: any) {
        this.params = Object.freeze(params);
    }
}