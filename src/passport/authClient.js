const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SecurityClient = require('../models/schemaSecurityClient');
const config = require('./config');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

		const user= await SecurityClient.findById(id);
		done(null, user);

	
	// const user = await SecurityClient.findById(id);
	// done(null, user);
});

// passport.use('signup', new LocalStrategy({
// 	usernameField: 'email',
// 	passwordField: 'password',
// 	passReqToCallback: true
// }, async (req, email, password, done) => {
// 	const user = await Security.findOne({ email: email });
// 	if (user) {
// 		return done(null, false, req.flash('signupMessage', 'registro ya existe'));
// 	} else {
// 		const newSecurity = new Security();
// 		newSecurity.id_serv = "5e77a7d8cefc4381b83d46d5";
// 		newSecurity.email = email;
// 		newSecurity.password = newSecurity.encryptPassword(password);
// 		// console.log(req);
// 		// await security.save((err, result)=> {
// 		// 	if (err) return res.json({ status: 400, message:err.message});
// 		// 	res.json({ status: 200 ,message:'success',resp:result})
// 		// });
// 		await newSecurity.save();
// 		done(null, newSecurity);
// 	}
// }));

// passport.use("login", new LocalStrategy({
// 	usernameField: "email",
// 	passwordField: "password",
// 	passReqToCallback: true
// }, async (req, email, password, done) => {
// 	const user = await Security.findOne({ email: email });
// 	if (!user) {
// 		return done(null, false, req.flash('signinMessage', 'No User Fond'))
// 	}
// 	if (!user.comparePassword(password)) {
// 		return done(null, false, req.flash("signinMessage", "Incorrect Password"));
// 	}
// 	done(null, user);
// }));


// // Configuración del autenticado con Twitter
// passport.use('signup-twitter', new TwitterStrategy({
// 	consumerKey: config.twitter.key,
// 	consumerSecret: config.twitter.secret,
// 	callbackURL: '/auth/twitter/callback'
// }, function (accessToken, refreshToken, profile, done) {
// 	// Busca en la base de datos si el usuario ya se autenticó en otro
// 	// momento y ya está almacenado en ella
// 	User.findOne({ provider_id: profile.id }, function (err, user) {
// 		if (err) throw (err);
// 		// Si existe en la Base de Datos, lo devuelve
// 		if (!err && user != null) return done(null, user);

// 		// Si no existe crea un nuevo objecto usuario
// 		var user = new User({
// 			provider_id: profile.id,
// 			provider: profile.provider,
// 			name: profile.displayName,
// 			photo: profile.photos[0].value
// 		});
// 		//...y lo almacena en la base de datos
// 		user.save(function (err) {
// 			if (err) throw err;
// 			done(null, user);
// 		});
// 	});
// }));

	// Configuración del autenticado con Facebook
passport.use('signup-facebook',new FacebookStrategy({
	clientID: config.facebook.key,
	clientSecret: config.facebook.secret,
	callbackURL: '/auth/client/facebook/callback',
	scope: ['email'],
	profileFields: ['id', 'displayName', /*'provider',*/,'email','photos']
}, async function (accessToken, refreshToken, profile, done) {
	// El campo 'profileFields' nos permite que los campos que almacenamos
	// se llamen igual tanto para si el usuario se autentica por Twitter o
	// por Facebook, ya que cada proveedor entrega los datos en el JSON con
	// un nombre diferente.
	// Passport esto lo sabe y nos lo pone más sencillo con ese campo
	// const security = await Security.findOne({ provider_id: profile.id });
	// 	if (security){
	// 		return done(null, false, req.flash('signupMessage', 'registro ya existe'));
	// 	}else{
	// 		// Al igual que antes, si el usuario ya existe lo devuelve
	// 		// y si no, lo crea y salva en la base de datos
	// 		const newSecurity = new Security({
	// 			provider_id: profile.id,
	// 			provider: profile.provider,
	// 			providerName: profile.displayName,
	// 			photo: profile.photos[0].value
	// 		});
	// 		newSecurity.save(function (err) {
	// 			if (err) throw err;
	// 			done(null, newSecurity);
	// 		});
	// 	}

		SecurityClient.findOne({ provider_id: profile.id }, 'provider_id,provider.providerName,photo',function (err, user) {
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

passport.use('signup-google',new GoogleStrategy({
	clientID: config.google.key,
	clientSecret: config.google.secret,
	//scope: 'https://www.googleapis.com/auth/userinfo.profile',
	scope: [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/plus.login',
		'https://www.googleapis.com/auth/userinfo.email'],
	//scope:'https://www.googleapis.com/auth/gmail.settings.basic',
	callbackURL: "/auth/client/google/callback"
},
	function (accessToken, refreshToken, profile, done) {	
		SecurityClient.findOne({ provider_id: profile.id }, 'provider_id,provider.providerName,photo', function (err, user) {
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




