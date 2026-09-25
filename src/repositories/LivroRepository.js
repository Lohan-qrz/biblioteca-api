const { livro, autor, categoria } = require("../models");
const { Op } = require("sequelize");

class LivroRepository {
    async criar(dados) {
        return await livro.create(dados);
    }

    async buscarTodos(filtros = {}, page = 1, limit = 10) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = {
                [Op.like]: `%${filtros.titulo}%`,
            };
        }

        if (filtros.ano) {
            where.ano = Number(filtros.ano);
        }

        if (filtros.disponivel !== undefined) {
            where.disponivel = filtros.disponivel === "true";
        }

        const offset = (page - 1) * limit;

        return await livro.findAndCountAll({
            where,
            include: [autor, categoria],
            limit,
            offset,
        });
    }

    async buscarPorId(id) {
        return await livro.findByPk(id, {
            include: [autor, categoria],
        });
    }

    async atualizar(id, dados) {
        await livro.update(dados, {
            where: {
                id: id,
            },
        });
        return await livro.findByPk(id);
    }

    async excluir(id) {
        return await livro.destroy({
            where: {
                id: id,
            },
        });
    }

    async adicionarCategoria(livroId, categoriaId) {
        const livroEncontrado = await livro.findByPk(livroId);
        const categoriaEncontrada = await categoria.findByPk(categoriaId);

        if (!livroEncontrado || !categoriaEncontrada) {
            return null;
        }

        await livroEncontrado.addCategoria(categoriaEncontrada);

        return livroEncontrado;
    }
}

module.exports = LivroRepository;
