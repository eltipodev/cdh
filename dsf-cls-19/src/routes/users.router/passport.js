import { compareData, hashData } from "../../utils.js";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import userManager from "../../dao/users.manager.js";

///////////////////////////////
/// Passport Local Signup  ///
/////////////////////////////
passport.use("signup", new LocalStrategy({
	passReqToCallback: true,
	usernameField: "user"
}, async (req, user, password, done) => {

	const { firstName, lastName, email } = req.body;

	if (!firstName || !lastName || !email || !user || !password) {
		return done(null, false);
	}

	try {

		const hasHedPassword = await hashData(password);
		// eslint-disable-next-line no-unused-vars
		const createUser = await userManager.creatOne({
			...req.body, password: hasHedPassword
		});
		done(null, createUser);
	} catch (error) {
		done(error);
	}
}));

//////////////////////////////
/// Passport Local Login  ///
////////////////////////////
passport.use("login", new LocalStrategy({
	usernameField: "user"
}, async (user, password, done) => {

	if (!user || !password) {
		return done(null, false);
	}

	try {

		const userData = await userManager.findByUser(user);

		if (!userData) {
			return done(null, false);
		}
		// const isValidPassword = password === userData.password;
		const isValidPassword = await compareData(password, userData.password);
		if (!isValidPassword) {
			return done(null, false);
		}

		done(null, userData);

	} catch (error) {
		done(error);
	}
}));

///////////////////////////////
/// Passport GitHub Login  ///
/////////////////////////////

passport.use("gitHub", new GitHubStrategy(({
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:8080/api/auth/github/callback"
}),
	async (accessToken, refreshToken, profile, done) => {
		try {

			const userByDB = await userManager.findByUser(profile._json.login);

			console.log("==> userByDB", userByDB);

			if (userByDB) {
				if (userByDB.isGitHub) {
					return done(null, userByDB);
				}
				else {
					return done(null, false);
				}
			}

			const infoUser = {
				user: profile._json.login,
				firstName: profile._json.name || "none",
				lastName: profile._json.name || "none",
				email: profile._json.email || "none",
				isGitHub: true
			};

			const createUser = await userManager.creatOne(infoUser);
			done(null, createUser);

		} catch (error) {
			done(error);
		}
	}));

////////////////////////////////
/// Passport serializeUser  ///
//////////////////////////////
passport.serializeUser((user, done) => {
	done(null, user._id);
});

//////////////////////////////////
/// Passport deserializeUser  ///
////////////////////////////////
passport.deserializeUser(async (id, done) => {
	try {
		const user = await userManager.findById(id);
		return done(null, user);
	} catch (error) {
		done(error);
	}
});