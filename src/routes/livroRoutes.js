const express = require("express");

const livroController = require("../controllers/LivroController");
const router = express.Router();

router.post("/", livroController.criar);
router.post("/:livroId/categorias/:categoriaId", livroController.adicionarCategoria);
router.get("/", livroController.buscarTodos);
router.get("/:id", livroController.buscarPorId);
router.put("/:id", livroController.atualizar);
router.delete("/:id", livroController.excluir);

module.exports = router;
