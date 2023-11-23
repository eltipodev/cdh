import fs from "fs";

//////////////////////////////////////////////
/// Definición de la clase ProductManager ///
////////////////////////////////////////////

// Argumento
// path ruta o ubicación de un archivo.

class ProductManager {
	constructor(path) {
		this.path = path;
	}

	////////////////////////////////////////////////
	/// Método para agregar producto            ///
	//////////////////////////////////////////////

	async addProduct(body) {

		const {
			title,
			description,
			code,
			price,
			stock,
			category,

		} = body;

		// Verificamos que se proporcionen todas las propiedades
		if (
			!title ||
			!description ||
			!code ||
			typeof Number(price) !== "number" ||
			typeof Number(stock) !== "number" ||
			!category
		) {

			return "Faltan propiedades obligatorias o tienen tipos incorrectos";
		}

		try {
			// Llamamos al método getProducts para leer nuestro archivo de productos
			const products = await this.getProducts();

			// Genera un ID autoincrementable
			body.id = !products.length
				? 1
				: Math.max(...products.map(product => product.id)) + 1;

			// Fijamos el valor de
			body.status = true;
			if (!body.thumbnails) { body.thumbnails = "/img/imagen_vacio.png"; }

			// Comprobamos si existe un producto con el mismo código
			const codeExists = products.some(p => p.code === body.code);

			// Verifica si ya existe un producto en la lista con el mismo código que el nuevo producto que se está intentando agregar.
			if (codeExists) { return "codigo ya existe"; }

			// Agregamos nuestro productos a product
			products.push(body);

			// método saveProductsToFile para guardar la lista de productos actualizada en el archivo.

			await this.saveProductsToFile(products);

			return body;

		} catch (error) {

			return {
				error: error.message
			};

		}
	}

	////////////////////////////////////////////////
	/// Método para leer el archivo de productos ///
	///////////////////////////////////////////////

	// Metodo getProducts verifica la existencia del archivo de productos, lo lee, lo convierte en un objeto JavaScript y luego decide si debe devolver todos los productos o una porción de ellos según el límite especificado en queryObj.

	// Argumento queryObj, que contiene la propiedad limit
	// ====================================================
	async getProducts(queryObj = "") {

		// Destructuramos el objeto queryObj y extraemos limit
		const { limit } = queryObj;

		try {

			// Verificamos si el archivo existe en la ruta (this.path)
			const fileProductExists = fs.existsSync(this.path);

			//  Verificamos si fileProductExists existe
			if (fileProductExists) {

				// fileProductExists lo convertimos un objeto JavaScript
				const fileProductParse = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

				// Si limit tiene un valor devuelve el numero de productos solicitados
				// Si no tiene ningun valor o el valor es incorrecto devuelve todos los productos
				return limit
					? fileProductParse.slice(0, +limit)
					: fileProductParse;

			}
			// Si no hay productos se devuelve una lista vacia
			return [];
		} catch (error) {

			return {
				error: error.message
			};

		}

	}

	//////////////////////////////////////////////////
	/// Método para obtener un producto por su ID ///
	////////////////////////////////////////////////

	// getProductById toma un ID como parámetro, verifica si es un número válido y busca un producto con ese ID en la lista de productos. Luego, devuelve información sobre el producto encontrado o un mensaje de error, según corresponda.//

	// Argumento
	// paramsObj, que contiene la propiedad pid
	// ====================================================
	async getProductById(pid) {

		// Verificamos si pid tiene un valor.
		// Si no es null, undefined o una cadena vacía,
		// se ejecuta el codigo
		if (pid) {
			// Convertimos pid a numero con el operador +.
			const productIdNumber = +pid;

			// Verificamos si productIdNumber es un número  y mayor que cero.
			if (!isNaN(productIdNumber) && productIdNumber > 0) {

				// Llamamos al método getProducts para leer nuestro archivo de productos
				const products = await this.getProducts();

				// Busca un producto cuyo ID coincida con productIdNumber
				const productFoundById = products.find(product => product.id === productIdNumber);

				// Verificamos Si encuentra un producto con el ID proporcionado
				if (productFoundById) {

					// Devuelve el producto encontrado
					return productFoundById;

				} else {

					// Indica que no se encontro el producto con el ID proporcionado
					return null;

				}
			}
		}

		// Si pid resulta ser null, undefined o una cadena vacía,
		// se indica un error y el valor del parametro pid
		return null;
	}

	///////////////////////////////////////////////////////
	/// Método para actualizar el archivo de productos ///
	/////////////////////////////////////////////////////

	// Metodo updateProduct busca un producto por su ID en la lista de productos, lo actualiza con los datos proporcionados y luego guarda la lista de productos actualizada en el archivo. Si el ID no existe, se devuelve null.

	// Argumento
	// productId capturamos el Id del producto a actualizar
	// updatedProductData los datos de los productos a actualizar
	// ==========================================================
	async updateProduct(pid, updatedProductData) {

		try {

			// Llamamos al método getProducts para leer nuestro archivo de productos
			const products = await this.getProducts();

			// Utiliza el método findIndex para buscar el índice del producto que tiene el mismo ID que productId.
			// Si lo encuentra devuelve el índice de ese producto.Si no se encuentra un producto con ese ID, se devuelve  -1.
			const productIndex = await products.findIndex(p => p.id === pid);

			// Verifica si productIndex es igual a -1,si es true, se muestra un mensaje de error  y se devuelve null para indicar
			if (productIndex === -1) { return null; }

			// Si se encuentra un producto con el ID se realiza una operación de propagación (...) para combinar las propiedades existentes del producto con los datos actualizados proporcionados en updatedProductData. Esto permite actualizar solo las propiedades especificadas en updatedProductData sin afectar las demás propiedades.
			products[productIndex] = {
				...products[productIndex],
				...updatedProductData
			};

			// método saveProductsToFile para guardar la lista de productos actualizada en el archivo.
			await this.saveProductsToFile(products);

			// Se devuelve un objeto que contiene un mensaje  y la lista de productos actualizada.

			return products;

			// Si ocurre algún error  se captura en el bloque catch y se devuelve un objeto de error que contiene el mensaje de error.
		} catch (error) {

			return {
				error: error.message
			};

		}
	}

	///////////////////////////////////////
	/// Método para borrar un producto ///
	/////////////////////////////////////

	// Método deleteProduct busca un producto por su ID en la lista de productos, lo elimina, guarda la lista actualizada en el archivo y lo muestra.

	// Argumento productId
	// productId capturamos el Id del producto a eliminar
	// ==================================================
	async deleteProduct(productId) {

		try {

			// Llamamos al método getProducts para leer nuestro archivo de productos
			const products = await this.getProducts();

			// Método some para verificar si existe al menos un producto en la lista products con el mismo ID que productId
			const idExists = products.some(p => p.id === productId);

			// Verifica si el ID existe
			if (!idExists) {

				return null;

			}

			// Si se encontró un producto con el ID proporcionado, se procede a eliminarlo.
			// Se usa el método filter para crear un nuevo arreglo que contiene todos los productos excepto el que tiene el ID igual a productId.
			const filteredProducts = products.filter(p => p.id !== productId);

			// Metodo saveProductsToFile para guardar la lista de productos actualizada (sin el producto eliminado)
			await this.saveProductsToFile(filteredProducts);

			// Se devuelve un objeto que contiene un mensaje  y el ID del oroducto actualizado

			return idExists;

		} catch (error) {

			return {

				error: error.message

			};
		}
	}

	////////////////////////////////////////////////////////
	/// Método para guardar los productos en el archivo ///
	//////////////////////////////////////////////////////

	// Mtodo se encarga de escribir la lista de productos en el archivo.

	// Argumento
	// products recibe los productos
	// ==============================
	async saveProductsToFile(products) {

		try {

			// lo convertimos y guardamos a formato JSON
			await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
			console.log("Archivo guardado correctamente");

		} catch (error) {

			return {

				error: error.message

			};

		}
	}
}

// Crear una instancia de la clase ProductManager con la ruta al archivo de productos
const productManager = new ProductManager("./src/json/productos.json");

export default productManager;
