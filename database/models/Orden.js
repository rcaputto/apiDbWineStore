const config = require("../config/config")

module.exports = function (sequelize, DataTypes) {

    let alias = "Orden"

    let cols = {
        id_orden: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: DataTypes.STRING,
        },
    }


    let config = {
        tableName: 'orden',
        timestamps: false,
        createdAt:"created_at",
        modifiedAt:"modified_at",
        deletedAt:"deleted_at",
        freezeTableName: true
    }


    let Orden = sequelize.define(alias, cols, config);


    Orden.associate = function (models) {
        Orden.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "id_usuario"
        });
    }

    return Orden;
}