const config = require("../config/config")

module.exports = function (sequelize, DataTypes) {

    let alias = "Usuarios"

    let cols = {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING,
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
        },
        ciudad: {
            type: DataTypes.STRING,
        },
        codigoPostal: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        admin: {
            type: DataTypes.INTEGER
        },
        
       is_active: {
            type:  DataTypes.INTEGER
        },

        tipo: {
            type: DataTypes.STRING,
        },
        created_at:{
            type: DataTypes.DATE
        }
    }

    let config = {
        tableName: 'usuarios',
        timestamps: false,
        createdAt:"created_at",
        modifiedAt:"modified_at",
        deletedAt:"deleted_at",
        freezeTableName: true
    }


    let Usuarios = sequelize.define(alias, cols, config);


    // Users.associate = function (models) {
    //     Users.belongsTo(models.Carts, {
    //         as: "carts",
    //         foreignKey: "carts_id"
    //     });
        
    // }

    return Usuarios;
}