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
      // Therapist.belongsToMany(models.Client, {
      //   through: models.Order
      // })
      // Therapist.belongsToMany(models.Client, {
      //   through: models.Review
      // })
      Therapist.hasMany(models.Order)
      Therapist.hasMany(models.Review)
    }
  };
  Therapist.init({
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
      unique: {
        args: true, 
        msg: 'email is already registered'
      },
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
    },
    licenseUrl: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'licenseUrl is required'
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg:"Minimum price is 0"
        },
        isNumeric: {
          msg:'Price must be a number'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    about: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'about is required'
        }
      }
    },
    rating: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(therapist){
        therapist.password = hashPass(therapist.password)
        therapist.status = false
        therapist.rating = 0
      }
    },
    sequelize,
    modelName: 'Therapist',
  });
  return Therapist;
};