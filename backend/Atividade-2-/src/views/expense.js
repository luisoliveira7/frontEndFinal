const expenseController = require('../controllers/expense');

async function getAll(req, res) {
    return expenseController.getAll(req, res);
}

async function getById(req, res) {
    return expenseController.getById(req, res);
}

async function criar(req, res) {
    return expenseController.criar(req, res);
}

async function atualizar(req, res) {
    return expenseController.atualizar(req, res);
}

async function remover(req, res) {
    return expenseController.remover(req, res);
}

module.exports = { getAll, getById, criar, atualizar, remover };