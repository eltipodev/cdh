import { getAllProducts } from "../getAll-products.js";
import { renderProductsHTML } from "./render-products-html.js";

export const selectCategoryFilter = async (limit, page = "1", sort, stock, catg = "Todos") => {

	const message = await getAllProducts(limit, page, sort, stock, catg);
	renderProductsHTML(message);
};

