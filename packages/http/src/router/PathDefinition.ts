type PathPartType = 'term' | 'param';

interface PathPart {
    type: PathPartType,
    value: string;
}

export class PathDefinition {
    public readonly parts = new Array<PathPart>();

    constructor(pathname: string) {
        const pathParts = pathname.split('/');

        pathParts.filter((_, index) => index !== 0).forEach(value => {
            let type: PathPartType = 'term';
            if (value[0] === ":") {
                type = 'param';
            }
            this.parts.push({ type, value });
        })
    }
}