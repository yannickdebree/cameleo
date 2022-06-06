import { Container, ControllerFactory, getMetadata, Injectable, isInProduction, Logger } from "@cameleo/core";
import { IncomingMessage, ServerResponse } from "http";
import { REQUEST_CALLBACKS } from "./metadata";
import { Request } from "./Request";
import { Response } from "./Response";
import { RequestCallback, Router } from "./router";
import { TemplateEngine } from "./templates";

@Injectable()
export class MainMiddleware {
    constructor(
        private router: Router,
        private logger: Logger,
        private controllerFactory: ControllerFactory,
        private container: Container
    ) { }

    async resolve(message: IncomingMessage, serverResponse: ServerResponse) {
        const request = Request.createFromGlobals(message);
        let response = new Response({ status: 500 });

        routeResolution: {
            const route = this.router.getRouteByRequest(request);

            if (!route) {
                response = new Response({ status: 404 })
                break routeResolution;
            }

            try {
                const instance = this.controllerFactory.getInstance(route.middleware.type) as any;
                const middleware = instance[route.middleware.methodName].bind(instance);

                const args = getMetadata({
                    constructor: route.middleware.type,
                    tag: REQUEST_CALLBACKS,
                    propertyKey: route.middleware.methodName,
                    defaultValue: new Array<RequestCallback>()
                }).map(cb => cb(request));

                const responseFromMiddleware = await middleware(...args) as Response<unknown>;

                if (!responseFromMiddleware || !(responseFromMiddleware instanceof Response)) {
                    throw new Error();
                }

                response = responseFromMiddleware;
            } catch (err) {
                this.logger.error(err);
            }
        }

        if (!isInProduction() && response.status === 404) {
            const templateEngine = this.container.get(TemplateEngine as any) as TemplateEngine;
            if (!templateEngine.options.errorPages?.notFound) {
                throw new Error();
            }
            response = await templateEngine.render(templateEngine.options.errorPages?.notFound, { status: 404 });
        }

        serverResponse.statusCode = response.status;
        if (response.body) {
            serverResponse.write(((body) => {
                switch (typeof body) {
                    case "bigint":
                    case "boolean":
                    case "function":
                    case "number":
                    case "symbol":
                        return body.toString();
                    case "object":
                        return JSON.stringify(body);
                    case "undefined":
                        return '';
                    case "string":
                    default:
                        return body;
                }
            })(response.body));
        }
        serverResponse.end();
    }
}