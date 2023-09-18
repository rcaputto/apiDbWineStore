const config = require("../config/config")

module.exports = function (sequelize, DataTypes) {

    let alias = "ItemCarrito"

    let cols = {
        id_item: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_carrito: {
            type: DataTypes.INTEGER,
        },
        id_producto: {
            type: DataTypes.INTEGER,
        },
        cantidad:{ 
            type: DataTypes.INTEGER,
        },
    }


    let config = {
        tableName: 'itemCarrito',
        timestamps: false,
        createdAt:"created_at",
        modifiedAt:"modified_at",
        deletedAt:"deleted_at",
        freezeTableName: true
    }


    let ItemCarrito = sequelize.define(alias, cols, config);


    ItemCarrito.associate = function (models) {
        ItemCarrito.belongsTo(models.Carrito, {
            as: "carrito",
            foreignKey: "id_carrito"
        });
        ItemCarrito.hasMany(models.Producto, {
            as: "itemCarrito",
            foreignKey: "id_producto"
        });
    }

    return ItemCarrito;
}