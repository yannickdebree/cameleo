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
        if (this.routes.find(r => r.routeDefinition.pathname === route.routeDefinition.pathname)) return;
        this.routes.push(route);
        const { routeDefinition: { method, pathname }, middleware: { type, methodName } } = route;
        this.logger.info(`(${method}) ${pathname} : ${type.name}.${methodName}`)
    }

    getRouteByRequest(request: Request) {
        return this.routes
            .find(route => {
                const registredRouteParts = route.routeDefinition.pathDefiniton.parts;
                const requestParts = request.pathDefinition.parts;

                const params: any = {};

                if (registredRouteParts.length !== requestParts.length) {
                    return false;
                }

                for (let i = 0; i < registredRouteParts.length; i++) {
                    const registredRoutePart = registredRouteParts[i];
                    const requestPart = requestParts[i];

                    if (registredRoutePart.type === "term" && registredRoutePart.value !== requestPart.value) {
                        return false;
                    }

                    params[registredRoutePart.value.replace(':', '')] = requestPart.value;
                }

                request.setParams(params);

                return true;
            });
    }
}