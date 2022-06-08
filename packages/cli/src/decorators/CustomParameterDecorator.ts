import { getMetadata, setMetadata } from "@cameleo/core";
import { Command } from "../Command";
import { PARAMETERS_DECORATORS } from "../metadata";

export type CmdCallback<T = any> = (params: { command: Command }) => T;
export type CmdCallbackWithPosition<T = any> = { callback: CmdCallback<T>, parameterIndex: number };

export function CustomParameterDecorator<T>(callback: CmdCallback<T>): ParameterDecorator {
    return function ({ constructor }, propertyKey, parameterIndex) {
        const tag = PARAMETERS_DECORATORS;

        const requestCallbacks = getMetadata({
            tag,
            constructor,
            propertyKey,
            defaultValue: new Array<CmdCallbackWithPosition>()
        });

        setMetadata({
            tag,
            constructor,
            propertyKey,
            value: [...requestCallbacks, { callback, parameterIndex }]
        })
    }
}