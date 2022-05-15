import { Connexion, Container, EndpointScopeFactory, isInProduction, KernelConfiguration, Logger } from "@leo/core";
import { join } from "path";
import { DeveloperPagesController } from "../devmode";
import { MainMiddleware } from "../MainMiddleware";
import { RoutesResolver } from '../router';
import { TemplateEngine } from "../TemplateEngine";
import { HttpConnexionConfiguration } from "./HttpConnexionConfiguration";
import { HttpConnexionHandler } from "./HttpConnexionHandler";

export class HttpConnexion implements Connexion {
    constructor(private configuration: HttpConnexionConfiguration) { }

    async handle(container: Container, configuration: KernelConfiguration) {
        const routesResolver = container.get(RoutesResolver);
        const endpointScopeFactory = container.get(EndpointScopeFactory);

        routesResolver.resolve(configuration.endpointScopes);


        if (!isInProduction()) {
            const endpointScopes = endpointScopeFactory.fromControllerClass(DeveloperPagesController)
            routesResolver.resolve(endpointScopes);
        }

        if (!this.configuration.templateEngine) {
            const viewsDirectories = configuration.viewsDirectories || [];
            if (!isInProduction()) {
                viewsDirectories.push(join(__dirname, '../devmode/views'))
            }
            this.configuration.templateEngine = new TemplateEngine({
                viewsDirectories
            });
        }

        container.set(TemplateEngine, this.configuration.templateEngine);

        const logger = container.get(Logger);
        const mainMiddleware = container.get(MainMiddleware);

        return new HttpConnexionHandler(logger, mainMiddleware).handle(this.configuration);
    }
}