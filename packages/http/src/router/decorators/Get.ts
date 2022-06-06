import { getMetadata, setMetadata } from "@cameleo/core";
import { ROUTES_DEFINITIONS } from "../../metadata";
import { RouteDefinition } from "../RouteDefinition";

export function Get(path = ""): MethodDecorator {
    return function ({ constructor }, propertyKey) {
        const tag = ROUTES_DEFINITIONS;

        const routesDefinitions = getMetadata({
            tag,
            constructor,
            propertyKey,
            defaultValue: new Array<RouteDefinition>()
        });

        setMetadata({
            tag,
            constructor,
            propertyKey, value: [...routesDefinitions, new RouteDefinition(path, 'GET')]
        })
    }
}