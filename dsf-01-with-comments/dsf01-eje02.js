
// Definición de la clase ProductManager
class ProductManager {

	constructor() {
		// Inicialización de la propiedad "products" como un arreglo vacío
		this.products = [];
	}

	// Método para agregar un producto
	addProduct(product) {
		//Destructuramos product
		const { title, description, price, thumbnail, code, stock } = product;

		// Validación de campos obligatorios
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.log("Null");
			return null;
		}

		// Comprobar si ya existe un producto con el mismo código
		const codeIsExist = this.products.some(p => p.code === code);
		if (codeIsExist) {
			console.log(`code existe: ${code}`);
			return null;
		}



		const id = !this.products.length ? 1 : this.products[this.products.length - 1].id + 1;

		// Si no hay errores, crea un nuevo producto

		const newProduct = { id, ...product };
		this.products.push(newProduct);

	}


	getProducts() {
		return this.products;
	}

	// Método para obtener un producto por su ID
	getProductById(id) {

		// Busca el producto en el arreglo
		const idIsExist = this.products.find(p => p.id === id);

		if (!idIsExist) {
			// Si no se encuentra el producto, muestra un mensaje de error
			console.log(`El id no existe ${id}`);
			// Retorna null para indicar que el producto no se encontró
			return null;
		}
		console.log(idIsExist);
	}

}

// Creación de una instancia de la clase ProductManager
const productManager = new ProductManager();

// Agregar dos productos de ejemplo
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


// Obtención de todos los productos
const allProducts = productManager.getProducts();

// Agregar tres productos de ejemplo
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

// Muestra todos los productos en la consola
console.log(allProducts);

// Obtiene un producto por su ID y lo muestra en la consola
productManager.getProductById(11);

