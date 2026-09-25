const categoria = require("../models/Categoria");

class CategoriaRepository {
    async criar(dados) {
        return await categoria.create(dados);
    };

    async buscarTodos() {
        return await categoria.findAll();
    };

    async buscarPorId(id) {
        return await categoria.findByPk(id);
    };

    async atualizar(id, dados) {
        await categoria.update(dados, {
            where: {
                id: id
            }
        });
        return categoria.findByPk(id);
    };

    async excluir(id) {
        return await categoria.destroy({
            where: {
                id: id
            }
        });
    };
};

module.exports = CategoriaRepository;