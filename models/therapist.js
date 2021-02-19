'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Therapist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Therapist.belongsToMany(models.Client, {
        through: models.Order
      })
      Therapist.belongsToMany(models.Client, {
        through: models.Review
      })
    }
  };
  Therapist.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    gender: DataTypes.STRING,
    city: DataTypes.STRING,
    licenseUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    about: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(therapist){
        therapist.password = hashPass(therapist.password)
      }
    },
    sequelize,
    modelName: 'Therapist',
  });
  return Therapist;
};