const categoriaRepository = require("../repositories/CategoriaRepository");

class CategoriaService {
    constructor() {
        this.repository = new categoriaRepository();
    };

    async criar(dados) {
        return await this.repository.criar(dados);
    };

    async buscarTodos() {
        return await this.repository.buscarTodos();
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
};

module.exports = CategoriaService;