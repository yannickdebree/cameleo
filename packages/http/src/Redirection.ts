import { Response } from "./Response";

export class Redirection<T> extends Response<T> {
    constructor(Location: string) {
        super({ status: 301, headers: { Location } });
    }
}