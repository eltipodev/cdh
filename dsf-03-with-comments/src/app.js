// ==============================
// importaciones
// ==============================

import "dotenv/config";
import ProductManager from "./ProductManager.js";
import express from "express";

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Crear una instancia de la clase ProductManager con la ruta al archivo de productos
const productManager = new ProductManager("./src/products.json");

// ==============================
// Rutas de nuestra api
// ==============================

// Ruta /api
// ==============================

app.get("/api", (req, res) => {
	try {

		// Respuesta de estado 'aceptado' (202)
		res.status(202).json({
			health: "up",
			success: true

		});
	} catch (error) {

		console.error(error);
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});

	}
});


// Ruta /api/products
// ==============================

app.get("/api/products", async (req, res) => {

	try {

		// Obtiene el valor del parámetro de consulta 'limit'
		const queryObj = req.query;

		const allProducts = await productManager.getProducts(queryObj);

		res.status(200).json({
			message: "Productos: ",
			allProducts
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


//  Ruta /api/products/:pid
// ==============================

app.get("/api/products/:pid", async (req, res) => {
	try {

		const paramsObj = req.params;


		const productById = await productManager.getProductById(paramsObj);

		res.status(200).json({
			message: "Productos: ",
			productById
		});


	} catch (error) {

		console.error(error);
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});
	}

});


// Iniciar el servidor Express y escuchar en el puerto especificado
app.listen(PORT, () => {
	console.info(`Example app listening on port ${PORT}!`);
});








