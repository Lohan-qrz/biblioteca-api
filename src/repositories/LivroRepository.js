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

    // ...
}

module.exports = LivroRepository;
