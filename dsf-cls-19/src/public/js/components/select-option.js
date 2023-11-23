export const selectOptionCarts = async () => {
	const selectOptionCartsHtml = document.querySelector(".select-carts-ctn.carts");
	const selectOptionCategorytHtml = document.querySelector(".select-carts-ctn.category");
	const selectOptionPricetHtml = document.querySelector(".select-carts-ctn.price");
	const selectOptionStocktHtml = document.querySelector(".select-carts-ctn.stock");
	const selectOptionLimittHtml = document.querySelector(".select-carts-ctn.limit");

	try {

		const response = await fetch("/api/carts");
		const cartsId = await response.json();
		const price = ["by precio", "ascd", "desc"];
		const category = ["by category", "Todos", "Frutas", "Hortalizas", "Especies", "Frutos-secos", "Verduras"];
		const stock = ["by stock", "sin stock", "1 a 20", "mas de 100"];
		const limit = ["by limit", "5", "10", "20", "30"];

		cartsId.payload.unshift({ _id: "by Carrito" });

		const optionsCartsHtml = cartsId.payload.map(e => {
			return `<option value=${e._id}>${e._id}</option>`;
		});
		const optionsPriceHtml = price.map(e => {
			return `<option value="${e === "by precio" ? "" : e}">${e}</option>`;
		});
		const optionsCategoryHtml = category.map(e => {
			return `<option value="${e === "by category" ? "Todos" : e}">${e}</option>`;
		});
		const optionsStockHtml = stock.map(e => {
			return `<option value="${e === "by stock" ? null : e}">${e}</option>`;
		});
		const optionsLimitHtml = limit.map(e => {
			return `<option value="${e === "by limit" ? "10" : e}">${e}</option>`;
		});

		const pagetitle = document.querySelector(".page-title");
		if (pagetitle.textContent !== "Signup") {
			selectOptionCartsHtml.innerHTML = optionsCartsHtml.join("");
			selectOptionPricetHtml.innerHTML = optionsPriceHtml.join("");
			selectOptionCategorytHtml.innerHTML = optionsCategoryHtml.join("");
			selectOptionStocktHtml.innerHTML = optionsStockHtml.join("");
			selectOptionLimittHtml.innerHTML = optionsLimitHtml.join("");
		}

	} catch (error) {
		console.error("Error al obtener datos:", error);
	}
};
