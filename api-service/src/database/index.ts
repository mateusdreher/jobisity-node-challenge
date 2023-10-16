import mongoose, { Model } from 'mongoose';
import { CustomError } from '../utils/error';

export class Database {
	static connect(connectionString: string) {
		mongoose.connect(connectionString)
			.then(() => {
				console.log('Connect with database successfully')
			})
			.catch((exception) => {
				throw exception
			})
	}

	static disconnect() {
		mongoose.disconnect();
	}
}