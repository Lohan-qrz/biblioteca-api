const sequelize = require("./config/database");
const express = require("express");

const autorRoutes = require('./routes/autorRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const livroRoutes = require('./routes/livroRoutes');

const app = express();

app.use(express.json());
app.use('/autores', autorRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/livros', livroRoutes);


async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log("Banco conectado!");

        app.listen(3000, () => {
            console.log("Servidor rodando em http://localhost:3000");
        });

    } catch (error) {
        console.error("Erro:", error);
    }
}

iniciarServidor();