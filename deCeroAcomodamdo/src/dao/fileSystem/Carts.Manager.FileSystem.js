import __dirname from "../../__dirname.utils.js";
// import fs from "fs";
import productManager from "./Product.Manager.FileSystem.js";

class CartsManager {
	constructor(path) {
		this.path = path;
	}

	/////////////////////////////////////////////////////////////////
	/// Método crear carrito                                     ///
	///////////////////////////////////////////////////////////////

	async createCart() {
		try {
			const path = this.path;
			const dataFileCartExists = await productManager.fileExists(path);
			const cartNew = {
				products: []
			};

			cartNew.id = !dataFileCartExists.length
				? 1
				: Math.max(...dataFileCartExists.map(cart => cart.id)) + 1;
			dataFileCartExists.push(cartNew);

			await productManager.saveProductsToFile(dataFileCartExists, path);

			return ({
				method: "createCart",
				messageMethod: `Carrito ID ${cartNew.id} creado`,
				descriptionMethod: "Creando carrito ",
				success: true
			});

		} catch (error) {
			return { error: error.message };
		}
	}

	///////////////////////////////////////////////////////////
	/// Método lee carts sin traer los productos completos ///
	/////////////////////////////////////////////////////////
	async getAllCartsWithProductIds() {

		try {

			const path = this.path;
			const dataFileExists = await productManager.fileExists(path);

			// Convertimos  el archivo a objeto JavaScript

			return ({
				method: "getAllCarts",
				messageMethod: "Mostrando Carritos",
				descriptionMethod: "Mostrando Todos los Carritos Solo ID de productos",
				value: dataFileExists,
				success: true
			});

		} catch (error) {

			return {
				error: error.message
			};

		}

	}

	//////////////////////////////////////////////////////////////////
	/// Método busca todos los carrito con productos completos    ///
	////////////////////////////////////////////////////////////////
	async getAllCarts() {
		try {

			const path = this.path;
			const dataFileExists = await productManager.fileExists(path);
			let cartsNews = [];

			// Obtenemos los IDs de los productos en los carros en un array
			const productIdsInCarts = dataFileExists
				.map(cart => cart.id)
				.flat();

			for (const productId of productIdsInCarts) {
				const cartProduct = await cartsManager.findCartProductById(productId);

				if (cartProduct.success !== true) {
					const cartsNoProducts = {
						id: productId,
						products: [
							{
								quantity: 0,
								thumbnails: "/img/empty.png"
							}
						]
					};
					cartsNews.push(cartsNoProducts);
				} else {
					// cartProduct.value[0].quantity = quantity;
					cartsNews.push(cartProduct.value[0]);
				}

			}

			return ({
				method: "getAllCarts",
				messageMethod: "Mostrando Carritos",
				descriptionMethod: "Mostrando Todos los Carritos con datos Productos completos",
				value: cartsNews,
				success: true
			});

		} catch (error) {
			return { error: error.message };
		}
	}

	/////////////////////////////////////////////////////////////////
	/// Método para buscar el producto en el carrito por Id      ///
	///////////////////////////////////////////////////////////////
	async findCartProductById(cid) {

		const cartsById = await this.getCartById(cid);

		if (!cartsById.success) {
			return cartsById;
		}

		let cartsRenderPage = [];

		cartsRenderPage.push(cartsById.value);
		try {

			// Obtenemos los IDs de los productos en los carros en un array
			const productIdsInCarts = cartsRenderPage
				.map(cart => cart.products.map(product => product.id))
				.flat();

			if (!productIdsInCarts.length) {

				return ({
					method: "findCartProductById",
					messageMethod: `Carrito ID ${cid} encontrado pero sin productos`,
					descriptionMethod: "Buscando carrito por ID",
					value: productIdsInCarts,
					success: false
				});
			}

			// Filtrar los IDs para obtener valores únicos
			const uniqueProductIds = productIdsInCarts
				.filter((productId, index, array) => array.indexOf(productId) === index);

			// Con los ID obtenemos los productos completos, por sus IDs

			const productsByIds = await Promise.all(
				uniqueProductIds.map(async (productId) => {
					const product = await productManager.getProductById(productId);
					const quantity = cartsById.value.products.find((p) => p.id === productId).quantity;
					product.value.quantity = quantity;
					return product.value;
				})
			);

			// Crear un nuevo arreglo de carros con productos filtrados
			const cartsWithFilteredProducts = cartsRenderPage.map(cart => {
				const filteredProducts = cart.products.map(product => {
					const matchingProducts = productsByIds.filter(p => +p.id === +product.id);
					// En lugar de devolver matchingProducts, devolvemos el primer elemento del arreglo si existe
					return matchingProducts.length > 0 ? matchingProducts[0] : null;
				});

				return {
					id: cart.id,
					products: filteredProducts
				};
			});

			return ({
				method: "getCartById",
				messageMethod: "Carrito encontrado",
				descriptionMethod: "Buscando carrito por ID",
				value: cartsWithFilteredProducts,
				success: true
			});

		} catch (error) {
			return { error: error.message };
		}
	}

	////////////////////////////////////////////////
	/// Método para buscar  carrito por Id      ///
	//////////////////////////////////////////////

	async getCartById(cid) {
		try {

			const cartId = +cid;
			// const path = this.path;
			// const dataFileExists = await productManager.fileExists(path);
			if (isNaN(cartId) || cartId < 0) {
				return ({
					method: "getCartById",
					messageMethod: `El id ${cid} no es un número válido o es menor a cero`,
					descriptionMethod: "Buscando Carrito por ID",
					success: false
				});
			}

			const path = this.path;
			const dataFileExists = await productManager.fileExists(path);
			const findCardById = dataFileExists.find(p => p.id === cartId);

			return findCardById
				? ({
					method: "getCartById",
					messageMethod: `Carrito Encontrado con el  ${cid}`,
					descriptionMethod: "Buscando Carrito por ID",
					value: findCardById,
					success: true
				})
				: ({
					method: "getCartById",
					messageMethod: `No se encontro un carrito con el ${cid} `,
					descriptionMethod: "Buscando Carrito por ID",
					success: false
				});

		} catch (error) {
			return { error: error.message };
		}
	}

	///////////////////////////////////////////////////////
	/// Método para guardar en un carrito un producto ////
	/////////////////////////////////////////////////////

	// getCartById toma dos  ID como parámetros, verifica si cid y pid son  números válidos y busca un carrito con ese ID y un producto con ese id.Luego, agrega el producto seleccionado al carrito//

	//  Argumento
	//  cid,pid
	//  ====================================================

	async addProductToCartById(cid, pid) {

		const cartIdNumber = +cid;
		const productIdNumber = +pid;

		try {

			if (!isNaN(productIdNumber) && !isNaN(cartIdNumber) && (productIdNumber && cartIdNumber) > 0) {

				// Creamos una nueva instancia de la clase ProductManager
				// const productManager = new ProductManager("./src/json/productos.json");

				// // Obtenemos nuestro carrito completo

				const getAllcarts = await this.getAllCartsWithProductIds();
				const data = [
					{ variable: "getAllcarts", resultado: getAllcarts },
				];
				console.table(data, ["variable", "resultado"]);
				// Obtener el carrito a actualizar por su ID
				const cartToUpdate = await this.getCartById(cid);
				//  Obtener el producto por su ID
				const productsById = await productManager.getProductById(pid);

				// Verificamos si exiten cartMessage productsId
				if ((!cartToUpdate.error || !productsById.error) === null) {
					return ({
						method: "addProductToCartById",
						messageMethod: `Producto  ${pid} o Carrito ${cid} incorrecto`,
						descriptionMethod: "Agregando Producto al carrito",
						value: getAllcarts.value,
						success: false
					});
				}

				// Extraemos del mensaje el carrito
				const cartMessage = cartToUpdate.value;
				// Extraemos solo el ID del mensaje
				const productsId = productsById.value.id;

				// Utiliza el método findIndex para buscar el índice del carrito que tiene el mismo ID que cartIdNumber.
				// Si lo encuentra devuelve el índice de ese carro.Si no se encuentra un carrito con ese ID, se devuelve  -1.
				const cartIndex = getAllcarts.value.findIndex(p => p.id === cartIdNumber);
				// indice si el producto ya está en el carrito
				const existingProductIndex = cartMessage.products.findIndex((product) => product.id === productIdNumber);

				if (existingProductIndex !== -1) {
					let addQuantity = getAllcarts.value[cartIndex].products[existingProductIndex].quantity;

					addQuantity++;

					getAllcarts.value[cartIndex].products[existingProductIndex].quantity = addQuantity;
				}
				else {
					// getAllcarts.value[cartIndex].products.push();
					getAllcarts.value[cartIndex] = {
						...getAllcarts.value[cartIndex],
						products: [{ "id": productsId, "quantity": "1" }]
					};
				}

				// método saveProductsToFile para guardar la lista de productos actualizada en el archivo.
				await productManager.saveProductsToFile(getAllcarts.value, this.path);
				//TODO: revisar el retorno
				return ({
					method: "addProductToCartById",
					messageMethod: `Producto  ${pid} agregado al Carrito ${cid}`,
					descriptionMethod: "Agregando Producto al carrito",
					value: getAllcarts.value,
					success: true
				})
					;
			}
		} catch (error) {

			return {
				error: error.message
			};
		}

	}

}

const cartsManager = new CartsManager(__dirname + "/db/json/carts.json");
export default cartsManager;