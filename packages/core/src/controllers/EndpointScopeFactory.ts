import { Container, Injectable } from "../di";
import { Controller } from "./Controller";
import { EndpointScope } from "./EndpointScope";

@Injectable()
export class EndpointScopeFactory {
    constructor(
        private container: Container
    ) { }

    fromControllerClass<T>(controllerClass: Controller<T>): Array<EndpointScope<unknown>> {
        const controllerInstance = this.container.has(controllerClass) ? this.container.get(controllerClass) : new controllerClass();

        const controllerMethodsNames = Object.getOwnPropertyNames(
            Object.getPrototypeOf(controllerInstance)
        ).filter(
            controllerMethodName => controllerMethodName !== "constructor" && typeof (controllerInstance as any)[controllerMethodName] === "function"
        );

        return controllerMethodsNames.map(controllerMethodName => ({ instance: controllerInstance, methodName: controllerMethodName, type: controllerClass }));
    }
}