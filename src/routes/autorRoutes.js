const express = require("express");

const autorController = require("../controllers/AutorController");
const router = express.Router();

router.post("/", autorController.criar);
router.get("/", autorController.buscarTodos);
router.get("/:id", autorController.buscarPorId);
router.put("/:id", autorController.atualizar);
router.delete("/:id", autorController.excluir);

module.exports = router;
