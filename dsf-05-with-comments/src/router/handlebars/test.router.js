
import { Router } from "express";
import productManager from "../../ProductManager.js";
import socketServer from "../../app.js";

const router = Router();

//////////////////////////////////////////////
///  Enrutador productos                  ///
////////////////////////////////////////////

///  Ruta /api                            ///
////////////////////////////////////////////

router.get("/up", (req, res) => {
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

///  Ruta /                 ///
////////////////////////////////////////////

// router.get("", async (req, res) => {
// 	try {
// 		const allProducts = await productManager.getProducts(req.query);
// 		if (!allProducts.length) {
// 			// NOTE: No olvidar retornar el mensaje sino queda enganchada la repuesta
// 			return res.status(200).json({
// 				message: "No se encontraron los productos ",
// 				allProducts
// 			});
// 		}
// 		// NOTE: No olvidar retornar el mensaje sino queda enganchada la repuesta
// 		return res.status(200).json({
// 			message: "Productos encontrados",
// 			allProducts
// 		});
// 	}
// 	catch (error) {
// 		res.status(500).json({
// 			message: "😪 Ocurrió un error interno en el servidor.",
// 			error: error.message
// 		});

// 	}
// }
// );

// ///  Ruta /:pid             ///
// ////////////////////////////////////////////

// router.get("/:pid", async (req, res) => {
// 	// Destructuramos el objeto queryObj y extraemos pid
// 	const { pid } = req.params;
// 	try {
// 		const productById = await productManager.getProductById(pid);

// 		!productById
// 			? res.status(404).json({ message: `Producto con el ID ${pid} no se encuentra` })
// 			: res.status(200).json({ message: "Productos encontrado ", productById });

// 	} catch (error) {

// 		res.status(500).json({
// 			message: "😪 Ocurrió un error interno en el servidor.",
// 			error: error.message
// 		});
// 	}

// });

/// POST agregar productos                ///
////////////////////////////////////////////

router.post("", async (req, res) => {

	console.log(req.body);
	// Desestructura los datos enviados en el cuerpo de la solicitud
	const {
		title,
		description,
		code,
		price,
		stock,
		category,

	} = req.body;

	//TODO: Revisar esto y ver si se puede aplicar
	// // Verifica si todos los valores del objeto product son diferentes de undefined y de una cadena vacía "". Si todos los campos están completos, se procede a agregar el producto a la lista de productos existente y se guarda en el archivo
	// Object.values(product).every(value => value !== undefined && value !== "")

	// Verificamos que se proporcionen todas las propiedades
	if (
		!title ||
		!description ||
		!code ||
		typeof price !== "number" ||
		typeof stock !== "number" ||
		!category
	) {
		socketServer.emit("message-server-error", "Faltan propiedades o tipos incorrectos");
		return res.status(400).json({
			message: "Faltan propiedades obligatorias o tienen tipos incorrectos"
		});
	}

	try {
		// Llama al método 'addProduct' para agregar un nuevo producto
		const newProduct = await productManager.addProduct(req.body);

		if (newProduct === null) {
			socketServer.emit("message-server-error", "Hubo un error");

			return res.status(400).json({
				message: `El Producto con el ${code} ya existe`,
			});
		} else { socketServer.emit("message-server-ok", "Producto se agregado correctamente"); }

		res.status(200).json({
			message: "Producto agregado correctamente", newProduct
		});

	} catch (error) {
		// Si ocurre un error durante el proceso, envía una respuesta de error
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor",
			error: error.message
		});
	}
});

// /// POST actualizarr productos            ///
// ////////////////////////////////////////////

// router.put("/:pid", async (req, res) => {

// 	const { pid } = req.params;
// 	try {
// 		const productUdpate = await productManager.updateProduct(+pid, req.body);

// 		if (productUdpate.error === null) {
// 			return res.status(200).json({ message: `El id  ${pid} no existe.`, });
// 		}

// 		return res.status(200).json({
// 			message: `Producto actualizado correctamente ${req.body.title}`
// 		});

// 	} catch (error) {
// 		res.status(500).json({
// 			message: "Ocurrió un error interno en el servidor",
// 			error: error.message
// 		});

// 	}
// });

/// DELETE eliminar producto              ///
////////////////////////////////////////////

router.delete("/:pid", async (req, res) => {

	const { pid } = req.params;
	try {
		const productDelete = await productManager.deleteProduct(+pid);

		!productDelete
			? res.status(404).json({ message: `Producto con el ID ${pid} no se encuentra` })
			: res.status(200).json({ message: `Productos Eliminado con ID: ${pid}` });

	} catch (error) {

		res.status(500).json({
			message: "Ocurrió un error interno en el servidor",
			error: error.message
		});

	}
});

export default router;