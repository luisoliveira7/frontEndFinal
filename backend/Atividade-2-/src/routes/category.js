const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.criar);
router.put('/:id', categoryController.atualizar);
router.delete('/:id', categoryController.remover);

module.exports = router;