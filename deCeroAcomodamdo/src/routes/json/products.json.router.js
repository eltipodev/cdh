import express from "express";
import productManager from "../../dao/fileSystem/Product.Manager.FileSystem.js";
const router = express.Router();

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

// endpoints GET api/json/produts/up
router.get("/up", (_req, res) => {
	try {

		return res.status(200).json({
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

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

// endpoints GET api/json/products
router.get("/", async (req, res) => {
	try {
		const getAllProducts = await productManager.getAllProducts(req.query);
		return getAllProducts.success
			? res.status(200).json({
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

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

// endpoints GET api/json/products/:pid
router.get("/:pid", async (req, res) => {
	const { pid } = req.params;

	try {

		const getProductById = await productManager.getProductById(pid);

		return getProductById.success
			? res.status(200).json({
				page: "Productos",
				method: getProductById.method,
				messageMethod: getProductById.messageMethod,
				descriptionMethod: getProductById.descriptionMethod,
				value: [getProductById.value],
				style: "products",
				socket: "index"
			})
			: res.status(404).json({
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

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

// endpoints POST api/json/products/
router.post("/", async (req, res) => {

	try {
		const addProduct = await productManager.addProduct(req.body);

		return addProduct.success
			? res.status(200).json({
				method: "addProduct",
				messageMethod: addProduct.messageMethod,
				descriptionMethod: "Agregando productos",
				success: true
			})
			: res.status(404).json({
				method: "addProduct",
				messageMethod: addProduct.messageMethod,
				descriptionMethod: "Agregando productos",
				success: false
			});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

/**
/* //TODO:
/* [x] Chequeado
/* [] Readme
**/

// endpoints PUT api/json/products/:pid
router.put("/:pid", async (req, res) => {

	const { pid } = req.params;
	try {
		const productUdpate = await productManager.updateProduct(+pid, req.body);
		if (productUdpate.success === false) {
			return res.status(404).json({
				method: "updateProduct",
				messageMethod: `El id  ${pid} no existe.`,
				descriptionMethod: "Actualizar producto",
				success: false
			});

		}

		return res.status(200).json({
			method: "updateProduct",
			messageMethod: `El Producto con el ${pid} fue actualizado`,
			descriptionMethod: "Actualizar producto",
			success: true
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

// endpoints DELETE api/json/products/:pid
router.delete("/:pid", async (req, res) => {

	const { pid } = req.params;
	try {
		const productDelete = await productManager.deleteProductById(+pid);

		productDelete.success !== false
			? res.status(200).json({
				method: "deleteProductById",
				messageMethod: productDelete.messageMethod,
				descriptionMethod: "Eliminar producto",
				success: false
			})
			: res.status(404).json({
				method: "deleteProductById",
				messageMethod: productDelete.messageMethod,
				descriptionMethod: "Eliminar producto",
				success: false
			});

	} catch (error) {

		res.status(500).json({
			message: "Ocurrió un error interno en el servidor",
			error: error.message
		});

	}
});
export default router;

