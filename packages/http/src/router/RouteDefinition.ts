import { PathDefinition } from "./PathDefinition";

type HttpMethod = 'GET';

export class RouteDefinition {
    public readonly path: string;
    public readonly pathDefiniton: PathDefinition;

    constructor(
        path: string,
        public readonly method: HttpMethod
    ) {
        this.path = path;
        this.pathDefiniton = new PathDefinition(this.path);
    }
}