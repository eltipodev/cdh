import cartsManager from "../../dao/fileSystem/Carts.Manager.FileSystem.js";
import express from "express";
const router = express.Router();

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

// endpoints GET api/json/carts/up

// endpoints GET api/carts/up
router.get("/up", (_req, res) => {

	try {
		return res.status(200).json({
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

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

// endpoints GET api/carts/
router.get("/", async (_req, res) => {
	try {
		const getAllCarts = await cartsManager.getAllCarts();

		return res.status(200).json({
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

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

// endpoints GET api/carts/:cid
router.get("/:cid", async (req, res) => {
	const { cid } = req.params;
	try {
		const getCartById = await cartsManager.findCartProductById(cid);

		return getCartById.success
			? res.status(200).json({
				page: "Cart",
				method: getCartById.method,
				messageMethod: getCartById.messageMethod,
				descriptionMethod: getCartById.descriptionMethod,
				value: getCartById.value[0].products,
				style: "carts",
				socket: "index",
				success: getCartById.success
			})
			: res.status(404).json({
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

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

router.post("/", async (req, res) => {
	try {
		const createCart = await cartsManager.createCart();

		return res.status(200).json({
			page: "Cart",
			method: createCart.method,
			messageMethod: createCart.messageMethod,
			descriptionMethod: createCart.descriptionMethod,
			style: "carts",
			value: [],
			success: createCart.success
		});

	} catch (error) {
		return { error };
	}
});

/**
/* //TODO:
/* [] Chequeado
/* [] Readme
**/

router.post("/:cid/product/:pid", async (req, res) => {

	const { cid, pid } = req.params;

	try {
		const addProductToCartById = await cartsManager.addProductToCartById(cid, pid);

		res.status(200).json({
			page: "Cart",
			method: addProductToCartById.method,
			messageMethod: addProductToCartById.messageMethod,
			descriptionMethod: addProductToCartById.descriptionMethod,
			style: "carts",
			value: [],
			success: addProductToCartById.success
		});

	}
	catch (error) {
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});

	}
}
);
export default router;

