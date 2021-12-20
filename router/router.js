const express = require('express')
const router = express.Router();
const userController = require("../controller/controller");


router.post('/addproduct', userController.addproduct);
router.post("/addcategory",userController.addcategory);
router.get("/:id",userController.getproduct)



module.exports = router;