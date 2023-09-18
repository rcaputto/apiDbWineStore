const config = require("../config/config")

module.exports = function (sequelize, DataTypes) {

    let alias = "Producto"

    let cols = {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },

        id_categoria: {
            type: DataTypes.INTEGER
        },

        stock: {
            type: DataTypes.INTEGER
        },

        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        id_marca: {
            type: DataTypes.INTEGER
        },

        image: {
            type: DataTypes.STRING
        }
    }

    let config = {
        tableName: 'producto',
        timestamps: false,
        createdAt: "created_at",
        modifiedAt: "modified_at",
        deletedAt: "deleted_at",
        freezeTableName: true
    }


    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = (models) => {
        Producto.belongsTo(models.Categoria, {
            foreignKey: 'id_categoria',
            as: 'categoria'
        });
        Producto.belongsTo(models.Marca, {
            foreignKey: 'id_marca',
            as: 'marca'
        });
    };


    return Producto;
}