import { UserModel } from "./user.model";
import { StatsDTO, IUserRepository } from "./domain/interfaces";
import { User } from "./domain/user";
import { CustomError } from "../utils/error";

export class UserRepository implements IUserRepository {
	private model;

	constructor() {
		this.model = UserModel;
	}

	async create(user: User) {
		const userInserted = await this.model.create(user);

		const insertedUser = await this.model.findById(userInserted._id);

		if(!insertedUser) {
			throw new CustomError('Error at insert user', 'InternalServerError');
		}
	}
	async getUserById(id: string): Promise<User | null> {
		const result = await this.model.findById(id);

		return result as unknown as User;
	}
	async getStats(): Promise<StatsDTO[]> {
		return await this.model.aggregate([
			{
				$unwind: '$history'
			},
			{
				$group: {
					_id: '$history.stock',
					times_requested: { $sum: '$history.times_requested'}
				}
			},
			{
				$sort: {
					times_requested: -1
				}
			},
			{
				$project: {
					_id: 0,
					stock: '$_id',
					times_requested: 1
				}
			},
			{
				$limit: 5
			}
		])

	}
	async saveHistory(_id: string, stock: string, stockId: string) {
		const existingDocument = await this.model.findOne({ _id, 'history.stock': stock });
		if(existingDocument) {
			return await this.model.updateOne(
				{ _id, 'history.stock': stock },
				{ 
					$inc: { 'history.$.times_requested': 1 },
					$push: {'history.$.stockIds': stockId }
				},
			  );
		}
		await this.model.findOneAndUpdate(
			{ _id },
			{ $addToSet: { 'history': { stock, times_requested: 1, stockIds: [stockId] } } },
			{ new: true }
		  );
	}

	async getByEmail(email: string): Promise<User | null> {
		const user = await this.model.findOne({email});
		return user as unknown as User;
	}
	async getByUsername(username: string): Promise<User | null> {
		return await this.model.findOne({username});
	}

	async login(email: string, password: string): Promise<User | null> {
		return await this.model.findOne({email, password})	
	}

	async updateUserPassword(email: string, password: string) {
		const userUpdated = await this.model.findOneAndUpdate(
			{ email },
			{ $set: {password}}
		)

		if (!userUpdated) {
			throw new CustomError('Error at update user password', 'InternalServerError');
		}
	}
	
}