import { EndpointScope } from "../controllers";

export interface KernelConfiguration {
    readonly viewsDirectories?: string[];
    readonly endpointScopes: EndpointScope<unknown>[];
}
