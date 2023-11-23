//TODO:
// * revisar los return de error
// *

//////////////////////////////////////////////
/// Enrutador Carrito  /api/cards         ///
////////////////////////////////////////////

import { Router } from "express";
import cartManager from "../../CartManager.js";

const router = Router();

//////////////////////////////////////////////
///  Enrutador Carritos                 ///
////////////////////////////////////////////

// ruta de testeo
// ===========================================
///  Ruta /api/up                           ///
////////////////////////////////////////////

router.get("/up", (req, res) => {
	try {
		// Respuesta de estado 'aceptado' (202)
		res.status(202).render("up", { value: "Ruta Carts Up" });

	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});
	}
});

/// Get Carrito por ID /api/carts       ///
////////////////////////////////////////////

router.get("/:cid", async (req, res) => {
	// Destructuramos el objeto paramsObj y extraemos cpid
	const { cid } = req.params;
	try {

		const createCart = await cartManager.renderCarts(cid);

		!createCart
			? res.status(404).render("carts", { products: [], titleSection: "Carrito no se encontro", style: "carts" })
			: res.status(200).render("carts", { products: createCart[0].products, titleSection: "Carrito Encontrado", style: "carts" });

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

router.post("/", async (req, res) => {

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