import { Connexion, Container, ControllerFactory, getMetadata, KernelConfiguration } from "@leo/core";
import { Command } from "./Command";
import { COMMAND } from "./metadata";

export class CliConnexion implements Connexion {
    handle(container: Container, configuration: KernelConfiguration) {
        const controllerFactory = container.get(ControllerFactory);

        const endpointScopesRegistry = configuration.endpointScopes.map(endpointScope => {
            const command = getMetadata({ constructor: endpointScope.type, tag: COMMAND, propertyKey: endpointScope.methodName, defaultValue: '' });
            return {
                command,
                endpointScope
            }
        });

        const command = Command.createFromGlobals();

        const endpointScope = (() => {
            if (!command.fisrtOption) {
                return endpointScopesRegistry.find(d => d.command === "")?.endpointScope;
            }

            const endpointScopeFromCommand = endpointScopesRegistry.find(d => d.command === command.fisrtOption)?.endpointScope;

            if (!endpointScopeFromCommand) {
                return endpointScopesRegistry.find(d => d.command === "*")?.endpointScope;
            }

            return endpointScopeFromCommand;
        })();

        const response = (() => {
            if (!endpointScope) {
                return "";
            }
            const middleware = controllerFactory.getInstance(endpointScope.type);
            return (middleware as any)[endpointScope.methodName].bind(middleware)();
        })();

        console.log(response);

        return Promise.resolve()
    }
}