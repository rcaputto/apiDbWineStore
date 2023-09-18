
const express = require('express');
const router = express.Router();
const productController = require('../../controllers/products/productController')
const productValidations = require('../../middlewares/validatorProductsMiddleware');
const multer = require ('multer');
const path = require ('path')


const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/products')); 
       
    }, 
    filename: function (req, file, cb) { 
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  
        
        } 
    })
    const upload = multer({storage: storage});

    
    router.get('/categories/', productController.listCategories);

    //Controladores de marca
router.get('/brand/', productController.listBrand);
router.post('/altaMarca/', productController.altaMarca);

//Controladores de producto 
router.get('/', productController.listProducts);
router.get('/productDetail/:id', productController.productDetail);
router.post('/newProduct/', upload.single('image'), productValidations, productController.createProduct);
router.get('/delete/:id', productController.deleteProduct)

module.exports = router;