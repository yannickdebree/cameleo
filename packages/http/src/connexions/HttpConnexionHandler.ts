import { Logger } from "@leo/core";
import { createServer } from "http";
import { MainMiddleware } from "../MainMiddleware";
import { HttpConnexionConfiguration } from "./HttpConnexionConfiguration";

export class HttpConnexionHandler {
    private server = createServer(
        async (incomingMessage, serverResponse) =>
            await this.mainMiddleware.resolve(incomingMessage, serverResponse)
    );

    constructor(
        private logger: Logger,
        private mainMiddleware: MainMiddleware
    ) { }

    handle({ port }: HttpConnexionConfiguration) {
        return new Promise<void>(resolve => {
            this.server.listen(port, () => {
                this.logger.info(`HTTP connexion ready on port ${port}.`);
                resolve();
            });
        });
    }
}