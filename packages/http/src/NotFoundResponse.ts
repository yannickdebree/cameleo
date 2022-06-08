import { Response } from "./Response";

export class NotFoundResponse extends Response<unknown> {
    constructor() {
        super({ status: 404 });
    }
}