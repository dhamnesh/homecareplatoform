const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
  var service = sequelize.define('service', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    description: DataTypes.STRING,
 });

 service.associate = function(models) {
  models.service.belongsToMany(models.user, { through: { model: models.speciality }, foreignKey: 'service_id' });
};

 return service;
}


