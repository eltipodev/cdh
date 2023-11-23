import ProductManager from "../ProductManager.js";
import { Router } from "express";
const router = Router();

// Crear una instancia de la clase ProductManager con la ruta al archivo de productos
const productManager = new ProductManager("./src/json/products.json");

//////////////////////////////////////////////
///  Enrutador productos                  ///
////////////////////////////////////////////

///  Ruta //                 ///
////////////////////////////////////////////

router.get("/", async (req, res) => {
	try {
		const allProducts = await productManager.getProducts(req.query);
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

///  Ruta //:pid             ///
////////////////////////////////////////////

router.get("/:pid", async (req, res) => {
	// Destructuramos el objeto queryObj y extraemos pid
	const { pid } = req.params;
	try {
		const productById = await productManager.getProductById(pid);
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

/// POST agregar productos                ///
////////////////////////////////////////////

router.post("/", async (req, res) => {
	// Desestructura los datos enviados en el cuerpo de la solicitud
	const {
		title,
		description,
		code,
		price,
		status,
		stock,
		category,
		thumbnails
	} = req.body;

	// Verificamos que se proporcionen todas las propiedades
	if (
		!title ||
		!description ||
		!code ||
		typeof price !== "number" ||
		typeof status !== "boolean" ||
		typeof stock !== "number" ||
		!category ||
		!thumbnails
	) {
		return res.status(400).json({
			message: "Faltan propiedades obligatorias o tienen tipos incorrectos",
			error: null
		});
	}

	try {
		// Llama al método 'addProduct' para agregar un nuevo producto
		const newProduct = await productManager.addProduct(req.body);
		console.log("newProduct", newProduct.error);
		if (newProduct.error === null) {
			return res.status(400).json({
				message: `El Producto con el ${code} ya existe`,
				error: newProduct.error
			});
		}

		// Puedes enviar una respuesta con éxito si lo deseas
		res.status(200).json({
			message: "Producto agregado correctamente",
			product: req.body.title
		});

	} catch (error) {
		// Si ocurre un error durante el proceso, envía una respuesta de error
		res.status(500).json({
			message: "Ocurrió un error interno en el servidor",
			error: error.message
		});
	}
});

/// POST actualizarr productos            ///
////////////////////////////////////////////

router.put("/:pid", async (req, res) => {

	const { pid } = req.params;
	try {
		const productUdpate = await productManager.updateProduct(+pid, req.body);

		if (productUdpate.error === null) {

			return res.status(200).json({
				message: `El id  ${pid} no existe.`,
				error: null
			});
		}

		return res.status(200).json({
			message: `Producto actualizado correctamente ${pid}`,
			product: req.body.title
		});

	} catch (error) {

		res.status(500).json({
			message: "Ocurrió un error interno en el servidor",
			error: error.message
		});

	}
});

/// DELETE eliminar producto              ///
////////////////////////////////////////////

router.delete("/:pid", async (req, res) => {

	const { pid } = req.params;
	try {
		const productDelete = await productManager.deleteProduct(+pid, req.body);

		if (productDelete.error === null) {

			return res.status(200).json({
				message: `No hay un producto con este ${pid} `,
				error: null
			});
		}

		return res.status(200).json({
			message: `Producto eliminado correctamente ${pid}`,
			product: productDelete.productos
		});

	} catch (error) {

		res.status(500).json({
			message: "Ocurrió un error interno en el servidor",
			error: error.message
		});

	}
});

export default router;