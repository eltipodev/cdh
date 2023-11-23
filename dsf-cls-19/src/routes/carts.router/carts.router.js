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

		res.status(getAllCarts.code).json({
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
		return res.status(getCartsById.code).json({
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

//[x]
////////////////////////////////////////////////
/// POST para agregar Carrito               ///
//////////////////////////////////////////////
router.post("/", async (req, res) => {
	try {
		const addCart = await cartsManager.createCart();
		return res.status(addCart.code).json({
			pageTitle: "Carrito",
			message: addCart.message,
			payload: addCart.payload,
			status: addCart.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

//[x]
////////////////////////////////////////////////
/// POST agregar un Producto a l Carrito    ///
//////////////////////////////////////////////
router.post("/:cid/products/:pid", async (req, res) => {
	const { cid, pid } = req.params;
	try {
		const addCart = await cartsManager.addProductToCartById(cid, pid);
		return res.status(addCart.code).json({
			pageTitle: "Carrito",
			message: addCart.message,
			payload: addCart.payload,
			status: addCart.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

//[x]
////////////////////////////////////////////////
/// DELETE Eliminar un Producto del Carrito ///
//////////////////////////////////////////////
router.delete("/:cid/products/:pid", async (req, res) => {

	const { cid, pid } = req.params;
	try {
		const deleteProductToCartById = await cartsManager.deleteProductToCartById(cid, pid);

		return res.status(deleteProductToCartById.code).json({
			pageTitle: "Carrito",
			message: deleteProductToCartById.message,
			payload: deleteProductToCartById.payload,
			status: deleteProductToCartById.status,
		});
	} catch (error) {

		res.status(500).json({
			error: error.message
		});
	}
});

////////////////////////////////////////////////
/// DELETE todos los productos de un carrito///
//////////////////////////////////////////////
router.delete("/:cid", async (req, res) => {
	try {
		const deleteAllProductsByCart = await cartsManager.deleteAllProductsByCart(req.params.cid);

		return res.status(deleteAllProductsByCart.code).json({
			pageTitle: "Carrito",
			message: deleteAllProductsByCart.message,
			payload: deleteAllProductsByCart.payload,
			status: deleteAllProductsByCart.status,
		});

	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

//[x]
/////////////////////////////////////////////////////
/// PUT para actualizar el carrito con un arreglo///
///////////////////////////////////////////////////
router.put("/:cid", async (req, res) => {
	const { cid } = req.params;
	try {
		const updateCartById = await cartsManager.updateCartById(cid, req.body);
		return res.status(updateCartById.code).json({
			pageTitle: "Carrito",
			message: updateCartById.message,
			payload: updateCartById.payload,
			status: updateCartById.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

//[x]
/////////////////////////////////////////////////////
/// PUT para actualizar cantidad por body        ///
///////////////////////////////////////////////////
router.put("/:cid/products/:pid", async (req, res) => {
	const { cid, pid } = req.params;
	try {
		const updateCartByIdBody = await cartsManager.updateCartByIdBody(cid, pid, req.body);
		return res.status(updateCartByIdBody.code).json({
			pageTitle: "Carrito",
			message: updateCartByIdBody.message,
			payload: updateCartByIdBody.payload,
			status: updateCartByIdBody.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

export default router;