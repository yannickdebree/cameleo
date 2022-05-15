import { ServiceNotFoundError } from "typedi";
import { Container, Injectable } from "../di";
import { Controller } from "./Controller";
import { EndpointScope } from "./EndpointScope";

@Injectable()
export class EndpointScopeFactory {
    constructor(
        private container: Container
    ) { }

    fromControllerClass<T>(controllerClass: Controller<T>): Array<EndpointScope<unknown>> {
        let controllerInstance: T;

        try {
            controllerInstance = this.container.get(controllerClass);
        } catch (err) {
            if (err instanceof ServiceNotFoundError) {
                controllerInstance = new controllerClass();
            } else {
                throw err;
            }
        }

        const controllerMethodsNames = Object.getOwnPropertyNames(
            Object.getPrototypeOf(controllerInstance)
        ).filter(
            controllerMethodName => controllerMethodName !== "constructor" && typeof (controllerInstance as any)[controllerMethodName] === "function"
        );

        return controllerMethodsNames.map(controllerMethodName => ({ instance: controllerInstance, methodName: controllerMethodName, type: controllerClass }));
    }
}