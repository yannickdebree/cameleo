import { PathDefinition } from "./PathDefinition";

type HttpMethod = 'GET';

export class RouteDefinition {
    public readonly pathname: string;
    public readonly pathDefiniton: PathDefinition;

    constructor(
        pathname: string,
        public readonly method: HttpMethod
    ) {
        this.pathname = pathname;
        this.pathDefiniton = new PathDefinition(this.pathname);
    }
}