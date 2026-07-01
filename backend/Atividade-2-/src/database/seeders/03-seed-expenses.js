'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('expenses', [
            {
                descricao: 'Mercado semanal',
                valor: 150.00,
                data: '2026-06-01',
                status: 'PAGA',
                categoriaId: 1,
                usuarioId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                descricao: 'Uber',
                valor: 25.50,
                data: '2026-06-02',
                status: 'PAGA',
                categoriaId: 2,
                usuarioId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                descricao: 'Cinema',
                valor: 40.00,
                data: '2026-06-03',
                status: 'PENDENTE',
                categoriaId: 3,
                usuarioId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('expenses', null, {});
    }
};