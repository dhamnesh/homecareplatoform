const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
  var schedule = sequelize.define('schedule', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },     
    from_date: DataTypes.STRING,
    to_date: DataTypes.STRING,
    start_time: DataTypes.STRING,
    end_time: DataTypes.STRING,
    weekdays: DataTypes.STRING
    //service_provider: DataTypes.INTEGER
 });

schedule.associate = function(models) {
  models.schedule.belongsTo(models.user, {foreignKey: 'service_provider', targetKey: 'id'});
};
  
return schedule;
}