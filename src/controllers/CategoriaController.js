const categoriaService = require("../services/CategoriaService");

class CategoriaController {
    constructor() {
        this.service = new categoriaService();
        this.criar = this.criar.bind(this);
        this.buscarTodos = this.buscarTodos.bind(this);
        this.buscarPorId = this.buscarPorId.bind(this);
        this.atualizar = this.atualizar.bind(this);
        this.excluir = this.excluir.bind(this);
    }

    async criar(req, res) {
        try {
            const categoria = await this.service.criar(req.body);
            res.status(201).json(categoria);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao criar categoria"
            });
        };
    };

    async buscarTodos(req, res) {
        try{
            const resultado = await this.service.buscarTodos();
            res.json(resultado);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao buscar todas as categorias"
            });
        };
    };

    async buscarPorId(req, res) {
        try {
            const categoria = await this.service.buscarPorId(req.params.id);

            if (!categoria) {
                return res.status(404).json({
                    erro: "Categoria não encontrada"
                });
            };

            res.json(categoria);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao buscar categoria por ID"
            });
        };
    };

    async atualizar(req, res) {
        try {
            const resultado = await this.service.atualizar(req.params.id, req.body);

            res.json(resultado);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao atualizar categoria"
            });
        };
    };

    async excluir(req, res) {
        try {
            const resultado = await this.service.excluir(req.params.id);

            res.json(resultado);
        } catch(error) {
            res.status(500).json({
                erro: "Erro ao excluir categoria"
            });
        };
    };
};

module.exports = new CategoriaController();