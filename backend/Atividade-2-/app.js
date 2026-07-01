const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models/db');
const authMiddleware = require('./src/middlewares/auth');
require('./src/models/associations');

const userRoutes = require('./src/routes/user');
const authRoutes = require('./src/routes/auth');
const categoryRoutes = require('./src/routes/category');
const expenseRoutes = require('./src/routes/expense');
const dashboardRoutes = require('./src/routes/dashboard');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use(authMiddleware);

app.use('/categories', categoryRoutes);
app.use('/expenses', expenseRoutes);
app.use('/dashboard', dashboardRoutes);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando em http://localhost:3000");
    });
});