const { hashPass } = require("../helpers/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [
      {
        fullName: 'John Doe',
        email: "johndoe@email.com",
        password:hashPass('123456'),
        photoUrl:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
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
        photoUrl:'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
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
        photoUrl:'https://images.unsplash.com/photo-1593757147298-e064ed1419e5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
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
        photoUrl:'https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
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
        photoUrl:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
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