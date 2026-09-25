const livroService = require("../services/LivroService");

class LivroController {
    constructor() {
        this.service = new livroService();
        this.criar = this.criar.bind(this);
        this.buscarTodos = this.buscarTodos.bind(this);
        this.buscarPorId = this.buscarPorId.bind(this);
        this.atualizar = this.atualizar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.adicionarCategoria = this.adicionarCategoria.bind(this);
    }

    async criar(req, res) {
        try {
            const livro = await this.service.criar(req.body);
            res.status(201).json(livro);
        } catch (error){
            res.status(500).json({
                erro: "Erro ao criar livro"
            });
        };
    };

    async buscarTodos(req, res) {
        try {
            const filtros = {
                titulo: req.query.titulo,
                ano: req.query.ano,
                disponivel: req.query.disponivel
            };

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const resultado = await this.service.buscarTodos(filtros, page, limit);

            const totalPaginas = Math.ceil(resultado.count/limit);

            res.json({
                livros: resultado.rows,
                paginaAtual: page,
                limite: limit,
                totalLivros: resultado.count,
                totalPaginas: totalPaginas
            });
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao buscar todos os livros",
            });
        };
    };

    async buscarPorId(req, res) {
        try {
            const livro = await this.service.buscarPorId(req.params.id);

            if (!livro) {
                return res.status(404).json({
                    erro: "Livro não encontrado"
                });
            };

            res.json(livro);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao buscar livro por ID"
            });
        };
    };

    async atualizar(req, res) {
        try {
            const resultado = await this.service.atualizar(req.params.id, req.body);

            res.json(resultado);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao atualizar livro"
            });
        };
    };

    async excluir(req, res) {
        try {
            await this.service.excluir(req.params.id);

            res.status(204).send();
        } catch(error) {
            res.status(500).json({
                error: "Erro ao excluir livro"
            });
        };
    };

    async adicionarCategoria(req, res) {
        try {
            const resultado = await this.service.adicionarCategoria(req.params.livroId, req.params.categoriaId);

            if (!resultado) {
                return res.status(404).json({
                    erro: "Livro ou categoria não encontrado"
                });
            };

            res.json(resultado);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao adicionar categoria",
                detalhe: error.message
            });
        };
    };
};

module.exports = new LivroController();