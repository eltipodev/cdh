import cartsHbs from "./hbs/carts.hbs.router/carts.hbs.router.js";
import cartsJson from "./json/carts.json.router.js";
import cartsMongo from "./mongo/carts.mongo.router.js";
import chatMongo from "./mongo/chat.mongo.router.js";
import express from "express";
import homeHbsSocket from "./hbs/home.hbs.socket.router/home.hbs.socket.router.js";
import productsHbs from "./hbs/products.hbs.router/products.hbs.router.js";
import productsJson from "./json/products.json.router.js";
import productsMongo from "./mongo/products.mongo.router.js";

const router = express.Router();

// endpoints GET api/produts/up
router.get("/up", (_req, res) => {
	try {
		return res.status(200).render("home", {
			page: "Api Up",
			method: "Up",
			messageMethod: process.env.ENVIRONMENT || "not found",
			descriptionMethod: "Prueba funcionamiento sin metodos del endpoints Home",
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

router.use("/products", productsHbs);
router.use("/carts", cartsHbs);
router.use("/home", homeHbsSocket);
router.use("/json/products", productsJson);
router.use("/json/carts", cartsJson);
router.use("/mongo/products", productsMongo);
router.use("/mongo/carts", cartsMongo);
router.use("/mongo/chat", chatMongo);

export default router;