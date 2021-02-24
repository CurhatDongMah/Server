'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      TherapistId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Therapists',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      rating: {
        type: Sequelize.FLOAT
      },
      review: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};