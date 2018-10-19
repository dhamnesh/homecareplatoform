var Sequelize = require('sequelize');
const log4js = require('log4js');
const logger = log4js.getLogger('log');
var sequelize = new Sequelize('zttest', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
  });
  
var test = sequelize.authenticate()
    .then(function () {
        console.log("connected");
        logger.info('Connected');
        //app.set('seq', sequelize);
    })
    .catch(function (err) {
        console.log("error");
        logger.error(err);
    })
    .done();

module.exports = sequelize;