import cartsManager from "../../dao/carts.manajer.js";
import express from "express";
const router = express.Router();

// [x];
////////////////////////////////////////////////
/// GET Listar todos los  Carrito           ///
//////////////////////////////////////////////
router.get("/", async (req, res) => {
	try {
		const { limit = "10", page = "", sort = "", query = "" } = req.query;

		const getAllCarts = await cartsManager.getAllCarts(limit, page, sort, query);

		res.status(getAllCarts.code).render("cart", {
			pageTitle: "Carritos",
			message: getAllCarts.message,
			payload: getAllCarts.payload,
			status: getAllCarts.status,
			sucess: getAllCarts.sucess
		});
	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}
});

// [x];
////////////////////////////////////////////////
/// GET Listar Carro por Id                 ///
//////////////////////////////////////////////
router.get("/:pid", async (req, res) => {
	try {

		const getCartsById = await cartsManager.getCartsById(req.params.pid);
		return res.status(getCartsById.code).render("cart", {
			pageTitle: "Carrito",
			message: getCartsById.message,
			payload: getCartsById.payload,
			status: getCartsById.status,
			sucess: getCartsById.sucess
		});
	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}
});

export default router;