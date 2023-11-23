// eje tutora Gabriela

// Definición de la clase ProductManager
class ProductManager {
	constructor() {
		this.products = []; // Inicialización de la propiedad "products" como un arreglo vacío
	}

	// Función para obtener todos los productos
	getProducts() {
		return this.products; // Devuelve el arreglo de productos
	}

	// Función para obtener un producto por su ID
	getProductById(pid) {
		let productId = this.products.find(product => product.id === pid);
		(!productId) ? console.log("Not found") : console.log("Producto encontrado", productId);
	}

	// Método para agregar un producto al constructor
	addProduct = (pdts) => {
		// Destructuramos el objeto "products" para obtener sus propiedades
		const { title, description, price, thumbnail, code, stock } = pdts;

		const product = {
			title,
			description,
			price,
			thumbnail,
			code,
			stock
		};

		// Generación del ID
		product.id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;

		// Comprobar si ya existe un producto con el mismo código
		let productCode = this.products.find(prod => prod.code === product.code);

		// Si existe un producto con el mismo código, mostrar un mensaje de error
		productCode
			? console.log("Código de producto ya registrado")
			/* Object.values(product).every(value => value)
				 - Verifica si todas las propiedades del objeto "product" tienen valores (no son null, undefined, una cadena vacía u otro valor "falsy").
				 - Esto se hace utilizando el método Object.values(product) para obtener un array de los valores de "product" y luego
				 - .every(value => value) para verificar que todos los valores sean verdaderos.
			*/
			: Object.values(product).every(value => value)
				? this.products.push(product)
				: console.log("Error: Completa todos los campos");
		// Muestra un mensaje de error si alguna propiedad falta o está vacía
	};
}

// Creación de una instancia de la clase ProductManager
const productManager = new ProductManager();

// Ejemplos de productos
const product1 = {
	title: "producto prueba",
	description: "Este es un producto prueba",
	code: "abc123",
	price: 200,
	thumbnail: "Sin imagen",
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
productManager.getProductById(1);
