const nodemailer = require('nodemailer');
exports= nodemailer.createTransport({
		host: 'webmail.platcont.com',
		secure: false,
		auth: {
			user: 'test@platcont.com',
			pass: 'Cont@123'
		}
});