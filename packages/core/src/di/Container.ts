import { ContainerInstance } from "typedi";

export class Container extends ContainerInstance {
    constructor() {
        super(Date.now().toString())
    }
}