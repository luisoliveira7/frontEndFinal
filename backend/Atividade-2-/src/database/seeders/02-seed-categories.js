'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('categories', [
            {
                nome: 'Alimentacao',
                descricao: 'Gastos com comida e mercado',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Transporte',
                descricao: 'Gastos com transporte e combustivel',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Lazer',
                descricao: 'Gastos com entretenimento',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('categories', null, {});
    }
};