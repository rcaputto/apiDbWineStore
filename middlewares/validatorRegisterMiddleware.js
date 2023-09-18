// Esta funcion valida que los campos del formulario de registro no esten vacios

const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('firstname')
        .notEmpty().withMessage('Tenés que escribir tu nombre').bail()
        .isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastname')
        .notEmpty().withMessage('Tenés que ingresar tu apellido').bail()
        .isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('username').notEmpty().withMessage('Tenés que ingresar tu nombre de usuario'),
    body('email')
        .notEmpty().withMessage('Tenés que ingresar tu email').bail()
        .isEmail().withMessage('No es un email válido'),
    body('pass')
        .notEmpty().withMessage('Tenés que ingresar tu contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('passconfirm')
        .notEmpty().withMessage('Tenés que confirmar tu contraseña').bail()
        .custom((value, { req }) => value === req.body.pass).withMessage('Tus contraseñas no coinciden'),
    body('avatar').custom((value, {req}) => {
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