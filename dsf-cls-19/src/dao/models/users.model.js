import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	password: {
		type: String,
	},
	isGitHub: {
		type: Boolean,
		default: false
	}
});
const userModel = mongoose.model("Users", usersSchema);
export default userModel;