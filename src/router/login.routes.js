const { Router } = require("express");
const router = Router();
router.get("/", (req, res) => {
	res.json({status:200,message:'login'});
});

module.exports = router;
