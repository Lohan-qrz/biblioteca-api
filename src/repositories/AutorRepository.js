const autor = require("../models/Autor");
class AutorRepository {
    async criar(dados) {
        return await autor.create(dados);
    };

    async buscarTodos() {
        return await autor.findAll();
    };

    async buscarPorId(id) {
        return await autor.findByPk(id);
    };

    async atualizar(id, dados) {
        return await autor.update(dados, {
            where: {
                id: id
            }
        });
    };

    async excluir(id) {
        return await autor.destroy({
            where: {
                id: id
            }
        });
    };
};

module.exports = AutorRepository;