import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
	name: { type: String },
	message: { type: String }
}
);

export const chatsModel = mongoose.model("messages", chatSchema);

