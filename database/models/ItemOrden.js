const config = require("../config/config")

module.exports = function (sequelize, DataTypes) {

    let alias = "ItemOrden"

    let cols = {
        id_item: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_orden: {
            type: DataTypes.INTEGER,
        },
        cantidad: {
            type: DataTypes.INTEGER,
        },
        precioUnitario: {
            type: DataTypes.INTEGER,
        },
        descuento: {
            type: DataTypes.INTEGER,
        },
    }


    let config = {
        tableName: 'itemOrden',
        timestamps: false,
        createdAt:"created_at",
        modifiedAt:"modified_at",
        deletedAt:"deleted_at",
        freezeTableName: true
    }


    let ItemOrden = sequelize.define(alias, cols, config);


    ItemOrden.associate = function (models) {
        ItemOrden.belongsTo(models.Orden, {
            as: "orden",
            foreignKey: "id_orden"
        });
    }

    return ItemOrden;
}