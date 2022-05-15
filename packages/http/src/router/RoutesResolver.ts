import { EndpointScope, getMetadata, Injectable } from "@leo/core";
import { ROUTES_DEFINITIONS } from "../metadata";
import { Route } from "./Route";
import { RouteDefinition } from "./RouteDefinition";
import { Router } from "./Router";

@Injectable()
export class RoutesResolver {
    constructor(
        private router: Router
    ) { }

    resolve(endpoints: Array<EndpointScope<unknown>>) {
        endpoints.forEach((middleware) => {
            const routesDefinitions = getMetadata({
                tag: ROUTES_DEFINITIONS,
                target: middleware.instance,
                propertyKey: middleware.methodName,
                defaultValue: new Array<RouteDefinition>()
            }) as RouteDefinition[];

            if (!routesDefinitions.length) return;

            routesDefinitions.forEach(routeDefinition => {
                const route = new Route(routeDefinition, middleware)
                this.router.addRoute(route);
            });
        });
    }
}