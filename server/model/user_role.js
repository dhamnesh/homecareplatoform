const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
    var user_role = sequelize.define('user_role', {
        id:{
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        }
     });
  
    //  user_role.associate = function(models) {
    //   models.user_role.belongsTo(models.user, {foreignKey: 'user_id', targetKey: 'id'});
    //   models.user_role.belongsTo(models.role, {foreignKey: 'role_id', targetKey: 'id'});
    // };
  
    return user_role;
}


