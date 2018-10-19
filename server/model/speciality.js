const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
  var speciality = sequelize.define('speciality', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });

  // speciality.associate = function(models) {
  //   models.speciality.belongsTo(models.user, {foreignKey: 'user_id', targetKey: 'id'});
  // };

  return speciality;
}