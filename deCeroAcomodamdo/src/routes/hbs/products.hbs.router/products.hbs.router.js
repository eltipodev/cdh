import express from "express";
import productManager from "../../../dao/fileSystem/Product.Manager.FileSystem.js";
const router = express.Router();

// endpoints GET api/produts/up
router.get("/up", (_req, res) => {
	try {

		return res.status(200).render("home", {
			page: "Produts Up",
			method: "Up",
			messageMethod: process.env.ENVIRONMENT || "not found",
			descriptionMethod: "Prueba funcionamiento sin metodos del endpoints products",
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

// endpoints GET api/products
router.get("/", async (_req, res) => {
	try {
		const getAllProducts = await productManager.getAllProducts();
		return getAllProducts.success
			? res.status(200).render("home", {
				page: "Productos",
				method: getAllProducts.method,
				messageMethod: getAllProducts.messageMethod,
				descriptionMethod: getAllProducts.descriptionMethod,
				value: getAllProducts.value,
				style: "products",
				socket: "index"

			})

			: res.status(200).render("home", {
				products: [],
				titleSection: getAllProducts.message,
				style: "products"
			});

	} catch (error) {
		res.status(500).json({
			message: "Ocurrió un error interno en el servidor",
			error: error.message
		});
	}
});

// endpoints GET api/products/:pid
router.get("/:pid", async (req, res) => {
	const { pid } = req.params;

	try {

		const getProductById = await productManager.getProductById(pid);

		return getProductById.success
			? res.status(200).render("home", {
				page: "Productos",
				method: getProductById.method,
				messageMethod: getProductById.messageMethod,
				descriptionMethod: getProductById.descriptionMethod,
				value: [getProductById.value],
				style: "products",
				socket: "index"
			})
			: res.status(404).render("home", {
				page: "Productos",
				method: getProductById.method,
				messageMethod: getProductById.messageMethod,
				descriptionMethod: getProductById.descriptionMethod,
				value: getProductById.value,
				style: "products"
			});

	} catch (error) {

		res.status(500).json({
			message: "Ocurrió un error interno en el servidor",
			error: error.message
		});

	}
});

export default router;

