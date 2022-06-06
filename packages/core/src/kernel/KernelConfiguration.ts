import { EndpointScope } from "../controllers";

export interface KernelConfiguration {
    readonly endpointScopes: EndpointScope<unknown>[];
}
