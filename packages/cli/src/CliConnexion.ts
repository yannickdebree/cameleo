import { Connexion, Container, ControllerFactory, getMetadata, KernelConfiguration } from "@cameleo/core";
import { Command } from "./Command";
import { COMMAND } from "./metadata";

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

        const cContainer = new Container();
        cContainer.set(Command, command);

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

        const exitCode: number = await (() => {
            if (!endpointScope) {
                return;
            }
            const middleware = controllerFactory.getInstance(endpointScope.type);
            const args = [command];
            return (middleware as any)[endpointScope.methodName].bind(middleware)(...args);
        })();

        if (exitCode === undefined || exitCode === null) {
            throw new Error();
        }

        process.exit(exitCode);
    }
}