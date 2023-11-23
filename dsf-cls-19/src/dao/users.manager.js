import cartsManager from "./carts.manajer.js";
import userModel from "./models/users.model.js";

class UserManager {

	async findById(id) {
		const findById = await userModel.findById(id);
		return findById;
	}

	async findByUser(user) {
		const findByUser = await userModel.findOne({ user });
		return findByUser;
	}

	async findByEmail(email) {
		const findByEmail = await userModel.findOne({ email });
		return findByEmail;

	}

	async creatOne(obj) {

		const cardUser = await cartsManager.createCart();
		console.log("==> cardUser", cardUser);

		// // eslint-disable-next-line no-unused-vars
		// const { name, lastname, password } = obj;

		const createOne = await userModel.create(obj);
		return createOne;
	}
}

const userManager = new UserManager();

export default userManager;