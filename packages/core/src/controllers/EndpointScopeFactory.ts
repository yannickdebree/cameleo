import { Injectable } from "../di";
import { Controller } from "./Controller";
import { EndpointScope } from "./EndpointScope";

@Injectable()
export class EndpointScopeFactory {
    fromControllerClass<T>(controllerClass: Controller<T>): Array<EndpointScope<unknown>> {
        const controllerMethodsNames = Object.getOwnPropertyNames(
            controllerClass.prototype
        ).filter(
            controllerMethodName => controllerMethodName !== "constructor"
        );

        return controllerMethodsNames.map(controllerMethodName => ({ methodName: controllerMethodName, type: controllerClass }));
    }
}