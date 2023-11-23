
import { Router } from "express";

import productManager from "../../ProductManager.js";
const router = Router();

//////////////////////////////////////////////
///  Enrutador productos                  ///
////////////////////////////////////////////

// ruta de testeo
// ===========================================
///  Ruta /api/up                           ///
////////////////////////////////////////////

router.get("/up", (req, res) => {
	try {
		// Respuesta de estado 'aceptado' (202)
		res.status(202).render("up", { value: "Ruta Productos Up" });

	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});
	}
});

/// GET    realtimeproducts               ///
////////////////////////////////////////////

router.get("/realtimeproducts", async (req, res) => {
	try {
		const allProducts = await productManager.getProducts();
		if (!allProducts.length) {
			res.render("realTimeProducts", { products: [], titleSection: "No hay Productos", style: "products" });
		}

		// NOTE: No olvidar retornar el mensaje sino queda enganchada la repuesta
		// return res.status(200).json({
		// 	message: "Productos encontrados",
		// 	allProducts
		// });
		res.render("realTimeProducts", { products: allProducts, titleSection: "Realtimeproducts", style: "products", socket: "index" });
	}
	catch (error) {
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});

	}
}
);

/// GET   input                          ///
////////////////////////////////////////////

router.get("/input", async (req, res) => {

	try {

		res.render("input", { titleSection: "Input Products", style: "products", form: "http://localhost:8080/api/handlebars/products" });
	}
	catch (error) {
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});

	}
}
);

/// Post   input                          ///
////////////////////////////////////////////

router.post("/realtimeproducts", async (req, res) => {
	const {
		title,
		description,
		code,
		price,
		stock,
		category,

	} = req.body;

	// Verificamos que se proporcionen todas las propiedades
	if (
		!title ||
		!description ||
		!code ||
		typeof Number(price) !== "number" ||
		typeof Number(stock) !== "number" ||
		!category
	) {
		res.render("input", { titleSection: "Input Products", style: "products", error: "Faltan propiedades obligatorias o tienen tipos incorrectos" });
		return;
	}
	try {

		// Llama al método 'addProduct' para agregar un nuevo producto
		const newProduct = await productManager.addProduct(req.body);

		if (newProduct === null) {
			res.status(400).render("input", { titleSection: "Input Products", style: "products", error: `El Producto con el ${code} ya existe` });

		}

		res.redirect("/api/handlebars/home/realtimeproducts");

		// res.status(200).render("input", { titleSection: "Input Products", style: "products", ok: "Producto agregado correctamente" });
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