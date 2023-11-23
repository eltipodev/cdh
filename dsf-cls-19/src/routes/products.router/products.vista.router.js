import express from "express";
import productManager from "../../dao/products.manajer.js";

const router = express.Router();

////////////////////////////////////////////////
/// GET Lista todos los productos           ///
//////////////////////////////////////////////
router.get("/", async (req, res) => {
	// eslint-disable-next-line no-unused-vars
	const { limit, page, sort, catg } = req.query;
	try {

		const getAllProducts = await productManager.getAllProducts(req.query);

		res.status(getAllProducts.code).render("products", {
			pageTitle: "Productos",
			message: getAllProducts.message,
			payload: getAllProducts.payload,
			status: getAllProducts.status,
			sucess: getAllProducts.sucess,
			pagination: getAllProducts.pagination,

		});
	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}
});

////////////////////////////////////////////////
/// GET Lista  un producto por ID           ///
//////////////////////////////////////////////
router.get("/:pid", async (req, res) => {
	try {

		const updateProductById = await productManager.getProductById(req.params.pid);
		return res.status(updateProductById.code).render("products", {
			pageTitle: "Producto",
			message: updateProductById.message,
			payload: updateProductById.payload,
			status: updateProductById.status,
			sucess: updateProductById.sucess,
		});

	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

export default router;

