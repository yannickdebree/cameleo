import { setMetadata } from "@cameleo/core";
import { COMMAND } from "../metadata";

export function Cmd(command = ""): MethodDecorator {
    return function ({ constructor }, propertyKey) {
        const tag = COMMAND
        setMetadata({ constructor, tag, value: command, propertyKey });
    }
}