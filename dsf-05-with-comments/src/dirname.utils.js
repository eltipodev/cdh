
import { dirname } from "path";
import { fileURLToPath } from "url";

//Es una variable global en Node.js que representa el directorio actual del archivo en el que se encuentra. En este contexto, se utiliza para construir la ruta completa al directorio de archivos estáticos.
const __dirname = dirname(fileURLToPath(import.meta.url));

export default __dirname;