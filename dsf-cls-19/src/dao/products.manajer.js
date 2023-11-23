import { productModel } from "./models/products.model.js";

class ProductsManager {
	constructor() {
	}

	////////////////////////////////////////////////////
	/// Método traer todos los productos           ////
	//////////////////////////////////////////////////
	// eslint-disable-next-line no-unused-vars
	async getAllProducts(obj) {

		const { limit = "10", page = "1", sort = "default", ...query } = obj;

		console.log("==> query", query);
		console.log("==> query.stock", query.stock);

		const querys = {};
		const category = query.category;
		const stock = query.stock;

		if (category && category !== "Todos") {
			querys.category = category;
		}

		// "by stock", "sin stock", "1 a 5", "mas de 5"

		if (stock === "1 a 20")
			querys.stock = {
				$gte: 1,
				$lte: 20
			};

		if (stock === "sin stock")
			querys.stock = {
				$gte: 0,
				$lte: 0
			};

		if (stock === "mas de 100")
			querys.stock = {
				$gte: 100,
			};

		const sortOptions = {
			ascd: { price: 1 },
			desc: { price: -1 },
			default: ""
		};

		const sortSelect = sortOptions[sort] || sortOptions["default"];

		const options = {
			limit,
			page,
			sort: sortSelect,
			collation: { locale: "en", strength: 2 },
			lean: true
		};

		const getAllProducts = await
			productModel
				.paginate(querys, options);

		console.log("==> getAllProducts.totalPages", getAllProducts.totalDocs);

		// const plainData = getAllProducts.docs.map(doc => doc.toObject());
		// getAllProducts.docs = plainData;

		const pagination = [];

		for (let i = 1; i <= getAllProducts.totalPages; i++) {
			pagination.push(i);
		}

		if (!getAllProducts) {

			return ({
				code: 200,
				status: "error",
				message: "no hay productos",
				payload: [],
				sucess: false
			});

			// throw new Error("No hay productos");
		}
		return ({
			code: 200,
			status: "sucess",
			message: "Productos Encontrados",
			payload: getAllProducts,
			category,
			options,
			sucess: true,
			pagination: pagination,
		});
	}

	//[x]
	////////////////////////////////////////////////
	/// Método para agregar producto            ///
	//////////////////////////////////////////////
	async addProduct(obj) {

		const exitsCode = await productModel.find({ code: obj.code });
		if (exitsCode.length) {
			return ({
				code: 404,
				status: "error",
				message: "El codigo ya existe",
				payload: []
			});
		}

		const addProduct = await productModel.create(obj);
		if (!addProduct) {
			return ({
				code: 404,
				status: "error",
				message: "no hay productos",
				payload: []
			});
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Productos Agregadp",
			payload: addProduct
		});
	}

	//[x];
	////////////////////////////////////////////////
	///  Método elimimar un  producto por Id    ///
	//////////////////////////////////////////////
	async deleteProductById(pid) {
		const deleteProductById = await productModel.deleteOne({ _id: pid });
		if (deleteProductById.deletedCount === 0) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el producto",
				payload: deleteProductById
			});
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Eliminado",
			payload: deleteProductById
		});

	}

	// [x]
	////////////////////////////////////////////////
	///  Método actualizar un  producto por Id  ///
	//////////////////////////////////////////////
	async updateProductById(id, obj) {
		const existsId = await productModel.findById(id);

		if (!existsId) {
			return ({
				code: 404,
				status: "error",
				message: "No existe el producto",
				payload: existsId
			});
		}
		const updateProductById = await productModel.updateOne({ _id: id }, obj);

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Eliminado",
			payload: updateProductById
		});
	}

	////////////////////////////////////////////////
	///  Método listar un  producto por Id      ///
	//////////////////////////////////////////////
	async getProductById(pid) {

		const getProductById = await productModel.findById(pid);

		if (!getProductById) {
			return ({
				code: 404,
				status: "error",
				message: "No existe id del producto",
				payload: getProductById,
				sucess: false
			});
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Encontrado",
			payload: getProductById,
			sucess: true
		});

	}
}

const productManager = new ProductsManager();
export default productManager;

