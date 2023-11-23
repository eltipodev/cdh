// Definición de la clase ProductManager
class ProductManager {
	constructor() {
		// Inicialización de la propiedad "products" como un arreglo vacío
		this.products = [];
	}
	// Método para agregar un producto
	addProduct(title, descr, price, thumb, code, stock) {


		// Comprobar si ya existe un producto con el mismo código
		const codeExist = this.products.some(product => product.code === code);

		// Validación de campos obligatorios
		if (!title || !descr || !price || !thumb || !code || !stock) {
			console.log("Todos los campos son obligatorios.");
		} else if (codeExist) {
			console.log(`El código ${code} ya existe.`);
		} else {
			// Si no hay errores, crea un nuevo producto
			const product = {
				id: !this.products.length
					? 1
					: Math.max(...this.products.map(product => product.id)) + 1, // Genera un ID autoincrementable
				title,
				description: descr,
				price,
				thumbnail: thumb,
				code,
				stock,
			};

			this.products.push(product); // Agrega el nuevo producto al arreglo
		}
	}

	getProducts() {
		// Método para obtener todos los productos
		return this.products; // Devuelve el arreglo de productos
	}

	getProductById(id) {
		// Método para obtener un producto por su ID

		// Busca el producto en el arreglo
		const productFoundById = this.products.find(product => product.id === id);

		if (!productFoundById) {
			// Si no se encuentra el producto, muestra un mensaje de error
			console.log("Not found");
			return null; // Retorna null para indicar que el producto no se encontró
		}
		console.log(productFoundById); // Muestra el producto encontrado en la consola
		return productFoundById; // Retorna el producto encontrado
	}
}

// Creación de una instancia de la clase ProductManager
const productManager = new ProductManager();

// Obtención de todos los productos
const allProducts = productManager.getProducts();

// Agregar dos productos de ejemplo
productManager.addProduct(
	"producto prueba",
	"Este es un producto prueba",
	200,
	"Sin imagen",
	"abc123",
	25
);

productManager.addProduct(
	"producto prueba2",
	"Este es un producto prueba2",
	2200,
	"Sin imagen",
	"abc1123",
	225
);

// Muestra todos los productos en la consola
console.log(allProducts);

// Obtiene un producto por su ID y lo muestra en la consola
productManager.getProductById(4);
