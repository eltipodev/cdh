import ProductManager from "./ProductManager.js";
import fs from "fs";

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

	// Metodo getProducts verifica la existencia del archivo de productos, lo lee, lo convierte en un objeto JavaScript y luego decide si debe devolver todos los productos o una porción de ellos según el límite especificado en queryObj.

	// Argumento queryObj, que contiene la propiedad limit
	// ====================================================

	async getCart() {

		// // Destructuramos el objeto queryObj y extraemos limit
		// const { limit } = queryObj;

		try {

			// Verificamos si el archivo existe en la ruta (this.path)
			const fileCartExists = fs.existsSync(this.path);

			// Si no existe el archivo creamos carrito.json
			if (!fileCartExists) {
				fs.writeFile("./json/carts.json", "[]", function (err) {
					if (err) throw err;
					console.log("Saved!");
				});
			}

			// Convertimos  el archivo a objeto JavaScript

			const fileCartParse = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

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
					return {
						message: "Carrito encontrado",
						cart: [cartFoundById]
					};
				} else {
					// Indicamos que no se encontró el carrito con el ID proporcionado
					return {
						message: `El ID ${cid} no existe`,
						cart: null
					};
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
				const productManager = new ProductManager("./json/products.json");

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

}

export default CartManager;

