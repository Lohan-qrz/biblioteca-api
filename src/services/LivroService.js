const livroRepository = require("../repositories/LivroRepository");

class LivroService {
    constructor() {
        this.repository = new livroRepository();
    };

    async criar(dados) {
        return await this.repository.criar(dados);
    };

    async buscarTodos(filtros, page, limit) {
        return await this.repository.buscarTodos(filtros, page, limit);
    };

    async buscarPorId(id) {
        return await this.repository.buscarPorId(id);
    };

    async atualizar(id, dados) {
        return await this.repository.atualizar(id, dados);
    };

    async excluir(id) {
        return await this.repository.excluir(id);
    };

    async adicionarCategoria(livroId, categoriaId) {
        return await this.repository.adicionarCategoria(livroId, categoriaId);
    };
};

module.exports = LivroService;