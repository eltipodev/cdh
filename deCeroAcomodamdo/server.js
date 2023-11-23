
import { Server } from "socket.io";
import app from "./app.js";
import chatManager from "./src/dao/mongoDb/Chat.Manager.MongoDb.js";
import productManager from "./src/dao/fileSystem/Product.Manager.FileSystem.js";
import productManagerMongoDb from "./src/dao/mongoDb/Products.Manager.MongoDb.js";

const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////
/// Iniciar servidor Express              ///
////////////////////////////////////////////

const httpServer = app.listen(PORT, () => {
	console.info(`Example app listening on port ${PORT} !`);
});

const socketServer = new Server(httpServer);
const messages = [];
// evento connection
socketServer.on("connection", socket => {
	// id de los clientes conectos
	console.log(`Cliente conectado ${socket.id}`);

	socket.on("newUser", (user) => {
		socket.broadcast.emit("userConected", user);
		socket.emit("myuser");
	});

	socket.on("message", async (infoMessage) => {
		messages.push(infoMessage);
		socketServer.emit("chats", messages);
		await chatManager.saveMessages(infoMessage);
	});

	socket.on("productByDelete", async (prodId) => {
		try {

			const productDelete = await productManager.deleteProductById(prodId);
			const updateProduct = await productManager.getAllProducts();

			if (!productDelete.success) {
				socket.emit("productAddError", "Hubo un error");
			} else {
				socket.emit("productByDelete", updateProduct);
			}

		} catch (error) {
			console.error(error);
			socket.emit("productAddError", { error: error.message });
		}
	});

	socket.on("productByDeleteMongo", async (prodId) => {

		try {
			const productDelete = await productManagerMongoDb.deleteProductById(prodId);

			const updateProduct = await productManagerMongoDb.getAllProducts();
			if (!productDelete) {
				socket.emit("productAddError", "Hubo un error");
			} else {

				socket.emit("productByDeleteMongo", updateProduct);

			}

		} catch (error) {
			console.error(error);
			socket.emit("productAddError", { error: error.message });
		}
	});

	socket.on("addProduct", async (productData) => {
		try {
			const newProduct = await productManager.addProduct(productData);
			const updateProduct = await productManager.getAllProducts();

			if (!newProduct.success) {
				socket.emit("productAddError", newProduct);
			} else {

				socket.emit("productAdded", updateProduct);
			}

		} catch (error) {
			console.error(error);
			socket.emit("productAddError", { error: error.message });
		}
	});
});