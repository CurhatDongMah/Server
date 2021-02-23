const { hashPass } = require("../helpers/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [
      {
        fullName: 'John Doe',
        email: "johndoe@email.com",
        password:hashPass('123456'),
        photoUrl:'photo url',
        birthDate: new Date(1996,09,11),
        gender: 'male',
        city:'Jakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Brian Acton',
        email: "actonbrian@email.com",
        password:hashPass('123456'),
        photoUrl:'photo url',
        birthDate: new Date(1996,09,11),
        gender: 'male',
        city:'Bandung',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Bagus Subekti',
        email: "bagus.bagus@email.com",
        password:hashPass('123456'),
        photoUrl:'photo url',
        birthDate: new Date(1999,08,11),
        gender: 'male',
        city:'Jakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Kamila Carolin',
        email: "carolina.kamila@email.com",
        password:hashPass('123456'),
        photoUrl:'photo url',
        birthDate: new Date(1996,09,11),
        gender: 'female',
        city:'Jakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Intan Susanti',
        email: "intan.susanti@email.com",
        password:hashPass('123456'),
        photoUrl:'photo url',
        birthDate: new Date(1996,09,11),
        gender: 'female',
        city:'Yogyakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
  }
}