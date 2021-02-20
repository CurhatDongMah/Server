const { Therapist, sequelize } = require('../../models')
const { queryInterface } = sequelize;

function clearTherapists() {
    if (process.env.NODE_ENV === 'test') {
        return Therapist.destroy({ where: {}})
    }
}

function registerTherapist () {
    if (process.env.NODE_ENV === 'test') {
        const obj = {
            fullName: 'budi test',
            email: 'tes@mail.com',
            password: 'tes123',
            photoUrl: 'tyusdgtfu',
            birthDate: new Date(),
            gender: 'male',
            city: 'jakarta',
            licenseUrl: 'asad',
            price: 5000,
            about: 'asdasd'
        }
        return Therapist.create(obj)
    }
}

module.exports = { clearTherapists, registerTherapist }