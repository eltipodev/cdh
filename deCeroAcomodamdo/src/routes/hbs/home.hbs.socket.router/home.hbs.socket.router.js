import express from "express";
import productManager from "../../../dao/fileSystem/Product.Manager.FileSystem.js";
const router = express.Router();

// endpoints GET api/produts/up
router.get("/up", (_req, res) => {
	try {

		return res.status(200).render("home", {
			page: "Home Up",
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

router.get("/realtimeproducts", async (req, res) => {
	try {
		const getAllProducts = await productManager.getAllProducts();
		return getAllProducts.success
			? res.status(200).render("realTimeProducts", {
				page: "Realtimeproducts",
				method: getAllProducts.method,
				messageMethod: getAllProducts.messageMethod,
				descriptionMethod: getAllProducts.descriptionMethod,
				value: getAllProducts.value,
				style: "products",
				socket: "index"

			})

			: res.status(200).render("realTimeProducts", {
				products: [],
				titleSection: getAllProducts.message,
				style: "products"
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

router.get("/", async (req, res) => {
	try {
		const getAllProducts = await productManager.getAllProducts();
		return getAllProducts.success
			? res.status(200).render("home", {
				page: "Realtimeproducts",
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
		return { error: error.message };
	}
});

// endpoints POST api/home/realtimeproducts/
router.post("/realtimeproducts", async (req, res) => {

	try {
		const addProduct = await productManager.addProduct(req.body);
		return addProduct;
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

export default router;