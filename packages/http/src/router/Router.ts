import { Injectable, Logger } from "@leo/core";
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
        this.logger.info(`(${method}) ${path} : ${type.name}.${methodName}`)
    }

    getRouteByRequest(request: Request) {
        let route = this.routes.find(route => route.routeDefinition.path === request.getUrl()?.pathname);;

        if (!route) {
            route = this.routes.find(route => route.routeDefinition.path === "/*")
        }

        return route;
    }
}