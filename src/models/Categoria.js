const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
class Categoria extends Model {}

Categoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Categoria",
        tableName: "categorias",
    },
);

module.exports = Categoria;
