import app from "./app.js";
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
	console.info("==> Servidor Iniciado en el puerto: ", PORT);
});
