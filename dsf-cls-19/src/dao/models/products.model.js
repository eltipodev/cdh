
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	code: {
		type: String,
		require: true
	},
	price: {
		type: Number,
		require: true
	},
	thumbnails: {
		type: String,
	},
	category: {
		type: String,
	},
	stock: {
		type: Number,
		require: true
	},
	attbName: {
		codeAttb: {
			type: String
		},
		name: {
			type: String
		},
		urlAttb: {
			type: String
		}
	}
}
);

productsSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model("Products", productsSchema);