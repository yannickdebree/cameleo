import { Logger } from "@cameleo/core";
import { createServer } from "http";
import { MainMiddleware } from "../MainMiddleware";
import { HttpConnexionConfiguration } from "./HttpConnexionConfiguration";

export class HttpConnexionHandler {
    private server = createServer();

    constructor(
        private logger: Logger,
        private mainMiddleware: MainMiddleware
    ) { }

    handle({ port }: HttpConnexionConfiguration) {
        return new Promise<void>(resolve => {
            this.server.on('request', async (incomingMessage, serverResponse) => {
                this.mainMiddleware.resolve(incomingMessage, serverResponse)
            })

            this.server.listen(port, () => {
                this.logger.info(`HTTP connexion ready on port ${port}.`);
                resolve();
            });
        });
    }
}