import { TemplateEngine } from "../templates";

export interface HttpConnexionConfiguration {
    port: number;
    templateEngine?: TemplateEngine
}
