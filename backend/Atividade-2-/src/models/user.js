const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Email inválido' },
            notEmpty: { msg: 'Email não pode ser vazio' }
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Senha não pode ser vazia' },
            len: { args: [6, 255], msg: 'Senha deve ter pelo menos 6 caracteres' }
        }
    }
});

async function getUserByEmail(email) {
    return await User.findOne({ where: { email } });
}

async function createUser(nome, email, senha) {
    return await User.create({ nome, email, senha });
}

async function getUserById(id) {
    return await User.findByPk(id);
}

module.exports = { getUserByEmail, createUser, getUserById, User };