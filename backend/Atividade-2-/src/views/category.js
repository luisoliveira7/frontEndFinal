const categoryController = require('../controllers/category');

async function getAll(req, res) {
    return categoryController.getAll(req, res);
}

async function getById(req, res) {
    return categoryController.getById(req, res);
}

async function criar(req, res) {
    return categoryController.criar(req, res);
}

async function atualizar(req, res) {
    return categoryController.atualizar(req, res);
}

async function remover(req, res) {
    return categoryController.remover(req, res);
}

module.exports = { getAll, getById, criar, atualizar, remover };