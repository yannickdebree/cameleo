import 'reflect-metadata';
import { Connexion } from '../Connexion';
import { Controller, EndpointScopeFactory } from '../controllers';
import { Container, Injectable } from "../di";
import { Logger } from "../Logger";
import { KernelConfiguration } from './KernelConfiguration';

interface KernelConstructor {
    controllers: Array<Controller<any>>;
    injectables?: Object;
}

@Injectable()
export class Kernel {
    private configuration?: KernelConfiguration;

    constructor(
        private container: Container,
    ) {
        const logger = container.get(Logger);
        logger.info('Kernel created.')
    }

    static async create(configuration: KernelConstructor) {
        const container = new Container();
        container.set(Container, container);
        const kernel = container.get(Kernel);
        await kernel.setConfiguration(configuration);
        return kernel;
    }

    open(connexion: Connexion) {
        if (!this.configuration) {
            throw new Error();
        }
        return connexion.handle(this.container, this.configuration);
    }

    private async setConfiguration(configuration: KernelConstructor) {
        if (!!configuration.injectables) {
            Object.keys(configuration.injectables).forEach(injectableToken => {
                this.container.set(injectableToken, (configuration?.injectables as any)[injectableToken])
            })
        }

        this.configuration = {
            endpointScopes: []
        };

        const endpointScopeFactory = this.container.get(EndpointScopeFactory)
        configuration.controllers.forEach(async controller => {
            this.configuration?.endpointScopes.push(...endpointScopeFactory.fromControllerClass(controller))
        });
    }
}