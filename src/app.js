const express =require('express');
const app = express();
const path = require('path');
const cors =require('cors');
const morgan=require('morgan');
const passport =require('passport');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
let redisClient;
if (process.env.REDISCLOUD_URL) {
	let redisURL = url.parse(process.env.REDISCLOUD_URL);
	redisClient = redis.createClient(redisURL, { no_ready_check: true });
} else {
	redisClient = redis.createClient();
}
// const redisClient = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true });

const flash = require('connect-flash');


// const isAuthenticated = require('./middleware/authenticated');


//settings
app.set('port',process.env.PORT||4000);
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(morgan('dev'));//muestra en consola peticiones del cliente
app.use(cors());
app.use(express.json());//pasear peticiones json
app.use(express.urlencoded({ extended: true }));



// Configurar cabeceras y cors
//header("Access-Control-Allow-Origin:http://platcont.com")
// // // app.use((req, res, next) => {
// // // 	// res.header('Access-Control-Allow-Origin', 'http://app.platcont.app.com:8080');
// // // 	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// // // 	// Website you wish to allow to connect
// // // 	res.setHeader('Access-Control-Allow-Origin', 'http://app.platcont.app.com:8080');

// // // 	// Request methods you wish to allow
// // // 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// // // 	// Request headers you wish to allow
// // // 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// // // 	// Set to true if you need the website to include cookies in the requests sent
// // // 	// to the API (e.g. in case you use sessions)
// // // 	res.setHeader('Access-Control-Allow-Credentials', true);
// // // 	res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
// // // 	next();
// // // });
// app.use(session({
// 	secret:'MySecret$ession@',
// 	resave: false,
// 	saveUninitialized: false
// }));
app.use(session({
	store: new RedisStore({ client: redisClient}),
	secret: 'Redis$ecretP@ssword2020',
	resave: false,
	saveUninitialized: false
}));
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// app.use((req,res,next)=>{
// 	res.locals.user=req.user||null;
// 	next();
// });


function isAuthenticated(req, res, next) {	
	if (req.session.login) {
		if (req.baseUrl == "/auth" || req.baseUrl == "/login") {
			res.redirect("/dashboard");
		} else {
			return next();
		}
		// return next();
	}else{
		if (req.baseUrl == "/auth" || req.baseUrl == "/login") {
			return next();
		} else {
			res.redirect("/login");
		}
	}

}

// function isAuthenticated(req, res, next) {	
// 	if (req.isAuthenticated()) {
// 		if (req.baseUrl == "/auth") {
// 			res.redirect("/");
// 		} else {
// 			return next();
// 		}
// 		return next();
// 	}else{
// 		if (req.baseUrl == "/auth") {
// 			return next();
// 		} else {
// 			res.redirect("/");
// 		}
// 	}
	
// }


//routers

app.use("/login", isAuthenticated,require("./router/login.routes"));
app.use("/auth",isAuthenticated,require("./router/security.routes"));
app.use("/logout",require("./router/logout.routes"));
// app.use("/logout", require("./router/logout"));
// app.use("/api/clients", isAuthenticated,require("./router/client"));
// app.use("/api/users", isAuthenticated,require("./router/users"));
// app.use("/api/notes", isAuthenticated,require("./router/notes"));
app.use("/dashboard", isAuthenticated, require("./router/raiz.routes"));


//variables globales
app.use((req,res,next)=>{
	// res.locals.driver=req.flash('driver');
	res.locals.user=req.user || null;
	next();
});

//validacion de codigo

//logger
	



module.exports=app;