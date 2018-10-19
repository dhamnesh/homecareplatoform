const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
var secret = 'hdhjkhak-dhamneshbangar-shdkj';
var models  = require('../model');
module.exports = {
  getWeekdays,
  getStatus
};

function getWeekdays(req,res,next){
  models.weekday.findAll().then(weekdays => {
    if(weekdays){
        return res.status(200).send({success: true, weekday: weekdays ,status_code:200 });
    }
  })
  .catch(error => {
    if (error) return res.status(400).send({ error: 'Server error',status_code:400 });
  })
}

function getStatus(req, res, next){
  models.status.findAll().then(statuses => {
    if(statuses){
        return res.status(200).send({success: true, status: statuses ,status_code:200 });
    }
  })
  .catch(error => {
    if (error) return res.status(400).send({ error: 'Server error',status_code:400 });
  })
}
