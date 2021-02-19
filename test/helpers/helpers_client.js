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
          fullName: 'budi test',
          email: 'tes@mail.com',
          password: 'tes123',
          photoUrl: 'tyusdgtfu',
          birthDate: new Date('2001-04-01'),
          gender: 'male',
          city: 'jakarta'
        }
        return Client.create(obj)
    }
}

module.exports = { clearClients, registerClient }