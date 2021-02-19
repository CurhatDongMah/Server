'use strict';
const {
  Model
} = require('sequelize');
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
    sequelize,
    modelName: 'Client',
  });
  return Client;
};