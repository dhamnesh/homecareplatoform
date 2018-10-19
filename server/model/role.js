const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
  var role = sequelize.define('role', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },     
    name: DataTypes.STRING,
    description: DataTypes.STRING,
 });

role.associate = function(models) {
  models.role.belongsToMany(models.user, { through: { model: models.user_role }, foreignKey: 'role_id' });
};


  return role;
};
































