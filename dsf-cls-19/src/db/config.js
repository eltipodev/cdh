// Coneccion a mongoose
import "dotenv/config";
import mongoose from "mongoose";
const URI = `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@cluster0.rnsfnkz.mongodb.net/${process.env.MONGO_INITDB_ROOT_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(URI)
	.then(() => console.log("Conectado a mongoose"))
	.catch(err => console.log("==> error ", err));

export default URI;

