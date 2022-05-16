export class Command {
    constructor(
        public readonly fisrtOption: string
    ) { }

    static createFromGlobals() {
        const command = process.argv[2];
        return new Command(command);
    }
}