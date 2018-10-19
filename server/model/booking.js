const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
  var booking = sequelize.define('booking', {
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
  });

  booking.associate = function(models) {
    models.booking.belongsTo(models.user, {foreignKey: 'user_id', targetKey: 'id'});
    models.booking.belongsTo(models.schedule, {foreignKey: 'schedule_id', targetKey: 'id'});
  };

  return booking;
}
