export class Response<T> {
    public readonly status: number;
    public readonly body?: T;
    readonly headers?: any;

    constructor(options: Response<T>) {
        const { status, body, headers } = options;
        this.status = status;
        this.body = body;
        this.headers = headers;
    }
}