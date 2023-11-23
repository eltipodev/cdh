import chatManager from "../../dao/mongoDb/Chat.Manager.MongoDb.js";
import express from "express";

const router = express.Router();

////////////////////////////////////////////////
///  GET Chequeo de rutas sin metodos       ///
//////////////////////////////////////////////
router.get("/up", (req, res) => {
	try {

		return res.status(200).render("home", {
			page: "Chat Up",
			method: "Up",
			messageMethod: process.env.ENVIRONMENT || "not found",
			descriptionMethod: "Prueba funcionamiento sin metodos del endpoints Chat ",
			style: "products",
			socket: "index",
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

router.get("/", (req, res) => {
	try {

		return res.status(200).render("chat", {
			page: "Chat",
			method: "Up",
			messageMethod: "Usamos un chat",
			descriptionMethod: "Chat socket",
			style: "products",
			socket: "index",
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

router.post("/", async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const saveMessages = await chatManager.saveMessages(req.body);

		return res.status(200).json({
			page: "Chat",
			method: "Up",
			messageMethod: "Usamos un chat",
			descriptionMethod: "Chat socket",
			style: "products",
			socket: "index",
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

export default router;