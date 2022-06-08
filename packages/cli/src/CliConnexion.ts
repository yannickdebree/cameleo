import { Connexion, Container, ControllerFactory, getMetadata, KernelConfiguration } from "@cameleo/core";
import { Command } from "./Command";
import { CmdCallbackWithPosition } from "./decorators";
import { COMMAND, PARAMETERS_DECORATORS } from "./metadata";
import { Output } from "./Output";

export class CliConnexion implements Connexion {
    async handle(container: Container, configuration: KernelConfiguration) {
        const controllerFactory = container.get(ControllerFactory);

        const endpointScopesRegistry = configuration.endpointScopes.map(endpointScope => {
            const command = getMetadata({ constructor: endpointScope.type, tag: COMMAND, propertyKey: endpointScope.methodName, defaultValue: '' });
            return {
                command,
                endpointScope
            }
        });

        const command = Command.createFromGlobals();
        const output = new Output();

        const endpointScope = (() => {
            if (!command.keyword) {
                return endpointScopesRegistry.find(d => d.command === "")?.endpointScope;
            }

            const endpointScopeFromCommand = endpointScopesRegistry.find(d => d.command === command.keyword)?.endpointScope;

            if (!endpointScopeFromCommand) {
                return endpointScopesRegistry.find(d => d.command === "*")?.endpointScope;
            }

            return endpointScopeFromCommand;
        })();

        output.onMessage((message, ...params) => {
            console.log(message, ...params);
        })

        const exitCode: number = await (() => {
            if (!endpointScope) {
                return;
            }
            const middleware = controllerFactory.getInstance(endpointScope.type);

            const args = getMetadata({
                constructor: endpointScope.type,
                tag: PARAMETERS_DECORATORS,
                propertyKey: endpointScope.methodName,
                defaultValue: new Array<CmdCallbackWithPosition>()
            })
                .sort((a, b) => a.parameterIndex - b.parameterIndex)
                .map(({ callback }) => callback({ command, output }));

            return (middleware as any)[endpointScope.methodName].bind(middleware)(...args);
        })();

        if (exitCode === undefined || exitCode === null) {
            throw new Error();
        }

        process.exit(exitCode);
    }
}