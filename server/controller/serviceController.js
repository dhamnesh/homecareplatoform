const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
var secret = 'hdhjkhak-dhamneshbangar-shdkj';

var models = require('../model');
module.exports = {
    getAllServices,
    deleteUserService,
    addUserService
};

function getAllServices(req,res,next){
    models.service.findAll().then(services => {
        if(services){
            return res.status(200).send({success: true, service: services ,status_code:200 });
        }
      })
      .catch(error => {
        if (error) return res.status(400).send({ error: 'Server error',status_code:400 });
      })
}

function deleteUserService(req, res, next){
    console.log("deleted ")
    var service_id = req.params.service_id;
    var user_id = req.params.user_id;
    models.speciality.destroy({
        where: {
            service_id: service_id,
            user_id: user_id
        }
      })
      .catch(error => {
        if (error) return res.status(400).send({ error: 'Server error',status_code:400 });
      })


    // var con = req.app.get('con');
    // var service_id = req.params.service_id;
    // var user_id = req.params.user_id;
    // var sql = 'DELETE FROM speciality WHERE speciality.service_id = '+ service_id + ' AND speciality.user_id = ' + user_id + '';
    // con.query(sql, function (err, result){
    //     if(err) res.status(400).send({error: 'Server problem', status_code: 200});
    //     if(result){
    //         res.status(200).send({success: true, status_code: 200});
    //     }
    // })
}

function addUserService(req, res, next){
    var con = req.app.get('con');
    var user_id = req.params.user_id;
    var service_id = req.body.service_id;
    var arr = req.body;
    var i = 0;
    if(arr.length > 0){
        checkSevice(0);
        function checkSevice(i){
            if(i < arr.length){
                var sql = 'SELECT * FROM speciality WHERE speciality.user_id='+ user_id + ' AND speciality.service_id='+ arr[i].service_id + '';
                con.query(sql, function (err, result){
                    if(err) res.status(400).send({error: 'Server problem', status_code: 200})
            
                    if(result){
                        if(result.length == 0){
                            var sql2 = 'INSERT INTO speciality (user_id, service_id) VALUES ("'+ user_id +'", "' + arr[i].service_id + '")';
                            con.query(sql2, function (err, speciality) {
                                if(err) res.status(400).send({error: 'Server problem', status_code: 200})

                                if(speciality){
                                    checkSevice(i + 1);
                                }
                            })
                        }
                        else{
                            checkSevice(i + 1);    
                        }
                    }
                })
            }
            else{
                res.status(200).send({success: true, status_code: 200});
            }
        }
    }
    else{
        res.status(200).send({success: true, status_code: 200});
    }
}

