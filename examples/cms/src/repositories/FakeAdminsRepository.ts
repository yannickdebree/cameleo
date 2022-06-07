import { Admin, AdminsRepository } from "../domain";
import { Email } from "../domain/Email";
import { Password } from "../domain/Password";

export class FakeAdminsRepository implements AdminsRepository {
    private data = new Array<Admin>();

    constructor() {
        const email = new Email("test@test.com");
        const password = new Password("$testtest");
        this.data.push(new Admin(email, password));
    }

    findOneByEmail(email: Email) {
        return Promise.resolve(this.data.find(d => d.email.isEquals(email)));
    }
}