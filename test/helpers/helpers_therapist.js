const { Therapist, sequelize } = require('../../models')
const { queryInterface } = sequelize;

function clearTherapists() {
    if (process.env.NODE_ENV === 'test') {
        return Therapist.destroy({ where: {}})
    }
}

function registerTherapist1 () {
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

function registerTherapist2 () {
    if (process.env.NODE_ENV === 'test') {
        let therapist2 = {
            fullName: 'meong',
            email: 'meong@mail.com',
            password: '1234',
            photoUrl: 'tyusdgtfu',
            birthDate: new Date(),
            gender: 'male',
            city: 'jakarta',
            licenseUrl: 'asad',
            price: 5000,
            about: 'asdasd'
          }
        return Therapist.create(therapist2)
    }
}

module.exports = { clearTherapists, registerTherapist1, registerTherapist2 }