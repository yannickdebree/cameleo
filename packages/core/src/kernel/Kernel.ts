import { readdir } from 'fs/promises';
import { join } from 'path';
import 'reflect-metadata';
import { Connexion } from '../Connexion';
import { Controller, EndpointScopeFactory } from '../controllers';
import { Container, Injectable } from "../di";
import { isInProduction } from '../environment';
import { Logger } from "../Logger";
import { KernelConfiguration } from './KernelConfiguration';

interface KernelConstructor {
    controllersDirectory?: string;
    injectables?: Object;
}

@Injectable()
export class Kernel {
    private configuration?: KernelConfiguration;

    constructor(
        private container: Container,
    ) {
        if (!isInProduction()) {
            const logger = container.get(Logger);
            logger.info('Kernel created.')
        }
    }

    static async create(configuration?: Partial<KernelConstructor>) {
        const container = new Container();
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
        if (!!configuration?.injectables) {
            Object.keys(configuration?.injectables).forEach(injectableToken => {
                this.container.set(injectableToken, (configuration?.injectables as any)[injectableToken])
            })
        }

        this.configuration = {
            endpointScopes: []
        };

        const fileExtension = isInProduction() ? 'js' : 'ts';
        const mainFile = process.env.NODE_ENV === "test" ? join(__dirname, 'Kernel.test.ts') : join(process.cwd(), `./src/main.${fileExtension}`);

        const controllersDirectory = configuration?.controllersDirectory || join(mainFile, '../controllers');

        console.log(controllersDirectory);

        const fileExtensionRegex = new RegExp(`^(?!.*\.d\.tsx?$).*\.${fileExtension}?$`);

        const controllerModulesNames = await readdir(controllersDirectory)
            .then(
                controllerModulesNames =>
                    controllerModulesNames
                        .filter(
                            controllerModuleName => fileExtensionRegex.test(controllerModuleName)
                        )
                        .map(controllerModuleName => controllerModuleName.split(`.${fileExtension}`)[0])
            );

        const endpointScopeFactory = this.container.get(EndpointScopeFactory)
        await Promise.all(controllerModulesNames.map(async controllerModuleName => {
            const module = await import(join(controllersDirectory, `${controllerModuleName}.${fileExtension}`));
            const controller = module[controllerModuleName] as Controller<any>;
            this.configuration?.endpointScopes.push(...endpointScopeFactory.fromControllerClass(controller))
        }));
    }
}