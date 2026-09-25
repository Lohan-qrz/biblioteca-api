const express = require('express');

const categoriaController = require('../controllers/CategoriaController');
const router = express.Router();


router.post('/', categoriaController.criar)
router.get('/', categoriaController.buscarTodos)
router.get('/:id', categoriaController.buscarPorId)
router.put('/:id', categoriaController.atualizar)
router.delete('/:id', categoriaController.excluir)

module.exports = router;