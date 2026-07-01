const userController = require('../controllers/user');

async function register(req, res) {
    return userController.register(req, res);
}

async function login(req, res) {
    return userController.login(req, res);
}

module.exports = { register, login };