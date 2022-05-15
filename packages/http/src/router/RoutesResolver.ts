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
        endpoints.forEach((endpoint) => {
            const routesDefinitions = getMetadata({
                tag: ROUTES_DEFINITIONS,
                constructor: endpoint.type,
                propertyKey: endpoint.methodName,
                defaultValue: new Array<RouteDefinition>()
            }) as RouteDefinition[];

            if (!routesDefinitions.length) return;

            routesDefinitions.forEach(routeDefinition => {
                const route = new Route(routeDefinition, endpoint)
                this.router.addRoute(route);
            });
        });
    }
}