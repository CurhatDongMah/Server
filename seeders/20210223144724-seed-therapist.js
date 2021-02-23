const { hashPass } = require("../helpers/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Therapists', [
      {
        fullName: 'dr. Anthony Tailor',
        email: "anthony@email.com",
        password:hashPass('123456'),
        photoUrl:'photo url',
        birthDate: new Date(1967,09,11),
        gender: 'male',
        city:'Jakarta',
        licenseUrl:'licenseurl',
        price: 100000,
        status:false,
        about:'What is Lorem Ipsum Lorem Ipsum is simply dummy text',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'dr. Stephanie Brown',
        email: "steph@email.com",
        password:hashPass('123456'),
        photoUrl:'photo url',
        birthDate: new Date(1986,09,10),
        gender: 'female',
        city:'Jakarta',
        licenseUrl:'licenseurl',
        price: 200000,
        status:false,
        about:'What is Lorem Ipsum Lorem Ipsum is simply dummy text',
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
          fullName: 'dr. Halimah Rasyid',
          email: "halimah@email.com",
          password:hashPass('123456'),
          photoUrl:'photo url',
          birthDate: new Date(1966,09,11),
          gender: 'female',
          city:'Jakarta',
          licenseUrl:'licenseurl',
          price: 150000,
          status:false,
          about:'What is Lorem Ipsum Lorem Ipsum is simply dummy text',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullName: 'dr. Puji Lestari',
          email: "lestari@email.com",
          password:hashPass('123456'),
          photoUrl:'photo url',
          birthDate: new Date(1956,09,11),
          gender: 'female',
          city:'Jakarta',
          licenseUrl:'licenseurl',
          price: 80000,
          status:false,
          about:'What is Lorem Ipsum Lorem Ipsum is simply dummy text',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullName: 'dr. Budi Rahardjo',
          email: "rahardjo@email.com",
          password:hashPass('123456'),
          photoUrl:'photo url',
          birthDate: new Date(1990,09,11),
          gender: 'male',
          city:'Jakarta',
          licenseUrl:'licenseurl',
          price: 150000,
          status:false,
          about:'What is Lorem Ipsum Lorem Ipsum is simply dummy text',
          createdAt: new Date(),
          updatedAt: new Date()
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