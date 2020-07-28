const securityCtrl = {};
securityCtrl.getsSecurity = (req, res) => res.json({ status: 200 });
securityCtrl.postSecurity = (req, res) => res.json({ status: 200 });

securityCtrl.getSecurity = (req, res) => res.json({ status: 200 });
securityCtrl.putSecurity = (req, res) => res.json({ status: 200 });
securityCtrl.deleteSecurity = (req, res) => res.json({ status: 200 });

securityCtrl.getSecuritySuccess = function(req, res) {
	req.session.login=true;
	res.json({ status: 200, message: 'success', data: req.user})
};
securityCtrl.getSecurityError = (req, res) => res.json({ status: 404, message:'error', data: []});
securityCtrl.getSecurityErrorRegistro = (req, res) => res.json({ status: 404, message:'Ya Existe Registro'});

module.exports = securityCtrl;