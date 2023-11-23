import bcrypt from "bcrypt";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));// 6.1

export default __dirname;

export const hashData = async (data) => {
	return bcrypt.hash(data, 10);
};

export const compareData = async (data, hashData) => {
	return bcrypt.compare(data, hashData);
};