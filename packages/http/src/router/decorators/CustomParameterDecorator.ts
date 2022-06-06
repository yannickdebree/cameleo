import { getMetadata, setMetadata } from "@cameleo/core";
import { REQUEST_CALLBACKS } from "../../metadata";
import { Request } from "../../Request";

export type RequestCallback<T = any> = (request: Request) => T;

export function CustomParameterDecorator<T>(requestCallback: RequestCallback<T>): ParameterDecorator {
    return function ({ constructor }, propertyKey) {
        const tag = REQUEST_CALLBACKS;

        const requestCallbacks = getMetadata({
            tag,
            constructor,
            propertyKey,
            defaultValue: new Array<RequestCallback>()
        });

        setMetadata({
            tag,
            constructor,
            propertyKey,
            value: [...requestCallbacks, requestCallback]
        })
    }
}