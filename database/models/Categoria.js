const config = require("../config/config")

module.exports = function (sequelize, DataTypes) {

    let alias = "Categoria"

    let cols = {
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }


    let config = {
        tableName: 'categoria',
        timestamps: false,
        createdAt:"created_at",
        modifiedAt:"modified_at",
        deletedAt:"deleted_at",
        freezeTableName: true
    }


    let Categoria = sequelize.define(alias, cols, config);


    Categoria.associate = function (models) {
        Categoria.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "id_producto"
        });
    }

    return Categoria;
}