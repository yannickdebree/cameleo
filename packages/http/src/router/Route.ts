import { EndpointScope } from "@leo/core";
import { RouteDefinition } from "./RouteDefinition";

export class Route<T> {
    constructor(
        public readonly routeDefinition: RouteDefinition,
        public readonly middleware: EndpointScope<T>
    ) { }
}