// =========================================
// Mix de eje01 a eje03
// =========================================

// Definición de la clase ProductManager
// =====================================
class ProductManager {
	constructor() {
		// Inicialización de la propiedad "products" como un arreglo vacío
		this.products = [];
	}

	// Método para agregar producto
	// =============================
	addProduct(pdt) {
		const { title, description, price, thumbnail, code, stock } = pdt;

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
		product.id = !this.products.length
			? 1
			: Math.max(...this.products.map(product => product.id)) + 1;

		// Comprobar si existe un producto con el mismo código
		// ===================================================
		const codeExist = this.products.some(product => product.code === code);
		codeExist
			? console.log(`El code existe ${product.code} `)
			: Object.values(product).every(value => value)
				? this.products.push(product)
				: console.log("Error:Tiene campos vacios");

	}

	// Método para obtener todos los productos
	// =========================================
	getProducts() {
		// Devuelve el arreglo de productos
		return this.products;
	}

	// Método para obtener un producto por su ID
	// =========================================
	getProductById(id) {

		// Busca el producto en el arreglo
		const productFoundById = this.products.find(product => product.id === id);

		if (!productFoundById) {
			console.log(`Not found: ${id}`); // Si no se encuentra el producto, muestra un mensaje de error
			return null; // Retorna null para indicar que el producto no se encontró
		}
		console.log(productFoundById); // Muestra el producto encontrado en la consola
		return productFoundById; // Retorna el producto encontrado
	}

}

// Creación de  instancia de la clase ProductManager
// ================================================
const productManager = new ProductManager();

// Agregar dos productos de ejemplo
// ================================
const product1 = {
	title: "producto prueba",
	description: "Este es un producto prueba",
	price: 200,
	thumbnail: "Sin imagen",
	code: "abc123",
	stock: 25,
};
const product2 = {
	title: "producto prueba1",
	description: "Este es un producto prueba1",
	price: 1200,
	thumbnail: "Sin imagen",
	code: "abcs123",
	stock: 25,
};

const product3 = {
	title: "producto prueba1",
	description: "Este es un producto prueba1",
	price: 1200,
	thumbnail: "Sin imagen",
	code: "abc11233",
	stock: 25,
};

// Agregar tres productos de ejemplo
// =================================
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

// Obtención de todos los productos
// ================================
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtiene un producto por su ID
// ==============================
productManager.getProductById(1);