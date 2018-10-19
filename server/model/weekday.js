const log4js = require('log4js');
const logger = log4js.getLogger('log');

module.exports = (sequelize, DataTypes) => {
    var weekday = sequelize.define('weekday', {
        id:{
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },     
        name: DataTypes.STRING
     }, { timestamps: false});
     return weekday;
}

