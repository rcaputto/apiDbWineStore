
const express = require('express');
const router = express.Router();
const productController = require('../../controllers/users/userController')


router.get('/', productController.listUser);
router.get('/detail/:id', productController.userDetail);


module.exports = router;