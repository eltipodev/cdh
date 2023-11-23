//eslint - disable - next - line no - undef, no - unused - vars
// eslint-disable-next-line no-undef
const socketClient = io("http://localhost:8080");

const form = document.getElementById("form");
const messageSucess = document.querySelector(".message-sucess");

if (form) {
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
}

const update = (messages) => {
	let mess;
	messages.value
		? mess = messages.value
		: mess = messages;
	const productsHTML = mess.map(element => `<div class="products-ctn">
      <div class="products-main">
			${messages.value
			? `<button onclick="productByDelete(${element.id})" class="products-delete">x</button>`
			// eslint-disable-next-line quotes
			: `<button prodId="${element._id}" class="button-delete-mongo products-delete">x</button>`
		}<img src="${element.thumbnails || "/img/imagen_vacio.png"}" alt="imagen de una ${element.title}" class="products-main-img">
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

const container = document.querySelector(".section-products");

if (container) {
	container.addEventListener("click", (event) => {
		if (event.target.classList.contains("button-delete-mongo")) {
			const prodId = event.target.getAttribute("prodId");
			socketClient.emit("productByDeleteMongo", prodId);
		}
	});
}

// eslint-disable-next-line no-unused-vars
const productByDelete = (prodId) => {
	socketClient.emit("productByDelete", prodId);
};

socketClient.on("productAdded", (message) => {
	update(message);
	messageSucess.innerText = message.messageMethod;
	messageSucess.classList.remove = "message-sucess-error";
	messageSucess.classList.add = "message-sucess-ok";
});

socketClient.on("productByDelete", (updateProduct) => {
	update(updateProduct);
	messageSucess.classList.remove = "message-sucess-error";
	messageSucess.classList.add = "message-sucess-ok";
	messageSucess.innerText = updateProduct.messageMethod;
});

socketClient.on("productByDeleteMongo", (updateProduct) => {
	update(updateProduct);
	messageSucess.classList.remove = "message-sucess-error";
	messageSucess.classList.add = "message-sucess-ok";
	messageSucess.innerText = "Producto Eliminado";
});

socketClient.on("productAdded", (message) => {
	update(message);
	message.messageMethod
		? message.messageMethod
		: message;
	messageSucess.classList.remove = "message-sucess-error";
	messageSucess.classList.add = "message-sucess-ok";
});

socketClient.on("productAddError", (message) => {
	console.log(message);
	message.messageMethod
		? message.messageMethod
		: message;
	messageSucess.classList.remove = "message-sucess-ok";
	messageSucess.classList.add = "message-sucess-error";
});

