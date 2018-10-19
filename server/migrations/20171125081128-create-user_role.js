'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_roles', {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          user_id: {
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        role_id: {
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            allowNull: false,
            references: {
                model: 'Roles',
                key: 'id'
            }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_roles');
  }
};