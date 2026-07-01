const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Nome não pode ser vazio' },
            len: { args: [2, 100], msg: 'Nome deve ter entre 2 e 100 caracteres' }
        }
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: { args: [0, 255], msg: 'Descrição deve ter no máximo 255 caracteres' }
        }
    }
});

async function getAll() {
    return await Category.findAll();
}

async function getById(id) {
    return await Category.findByPk(id);
}

async function criar(dados) {
    return await Category.create({ nome: dados.nome, descricao: dados.descricao });
}

async function atualizar(id, dados) {
    const category = await getById(id);
    if (!category) return null;

    category.nome = dados.nome || category.nome;
    category.descricao = dados.descricao || category.descricao;

    await category.save();
    return category;
}

async function remover(id) {
    const category = await getById(id);
    if (!category) return false;

    await category.destroy();
    return true;
}

module.exports = { getAll, getById, criar, atualizar, remover, Category };