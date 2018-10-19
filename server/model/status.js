const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
  var status = sequelize.define('status', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
 });
  return status;
}
