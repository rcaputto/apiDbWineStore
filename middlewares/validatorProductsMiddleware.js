// // Esta funcion valida que los campos del formulario de productos no esten vacios

const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('brand')
        .notEmpty().withMessage('Tenés que seleccionar la marca del producto'),
    body('name')
        .notEmpty().withMessage('Tenés que ingresar el nombre del producto').bail()
        .isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    body('category').notEmpty().withMessage('Tenés que seleccionar la categoría del producto'),
    body('stock').notEmpty().withMessage('Tenés que ingresar el stock del producto'),
    body('price')
        .notEmpty().withMessage('Tenés que ingresar el precio del producto'),
    body('description')
        .notEmpty().withMessage('Tenés que ingresar la descripción del producto').bail()
        .isLength({min: 20}).withMessage('La descripción del producto debe tener al menos 20 caracteres'),
    body('image').custom((value, {req}) => {
        let file = req.file
        
        let acceptedExtensions = ['.jpeg', '.jpg', '.png', '.gif'];
        if(!file){
            return true;
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]

module.exports = validations;