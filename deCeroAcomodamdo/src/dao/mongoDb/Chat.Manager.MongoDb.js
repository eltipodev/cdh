import { chatsModel } from "../models/chat.model.js";

class ChatManagerMongoDb {
	constructor() {
	}

	////////////////////////////////////////////////
	/// Método para agregar producto            ///
	//////////////////////////////////////////////
	async saveMessages(obj) {

		// const checkCodeExists = await this.checkCodeExists(code);

		const saveMessages = await chatsModel.create(obj);

		return saveMessages;
	}
}

const chatManager = new ChatManagerMongoDb();

export default chatManager;