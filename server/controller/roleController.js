const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
var secret = 'hdhjkhak-dhamneshbangar-shdkj';
var models  = require('../model');

module.exports = {
    getAllRoles
};

function getAllRoles(req,res,next){
    models.role.findAll().then(roles => {
        if(roles){
            return res.status(200).send({success: true, roles: roles ,status_code:200 });
        }
      })
      .catch(error => {
        if (error) return res.status(400).send({ error: 'Server error',status_code:400 });
      })
}

