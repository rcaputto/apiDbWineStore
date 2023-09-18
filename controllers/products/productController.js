const db = require('../../database/models');
const { Op, where } = require("sequelize");

const apiProductController = {
    listProducts: function (req, res) {
        let dbProducto = db.Producto.findAll();
        let dbMarca = db.Marca.findAll();
        let dbCategoria = db.Categoria.findAll();

        Promise.all([dbProducto, dbMarca, dbCategoria])
            .then(([products, brands, categorias]) => {
                // Crear un mapa de marcas por ID para buscar más eficientemente
                const brandMap = new Map();
                brands.forEach((brand) => {
                    brandMap.set(brand.id_marca, brand);
                });
                const categoriasMap = new Map();
                categorias.forEach((categoria) => {
                    categoriasMap.set(categoria.id_categoria, categoria);
                });

                // Mapear los productos con sus marcas correspondientes
                const productData = products.map((product) => ({
                    id: product.id_producto,
                    name: product.name,
                    descripcion: product.description,
                    price: product.price,
                    image:product.image,
                    categoria: categoriasMap.get(product.id_categoria)?.name || 'Desconocida',
                    marca: brandMap.get(product.id_marca)?.nombre || 'Desconocida'
                }));

                res.json({
                    total: products.length,
                    data: productData,
                    status: 200
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Error interno del servidor' });
            });
    },

    productDetail: function (req, res) {
        const productDetail = db.Producto.findByPk(req.params.id)
        const dbMarca = db.Marca.findAll();
        const dbCategoria = db.Categoria.findAll();

        Promise.all([productDetail, dbMarca, dbCategoria])
            .then(([product, marcas, categorias]) => {
                if (!product) {
                    res.json('El producto no existe')
                } else {
                    const marcasMap = new Map()
                    marcas.forEach((marca) => {
                        marcasMap.set(marca.id_marca, marca)
                    })
                    const categoriasMap = new Map()
                    categorias.forEach((categoria) => {
                        categoriasMap.set(categoria.id_categoria, categoria)
                    })
                    const detalleProducto = {
                        id: product.id_producto,
                        name: product.name,
                        descripcion: product.description,
                        image: product.image,
                        stock: product.stock,
                        price: product.price,
                        marca: marcasMap.get(product.id_marca)?.nombre || 'Marca desconocida',
                        categoria: categoriasMap.get(product.id_categoria)?.nombre || 'Categoria desconocida'
                    }
                    res.json({
                        data: detalleProducto
                    })
                }
            }
            )
    },
    listCategories: function (req, res) {
        db.Categoria
            .findAll()
            .then(category => {
                res.json(
                    {
                        total: category.length,
                        data:
                            category.map((category) => ({
                                id: category.id_categoria,
                                name: category.name,
                                descripcion: category.desc,
                            })),
                        status: 200
                    }
                );
            })
    },
    listBrand: function (req, res) {
        db.Marca
            .findAll()
            .then(brand => {
                res.json(
                    {
                        total: brand.length,
                        data:
                            brand.map((brand) => ({
                                id: brand.id_marca,
                                name: brand.nombre,
                            })),
                        status: 200
                    }
                );
            })
    },
    altaMarca: async (req, res) => {
        try {
            const {name}  = req.body; // Desestructura name desde req.body
            
            console.log('DATOS', req.body);
    
            if (!name) {
                return res.status(400).json({ error: 'Ingrese nombre' }); // Cambia el mensaje de error
            }
    
            await db.Marca.create({
                nombre: name,
            });
    
            res.status(201).json({ mensaje: 'Marca creado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al crear la marca' });
        }
    },
    
    createProduct: async (req, res) => {
        const { name, price, description, stock, id_categoria, id_marca } = req.body
        image = req.file.filename
        console.log ('DATOS', req.body)
        
        if (!name || !price) {
            return res.status(400).json({ error: 'Ingrese nombre y precio' })
        }
        await db.Producto.create({
            name: name,
            description: description,
            stock: stock,
            price: price,
            image: image,
            id_categoria: id_categoria,
            id_marca: id_marca
        })
            .then(
                res.status(201).json({ mensaje: 'Producto creado' })
            )
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Hugo un error al creal el producto' })
            })
    },
    deleteProduct: async (req, res) => {
        try {
            // Utiliza `await` para esperar a que la eliminación se complete antes de enviar una respuesta
            await db.Producto.destroy({
                where: {
                    id_producto: req.params.id
                }
            });
    
            // Envía una respuesta JSON después de eliminar el producto
            res.json('Se eliminó el producto');
        } catch (error) {
            console.error(error);
            // En caso de un error, envía una respuesta de error al cliente
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    

}

module.exports = apiProductController