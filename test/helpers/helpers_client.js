const { Client, Order, sequelize } = require('../../models')
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

function createOrder(TherapistId) {
    if (process.env.NODE_ENV === 'test') {
        const obj = {
            TherapistId
        }
        return Order.create(obj)
    }
}

function clearOrders() {
    if (process.env.NODE_ENV === 'test') {
        return Order.destroy({ where: {}})
    }
}

function registerClient2() {
    if (process.env.NODE_ENV === 'test') {
        const obj = {
          fullName: 'meww',
          email: 'akutidakgila@mail.com',
          password: 'tes123',
          photoUrl: 'tyusdgtfu',
          birthDate: new Date('2001-04-01'),
          gender: 'male',
          city: 'jakarta'
        }
        return Client.create(obj)
    }
}


module.exports = { registerClient2, clearClients, registerClient, createOrder, clearOrders }