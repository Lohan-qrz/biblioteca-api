const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/database");
class Autor extends Model {}

Autor.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        nacionalidade: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "Autor",
        tableName: "autores"
    }
);

module.exports = Autor;

