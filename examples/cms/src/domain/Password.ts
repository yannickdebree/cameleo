export function parseToPassword(value: string) {
    return new Password(value);
}

export class Password {
    constructor(
        public readonly value: string
    ) { }

    isEquals(password: Password) {
        return this.value === password.value;
    }
}