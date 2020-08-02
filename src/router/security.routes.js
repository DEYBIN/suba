const { Router } = require("express");
const router = Router();
const passport = require('passport');
const {
	getSecuritySuccess,
	getSecurityError,
	getSecurityErrorRegistro
} = require("../controller/security.controller");



router.route("/driver/facebook").get(passport.authenticate('signup-facebook-driver'));

router.route("/driver/facebook/callback").get(passport.authenticate('signup-facebook-driver', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/error',
	passReqToCallback: true
}));


router.route("/driver/google").get(passport.authenticate('signup-google-driver'));

router.route("/driver/google/callback").get(passport.authenticate('signup-google-driver', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/error',
	passReqToCallback: true
}));





router.route("/client/facebook").get(passport.authenticate('signup-facebook'));

router.route("/client/facebook/callback").get(passport.authenticate('signup-facebook', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/error',
		passReqToCallback: true
}));


router.route("/client/google").get(passport.authenticate('signup-google'));

router.route("/client/google/callback").get(passport.authenticate('signup-google', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/error',
	passReqToCallback: true
}));


router.route("/driver/signup").post(passport.authenticate('signup-driver',{
	successRedirect: '/auth/success',
	failureRedirect: '/auth/error-registro',
	// failureMessage: message,
	passReqToCallback: true
}));
router.route("/driver/login").post(passport.authenticate('login-driver', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/error',
	passReqToCallback: true
}));

router.route("/client/signup").post(passport.authenticate('signup-client', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/error-registro',
	// failureMessage: message,
	passReqToCallback: true
}));
router.route("/client/login").post(passport.authenticate('login-client', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/error',
	passReqToCallback: true
}));

router.route("/success").get(getSecuritySuccess);
router.route("/error").get(getSecurityError);
router.route('/error-registro').get(getSecurityErrorRegistro);
// router.route("/:id").get(getSecurity).put(putSecurity).delete(deleteSecurity);


module.exports = router;
