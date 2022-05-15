import { Container, Injectable, UnknowInjectableError } from "../di";
import { Controller } from "./Controller";

@Injectable()
export class ControllerFactory {
    constructor(
        private container: Container
    ) { }

    getInstance<T>(controllerClass: Controller<T>) {
        let controllerInstance: T;
        try {
            controllerInstance = this.container.get(controllerClass);
        } catch (err) {
            if (err instanceof UnknowInjectableError) {
                controllerInstance = new controllerClass();
            } else {
                throw err;
            }
        }
        return controllerInstance;
    }
}