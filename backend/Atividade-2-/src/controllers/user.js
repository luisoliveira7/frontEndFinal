const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');

async function register(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novo = await UserModel.createUser(nome, email, senhaHash);
    return res.status(201).json({ id: novo.id, nome: novo.nome, email: novo.email });
}

async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await UserModel.getUserByEmail(email);

    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        authConfig.jwt.secret,
        { expiresIn: authConfig.jwt.expiresIn }
    );

    return res.status(200).json({ token });
}

module.exports = { register, login };