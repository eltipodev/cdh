import __dirname from "../../__dirname.utils.js";
import fs from "fs";
class ProductManager {
	constructor(path) {
		this.path = path;
	}

	/** //TODO:
	/* [] Implementar modal en respuestas de return "Faltan propiedades..." etc"
	*/

	////////////////////////////////////////////////////
	/// Método para comprobar si existe el archivo ////
	//////////////////////////////////////////////////
	async fileExists(path = this.path) {
		try {

			const dataFileExists = fs.existsSync(path);
			if (!dataFileExists) { fs.writeFileSync(path, "[]"); return []; }
			const dataFile = fs.readFileSync(path, "utf-8");
			return JSON.parse(dataFile);
		} catch (error) {
			return { error: error.message };
		}
	}

	////////////////////////////////////////////////////
	/// Método para si existe el archivo           ////
	//////////////////////////////////////////////////
	async saveProductsToFile(products, path = this.path) {
		try {
			// lo convertimos y guardamos a formato JSON
			await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
			return;
		} catch (error) {
			return {
				error: error.message
			};
		}

	}

	////////////////////////////////////////////////////
	/// Método para comprobar si codigo existe     ////
	//////////////////////////////////////////////////
	async checkCodeExists(code) {

		try {
			const { value: dataProducts } = await this.getAllProducts();

			const checkCode = await dataProducts.some(p => p.code === code);

			return checkCode;
		} catch (error) {
			return { error: error.message };
		}

	}

	////////////////////////////////////////////////
	/// Método para mostrar producto y limitar  ///
	//////////////////////////////////////////////
	async getAllProducts(queryObj = "") {
		const { limit } = queryObj;
		try {
			const dataProducts = await this.fileExists();
			// Si limit tiene un valor devuelve el numero de productos solicitados
			// Si no tiene ningun valor o el valor es incorrecto devuelve todos los productos

			return limit
				? ({
					method: "getAllProducts",
					messageMethod: "Listado de Productos",
					descriptionMethod: "Lista todos los productos",
					value: dataProducts.slice(0, +limit),
					success: true
				})
				: ({
					method: "getAllProducts",
					messageMethod: "Listado de Productos",
					descriptionMethod: "Lista todos los productos",
					value: dataProducts,
					success: true
				});

		} catch (error) {
			return { error: error.message };
		}
	}
	////////////////////////////////////////////////
	/// Método para buscar  producto por Id     ///
	//////////////////////////////////////////////
	async getProductById(pid) {
		const productId = +pid;
		try {
			if (isNaN(pid) || pid < 0) {
				return ({
					method: "getProductById",
					messageMethod: `El id ${pid} no es un número válido o es menor a cero`,
					descriptionMethod: "Buscando producto por ID",
					success: false
				});
			}

			const dataProducts = await this.fileExists();
			const findProductById = dataProducts.find(p => p.id === productId);

			return findProductById
				? ({
					method: "getProductById",
					messageMethod: `Producto con el id ${productId}`,
					descriptionMethod: "Buscando producto por ID",
					value: findProductById,
					success: true
				})
				: ({
					method: "getProductById",
					messageMethod: "El id del producto no existe",
					descriptionMethod: "Buscando producto por ID",
					success: false
				});

		} catch (error) {
			return { error: error.message };
		}
	}

	////////////////////////////////////////////////
	/// Método para agregar producto            ///
	//////////////////////////////////////////////
	async addProduct(body) {

		try {
			const {
				title,
				description,
				code,
				price,
				stock,
				category
			} = body;

			if (!title || !description || !code || typeof Number(price) !== "number" || typeof Number(stock) !== "number" || !category) {

				return ({
					method: "addProduct",
					messageMethod: "Faltan propiedades obligatorias o tienen tipos incorrectos",
					descriptionMethod: "Agregando productos",
					success: false
				});
			}

			const checkCodeExists = await this.checkCodeExists(code);
			if (checkCodeExists) {

				return ({
					method: "addProduct",
					messageMethod: `El id ${code}del producto ya existe`,
					descriptionMethod: "Agregando productos",
					success: false
				});
			}

			const { value: getAllProducts } = await this.getAllProducts();

			// Genera un ID autoincrementable
			body.id = !getAllProducts.length
				? 1
				: Math.max(...getAllProducts.map(product => product.id)) + 1;

			body.status = true;
			if (!body.thumbnails) { body.thumbnails = "/img/imagen_vacio.png"; }

			getAllProducts.push(body);

			await this.saveProductsToFile(getAllProducts);

			return ({
				method: "addProduct",
				messageMethod: `El Producto agregado con el ID ${code}`,
				descriptionMethod: "Agregando productos",
				success: true
			});
		} catch (error) {
			return { error: error.message };
		}
	}

	////////////////////////////////////////////////
	/// Método para Eliminar producto           ///
	//////////////////////////////////////////////
	async deleteProductById(pid) {
		const productId = +pid;

		if (!isNaN(productId) && !productId > 0) {
			return ({
				method: "deleteProductById",
				messageMethod: `El id ${pid} no es un número válido o es menor a cero`,
				descriptionMethod: "Eliminando Producto",
				success: false
			});
		}
		try {
			const { value: getAllProducts } = await this.getAllProducts();

			const checkIDExists = getAllProducts.some(p => p.id === productId);

			if (!checkIDExists) {
				return ({
					method: "deleteProductById",
					messageMethod: `El codigo con el id ${pid} no existe`,
					descriptionMethod: "Eliminando Producto",
					success: false
				});
			}

			const filterProducts = getAllProducts.filter(p => p.id !== productId);

			await this.saveProductsToFile(filterProducts);

			return ({
				method: "deleteProductById",
				messageMethod: `Se elimino el producto con el id ${productId}`,
				descriptionMethod: "Eliminando Producto",
				success: true
			});

		} catch (error) {
			return { error: error.message };
		}
	}

	////////////////////////////////////////////////
	/// Método para Actualizar producto           ///
	/////////////////////////////////////////////
	async updateProduct(pid, updatedProductData) {
		// TODO: validacion de que es un numero
		try {
			// Llamamos al método getProducts para leer nuestro archivo de productos
			const { value: products } = await this.getAllProducts();

			// Utiliza el método findIndex para buscar el índice del producto que tiene el mismo ID que productId.
			// Si lo encuentra devuelve el índice de ese producto.Si no se encuentra un producto con ese ID, se devuelve  -1.
			const productIndex = await products.findIndex(p => p.id === pid);
			// Verifica si productIndex es igual a -1,si es true, se muestra un mensaje de error
			if (productIndex === -1) {
				return ({
					method: "updateProduct",
					messageMethod: `Producto con el id ${pid} no es encontro`,
					descriptionMethod: "Actualizar producto por ID",
					value: products,
					success: false
				});
			}

			// Si se encuentra un producto con el ID se realiza una operación de propagación (...) para combinar las propiedades existentes del producto con los datos actualizados proporcionados en updatedProductData. Esto permite actualizar solo las propiedades especificadas en updatedProductData sin afectar las demás propiedades.
			products[productIndex] = {
				...products[productIndex],
				...updatedProductData
			};

			// método saveProductsToFile para guardar la lista de productos actualizada en el archivo.
			await this.saveProductsToFile(products);

			// Se devuelve un objeto que contiene un mensaje  y la lista de productos actualizada.

			return ({
				method: "updateProduct",
				messageMethod: `Producto con el id ${pid} actualizado`,
				descriptionMethod: "Actualizar producto por ID",
				value: productIndex,
				success: true
			});

			// Si ocurre algún error  se captura en el bloque catch y se devuelve un objeto de error que contiene el mensaje de error.
		} catch (error) {

			return {
				error: error.message
			};

		}
	}

}

const productManager = new ProductManager(__dirname + "/db/json/products.json");

export default productManager;

