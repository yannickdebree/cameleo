import { Container, Injectable } from "../di";
import { Controller } from "./Controller";

@Injectable()
export class ControllerFactory {
    constructor(
        private container: Container
    ) { }

    getControllerInstance<T>(controller: Controller<T>) {
        let controllerInstance: T;
        try {
            controllerInstance = this.container.get(controller);
        } catch (err) {
            controllerInstance = new controller();
        }
        return controllerInstance;
    }
}