const ExpenseModel = require('../models/expense');
const CategoryModel = require('../models/category');
const { Op } = require('sequelize');

async function totalExpenses(req, res) {
    const usuarioId = req.user.id;
    const expenses = await ExpenseModel.getAll({ usuarioId });
    let total = 0;
    for (let expense of expenses) {
        total += expense.valor;
    }
    return res.status(200).json({ total });
}

async function expensesCount(req, res) {
    const usuarioId = req.user.id;
    const expenses = await ExpenseModel.getAll({ usuarioId });
    return res.status(200).json({ quantidade: expenses.length });
}

async function expensesByCategory(req, res) {
    const usuarioId = req.user.id;
    const expenses = await ExpenseModel.getAll({ usuarioId });
    const categories = await CategoryModel.getAll();

    const resultado = [];

    for (let category of categories) {
        let total = 0;
        for (let expense of expenses) {
            if (expense.categoriaId === category.id) {
                total += expense.valor;
            }
        }
        if (total > 0) {
            resultado.push({ categoria: category.nome, total });
        }
    }

    return res.status(200).json(resultado);
}

module.exports = { totalExpenses, expensesCount, expensesByCategory };