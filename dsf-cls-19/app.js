import "dotenv/config";
import "./src/db/config.js";
import "./src/routes/users.router/passport.js";
import MongoStore from "connect-mongo";
import URI from "./src/db/config.js";
import __dirname from "./src/utils.js";
// import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import express from "express";
import indexRouter from "./src/routes/index.js";
import passport from "passport";
import session from "express-session";

const app = express();
app.use(cookieParser("SecretCookie"));
app.use(express.json());// 5.2.1
app.use(express.urlencoded({ extended: true }));// 5.2.2
app.use(express.static(__dirname + "/public"));// 5.2.3

app.use(
	session({
		store: new MongoStore({
			mongoUrl: URI
		}),
		secret: "secretSession",
		cookie: { maxAge: 11180000 }
	}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	try {
		if (!req.session.passport) {
			if (req.path !== "/api/user/login" && req.path !== "/api/user/signup" && req.path !== "/api/auth/github" && req.path !== "/api/auth/github/callback" && req.path !== "/api/error") {
				return res.redirect("/api/user/login");
			}
		}
		if (req.user) {

			const userObject = {
				firstName: req.user.firstName,
				user: req.user.user,
				lastName: req.user.lastName,
				email: req.user.email,
				rol: "user"
			};

			if (req.user.email === process.env.ADMIN_EMAIL && req.user.password === process.env.ADMIN_PASSWORD) {
				userObject.rol = "admin";
			}
			res.locals.user = userObject;

		}

	} catch (error) {
		res.redirect("/api/user/login");
	}
	next();
});

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));// 5.2.4
app.set("views", __dirname + "/views");// 5.2.5
app.set("view engine", ".hbs");// 5.2.6
app.use("/api", indexRouter);// 5.2.7

app.use("*", (req, res) => {
	if (req.session.user) {
		return res.redirect("/api/user/profile");
	}
	res.status(200).render("products", {
		pageTitle: "Login",
		message: "Ingresar al sitio",
		status: "sucess",
		sucess: true,
	});
});
// Registra el helper "eq"
const hbs = exphbs.create({});

hbs.handlebars.registerHelper(
	{
		eq: (a, b) => a === b
	});

// app.use((err, req, res, next) => {
// 	res.status(500).render("error", { error: err.message });
// });

export default app;

