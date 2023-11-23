/* eslint-disable no-undef */

const socket = io();

socket.on("connect", () => {
	("Conectado al servidor");
});

const form = document.getElementById("form");
const messageSucess = document.querySelector(".message-sucess");

socket.on("message-server-ok", (message) => {
	messageSucess.classList.add("message-sucess-ok");
	messageSucess.classList.remove("message-sucess-error");
	messageSucess.innerText = message;
});

socket.on("message-server-error", (message) => {
	messageSucess.classList.remove("message-sucess-ok");
	messageSucess.classList.add("message-sucess-error");
	messageSucess.innerText = message;
});

form.addEventListener("submit", (e) => {
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
		code: Number(inputCode.value),
		price: Number(inputPrice.value),
		thumbnails: inputThumbnails.value ? inputThumbnails.value : "/img/imagen_vacio.png",
		category: inputCategory.value,
		stock: Number(inputStock.value)
	};

	fetch("http://localhost:8080/api/handlebars/test", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(productData)
	})
		.then((response) => response.json())
		.then((data) => {
			socket.emit("message-cliente", data.message);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
});
