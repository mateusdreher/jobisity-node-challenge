import { User } from "../user";
import { StatsDTO } from "../user.dto";

export interface IUserRepository {
	create(user: User): void;
	getUserById(id: string): Promise<User | null>;
	getStats(): Promise<StatsDTO[]>;
	saveHistory(userId: string, stock: string, stockId: string): void;
	getByEmail(email: string):Promise<User | null>
	getByUsername(username: string):Promise<User | null>
	updateUserPassword(email: string, password: string): void;
}