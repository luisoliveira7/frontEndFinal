const ExpenseModel = require('../models/expense');
const { Op } = require('sequelize');

function links(id) {
    const base = '/expenses';
    if (id) {
        return [
            { rel: 'self', method: 'GET', href: `${base}/${id}` },
            { rel: 'atualizar', method: 'PUT', href: `${base}/${id}` },
            { rel: 'remover', method: 'DELETE', href: `${base}/${id}` },
            { rel: 'listar', method: 'GET', href: base }
        ];
    }
    return [
        { rel: 'self', method: 'GET', href: base },
        { rel: 'criar', method: 'POST', href: base },
        { rel: 'total', method: 'GET', href: '/dashboard/total-expenses' },
        { rel: 'quantidade', method: 'GET', href: '/dashboard/expenses-count' },
        { rel: 'porCategoria', method: 'GET', href: '/dashboard/expenses-by-category' }
    ];
}

function formatar(expense) {
    return {
        id: expense.id,
        descricao: expense.descricao,
        valor: expense.valor,
        data: expense.data,
        status: expense.status,
        categoriaId: expense.categoriaId,
        usuarioId: expense.usuarioId,
        createdAt: expense.createdAt,
        updatedAt: expense.updatedAt,
        _links: links(expense.id)
    };
}

async function getAll(req, res) {
    const usuarioId = req.user.id;
    const { status, categoriaId, dataInicio, dataFim, valorMin, valorMax } = req.query;

    const where = { usuarioId };

    if (status) where.status = status;
    if (categoriaId) where.categoriaId = categoriaId;
    if (valorMin || valorMax) {
        where.valor = {};
        if (valorMin) where.valor[Op.gte] = Number(valorMin);
        if (valorMax) where.valor[Op.lte] = Number(valorMax);
    }
    if (dataInicio || dataFim) {
        where.data = {};
        if (dataInicio) where.data[Op.gte] = dataInicio;
        if (dataFim) where.data[Op.lte] = dataFim;
    }

    const expenses = await ExpenseModel.getAll(where);
    if (!expenses || expenses.length === 0) {
        return res.status(200).json({ message: "Nenhuma despesa cadastrada", _links: links() });
    }
    return res.status(200).json({ data: expenses.map(formatar), _links: links() });
}

async function getById(req, res) {
    const id = req.params.id;
    const usuarioId = req.user.id;
    const item = await ExpenseModel.getById(id);
    if (!item || item.usuarioId !== usuarioId) {
        return res.status(404).json({ error: "Não encontrado" });
    }
    return res.status(200).json(formatar(item));
}

async function criar(req, res) {
    const { descricao, valor, data, status, categoriaId } = req.body;
    if (!descricao) {
        return res.status(400).json({ error: "Descrição obrigatória" });
    }
    if (!valor || valor <= 0) {
        return res.status(400).json({ error: "Valor inválido" });
    }
    if (!data) {
        return res.status(400).json({ error: "Data obrigatória" });
    }
    if (status && !['PENDENTE', 'PAGA'].includes(status)) {
        return res.status(400).json({ error: "Status inválido, use PENDENTE ou PAGA" });
    }
    const novo = await ExpenseModel.criar({
        descricao,
        valor,
        data,
        status: status || 'PENDENTE',
        categoriaId,
        usuarioId: req.user.id
    });
    return res.status(201).json(formatar(novo));
}

async function atualizar(req, res) {
    const id = req.params.id;
    const usuarioId = req.user.id;
    const item = await ExpenseModel.getById(id);
    if (!item || item.usuarioId !== usuarioId) {
        return res.status(404).json({ error: "Não encontrado" });
    }
    const { valor, status } = req.body;
    if (valor && valor <= 0) {
        return res.status(400).json({ error: "Valor inválido" });
    }
    if (status && !['PENDENTE', 'PAGA'].includes(status)) {
        return res.status(400).json({ error: "Status inválido, use PENDENTE ou PAGA" });
    }
    const atualizado = await ExpenseModel.atualizar(id, req.body);
    return res.status(200).json(formatar(atualizado));
}

async function remover(req, res) {
    const id = req.params.id;
    const usuarioId = req.user.id;
    const item = await ExpenseModel.getById(id);
    if (!item || item.usuarioId !== usuarioId) {
        return res.status(404).json({ error: "Não existe" });
    }
    await ExpenseModel.remover(id);
    return res.status(200).json({ message: "Removido", _links: links() });
}

module.exports = { getAll, getById, criar, atualizar, remover };