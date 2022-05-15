import { getMetadata, setMetadata } from "@leo/core";
import { ROUTES_DEFINITIONS } from "../metadata";
import { RouteDefinition } from "./RouteDefinition";

export function Get(path = "/"): MethodDecorator {
    return function (target, propertyKey) {
        const tag = ROUTES_DEFINITIONS;

        const routesDefinitions = getMetadata({
            tag,
            target,
            propertyKey,
            defaultValue: new Array<RouteDefinition>()
        });

        setMetadata({
            tag,
            target,
            propertyKey, value: [...routesDefinitions, new RouteDefinition(path, 'GET')]
        })
    }
}