// Esta funcion valida que los campos del formulario de login no esten vacios
const { body } = require('express-validator');

const validations = [
    body('user').notEmpty().withMessage('Tenés que ingresar tu nombre de usuario'),
    body('pass').notEmpty().withMessage('Tenés que ingresar tu contraseña')
]

module.exports = validations;