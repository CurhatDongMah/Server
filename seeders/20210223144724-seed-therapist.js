const { hashPass } = require("../helpers/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Therapists', [
      {
        fullName: 'dr. Anthony Jonson',
        email: "anthony@email.com",
        password:hashPass('123456'),
        photoUrl:'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
        birthDate: new Date(1967,09,11),
        gender: 'male',
        city:'Jakarta',
        licenseUrl:'https://image.freepik.com/free-vector/elegant-certificate-with-frame-template_23-2148672656.jpg',
        price: 100000,
        status:true,
        about:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: 9
      },
      {
        fullName: 'dr. Mariah Doe',
        email: "mariah@email.com",
        password:hashPass('123456'),
        photoUrl:'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=691&q=80',
        birthDate: new Date(1986,09,10),
        gender: 'female',
        city:'Jakarta',
        licenseUrl:'https://image.freepik.com/free-vector/certificate-template-with-elegant-elements_23-2148568461.jpg',
        price: 200000,
        status:true,
        about:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: 0
      },
      {
        fullName: 'dr. Halimah Rasyid',
        email: "halimah@email.com",
        password:hashPass('123456'),
        photoUrl:'https://images.unsplash.com/photo-1505136022555-39704db312fd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80',
        birthDate: new Date(1966,09,11),
        gender: 'female',
        city:'Jakarta',
        licenseUrl:'https://image.freepik.com/free-vector/elegant-certificate-template_23-2148406556.jpg',
        price: 150000,
        status:true,
        about:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: 0
      },
      {
        fullName: 'dr. Amilia Johnson',
        email: "amilia@email.com",
        password:hashPass('123456'),
        photoUrl:'https://images.unsplash.com/photo-1552457499-7e1eed6893f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80',
        birthDate: new Date(1956,09,11),
        gender: 'female',
        city:'Jakarta',
        licenseUrl:'https://image.freepik.com/free-vector/white-elegant-certificate-template_23-2148402830.jpg',
        price: 80000,
        status:false,
        about:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: 0
      },
      {
        fullName: 'dr. Budi Rahardjo',
        email: "rahardjo@email.com",
        password:hashPass('123456'),
        photoUrl:'https://images.unsplash.com/photo-1604695572035-c8612b4139bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        birthDate: new Date(1990,09,11),
        gender: 'male',
        city:'Jakarta',
        licenseUrl:'https://image.freepik.com/free-vector/elegant-certificate-template_23-2148406556.jpg',
        price: 150000,
        status:false,
        about:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: 8
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Therapists', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
  }
}