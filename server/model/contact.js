const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
  var contact = sequelize.define('contact', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    secondery_email: {
     type: DataTypes.STRING,
     allowNull: true
     },
    home_phone: DataTypes.STRING,
    work_phone: DataTypes.STRING,
    social_security_number: DataTypes.STRING,
    address: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    pincode: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    emergency_contact: DataTypes.STRING
 });
 
 return contact;
}
