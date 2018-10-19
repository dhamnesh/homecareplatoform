const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
//Generate the logs
var log4js = require('log4js');
log4js.configure({
  appenders: { log: { type: 'file', filename: 'application.log' } },
  categories: { default: { appenders: ['log'], level: 'error' } }
});
var loggerLog = log4js.getLogger();
loggerLog.level = 'debug';
var Sequelize = require('sequelize');

var connect = require('./server/connection/mysql-connect');
const app = express();
const mysql = require('mysql2');
var cors = require('cors')
var con;

var models = require('./server/model');
models.sequelize.sync().then(function() {
  var insertData = require('./server/seeder/insert-data');
});


// API file for interacting with MongoDB
const api = require('./server/routes/api');

app.use(cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// // Angular DIST output folder
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'server/assets/uploads/')));

// API location
app.use('/api', api);

// // Send all other requests to the Angular app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
