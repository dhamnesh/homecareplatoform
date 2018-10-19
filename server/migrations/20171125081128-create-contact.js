'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contacts', {
        id:{
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          secondery_email: {
           type: Sequelize.STRING,
           allowNull: true
           },
          home_phone: Sequelize.STRING,
          work_phone: Sequelize.STRING,
          social_security_number: Sequelize.STRING,
          address: Sequelize.STRING,
          address2: Sequelize.STRING,
          city: Sequelize.STRING,
          pincode: Sequelize.STRING,
          state: Sequelize.STRING,
          country: Sequelize.STRING,
          emergency_contact: Sequelize.STRING,
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
    return queryInterface.dropTable('Contacts');
  }
};