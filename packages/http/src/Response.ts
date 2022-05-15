export class Response<T> {
    public readonly status: number;
    public readonly body?: T;

    constructor(options: Response<T>) {
        this.status = options.status;
        this.body = options.body
    }
}