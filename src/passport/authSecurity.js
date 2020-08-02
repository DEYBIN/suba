const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SecurityDriver = require('../models/schema.SecurityDriver');
const SecurityClient = require('../models/schema.SecurityClient');
const config = require('./config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: 'webmail.platcont.com',
	secure: false,
	auth: {
		user: 'test@platcont.com',
		pass: 'Cont@123'
	},
	tls : {
		rejectUnauthorized : false
	}
});

passport.serializeUser((user, done) => {
	done(null, { id: user.id, type: user.type});
});
passport.deserializeUser(async (json, done) => {
	if (json.type ===1){
		const user = await SecurityDriver.findById(json.id);
		done(null, user);
	}else{
		const user = await SecurityClient.findById(json.id);
		done(null, user);
	}
});

//===================Driver====================//
	// authenticated local
		//signup
		passport.use('signup-driver', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		}, function (req, username, password, done) {
			const data = req.body.data;
			SecurityDriver.findOne({ email: data.email }, function (err, user) {
				if (err) throw (err);
				if (!err && user == null) {
					const newSecurityDriver = new SecurityDriver();
					newSecurityDriver.email = data.email;
					newSecurityDriver.password = newSecurityDriver.encryptPassword(data.password);

					newSecurityDriver.save(function (err) {
						if (err) throw (err);
						return done(null, newSecurityDriver);
					});
				} else {
					return done(null, false);
				}
			});
		}));

		//login 
		passport.use("login-driver", new LocalStrategy({
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		}, function (req, email, password, done) {
			SecurityDriver.findOne({ email: email }, function (err, user) {
				if (err) throw (err);
				if (!err && user != null) {
					if (user.comparePassword(password)) {

						return done(null, user);
					} else {
						return done(null, false);
					}
				} else {
					return done(null, false);
				}
			});
		}));

		//signup and login facebook -> configuración autentificación con facebook
		passport.use('signup-facebook-driver', new FacebookStrategy({
			clientID: config.facebook.key,
			clientSecret: config.facebook.secret,
			callbackURL: '/auth/driver/facebook/callback',
			scope: ['email'],
			profileFields: ['id', 'displayName', /*'provider',*/, 'email', 'photos']
		}, function (accessToken, refreshToken, profile, done) {
			SecurityDriver.findOne({ provider_id: profile.id }, function (err, user) {
				if (err) throw (err);
				if (!err && user != null) return done(null, user);
				const newSecurityDriver = new SecurityDriver({
					provider_id: profile.id,
					provider: profile.provider,
					providerName: profile.displayName,
					photo: profile.photos[0].value,
					email: profile.emails[0].value
				});
				newSecurityDriver.save(function (err) {
					if (err) throw err;
					// transporter.sendMail({
					// 	from: "'Suba Support' <test@platcont.com>",
					// 	to: newSecurityDriver.email,
					// 	subject: 'website contact form',
					// 	text: 'Bien venido a la familia Suba'
					// });
					done(null, newSecurityDriver);
				});
			});
		}));

		//signup and login google -> configuración autentificación con google
		passport.use('signup-google-driver', new GoogleStrategy({
			clientID: config.google.key,
			clientSecret: config.google.secret,
			//scope: 'https://www.googleapis.com/auth/userinfo.profile',
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/plus.login',
				'https://www.googleapis.com/auth/userinfo.email'],
			//scope:'https://www.googleapis.com/auth/gmail.settings.basic',
			callbackURL: "/auth/driver/google/callback"
		}, function (accessToken, refreshToken, profile, done) {
			SecurityDriver.findOne({ provider_id: profile.id }, function (err, user) {
				if (err) throw (err);
				if (!err && user != null) return done(null, user);
				const newSecurityDriver = new SecurityDriver({
					provider_id: profile.id,
					provider: profile.provider,
					providerName: profile.displayName,
					photo: profile.photos[0].value,
					email: profile.emails[0].value
				});
				newSecurityDriver.save(function (err) {
					if (err) throw err;
					// transporter.sendMail({
					// 	from: "'Suba Support' <test@platcont.com>",
					// 	to: newSecurityDriver.email,
					// 	subject: 'website contact form',
					// 	text: 'Bien venido a la familia Suba'
					// });
					done(null, newSecurityDriver);
				});
			});
		}));
//=============================================//

//===================Client====================//
	// authenticated local
		//signup
		passport.use('signup-client', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		}, function (req, username, password, done) {
			const data = req.body.data;
			SecurityClient.findOne({ email: data.email }, function (err, user) {
				if (err) throw (err);
				if (!err && user == null) {
					const newSecurityClient = new SecurityClient();
					newSecurityClient.email = data.email;
					newSecurityClient.password = newSecurityClient.encryptPassword(data.password);

					newSecurityClient.save(function (err) {
						if (err) throw (err);
						return done(null, newSecurityClient);
					});
				} else {
					return done(null, false);
				}
			});
		}));

		//login 
		passport.use("login-client", new LocalStrategy({
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		}, function (req, email, password, done){
			SecurityClient.findOne({ email: email }, function (err, user) {
				if (err) throw (err);
				if (!err && user != null) {
					if (user.comparePassword(password)) {

						return done(null, user);
					} else {
						return done(null, false);
					}
				} else {
					return done(null, false);
				}
			});
		}));
	//signup and login facebook -> configuración autentificación con facebook	
	passport.use('signup-facebook', new FacebookStrategy({
		clientID: config.facebook.key,
		clientSecret: config.facebook.secret,
		callbackURL: '/auth/client/facebook/callback',
		scope: ['email'],
		profileFields: ['id', 'displayName', /*'provider',*/, 'email', 'photos']
	}, function (accessToken, refreshToken, profile, done) {

		SecurityClient.findOne({ provider_id: profile.id }, function (err, user) {
			if (err) throw (err);
			if (!err && user != null) return done(null, user);

			// Al igual que antes, si el usuario ya existe lo devuelve
			// y si no, lo crea y salva en la base de datos
			const newSecurityClient = new SecurityClient({
				provider_id: profile.id,
				provider: profile.provider,
				providerName: profile.displayName,
				photo: profile.photos[0].value,
				email: profile.emails[0].value
			});
			newSecurityClient.save(function (err) {
				if (err) throw err;
				done(null, newSecurityClient);
			});
		});
	}));
	//signup and login google -> configuración autentificación con google
	passport.use('signup-google', new GoogleStrategy({
		clientID: config.google.key,
		clientSecret: config.google.secret,
		//scope: 'https://www.googleapis.com/auth/userinfo.profile',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/plus.login',
			'https://www.googleapis.com/auth/userinfo.email'],
		//scope:'https://www.googleapis.com/auth/gmail.settings.basic',
		callbackURL: "/auth/client/google/callback"
	}, function (accessToken, refreshToken, profile, done) {
		SecurityClient.findOne({ provider_id: profile.id }, function (err, user) {
			if (err) throw (err);
			if (!err && user != null) return done(null, user);
			const newSecurityClient = new SecurityClient({
				provider_id: profile.id,
				provider: profile.provider,
				providerName: profile.displayName,
				photo: profile.photos[0].value,
				email: profile.emails[0].value
			});
			newSecurityClient.save(function (err) {
				if (err) throw err;
				done(null, newSecurityClient);
			});
		});
	}));

//=============================================//



