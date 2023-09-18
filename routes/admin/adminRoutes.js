// // Enrutador de administracion 

// const express = require('express');
// const multer = require ('multer');
// const path = require('path');
// const router = express.Router();
// const adminControllers = require("../../controllers/admin/adminControllers");
// const productValidations = require('../../middlewares/validatorProductsMiddleware');


// // Funcion nativa de multer para redireccionar la imagen y cambiarle el nombre al archivo 
// const storage = multer.diskStorage({ 
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../../public/images/products')); 
//     }, 
//     filename: function (req, file, cb) { 
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  
//     } 
// })
// const upload = multer({storage: storage});

// // Ruta de Creacion de productos 
// router.post("/createProduct", upload.single('product'), productValidations, adminControllers.store);
// router.get("/createProduct", adminControllers.createProduct);

// // Ruta de modifciacion y eliminacion de productos
// router.get('/manageProduct/:id/', adminControllers.manage);
// // router.get('/manageProduct/edit/:id/', adminController.edit);
// // router.put('/manageProduct/edit/:id/', upload.single('avatar'), adminController.update);
// router.delete('/manageProduct/delete/:id/', adminControllers.destroyProduct);

// module.exports = router;