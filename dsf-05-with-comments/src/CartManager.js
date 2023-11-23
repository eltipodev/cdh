import fs from "fs";
import productManager from "./ProductManager.js";

class CartManager {

	constructor(path) {
		this.path = path;
	}

	////////////////////////////////////////////////
	/// Método para agregar producto            ///
	//////////////////////////////////////////////

	async createCart() {
		try {

			// Leemos nuestro archivo de carritos
			const carts = await this.getCart();

			const cart = {
				products: []
			};

			cart.id = !carts.length
				? 1
				: Math.max(...carts.map(cart => cart.id)) + 1;

			carts.push(cart);

			// método saveCartToFile para guardar la lista de carritos  actualizada en el archivo.
			await this.saveCartsToFile(carts);

			return {
				message: `Carrito ${cart.id} creado`
			};

		} catch (error) {

			return {
				error: error.message
			};

		}
	}

	////////////////////////////////////////////////
	/// Método para leer el archivo de carts    ///
	//////////////////////////////////////////////

	// Metodo getCart verifica la existencia del archivo de carts, lo lee, lo convierte en un objeto JavaScript

	// Argumento ()
	// ====================================================

	async getCart() {

		try {

			// Verificamos si el archivo existe en la ruta (this.path)
			const fileCartExists = fs.existsSync(this.path);

			// Si no existe el archivo creamos carrito.json
			if (!fileCartExists) {
				fs.writeFile("./src/carrito.json", "[]", function (err) {
					if (err) throw err;
					console.log("Saved!");
				});
			}

			// Convertimos  el archivo a objeto JavaScript

			const fileCartParse = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

			//TODO: Solo para pruebas

			return fileCartParse;

		} catch (error) {

			return {
				error: error.message
			};

		}

	}

	/////////////////////////////////////////////////
	/// Método para obtener un carro por su ID   ///
	///////////////////////////////////////////////

	// getCartById toma un ID como parámetro, verifica si es un número válido y busca un carrito con ese ID en la lista de carros. Luego, agrega el producto seleccionado al carrito//

	//  Argumento
	//  paramsObj, que contiene la propiedad cid
	//  ====================================================
	async getCartById(cid) {

		try {

			// Convertimos cpid a número con el operador +.
			const cartIdNumber = +cid;

			// Verificamos si cartIdNumber tiene un valor.
			// Si no es null, undefined o una cadena vacía,
			// se ejecuta el código
			if (!isNaN(cartIdNumber) && cartIdNumber > 0) {
				// Llamamos al método getCart para leer nuestro archivo de carritos
				const carts = await this.getCart();

				// Buscamos un carrito cuyo ID coincida con cartIdNumber
				const cartFoundById = carts.find(c => c.id === cartIdNumber);

				// Verificamos si encontramos un carrito con el ID proporcionado
				if (cartFoundById) {
					return cartFoundById;

				} else {
					// Indicamos que no se encontró el carrito con el ID proporcionado
					return null;

				}
			}
		} catch (error) {
			return {
				error: error.message
			};
		}

		return {
			error: `El valor del parámetro 'cpid' ${cid} no es válido.`
		};
	}

	////////////////////////////////////////////////////////
	/// Método para guardar carritos en el archivo
	//////////////////////////////////////////////////////

	// Argumento
	// carts recibe el carrito
	// ==============================

	async saveCartsToFile(carts) {

		try {

			// lo convertimos y guardamos a formato JSON
			return fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));

		} catch (error) {

			return {

				error: error.message

			};

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

		// Convertimos cpid y pid a número con el operador +.

		const cartIdNumber = +cid;
		const productIdNumber = +pid;

		try {

			// Verifica que cid y pid sean números válidos
			if (!isNaN(productIdNumber) && !isNaN(cartIdNumber) && (productIdNumber && cartIdNumber) > 0) {

				// Creamos una nueva instancia de la clase ProductManager
				// const productManager = new ProductManager("./src/json/productos.json");

				// Obtenemos nuestro carrito completo
				const getAllcart = await this.getCart();

				// Obtener el carrito a actualizar por su ID
				const cartToUpdate = await this.getCartById(cid);
				//  Obtener el producto por su ID
				const productsById = await productManager.getProductById(pid);

				// Verificamos si exiten cartMessage productsId
				if ((!cartToUpdate.error || !productsById.error) === null) {
					return {
						message: "Una de los codigos es incorrecto",
						error: null
					};
				}

				// Extraemos del mensaje el carrito
				const cartMessage = cartToUpdate.cart;
				// Extraemos solo el ID del mensaje
				const productsId = productsById.product.id;

				// Utiliza el método findIndex para buscar el índice del carrito que tiene el mismo ID que cartIdNumber.
				// Si lo encuentra devuelve el índice de ese carro.Si no se encuentra un carrito con ese ID, se devuelve  -1.
				const cartIndex = getAllcart.findIndex(p => p.id === cartIdNumber);
				// indice si el producto ya está en el carrito
				const existingProductIndex = cartMessage[0].products.findIndex((product) => product.id === productIdNumber);

				if (existingProductIndex !== -1) {
					let addQuantity = getAllcart[cartIndex].products[existingProductIndex].quantity;

					addQuantity++;

					getAllcart[cartIndex].products[existingProductIndex].quantity = addQuantity;
				}

				else {
					getAllcart[cartIndex].products.push();

					getAllcart[cartIndex] = {
						...getAllcart[cartIndex],
						products: [{ "id": productsId, "quantity": "1" }]
					};

				}

				// método saveProductsToFile para guardar la lista de productos actualizada en el archivo.
				await this.saveCartsToFile(getAllcart);
				//TODO: revisar el retorno
				return {
					message: "ok"
				};

			}
		} catch (error) {

			return {
				error: error.message
			};
		}

	}

	///////////////////////////////////////////////////////
	/// Método para obtener los productos del carrito  ///
	/////////////////////////////////////////////////////

	//TODO: Metodo updateProduct busca un producto por su ID en la lista de productos, lo actualiza con los datos proporcionados y luego guarda la lista de productos actualizada en el archivo. Si el ID no existe, se devuelve null.

	// TODO: Argumento
	// productId capturamos el Id del producto a actualizar
	// updatedProductData los datos de los productos a actualizar
	// ==========================================================
	async renderCarts(cid) {

		let carts = [];

		// Traemos el carrito por id
		const cartsById = await this.getCartById(cid);
		if (!cartsById) {
			return null;
		}

		carts.push(cartsById);

		try {
			// Obtener los IDs de los productos en los carros
			const productIdsInCarts = carts
				.map(cart => cart.products.map(product => product.id))
				.flat();

			// Filtrar los IDs para obtener valores únicos
			const uniqueProductIds = productIdsInCarts
				.filter((productId, index, array) => array.indexOf(productId) === index);

			// Obtener los productos por sus IDs
			const productsByIds = await Promise.all(
				uniqueProductIds.map(async (productId) => {
					const product = await productManager.getProductById(productId);
					return product;
				})
			);

			// Crear un nuevo arreglo de carros con productos filtrados
			const cartsWithFilteredProducts = carts.map(cart => {
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

			// cartsWithFilteredProducts.map(p => {
			// 	console.log(p.id);
			// });

			// console.log("--------> aca", cartsWithFilteredProducts[0].products[0][0].title);

			return cartsWithFilteredProducts;

		} catch (error) {
			return {
				error: error.message
			};
		}
	}
}

// Crear una instancia de la clase CartManager con la ruta al archivo de productos
const cartManager = new CartManager("./src/json/carrito.json");

export default cartManager;

