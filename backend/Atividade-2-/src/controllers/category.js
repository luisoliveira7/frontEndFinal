const CategoryModel = require('../models/category');

async function getAll(req, res) {
    const categories = await CategoryModel.getAll();
    if (!categories || categories.length === 0) {
        return res.status(200).json({ message: "Nenhuma categoria cadastrada" });
    }
    return res.status(200).json(categories);
}

async function getById(req, res) {
    const id = req.params.id;
    const category = await CategoryModel.getById(id);
    if (!category) {
        return res.status(404).json({ error: "Não encontrada" });
    }
    return res.status(200).json(category);
}

async function criar(req, res) {
    const { nome, descricao } = req.body;
    if (!nome) {
        return res.status(400).json({ error: "Nome obrigatório" });
    }
    const nova = await CategoryModel.criar({ nome, descricao });
    return res.status(201).json(nova);
}

async function atualizar(req, res) {
    const id = req.params.id;
    const atualizada = await CategoryModel.atualizar(id, req.body);
    if (!atualizada) {
        return res.status(404).json({ error: "Não encontrada" });
    }
    return res.status(200).json(atualizada);
}

async function remover(req, res) {
    const id = req.params.id;
    const ok = await CategoryModel.remover(id);
    if (!ok) {
        return res.status(404).json({ error: "Não existe" });
    }
    return res.status(200).json({ message: "Removida" });
}

module.exports = { getAll, getById, criar, atualizar, remover };