import { getAllProducts } from "./getAll-products.js";
import { renderProductsHTML } from "./components/render-products-html.js";
export const buttonDeleteProduct = async (pid) => {

	try {

		const response = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});

		const data = await response.json();

		const products = await getAllProducts();
		renderProductsHTML(products.payload);

		// eslint-disable-next-line no-undef
		return Swal.fire({
			title: data.pageTitle,
			text: data.message,
			icon: data.sucess,
			confirmButtonText: "Ok"
		});
	} catch (error) {
		console.error("Error al obtener datos:", error);
	}
};
