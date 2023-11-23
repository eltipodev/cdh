import express from "express";
import productManager from "../../dao/products.manajer.js";

const router = express.Router();

router.get("/", async (req, res) => {

	try {

		const getAllProducts = await productManager.getAllProducts(req.query);
		console.log("==> getAllProducts", getAllProducts);
		res.status(getAllProducts.code).json({
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
/// POST para agregar producto              ///
//////////////////////////////////////////////
router.post("/", async (req, res) => {
	try {
		const addProduct = await productManager.addProduct(req.body);
		return res.status(addProduct.code).json({
			pageTitle: "Productos",
			message: addProduct.message,
			payload: addProduct.payload,
			status: addProduct.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

////////////////////////////////////////////////
/// DELETE eliminar un producto              ///
//////////////////////////////////////////////
router.delete("/:pid", async (req, res) => {
	try {
		const deleteProductById = await productManager.deleteProductById(req.params.pid);

		return res.status(deleteProductById.code).json({
			pageTitle: "Productos",
			message: deleteProductById.message,
			payload: deleteProductById.payload,
			status: deleteProductById.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

////////////////////////////////////////////////
/// PUT Actualizar un producto              ///
//////////////////////////////////////////////
router.put("/:pid", async (req, res) => {
	try {

		const updateProductById = await productManager.updateProductById(req.params.pid, req.body);

		return res.status(updateProductById.code).json({
			pageTitle: "Productos",
			message: updateProductById.message,
			payload: updateProductById.payload,
			status: updateProductById.status,
		});

	} catch (error) {
		res.status(500).json({
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

		return res.status(updateProductById.code).json({
			pageTitle: "Productos",
			message: updateProductById.message,
			payload: updateProductById.payload,
			status: updateProductById.status,
		});

	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

export default router;