import { getAllProducts } from "../getAll-products.js";
import { renderProductsHTML } from "./render-products-html.js";

export const selectPriceFilter = async (limit, page, sort, stock, catg) => {

	const message = await getAllProducts(limit, page, sort, stock, catg);
	renderProductsHTML(message);

};
