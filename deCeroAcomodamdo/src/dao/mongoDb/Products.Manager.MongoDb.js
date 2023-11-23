import { productModel } from "../models/products.model.js";

class ProductManagerMongoDb {
	constructor() {
	}

	////////////////////////////////////////////////
	/// Método para agregar producto            ///
	//////////////////////////////////////////////
	async addProduct(obj) {

		// const checkCodeExists = await this.checkCodeExists(code);

		const addProduct = await productModel.create(obj);

		return addProduct;
	}

	////////////////////////////////////////////////
	///  Método listar todos los  producto      ///
	//////////////////////////////////////////////
	async getAllProducts(queryObj = "") {
		// TODO:
		// [] Chequear si existe el codigo

		const getAllProducts = await productModel.find().lean();

		return !queryObj.limit
			? getAllProducts
			: getAllProducts.slice(0, +queryObj.limit);
	}

	////////////////////////////////////////////////
	///  Método listar un  producto por Id      ///
	//////////////////////////////////////////////
	async getProductById(pid) {

		try {
			const getProductById = await productModel.findById(pid).lean();
			return getProductById;
		} catch (error) {
			return {
				error: error.message
			};
		}
	}

	////////////////////////////////////////////////
	///  Método elimimar un  producto por Id    ///
	//////////////////////////////////////////////
	async deleteProductById(pid) {

		const deleteProductById = await productModel.deleteOne({ _id: pid });

		return deleteProductById;
	}

	////////////////////////////////////////////////
	///  Método actualizar un  producto por Id  ///
	//////////////////////////////////////////////
	async updateProductById(id, obj) {

		const updateProductById = await productModel.updateOne({ _id: id }, obj);

		return updateProductById;
	}

}

const productManager = new ProductManagerMongoDb();

export default productManager;