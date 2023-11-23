// eslint-disable-next-line no-undef, no-unused-vars
const socketClient = io();

const form = document.getElementById("form");
const messageSucess = document.querySelector(".message-sucess");

form.onsubmit = (e) => {
	e.preventDefault();

	const inputTitle = document.getElementById("title");
	const inputDescription = document.getElementById("description");
	const inputCode = document.getElementById("code");
	const inputPrice = document.getElementById("price");
	const inputThumbnails = document.getElementById("thumbnails");
	const inputCategory = document.getElementById("category");
	const inputStock = document.getElementById("stock");

	const productData = {
		title: inputTitle.value,
		description: inputDescription.value,
		code: inputCode.value,
		price: inputPrice.value,
		thumbnails: inputThumbnails.value,
		category: inputCategory.value,
		stock: inputStock.value
	};

	socketClient.emit("addProduct", productData);
};

const update = (messages) => {
	const productsHTML = messages.map(element => `<div class="products-ctn">
      <div class="products-main">
			<button onclick="productByDelete(${element.id})" class="products-delete">x</button>
        <img src="${element.thumbnails || "/img/imagen_vacio.png"}" alt="imagen de una ${element.title}" class="products-main-img">
        <div class="products-footer-credits">
          <span>Foto de </span>
          <a href="https://unsplash.com/es/@?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"></a>
          <span>en</span>
          <a href="https://unsplash.com/es/fotos/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </div>
        <div class="products-header">
          <div class="products-header-title">${element.title}</div>
        </div>
        <div class="products-main-description">${element.description}</div>
      </div>
      <div class="products-footer">
        <div class="products-footer-price">${element.price}</div>
      </div>
    </div>
  `);

	document.querySelector(".section-products").innerHTML = productsHTML.join("");
};

// eslint-disable-next-line no-unused-vars
const productByDelete = (prodId) => {
	socketClient.emit("productByDelete", prodId);
};

socketClient.on("productAdded", (message) => {
	update(message);
	messageSucess.innerText = "Producto Agregado";
	messageSucess.classList.remove = "message-sucess-error";
	messageSucess.classList.add = "message-sucess-ok";
});

socketClient.on("productByDelete", (message) => {
	update(message);
	messageSucess.classList.remove = "message-sucess-error";
	messageSucess.classList.add = "message-sucess-ok";
	messageSucess.innerText = "Producto Elimando";
});

socketClient.on("productAdded", (message) => {
	update(message);
	messageSucess.classList.remove = "message-sucess-error";
	messageSucess.classList.add = "message-sucess-ok";
	messageSucess.innerText = "Producto Agregado";
});

socketClient.on("productAddError", (message) => {
	messageSucess.innerText = message;
	messageSucess.classList.remove = "message-sucess-ok";
	messageSucess.classList.add = "message-sucess-error";
});

