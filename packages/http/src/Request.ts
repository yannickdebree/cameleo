import { IncomingMessage } from "http";

export class Request {
    private url?: URL;

    static createFromGlobals(message: IncomingMessage) {
        if (!message.url) {
            throw new Error()
        }
        const protocol = message.url.split('://')[0].includes('https') ? 'https' : 'http';
        const url = new URL(message.url, `${protocol}://${message.headers.host}`);

        const request = new Request();
        request.setUrl(url);

        return request;
    }

    getUrl() {
        return this.url;
    }

    setUrl(url: URL) {
        this.url = url;
    }
}