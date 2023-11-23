import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	products: [
		{
			product: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: "Products"
			},
			quantity: { type: Number, default: 1 },
			_id: false
		}
	]
});

export const cartModel = mongoose.model("carts", cartSchema);