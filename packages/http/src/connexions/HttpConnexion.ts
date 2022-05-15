import { Connexion, Container, EndpointScopeFactory, isInProduction, KernelConfiguration, Logger } from "@leo/core";
import { join } from "path";
import { DeveloperPagesController } from "../devmode";
import { MainMiddleware } from "../MainMiddleware";
import { RoutesResolver } from '../router';
import { EjsTemplateEngine, TemplateEngine } from "../templates";
import { HttpConnexionConfiguration } from "./HttpConnexionConfiguration";
import { HttpConnexionHandler } from "./HttpConnexionHandler";

export class HttpConnexion implements Connexion {
    constructor(private configuration: HttpConnexionConfiguration) { }

    async handle(container: Container, configuration: KernelConfiguration) {
        const logger = container.get(Logger);
        const mainMiddleware = container.get(MainMiddleware);
        const routesResolver = container.get(RoutesResolver);
        const endpointScopeFactory = container.get(EndpointScopeFactory);

        const viewsDirectories = configuration.viewsDirectories || [];

        if (!this.configuration.templateEngine) {
            this.configuration.templateEngine = new EjsTemplateEngine({ viewsDirectories });
        }

        if (!isInProduction()) {
            this.configuration.templateEngine.addViewsDirectory(join(__dirname, '../devmode/views'));
        }

        container.set(TemplateEngine as any, this.configuration.templateEngine);

        routesResolver.resolve(configuration.endpointScopes);

        if (!isInProduction()) {
            const endpointScopes = endpointScopeFactory.fromControllerClass(DeveloperPagesController)
            routesResolver.resolve(endpointScopes);
        }

        return new HttpConnexionHandler(logger, mainMiddleware).handle(this.configuration);
    }
}