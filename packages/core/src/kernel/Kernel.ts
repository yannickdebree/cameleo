import 'reflect-metadata';
import { Connexion } from '../Connexion';
import { Controller, EndpointScopeFactory } from '../controllers';
import { Container, Injectable } from "../di";
import { Logger } from "../Logger";
import { KernelConfiguration } from './KernelConfiguration';

interface KernelConstructor {
    readonly controllers: Controller<unknown>[];
}

@Injectable()
export class Kernel {
    private configuration?: KernelConfiguration;

    constructor(
        private logger: Logger,
        private container: Container,
        private endpointScopeFactory: EndpointScopeFactory
    ) {
        this.logger.info('Kernel created.')
    }

    static create(configuration?: Partial<KernelConstructor>) {
        const container = new Container(Date.now().toString());
        container.set(Container, container);
        const kernel = container.get(Kernel);
        kernel.setConfiguration(configuration);
        return kernel;
    }

    open(connexion: Connexion) {
        if (!!this.configuration) {
            return connexion.handle(this.container, this.configuration);
        }
    }

    private setConfiguration(configuration?: Partial<KernelConstructor>) {
        this.configuration = {
            endpointScopes: []
        };

        if (configuration?.controllers?.length) {
            configuration.controllers.forEach(controllerClass => {
                this.configuration?.endpointScopes.push(...this.endpointScopeFactory.fromControllerClass(controllerClass));
            });
        }
    }
}