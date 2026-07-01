const { User } = require('./user');
const { Category } = require('./category');
const { Expense } = require('./expense');

User.hasMany(Expense, {
    foreignKey: 'usuarioId',
    as: 'expenses'
});

Expense.belongsTo(User, {
    foreignKey: 'usuarioId',
    as: 'usuario'
});

Category.hasMany(Expense, {
    foreignKey: 'categoriaId',
    as: 'expenses'
});

Expense.belongsTo(Category, {
    foreignKey: 'categoriaId',
    as: 'category'
});