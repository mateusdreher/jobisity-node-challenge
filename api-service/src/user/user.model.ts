import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	history: {
		type: [{
			stock: {
				type: String, 
				required: true
			},
			times_requested: {
				type: Number,
				required: true
			},
			stockIds: {
				type:  [String],
				required: false
			}
		}],
		required: true
	}
}, {timestamps: true});


export const UserModel = mongoose.model('users', UserSchema);