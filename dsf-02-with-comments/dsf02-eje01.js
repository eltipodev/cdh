const fs = require("fs");

// Definición de la clase ProductManager
// =====================================
class ProductManager {
	constructor(path) {
		this.path = path;
	}

	// =============================
	// 01.Método para agregar producto
	// =============================
	async addProduct(newProduct) {
		try {

			// Leemos nuestro archivo de productos
			// ===================================
			const products = await this.getProducts();


			// Destructuramos pdt
			// ===================================
			const { title, description, price, thumbnail, code, stock } = newProduct;

			// Creamos nuestro ojecto de productos
			// ===================================
			const product = {
				title,
				description,
				price,
				thumbnail,
				code,
				stock,
			};

			// Genera un ID autoincrementable
			// ===============================
			product.id = !products.length
				? 1
				: Math.max(...products.map(product => product.id)) + 1;

			// Comprobamos si existe un producto con el mismo código
			// ===================================================
			const codeExists = products.some(p => p.code === code);

			// Comprobamos si hay algun valor vacio
			// ===================================================
			if (codeExists) {
				console.log(`El código ${code} ya existe.`);
			} else if (Object.values(product).every(value => value)) {
				products.push(product);
				await this.saveProductsToFile(products);
				console.log("Producto agregado correctamente.");
			} else {
				console.log("Error: Todos los campos deben estar completos.");
			}
		}
		catch (error) {
			console.log(error);
		}
	}


	// =========================================
	//  02.Método para leer el archivo  producto
	// =========================================
	async getProducts() {

		try {
			// Comprobamos si existe el archivo paso por path
			// ===================================================
			const fileProducExists = fs.existsSync(this.path);
			return fileProducExists
				? JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
				: [];
		} catch (error) {
			console.log(error);
		}

	}


	// =========================================
	//  03.Método para obtener un producto por su ID
	// =========================================
	async getProductById(productId) {

		// Leemos nuestro archivo de productos
		// ===================================
		const products = await this.getProducts();

		// Busca si el id existe
		// ===============================
		const productFoundById = products.find(product => product.id === productId);

		// Verificamos si el producto existe
		// ==================================
		if (!productFoundById) {
			console.log(`Not found: ${productId}`);
			return null;
		}

		// Si existe Muestra el producto encontrado en la consola
		// ============================================
		console.log("Producto Encontrado ", productFoundById);
		return productFoundById;
	}

	// =============================================
	//  04.Método para actualizar el archivo  producto
	// ==============================================
	async updateProduct(productId, updatedProductData) {
		try {
			const products = await this.getProducts();
			const idExits = products.filter(p => p.id === productId);

			if (!idExits) {
				console.log(`El id no existe ${productId}`);
				return null;
			}

			const updatedProducts = products.map(p => {
				if (p.id === productId) {
					return { ...p, ...updatedProductData };
				}
				return p;
			});

			await this.saveProductsToFile(updatedProducts);
			console.log(`Producto actualizado correctamente. ${productId}`);

		} catch (error) {
			console.log(error);
		}
	}


	// =============================================
	//  05.Método para borrar el archivo  producto
	// ==============================================
	async deleteProduct(productId) {
		try {

			// Leemos nuestro archivo de productos
			// ===================================
			const products = await this.getProducts();

			// Verificamos si el id existe
			// ===================================
			const idExits = products.some(p => p.id === productId);
			if (!idExits) {
				console.log(`El id no existe ${productId}`);
				return null;
			}

			// Filtramos todos los productos que no tengan el id
			// ===================================================
			const filteredProducts = products.filter(p => p.id != productId);
			console.log(`Producto eliminado con id: ${productId}`);
			return await this.saveProductsToFile(filteredProducts);

		} catch (error) {
			console.log(error);
		}
	}



	// ==========================================
	//  06.Método para grabar el archivo con producto
	// ==========================================
	saveProductsToFile(products) {
		try {
			fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
		} catch (error) {
			console.log(error.message);
		}
	}
}
// ================================================
// Creación de  instancia de la clase ProductManager
// ================================================
const productManager = new ProductManager("products.json");

// =================================
// Agregar dos productos de ejemplo
// ================================
const product1 = {
	title: "producto prueba",
	description: "Este es un producto prueba",
	price: 200,
	thumbnail: "Sin imagen",
	code: "acc123",
	stock: 25,
};
const product2 = {
	title: "producto prueba1",
	description: "Este es un producto prueba1",
	price: 1200,
	thumbnail: "Sin imagen",
	code: "accs123",
	stock: 25,
};

const product3 = {
	title: "producto prueba1",
	description: "Este es un producto prueba1",
	price: 1200,
	thumbnail: "Sin imagen",
	code: "acc11233",
	stock: 25,
};
const product4 = {
	title: "producto prueba1",
	description: "Este es un producto prueba1",
	price: 1200,
	thumbnail: "Sin imagen",
	code: "acc11233",
	stock: 25,
};

// ==============================
// Agregar productos de ejemplo
// ==============================
const test = async () => {
	await productManager.addProduct(product1);
	await productManager.addProduct(product2);
	await productManager.addProduct(product3);
	await productManager.addProduct(product4);

	// ==============================
	// Obtenemos todos los productos
	// ==============================
	const allProducts = await productManager.getProducts();
	console.log(allProducts);

	// ===============================
	// Obtiene un producto por su ID
	// ==============================
	await productManager.getProductById(1);


	// ===============================
	// Elimina un producto por su ID
	// ===============================
	await productManager.deleteProduct(1);

	// ===============================
	// Actualiza un producto por su ID
	// ===============================
	await productManager.updateProduct(2, { code: "aqui" });
};


test();