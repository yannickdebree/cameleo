import { Container } from "./di";
import { KernelConfiguration } from "./kernel";

export interface Connexion {
    handle(container: Container, configuration: KernelConfiguration): Promise<void>;
}