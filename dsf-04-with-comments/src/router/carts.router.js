import CartManager from "../CartManager.js";
import { Router } from "express";

const router = Router();

// Crear una instancia de la clase CartManager con la ruta al archivo de productos
const cartManager = new CartManager("./src/json/carts.json");

//////////////////////////////////////////////
/// Enrutador Carrito  /api/cards         ///
////////////////////////////////////////////

/// Post agregar Carrito /api/cards       ///
////////////////////////////////////////////

router.get("/:cid", async (req, res) => {

	// Destructuramos el objeto paramsObj y extraemos cpid
	const { cid } = req.params;
	try {

		const createCart = await cartManager.getCartById(cid);

		return res.status(200).json({
			message: " ",
			createCart
		});

	}
	catch (error) {
		return res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});

	}
}
);

/// Post Carrito  /api/cards              ///
////////////////////////////////////////////

router.post("", async (req, res) => {

	try {

		const createCart = await cartManager.createCart();

		res.status(200).json({
			message: " ",
			createCart
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

/// Post Carrito  /api/cards/:cid/product/:pid ///
//////////////////////////////////////////////////

router.post("/:cid/product/:pid", async (req, res) => {

	const { cid, pid } = req.params;

	try {

		const dataNewCart = await cartManager.addProductToCartById(cid, pid);
		console.log(dataNewCart);
		res.status(200).json({
			message: dataNewCart.message,
			error: dataNewCart.error
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