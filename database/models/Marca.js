

module.exports = function (sequelize, DataTypes) {

    let alias = "Marca"

    let cols = {
        id_marca: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }


    let config = {
        tableName: 'marca',
        timestamps: false,
        createdAt:"created_at",
        modifiedAt:"modified_at",
        deletedAt:"deleted_at",
        freezeTableName: true

    }

    let Marca = sequelize.define(alias, cols, config);

    Marca.associate = function (models) {
        Marca.hasMany(models.Producto, {
            foreignKey: 'id_producto',
            as: 'productos'
        });
    }


    return Marca;
}
