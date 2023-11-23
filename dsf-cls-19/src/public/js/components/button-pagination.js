import { getAllProducts } from "../getAll-products.js";
import { renderProductsHTML } from "./render-products-html.js";
const buttonNextPage = document.querySelector(".button-pag-next");
const buttonPrevPage = document.querySelector(".button-pag-prev");
const buttonPagNow = document.querySelector(".button-pag-now");

export const renderButtonPagination = async (limit, page, sort, stock, catg) => {
	console.log("==> limit, page, sort, catg renderButtonPagination", limit, page, sort, catg);

	const message = await getAllProducts(limit, page, sort, sort, catg);

	buttonPagNow.innerHTML = message.payload.page;

	if (!message.payload.hasNextPage) {
		buttonNextPage.classList.add("button-pag--remove");
		buttonNextPage.classList.remove("button-pag--add");
	} else if (page === "1") {
		buttonPrevPage.classList.add("button-pag--remove");
		buttonPrevPage.classList.remove("button-pag--add");
	} else {
		buttonNextPage.classList.remove("button-pag--remove");
		buttonNextPage.classList.add("button-pag--add");
		buttonPrevPage.classList.remove("button-pag--remove");
		buttonPrevPage.classList.add("button-pag--add");
	}

	renderProductsHTML(message);
};
