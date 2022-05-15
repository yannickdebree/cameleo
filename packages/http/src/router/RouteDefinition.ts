type HttpMethod = 'GET';

export class RouteDefinition {
    constructor(
        public readonly path: string,
        public readonly method: HttpMethod
    ) {
        if (path[0] !== "/") {
            this.path = ['/', ...path].join('');
        }
    }
}