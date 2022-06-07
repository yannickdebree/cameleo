import { IncomingMessage } from "http";

export class Session {
    private constructor(private data: any) { }

    static fromGlobals(
        message: IncomingMessage
    ) {
        const data: any = {};
        message.headers.cookie?.split('&').map(cookie => {
            const [key, value] = cookie.split('=');
            data[key] = value;
        });
        return new Session(data);
    }

    get(key: string) {
        return this.data[key];
    }

    getDataAsArray() {
        return Object.keys(this.data).map(key => `${key}=${this.data[key]}`)
    }

    set<T>(key: string, value: T) {
        this.data[key] = value;
    }

    purge() {
        this.data = {};
    }
}