import express from "express";
import productManagerMongoDb from "../../dao/mongoDb/Products.Manager.MongoDb.js";

const router = express.Router();

//TODO_
// [x]
////////////////////////////////////////////////
///  GET Chequeo de rutas sin metodos       ///
//////////////////////////////////////////////
router.get("/up", (req, res) => {
	try {
		return res.status(200).render("home-mongo", {
			page: "Produts MongoDb Up",
			method: "Up",
			messageMethod: process.env.ENVIRONMENT || "not found",
			descriptionMethod: "Prueba funcionamiento sin metodos del endpoints MongoDb products ",
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

//TODO:
// [x]

////////////////////////////////////////////////
///  GET listar todos los  producto         ///
//////////////////////////////////////////////
router.get("/", async (req, res) => {
	try {

		const getAllProducts = await productManagerMongoDb.getAllProducts(req.query);

		return res.status(200).render("home-mongo", {
			page: "Todos los Produtos MongoDb",
			method: "getAllProducts",
			messageMethod: process.env.ENVIRONMENT || "not found",
			descriptionMethod: "Listar todos los productos de la db Mongo",
			style: "products",
			value: getAllProducts,
			socket: "index",
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

// TODO:
// [x]

////////////////////////////////////////////////
/// POST para agregar producto              ///
//////////////////////////////////////////////
router.post("/", async (req, res) => {

	try {
		const addProduct = await productManagerMongoDb.addProduct(req.body);
		return res.status(200).json({
			page: "Agregar Productos",
			method: "addProduct",
			messageMethod: "Producto agregado correctamente",
			descriptionMethod: "Agrega un producto a la db Mongo",
			value: addProduct,
			style: "products",
			socket: "index"
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

// TODO:
// [x]

////////////////////////////////////////////////
/// GET Listar producto por Id              ///
//////////////////////////////////////////////
router.get("/:pid", async (req, res) => {
	try {

		const getProductById = await productManagerMongoDb.getProductById(req.params.pid);

		return getProductById
			? res.status(200).render("home-mongo", {
				page: "Listar producto por Id",
				method: "getProductById",
				messageMethod: "Producto encontrado",
				descriptionMethod: "Se busca un producto por Id en la db Mongo",
				value: [getProductById],
				style: "products",
				socket: "index"
			})
			: res.status(404).render("home-mongo", {
				page: "Listar producto por Id",
				method: "getProductById",
				messageMethod: "Producto no encontrado",
				descriptionMethod: "Actualizar un producto a la db Mongo",
				value: getProductById,
				style: "products",
				socket: "index"
			});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

// TODO:
// [ ]

////////////////////////////////////////////////
/// Elimimar producto por Id              ///
//////////////////////////////////////////////
router.delete("/:pid", async (req, res) => {
	try {

		const getProductById = await productManagerMongoDb.deleteProductById(req.params.pid);
		console.log(getProductById);
		return getProductById
			? res.status(200).render("home-mongo", {
				page: "Eliminar producto por Id",
				method: "getProductById",
				messageMethod: "Eliminar encontrado",
				descriptionMethod: "Eliminar un producto por Id en la db Mongo",
				value: [getProductById],
				style: "products",
				socket: "index"
			})
			: res.status(404).render("home-mongo", {
				page: "Listar producto por Id",
				method: "getProductById",
				messageMethod: "Producto no encontrado",
				descriptionMethod: "Actualizar un producto a la db Mongo",
				value: getProductById,
				style: "products",
				socket: "index"
			});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

//TODO:
//[ ] CHEQUEAR SINO SE ENVIA DATOS

////////////////////////////////////////////////
/// Actualizar producto por Id              ///
//////////////////////////////////////////////
router.put("/:pid", async (req, res) => {
	try {
		const updateProductById = await productManagerMongoDb.updateProductById(req.params.pid, req.body);
		return updateProductById
			? res.status(200).render("home-mongo", {
				page: "Eliminar producto por Id",
				method: "getProductById",
				messageMethod: "Eliminar encontrado",
				descriptionMethod: "Eliminar un producto por Id en la db Mongo",
				value: [updateProductById],
				style: "products",
				socket: "index"
			})
			: res.status(404).render("home-mongo", {
				page: "Listar producto por Id",
				method: "getProductById",
				messageMethod: "Producto no encontrado",
				descriptionMethod: "Actualizar un producto a la db Mongo",
				value: updateProductById,
				style: "products",
				socket: "index"
			});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

export default router;

