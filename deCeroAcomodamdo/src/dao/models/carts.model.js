import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	products: [
		{
			id: { type: String },
			quantity: { type: Number, default: 1 },
			_id: false
		}
	]
});

export const cartModel = mongoose.model("carts", cartSchema);

