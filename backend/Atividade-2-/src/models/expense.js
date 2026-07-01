const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Descrição não pode ser vazia' },
            len: { args: [2, 255], msg: 'Descrição deve ter entre 2 e 255 caracteres' }
        }
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: { msg: 'Valor deve ser um número' },
            min: { args: [0.01], msg: 'Valor deve ser maior que zero' }
        }
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Data não pode ser vazia' }
        }
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'PAGA'),
        allowNull: false,
        defaultValue: 'PENDENTE',
        validate: {
            isIn: { args: [['PENDENTE', 'PAGA']], msg: 'Status deve ser PENDENTE ou PAGA' }
        }
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});

async function getAll(where) {
    return await Expense.findAll({ where });
}

async function getById(id) {
    return await Expense.findByPk(id);
}

async function criar(dados) {
    return await Expense.create(dados);
}

async function atualizar(id, dados) {
    const expense = await getById(id);
    if (!expense) return null;

    expense.descricao = dados.descricao || expense.descricao;
    expense.valor = dados.valor || expense.valor;
    expense.data = dados.data || expense.data;
    expense.status = dados.status || expense.status;
    expense.categoriaId = dados.categoriaId || expense.categoriaId;

    await expense.save();
    return expense;
}

async function remover(id) {
    const expense = await getById(id);
    if (!expense) return false;

    await expense.destroy();
    return true;
}

module.exports = { getAll, getById, criar, atualizar, remover, Expense };