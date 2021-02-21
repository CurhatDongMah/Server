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
      // Client.belongsToMany(models.Therapist, {
      //   through: models.Order
      // })
      // Client.belongsToMany(models.Therapist, {
      //   through: models.Review
      // })
      Client.hasMany(models.Order)
      Client.hasMany(models.Review)
    }
  };
  Client.init({
    fullName: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'fullName is required'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'email is required'
        },
        isEmail: {
          msg: 'must be an email format'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'password is required'
        }
      }
    },
    photoUrl: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'photoUrl is required'
        }
      }
    },
    birthDate: {
      type:DataTypes.DATE,
      validate: {
        notEmpty:{
          msg: 'birthDate is required'
        }
      }
    },
    gender: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'gender is required'
        }
      }
    },
    city: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'city is required'
        }
      }
    }
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