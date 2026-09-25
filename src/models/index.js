const autor = require("./Autor");
const livro = require("./Livro");
const categoria = require("./Categoria");

autor.hasMany(livro, {
    foreignKey: "autorId"
});

livro.belongsTo(autor, {
    foreignKey: "autorId"
});

livro.belongsToMany(categoria, {
    through: "livro_categorias"
});

categoria.belongsToMany(livro, {
    through: "livro_categorias"
});

module.exports = {
    autor,
    livro,
    categoria
};