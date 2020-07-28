const { Router } = require("express");
const router = Router();

router.get("/",(req,res)=>{
	res.json({ data:req.user});
});
router.get("/login", (req, res) => {
	res.json({status:200,message:'login'});
});

module.exports = router;
