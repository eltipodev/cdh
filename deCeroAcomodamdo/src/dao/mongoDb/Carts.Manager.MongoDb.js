
import { cartModel } from "../models/carts.model.js";

class CartManagerMongoDb {
	constructor() {
	}

	///////////////////////////////////////////////////////////
	/// Método crear un carrito                            ///
	/////////////////////////////////////////////////////////
	async createCart() {
		try {
			const cartNew = {
				products: []
			};

			// eslint-disable-next-line no-unused-vars
			const createCart = await cartModel.create(cartNew);

			return ({
				method: "createCart",
				messageMethod: "Carrito ID  creado",
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

			const getAllCartsWithProductIds = await cartModel.find().lean();
			return ({
				method: "getAllCarts",
				messageMethod: "Mostrando Carritos",
				descriptionMethod: "Mostrando Todos los Carritos Solo ID de productos",
				value: getAllCartsWithProductIds,
				success: true
			});

		} catch (error) {

			return {
				error: error.message
			};

		}

	}

	///////////////////////////////////////////////////////////
	/// Método listar carrito por ID                     ///
	///////////////////////////////////////////////////////
	async getCartsById(cid) {
		try {
			const getCartsById = await cartModel.findById(cid).lean();
			console.log("==> getCartsById", getCartsById);
			return getCartsById;
		} catch (error) {
			return {
				error: error.message
			};

		}

	}

	/////////////////////////////////////////////////////////
	/// Métodor Agregar producto al carrito              ///
	///////////////////////////////////////////////////////
	async addProductToCartById(cid, pid = "") {

		try {

			const productId = pid;
			// Busca el carrito por su ID
			const cart = await cartModel.findById(cid);

			// Busca el índice del producto en el array de productos
			const productIndex = cart.products.findIndex(product => product.id.toString() === productId.toString());

			if (productIndex !== -1) {

				// Si el producto existe, incrementa la cantidad
				cart.products[productIndex].quantity += 1;

				console.log("==> productIndex", cart.products[productIndex].quantity);

			} else {

				cart.products.push({ id: productId, quantity: 1 });
			}

			// Guarda los cambios en el carrito
			await cart.save();

			return ({
				method: "addProductToCartById",
				messageMethod: "Agregamos un producto al carrito ",
				descriptionMethod: "Agrega un producto al carro por ID de producto y carro",
				value: "ok",
				success: true
			});
		} catch (error) {

			return {
				error: error.message
			};
		}

	}

}
const cartsManager = new CartManagerMongoDb();
export default cartsManager;

