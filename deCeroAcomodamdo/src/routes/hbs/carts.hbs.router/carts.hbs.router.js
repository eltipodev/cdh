import cartsManager from "../../../dao/fileSystem/Carts.Manager.FileSystem.js";
import express from "express";
const router = express.Router();

// endpoints GET api/carts/
router.get("/", async (_req, res) => {
	try {
		const getAllCarts = await cartsManager.getAllCarts();
		return res.status(200).render("carts-all-views", {
			page: "Todos los Carritos",
			method: getAllCarts.method,
			messageMethod: getAllCarts.messageMethod,
			descriptionMethod: getAllCarts.descriptionMethod,
			style: "carts",
			value: getAllCarts.value,
			success: true
		});

	} catch (error) {
		return { error: error.message };
	}
});

// endpoints GET api/carts/up
router.get("/up", (_req, res) => {

	try {
		return res.status(200).render("home", {
			page: "Cart Up",
			method: "Up",
			messageMethod: process.env.ENVIRONMENT || "not found",
			descriptionMethod: "Prueba funcionamiento sin metodos del endpoints carts",
			style: "carts",
			socket: "index",
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Ocurrió un error interno en el servidor",
			error: error.message
		});
	}
});

// endpoints GET api/carts
router.get("/:cid", async (req, res) => {
	const { cid } = req.params;
	try {
		const getCartById = await cartsManager.findCartProductById(cid);

		return getCartById.success
			? res.status(200).render("carts", {
				page: "Cart",
				method: getCartById.method,
				messageMethod: getCartById.messageMethod,
				descriptionMethod: getCartById.descriptionMethod,
				value: getCartById.value[0].products,
				style: "carts",
				socket: "index",
				success: getCartById.success
			})
			: res.status(404).render("carts", {
				page: "Cart",
				method: getCartById.method,
				messageMethod: getCartById.messageMethod,
				descriptionMethod: getCartById.descriptionMethod,
				style: "carts",
				value: [],
				success: getCartById.success
			});
	} catch (error) {
		return { error: error.message };
	}
});

router.post("/", async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const createCart = await cartsManager.createCart();

		return res.status(200).json({ ok: "ok" });

		// return res.status(200).render("carts", {
		// 	page: "Cart",
		// 	method: createCart.method,
		// 	messageMethod: createCart.messageMethod,
		// 	descriptionMethod: createCart.descriptionMethod,
		// 	style: "carts",
		// 	value: [],
		// 	success: createCart.success
		// });

	} catch (error) {
		return { error };
	}
});

// // endpoints GET carrito por ID api/carts/:cid
// router.get("/:cid", async (req, res) => {
// 	// Destructuramos el objeto paramsObj y extraemos cpid
// 	const { cid } = req.params;
// 	try {

// 		const createCart = await cartsManager.renderCarts(cid);

// 		!createCart
// 			? res.status(404).render("carts", { products: [], titleSection: "Carrito no se encontro", style: "carts" })
// 			: res.status(200).render("carts", { products: createCart[0].products, titleSection: "Carrito Encontrado", style: "carts" });

// 	}
// 	catch (error) {
// 		return res.status(500).json({
// 			message: "😪 Ocurrió un error interno en el servidor.",
// 			error: error.message
// 		});

// 	}
// }
// );

export default router;

