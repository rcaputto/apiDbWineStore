const config = require("../config/config")

module.exports = function (sequelize, DataTypes) {

    let alias = "Carrito"

    let cols = {
        id_carrito: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
        },
    }


    let config = {
        tableName: 'carrito',
        timestamps: false,
        createdAt:"created_at",
        modifiedAt:"modified_at",
        deletedAt:"deleted_at",
        freezeTableName: true
    }


    let Carrito = sequelize.define(alias, cols, config);


    Carrito.associate = function (models) {
        Carrito.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "id_usuario"
        });
    }

    return Carrito;
}