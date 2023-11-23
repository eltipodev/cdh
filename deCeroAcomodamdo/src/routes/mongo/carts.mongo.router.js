import cartsManager from "../../dao/mongoDb/Carts.Manager.MongoDb.js";
import express from "express";
import productManager from "../../dao/mongoDb/Products.Manager.MongoDb.js";

const router = express.Router();

// TODO:
// [x]

////////////////////////////////////////////////
///  GET Chequeo de rutas sin metodos       ///
//////////////////////////////////////////////
router.get("/up", (req, res) => {
	try {

		return res.status(200).render("home", {
			page: "Carts MongoDb Up",
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

// TODO:
// [x]
////////////////////////////////////////////////
///  GET Listar todos los carritos          ///
//////////////////////////////////////////////
router.get("/", async (_req, res) => {
	try {
		const getAllCartsWithProductIds = await cartsManager.getAllCartsWithProductIds();

		return res.status(200).render("carts-mongo-all-views", {
			page: "Todos los Carritos",
			method: getAllCartsWithProductIds.method,
			messageMethod: getAllCartsWithProductIds.messageMethod,
			descriptionMethod: getAllCartsWithProductIds.descriptionMethod,
			style: "carts",
			value: getAllCartsWithProductIds.value,
			success: true
		});

	} catch (error) {
		return { error: error.message };
	}
});

// TODO:
// [x]
////////////////////////////////////////////////
///  POST Crear un carrito                  ///
//////////////////////////////////////////////
router.post("/", async (_req, res) => {
	try {
		const createCart = await cartsManager.createCart();

		return res.status(200).json({
			page: "Carrito",
			method: "createCart",
			messageMethod: "Carrito Creado",
			descriptionMethod: "Crea un carrito",
			style: "carts",
			value: createCart,
			success: true
		});

	} catch (error) {
		return { error: error.message };
	}
});

// TODO:
// [x]
////////////////////////////////////////////////
///  GET Listar carrito por ID              ///
//////////////////////////////////////////////
router.get("/:cid", async (req, res) => {

	try {
		const getCartsById = await cartsManager.getCartsById(req.params.cid);
		console.log("==> getCartsById", getCartsById);
		return res.status(200).render("carts-mongo", {
			page: "Carrito por ID",
			method: "getCartsById",
			messageMethod: "Listar carrito por ID",
			descriptionMethod: "Lista el carrito por ID",
			style: "carts",
			value: [getCartsById],
			success: true
		});

	} catch (error) {
		return { error: error.message };
	}
});

// TODO:
// []
////////////////////////////////////////////////
///  POST agregar producto al carrito       ///
//////////////////////////////////////////////
router.post("/:cid/product/:pid", async (req, res) => {
	// console.log("==> cid", req.params.cid);
	const { cid, pid } = req.params;

	const getCartById = await cartsManager.getCartsById(cid);
	const getProductById = await productManager.getProductById(pid);

	if (!getCartById) {
		return res.status(404).json({
			page: "Carrito",
			method: "addProductToCartById",
			messageMethod: "El id el  carrito no existe",
			descriptionMethod: "Agrega un producto al carrito por ID",
			style: "carts",
			value: getCartById,
			success: false
		});
	}
	if (!getProductById) {
		return res.status(404).json({
			page: "Carrito",
			method: "addProductToCartById",
			messageMethod: "El id del producto no existe",
			descriptionMethod: "Agrega un producto al carrito por ID",
			style: "carts",
			value: getProductById,
			success: false
		});
	}

	try {

		const addProductToCartById = await cartsManager.addProductToCartById(cid, pid);

		return res.status(200).json({
			page: "Carrito",
			method: "addProductToCartById",
			messageMethod: "Agregado producto al  carrito",
			descriptionMethod: "Agrega un producto al carrito por ID",
			style: "carts",
			value: addProductToCartById,
			success: true
		});

	} catch (error) {
		return { error: error.message };
	}
});

export default router;

