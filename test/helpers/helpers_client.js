const { Client, sequelize } = require('../../models')
const { queryInterface } = sequelize;

function clearClients() {
    if (process.env.NODE_ENV === 'test') {
        return Client.destroy({ where: {}})
    }
}

function registerClient() {
    if (process.env.NODE_ENV === 'test') {
        const obj = {
            email: 'tes5@mail.com',
            password: '123123',
            role: 'admin'
        }
        return Client.create(obj)
    }
}

module.exports = { clearClients, registerClient }