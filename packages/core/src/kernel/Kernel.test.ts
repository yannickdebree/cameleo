import { join } from "path";
import { Connexion } from "../Connexion";
import { Container } from "../di";
import { Kernel } from "./Kernel";
import { KernelConfiguration } from "./KernelConfiguration";
import { TestController } from "./test-controllers/TestController";

describe(Kernel.name, () => {
    it('Provides a container and a configuration for connexions', async () => {
        const injectableProvider = "CUSTOM_PROVIDER";
        const injectableValue = 0;

        const customConnexion: Connexion = {
            handle(container: Container, configuration: KernelConfiguration) {
                expect(container).toBeDefined();
                expect(container).toBeInstanceOf(Container);
                expect(container.get(injectableProvider)).toBe(injectableValue);

                const endpointScope = configuration.endpointScopes[0];
                expect(endpointScope.type).toBe(TestController)
                expect(endpointScope.methodName).toBe('hello')

                return Promise.resolve();
            }
        }

        const kernel = await Kernel.create({
            controllersDirectory: join(__dirname, './test-controllers'),
            injectables: {
                [injectableProvider]: injectableValue
            }
        });
        await kernel.open(customConnexion);
    });
});
