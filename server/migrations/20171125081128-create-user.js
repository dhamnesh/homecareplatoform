'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      image: {
       type: Sequelize.STRING,
       allowNull: true
       },
      primary_email: Sequelize.STRING,
      first_name: Sequelize.STRING,
      middle_name: {
       type: Sequelize.STRING,
       allowNull: true
       },
      last_name: Sequelize.STRING,
      display_name: Sequelize.STRING,
      dob: Sequelize.STRING,
      gender: Sequelize.STRING,
      company_id: Sequelize.INTEGER(11),
      password_hash: Sequelize.STRING,
      user_name: Sequelize.STRING,
      contact_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'Contacts',
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
    return queryInterface.dropTable('Users');
  }
};