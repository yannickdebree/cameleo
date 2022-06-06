import { Injectable, Logger } from "@cameleo/core";
import { Request } from "../Request";
import { Route } from "./Route";

@Injectable()
export class Router {
    private routes = new Array<Route<unknown>>();

    constructor(
        private logger: Logger
    ) { }

    addRoute<T>(route: Route<T>) {
        if (this.routes.find(r => r.routeDefinition.path === route.routeDefinition.path)) return;
        this.routes.push(route);
        const { routeDefinition: { method, path }, middleware: { type, methodName } } = route;
        this.logger.info(`(${method}) /${path} : ${type.name}.${methodName}`)
    }

    getRouteByRequest(request: Request) {
        return this.routes
            .find(route => {
                const registredRouteParts = route.routeDefinition.pathDefiniton.parts;
                const requestParts = request.pathDefinition.parts;

                console.log(registredRouteParts.length !== requestParts.length);

                if (registredRouteParts.length !== requestParts.length) {
                    return false;
                }

                for (let i = 0; i < registredRouteParts.length; i++) {
                    const requestPart = requestParts[i];

                    console.log('i : ', i);
                    console.log(registredRouteParts[i]);
                    console.log(requestPart);

                    if (requestPart.type === "term" && registredRouteParts[i].value !== requestPart.value) {
                        return false;
                    }

                    if (requestPart.type === "param") {
                        return true;
                    }
                }

                return true;
            });
    }
}