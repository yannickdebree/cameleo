import { Admin } from "./Admin";
import { Email } from "./Email";

export interface AdminsRepository {
    findOneByEmail(email: Email): Promise<Admin | undefined>;
}