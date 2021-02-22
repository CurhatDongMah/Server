'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Client)
      Order.belongsTo(models.Therapist)
    }
  };
  Order.init({
    ClientId: DataTypes.INTEGER,
    TherapistId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty:{
          msg: 'TherapistId is required'
        }
      }
    },
    status: DataTypes.STRING,
    totalHour: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};