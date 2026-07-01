const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

router.get('/total-expenses', dashboardController.totalExpenses);
router.get('/expenses-count', dashboardController.expensesCount);
router.get('/expenses-by-category', dashboardController.expensesByCategory);

module.exports = router;