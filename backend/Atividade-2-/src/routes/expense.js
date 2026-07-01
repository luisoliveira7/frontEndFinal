const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getById);
router.post('/', expenseController.criar);
router.put('/:id', expenseController.atualizar);
router.delete('/:id', expenseController.remover);

module.exports = router;