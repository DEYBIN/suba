module.exports= function(req,res,next){
	if (req.session.login) {
		if (req.baseUrl == "/auth" || req.baseUrl == "/login") {
			res.redirect("/dashboard");
		} else {
			return next();
		}
		// return next();
	} else {
		if (req.baseUrl == "/auth" || req.baseUrl == "/login") {
			return next();
		} else {
			res.redirect("/login");
		}
	}
}