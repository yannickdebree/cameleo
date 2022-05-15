import { readdir } from 'fs/promises';
import { join } from 'path';
import 'reflect-metadata';
import { Connexion } from '../Connexion';
import { Controller, EndpointScopeFactory } from '../controllers';
import { Container, Injectable } from "../di";
import { Logger } from "../Logger";
import { KernelConfiguration } from './KernelConfiguration';

interface KernelConstructor {
    controllersDirectory: string;
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

    static async create(configuration?: Partial<KernelConstructor>) {
        const container = new Container(Date.now().toString());
        container.set(Container, container);
        const kernel = container.get(Kernel);
        await kernel.setConfiguration(configuration);
        return kernel;
    }

    open(connexion: Connexion) {
        if (!!this.configuration) {
            return connexion.handle(this.container, this.configuration);
        }
    }

    private async setConfiguration(configuration?: Partial<KernelConstructor>) {
        this.configuration = {
            endpointScopes: []
        };

        const controllersDirectory = configuration?.controllersDirectory || join(process.cwd(), 'src/controllers');

        const controllerModulesNames = await readdir(controllersDirectory)
            .then(
                controllerModulesNames =>
                    controllerModulesNames
                        .filter(
                            controllerModuleName => /^(?!.*\.d\.tsx?$).*\.ts?$/g.test(controllerModuleName)
                        )
                        .map(controllerModuleName => controllerModuleName.split('.ts')[0])
            );

        await Promise.all(controllerModulesNames.map(async controllerModuleName => {
            const module = await import(join(controllersDirectory, `${controllerModuleName}.ts`));
            const controller = module[controllerModuleName] as Controller<any>;
            this.configuration?.endpointScopes.push(...this.endpointScopeFactory.fromControllerClass(controller))
        }));
    }
}