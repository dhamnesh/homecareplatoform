const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    image: {
     type: DataTypes.STRING,
     allowNull: true
     },
    primary_email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    middle_name: {
     type: DataTypes.STRING,
     allowNull: true
     },
    last_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.STRING,
    user_name: DataTypes.STRING,
    company_id: DataTypes.INTEGER(11),
    password_hash: DataTypes.STRING
    // speciality: DataTypes.STRING
    //contact_id: Sequelize.INTEGER(11)
 });

  user.associate = function(models) {
    models.user.belongsTo(models.contact, {foreignKey: 'contact_id', targetKey: 'id'});
    models.user.hasMany(models.schedule, {foreignKey: 'service_provider'});
    models.user.belongsToMany(models.role, { through: { model: models.user_role }, foreignKey: 'user_id' });
    models.user.belongsToMany(models.service, { through: { model: models.speciality }, foreignKey: 'user_id' });
  };

  return user;
};






















