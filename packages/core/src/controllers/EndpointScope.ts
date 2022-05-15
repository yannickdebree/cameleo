import { Controller } from "./Controller";

export type EndpointScope<T> = {
    type: Controller<T>,
    instance: T,
    methodName: string,
}