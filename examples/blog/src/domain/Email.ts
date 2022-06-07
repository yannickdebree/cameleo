export function parseToEmail(value: string) {
    return new Email(value);
}

export class Email {
    constructor(
        public readonly value: string
    ) { }

    isEquals(email: Email) {
        return this.value === email.value;
    }
}