const autorService = require("../services/AutorService");

class AutorController {
    constructor() {
        this.service = new autorService();
        this.criar = this.criar.bind(this);
        this.buscarTodos = this.buscarTodos.bind(this);
        this.buscarPorId = this.buscarPorId.bind(this);
        this.atualizar = this.atualizar.bind(this);
        this.excluir = this.excluir.bind(this);
    };

    async criar(req, res) {
        try {
            const autor = await this.service.criar(req.body);
            res.status(201).json(autor);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao criar autor"
            });
        };
    };

    async buscarTodos(req, res) {
        try {
            const resultado = await this.service.buscarTodos();
            res.json(resultado);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao buscar todos os autores",
                detalhe: error.message
            });
        };
    };

    async buscarPorId(req, res) {
        try {
            const autor = await this.service.buscarPorId(req.params.id);

            if (!autor) {
                return res.status(404).json({
                    erro: "Autor não encontrado"
                });
            };

            res.json(autor);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao buscar autor por ID"
            });
        };
    };

    async atualizar(req, res) {
        try {
            const resultado = await this.service.atualizar(req.params.id, req.body);

            res.json(resultado);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao atualizar autor",
                detalhe: error.message
            });
        };
    };

    async excluir(req, res) {
        try {
            await this.service.excluir(req.params.id);

            res.status(204).send();
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao excluir autor"
            });
        };
    };
};

module.exports = new AutorController();