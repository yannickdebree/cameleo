import { Email } from "./Email";
import { Password } from "./Password";

export class Admin {
    constructor(
        public readonly email: Email,
        public readonly password: Password,
    ) { }
}