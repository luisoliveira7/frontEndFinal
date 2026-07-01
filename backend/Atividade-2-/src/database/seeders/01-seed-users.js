'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface) => {
        const senha = await bcrypt.hash('123456', 10);
        await queryInterface.bulkInsert('users', [
            {
                nome: 'Luis Felipe',
                email: 'luis@email.com',
                senha,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};