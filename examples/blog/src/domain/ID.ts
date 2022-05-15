export class ID {
    constructor(public readonly value: number) { }

    isEquals(id: ID) {
        return this.value === id.value;
    }
}