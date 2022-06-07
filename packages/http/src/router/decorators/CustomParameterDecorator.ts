import { getMetadata, setMetadata } from "@cameleo/core";
import { PARAMETERS_DECORATORS } from "../../metadata";
import { Request } from "../../Request";
import { Session } from "../../Session";

export type RequestCallback<T = any> = (params: { request: Request, session: Session }) => T;
export type RequestCallbackWithPosition<T = any> = { callback: RequestCallback<T>, parameterIndex: number };

export function CustomParameterDecorator<T>(callback: RequestCallback<T>): ParameterDecorator {
    return function ({ constructor }, propertyKey, parameterIndex) {
        const tag = PARAMETERS_DECORATORS;

        const requestCallbacks = getMetadata({
            tag,
            constructor,
            propertyKey,
            defaultValue: new Array<RequestCallbackWithPosition>()
        });

        setMetadata({
            tag,
            constructor,
            propertyKey,
            value: [...requestCallbacks, { callback, parameterIndex }]
        })
    }
}