'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.belongsToMany(models.Therapist, {
        through: models.Order
      })
      Client.belongsToMany(models.Therapist, {
        through: models.Review
      })
    }
  };
  Client.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    gender: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(client){
        client.password = hashPass(client.password)
      }
    },
    sequelize,
    modelName: 'Client',
  });
  return Client;
};