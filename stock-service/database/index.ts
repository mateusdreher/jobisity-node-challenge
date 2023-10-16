import mongoose from 'mongoose';

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