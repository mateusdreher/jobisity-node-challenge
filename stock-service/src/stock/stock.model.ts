import mongoose, { Schema } from 'mongoose';

const stockSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	symbol: {
		type: String,
		required: true
	},
	open: {
		type: Number,
		required: true
	},
	high: {
		type: Number,
		required: true
	},
	low: {
		type: Number,
		required: true
	},
	close: {
		type: Number,
		required: true
	}
}, { timestamps: true})

export const StockModel = mongoose.model('stocks', stockSchema);
