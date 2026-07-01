const dashboardController = require('../controllers/dashboard');

async function totalExpenses(req, res) {
    return dashboardController.totalExpenses(req, res);
}

async function expensesCount(req, res) {
    return dashboardController.expensesCount(req, res);
}

async function expensesByCategory(req, res) {
    return dashboardController.expensesByCategory(req, res);
}

module.exports = { totalExpenses, expensesCount, expensesByCategory };