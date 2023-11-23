import { cartModel } from "./models/cart.model.js";
import { mongoose } from "mongoose";
import { productModel } from "./models/products.model.js";
class ProductsManager {
	constructor() {
	}

	// [x]
	////////////////////////////////////////////////////
	/// GET Método traer todos los carritos           ////
	//////////////////////////////////////////////////
	// eslint-disable-next-line no-unused-vars
	async getAllCarts() {
		const getAllCarts = await cartModel
			.find()
			.populate("products.product")
			.lean();

		if (!getAllCarts.length > 0) {

			return ({
				code: 404,
				status: "error",
				message: "no hay carritos",
				payload: [],
				sucess: false
			});

			// throw new Error("No hay productos");
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Carritos Encontrados",
			payload: getAllCarts,
			sucess: true
		});
	}

	// [x]
	////////////////////////////////////////////////////
	/// GET Método Listar carrito por ID           ////
	//////////////////////////////////////////////////
	// eslint-disable-next-line no-unused-vars
	async getCartsById(pid) {

		const getCartsById = await cartModel
			.findById(pid)
			.populate("products.product").lean();

		if (!getCartsById.products.length > 0) {

			return ({
				code: 404,
				status: "error",
				message: "no hay carrito",
				payload: [],
				sucess: false
			});
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Carrito Encontrado",
			payload: getCartsById,
			sucess: true
		});

	}

	//[x]
	////////////////////////////////////////////////
	/// Método para agregar Carrito             ///
	//////////////////////////////////////////////
	async createCart() {
		const cartNew = {
			products: []
		};

		// eslint-disable-next-line no-unused-vars
		const createCart = await cartModel.create(cartNew);

		return ({
			code: 200,
			status: "sucess",
			message: "Carritos Creado",
			payload: createCart
		});
	}

	// [x]
	/////////////////////////////////////////////////////////
	/// Métodor Agregar producto al carrito              ///
	///////////////////////////////////////////////////////
	async addProductToCartById(cid, pid) {
		const existsCart = await cartModel.findById(cid);
		if (!existsCart) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el Carrito",
				payload: existsCart
			});
		}

		const existsProduct = await productModel.findById(pid);
		if (!existsProduct) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el Producto",
				payload: existsCart
			});
		}

		const productIndex = existsCart.products.findIndex(product => product
			.product.toString() === pid.toString());

		if (productIndex !== -1) {
			await cartModel.updateOne({ _id: new mongoose.Types.ObjectId(cid), "products.product": new mongoose.Types.ObjectId(pid) }, { $inc: { "products.$.quantity": 1 } });
			existsCart.products[productIndex].quantity += 1;
		} else {

			existsCart.products.push({ product: pid });
		}

		await existsCart.save();

		return ({
			code: 200,
			status: "sucess",
			message: `Se agrego una ${existsProduct.title} al Carrito`,
			payload: existsCart
		});

	}

	// [x]
	/////////////////////////////////////////////////////////
	/// Métodor Elimimar un producto al carrito          ///
	///////////////////////////////////////////////////////
	async deleteProductToCartById(cid, pid) {

		const existsCart = await cartModel.findById(cid);
		if (!existsCart) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el Carrito",
				payload: existsCart
			});
		}

		const existsProduct = await productModel.findById(pid);
		if (!existsProduct) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el Producto",
				payload: existsCart
			});
		}

		const productIndex = existsCart.products.findIndex(product => product
			.product.toString() === pid.toString());

		if (productIndex !== -1) {
			await cartModel.updateOne({ _id: new mongoose.Types.ObjectId(cid), products: { $elemMatch: { product: new mongoose.Types.ObjectId(pid) } } }, { $pull: { products: { product: new mongoose.Types.ObjectId(pid) } } });

		} else {
			return ({
				code: 404,
				status: "error",
				message: "Producto no existe en al Carrito",
				payload: existsCart
			});
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Eliminado del carrito",
			payload: existsCart
		});

	}

	// [x]
	////////////////////////////////////////////////
	/// Método Todos los productos de un carrito///
	//////////////////////////////////////////////
	async deleteAllProductsByCart(cid) {
		const existsCart = await cartModel.findById(cid);
		if (!existsCart) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el Carrito",
				payload: existsCart
			});
		}

		await cartModel.updateOne({ _id: new mongoose.Types.ObjectId(cid) }, { $set: { products: [] } });

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Eliminado del carrito",
			payload: existsCart
		});

	}

	// [x]
	////////////////////////////////////////////
	/// Método actualizar el carrito        ///
	//////////////////////////////////////////

	async updateCartById(cid, pids) {

		const existsCart = await cartModel.findById(cid);
		if (!existsCart) {
			return {
				code: 404,
				status: "error",
				message: "No existe el Carrito",
				payload: existsCart
			};
		}

		for (const pid of pids) {
			const existsProduct = await productModel.findById(pid);

			if (existsProduct) {
				const productIndex = existsCart.products.findIndex((product) =>
					product.product.toString() === pid.toString()
				);

				if (productIndex !== -1) {

					existsCart.products[productIndex].quantity += 1;
				} else {
					existsCart.products.push({ product: pid, quantity: 1 });
				}
			} else {
				return {
					code: 404,
					status: "error",
					message: "No existe un Producto",
					payload: existsCart
				};
			}
		}

		// Guardar los cambios en el carrito
		await existsCart.save();

		return {
			code: 200,
			status: "success",
			message: "Se actualizaron los productos en el Carrito",
			payload: existsCart
		};
	}

	// [x]
	/////////////////////////////////////////////////////////
	/// Método Actualizar quantitf en el  carrito        ///
	///////////////////////////////////////////////////////
	async updateCartByIdBody(cid, pid, obj) {

		const objKey = Object.keys(obj)[0];
		if (objKey !== "quantity") {
			return {
				code: 404,
				status: "error",
				message: "Solo esta permitido la propieda quantitf",
				payload: []
			};
		}
		const objValue = obj[objKey];

		const existsCart = await cartModel.findById(cid);
		if (!existsCart) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el Carrito",
				payload: existsCart
			});
		}

		const existsProduct = await productModel.findById(pid);
		if (!existsProduct) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el Producto",
				payload: existsCart
			});
		}

		const productIndex = existsCart.products.findIndex(product => product
			.product.toString() === pid.toString());

		if (productIndex !== -1) {

			const updateQuantity = {
				$set: { "products.$.quantity": objValue }
			};

			await cartModel.updateOne({ _id: new mongoose.Types.ObjectId(cid), "products.product": new mongoose.Types.ObjectId(pid) }, updateQuantity);

		}

		return ({
			code: 200,
			status: "sucess",
			message: `Se actualizo a la cantidad de ${objValue}  ${existsProduct.title} en el Carrito`,
			payload: []
		});

	}

}

const cartsManager = new ProductsManager();
export default cartsManager;

