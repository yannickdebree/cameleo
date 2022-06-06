export class Command {
    constructor(
        public readonly keyword: string
    ) { }

    static createFromGlobals() {
        const keyword = process.argv[2];
        return new Command(keyword);
    }
}