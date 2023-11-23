
// eslint-disable-next-line no-undef
const socketClientChat = io();

/* eslint-disable no-undef */
const userChat = document.querySelector(".user-chat");
const chatHbs = document.getElementById("chat-hbs");
const formHbs = document.getElementById("form-hbs");
const imputMessageHbs = document.getElementById("message-hbs");

let user;
// eslint-disable-next-line no-undef
Swal.fire({
	title: "Bienvenito al chat",
	text: "Ingrese su email",
	inputValidator: (value) => {
		if (!value) {
			return "Debes ingresar el email";
		}
	},
	input: "email",
	confirmButtonText: "ENTER"
}).then(input => {
	user = input.value;
	// eslint-disable-next-line no-undef
	socketClientChat.emit("newUser", user);
	userChat.textContent = user;
});

socketClientChat.on("userConected", (user) => {
	Toastify({
		text: `se conecto ${user}`,
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "top", // `top` or `bottom`
		position: "left", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)",
		}
	}).showToast();
});

socketClientChat.on("myuser", () => {
	Toastify({
		text: "conectado al chat",
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "top", // `top` or `bottom`
		position: "left", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)",
		}
	}).showToast();
});

formHbs.onsubmit = (e) => {
	e.preventDefault();
	const infoMessage = {
		name: user,
		message: imputMessageHbs.value
	};
	socketClientChat.emit("message", infoMessage);
	imputMessageHbs.value = "";
};

socketClientChat.on("chats", (messages) => {
	const renderMessage = messages.map(e => {
		return `<p class="chat-hbs-message">${e.name}: ${e.message}</p>`;
	}).join(" ");
	// eslint-disable-next-line no-unreachable
	chatHbs.innerHTML = renderMessage;

});