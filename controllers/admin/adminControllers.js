// //DB
// const db = require('../../database/models');;
// const { validationResult } = require('express-validator');
// const Op = db.Sequelize.Op;

// const adminControllers = {
//     createProduct: async function (req, res) {
//             console.log('Entre al creador');
            
//             let categories = await db.Category.findAll();
    
//             let brands = await db.Brand.findAll();
            
//             return res.render('./admin/createProduct', {brands, categories });
                
//         },
    
//         store: async (req, res) => {
    
//             const result = validationResult(req)
//             if (result.errors.length > 0) {
//                 let categories = await db.Category.findAll();
    
//                 let brands = await db.Brand.findAll();
    
//                 return res.render('./admin/createProduct', {brands, categories, errors: result.mapped(), oldData: req.body })
//             }
            
//             if (!req.file) {
//                 req.file = {
//                     filename: 'Default.png'
//                 };
//             }
    
//             await db.Product.create({
//                 name: req.body.name,
//                 description: req.body.description,
//                 stock: req.body.stock,
//                 price: req.body.price,
//                 discount: req.body.discount,
//                 image: req.file.filename,
//                 category_id: req.body.category,
//                 brand_id: req.body.brand
    
//             })
            
//             res.redirect('/');
//         },
//         manage: (req, res) => {
//             console.log('Entre a administrador de producto');
//             db.Product.findByPk(req.params.id, {
//                 include: ['brand', 'category']
//             })
//                 .then(function (product) {
//                     res.render('./admin/manageProduct', { product });
//                 })
//                 .catch(error => console.log(error))
//         },
//      destroyProduct: async (req, res) => {
//         await db.Product.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })

//         res.redirect('/');
//     },
    
// }

// module.exports = adminControllers