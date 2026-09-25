const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/database");
class Livro extends Model {}

Livro.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        ano: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        disponivel: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        autorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Livro",
        tableName: "livros"
    }
);

module.exports = Livro;