const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
var secret = 'hdhjkhak-dhamneshbangar-shdkj';
var generator = require('generate-password');
var path = require('path');
var multer  = require('multer');
var upload = multer({ dest: '../assets/uploads/img/' });
var models  = require('../model');
var async = require('async');

module.exports = {
    getAllUsers,
    createUsers,
    getUserById,
    updateUser,
    getAllVisits
};

function getAllUsers(req,res,next){  
    models.user.findAll({include: [
            {model: models.contact},
            {model: models.schedule},
            {model: models.role},
            {model: models.service}
        ]
    })
    .then(users => {
        if(users){
            return res.status(200).send({ sucess:true, user: users, status_code:200 });
        }
      })
      .catch(error => {
          console.log(error);
        if (error) return res.status(400).send({ error: 'Server error',status_code:400 });
      })
}

function updateUser(req, res, next){
    var user_id = req.params.user_id;
    var secondery_email = req.body.contact.secondery_email;
    var home_phone = req.body.contact.home_phone;
    var work_phone = req.body.contact.work_phone;
    var social_security_number = req.body.contact.social_security_number;
    var address = req.body.contact.address;
    var address2 = req.body.contact.address2;
    var city = req.body.contact.city;
    var state = req.body.contact.state;
    var country = req.body.contact.country;
    var emergency_contact = req.body.contact.emergency_contact;
    models.contact.update({   
            home_phone: home_phone,
            work_phone: work_phone,
            social_security_number: social_security_number,
            address: address,
            address2: address2,
            city: city,
            state: state,
            country: country,
            emergency_contact: emergency_contact
         },
        { where: { id: req.body.contact.id } 
    })
    .then(result =>{
        var primary_email = req.body.primary_email;
        var first_name = req.body.first_name;
        var middle_name = req.body.middle_name;
        var last_name = req.body.last_name;
        var display_name = req.body.display_name;
        var dob = req.body.dob;
        var gender = req.body.gender;
        var user_name = req.body.user_name;
            models.user.update({   
                primary_email: primary_email,
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                display_name: display_name,
                dob: dob,
                gender: gender,
                user_name: user_name
            },
            { where: { id: req.body.id } 
        })
        .then(response => {
            var _scheduleadduserid = req.body.schedules;
            for(var z = 0; z < _scheduleadduserid.length; z++){
                _scheduleadduserid[z].service_provider = req.body.id;
            }
            var updatespeciality =  updateSpeciality(req.body.services);
            updatespeciality.then(res2=>{
                if(req.body.schedules.length > 0){
                    updateavailability = updateAvailability(_scheduleadduserid);
                    updateavailability.then(resavail=>{
                        return res.status(200).send({success: true, status_code: 200});
                    }).catch(err=>{
                        if(err) {
                            console.log(err);
                            return res.status(400).send({ error: 'server error',status_code:400 })
                        };
                    });
                }
                else{
                    return res.status(200).send({success: true, status_code: 200});
                }  
            }).catch(err=>{
                if(err) {
                    console.log(err);
                    return res.status(400).send({ error: 'server error',status_code:400 })
                };
            });
        })
        .catch(err =>{
            if(err) res.status(400).send({error: 'Server error', status_code: 400})
        })       
    })
    .catch(err =>{
        if(err) res.status(400).send({error: 'Server error', status_code: 400})
    })  
}
function updateAvailability(avail){
    return new Promise(function (resolve, reject){
        models.schedule.bulkCreate(avail)
        .then(response => { 
            resolve({success: true, status_code:200 });
        })
        .catch(error => {
            console.log(error);
            reject({ error: 'Server error',status_code:400 });
        })
    })
}

function updateSpeciality(specialities){
    // console.log("called the functions");
    // console.log(specialities);
    var count = 0;
    return new Promise(function (resolve, reject){
        var i = 0;                      
        updateSpec(0);
        function updateSpec(i){
            if(i < specialities.length){
                models.speciality.findOne({where: {service_id: specialities[i].service_id, user_id: specialities[i].user_id}}).then(function (foundItem) {
                    if (!foundItem) {
                       // console.log ("not found then insert");
                        // Item not found, create a new one
                        models.speciality.create({
                            service_id: specialities[i].service_id,
                            user_id: specialities[i].user_id
                        })
                        .then(resspeciality=>{
                           // console.log("new insert");
                            updateSpec(i + 1);
                        }).catch(err=>{
                            console.log(err);
                            if(err) reject({ error: 'Server error',status_code:400 });
                        });
                    }else{
                        //console.log("already present");
                        updateSpec(i + 1);
                    }
                })
                .catch(err => {
                    console.log(err);
                    if(err) reject({ error: 'Server error',status_code:400 });
                });
            }else{
                resolve({success: true, status_code:200 });
            }
        }
    })
}

function getUserById(req, res, next){
    var userId = req.params.user_id;
    // console.log("userId>>>>>" + userId);
    models.user.findAll({
        include: [
            {model: models.contact},
            {model: models.schedule},
            {model: models.role},
            {model: models.service}
        ],
        where: {id: userId}
    })
    .then(users => {
        if(users){
            //console.log("users by id");
            //console.log(JSON.stringify(users));
            return res.status(200).send({ sucess:true, user: users, status_code:200 });
        }
    })
    .catch(error => {
        console.log(error);
        if (error) return res.status(400).send({ error: 'Server error',status_code:400 });
    })
}


function createUsers(req,res,next){
    //var con = req.app.get('con');
    // console.log("req.body" + JSON.stringify(req.body));
    var newContactId;
    var home_phone = req.body.home_phone;
    var work_phone = req.body.work_phone;
    var social_security_number = req.body.social_security_number;
    var address = req.body.address;
    var address2 = req.body.address2;
    var city = req.body.city;
    var pincode = req.body.pincode;
    var state = req.body.state;
    var country = req.body.country;
    var emergency_contact = req.body.emergency_contact; 

    models.contact.create({ home_phone: home_phone, work_phone: work_phone, 
                     social_security_number: social_security_number, 
                     address: address, address2: address2, city: city, pincode: pincode,
                     state: state, country: country, emergency_contact: emergency_contact
                  })
                  .then(contacts => {
                        var contactId = contacts.dataValues.id; 
                        var insertuser = insertUser(contactId, req.body);

                        insertuser.then(res2=>{
                            res.status(200).send({success: true});
                        }).catch(err=>{
                            if(err) return res.status(400).send({ error: 'server error',status_code:400 });
                        });
                  })    
                  .catch(error => {
                      console.log(error);
                      res.status(400).send({ error: 'Server error', status_code: 400});
                  })
 }

 function insertUser(contactId, body){
    return new Promise(function (resolve, reject){
                //var image = req.body.image;
                // var role = req.body.role;
                var primary_email = body.primary_email;
                var first_name = body.first_name;
                var middle_name = body.middle_name;
                var last_name = body.last_name;
                var display_name = body.display_name;
                var dob = body.dob;
                var gender = body.gender;
                var user_name =  body.user_name;
                var company_id = 1;
                var contact_id = contactId;
                var speciality = body.specialities; 
                var roleId = body.role_id;


                var password = generator.generate({
                    length: 10,
                    numbers: true
                });


                var password_hash;    
                var password_salt;
                
               
                if (password) {
                    bcrypt.genSalt(10,function(errr,salt){
                        password_salt = salt;  
                        bcrypt.hash(password,salt,function(err,hash){
                            if(err) return next('Password hashing failure');
                            password_hash = hash;
                            
                            if(password_hash && password_salt) {                                         
                                models.user.create({ primary_email: primary_email, first_name: first_name, 
                                    middle_name: middle_name, user_name: user_name,
                                    last_name: last_name, display_name: display_name, dob: dob, gender: gender,
                                    user_name: user_name, company_id: company_id, contact_id: contact_id, password_hash: password_hash
                                 })
                                 .then(userss => {
                                     var userId = userss.dataValues.id;
                                     //resolve({success: true, status_code:200 });
                                     var availability = body.availabilities;

                                    for(var i = 0; i < availability.length; i++){
                                        availability[i].service_provider = userId;
                                    }
              
                                     var insertrole = insertRole(roleId, userId);
                                     insertrole.then(res2 => {
                                        var insertavailability = insertAvailability(availability);
                                        insertavailability.then(res2=>{
                                            var insertspeciality = insertSpeciality(speciality, userId);
                                            insertspeciality.then(res2=>{
                                                resolve({success: true, status_code:200 });
                                            })
                                            .catch(err=>{
                                                if(err) reject({ error: 'Server error',status_code:400 });
                                            });     
                                        })
                                        .catch(err=>{
                                            if(err) reject({ error: 'Server error',status_code:400 });
                                        });
                                    }).catch(err=>{
                                        if(err) reject({ error: 'Server error',status_code:400 });
                                    });
                                 })
                                 .catch(error=>{
                                    reject({ error: 'Server error',status_code:400 });
                                 })
                            }
                        });
                   });
                 }        
    })   
 }

 function insertRole(roleId, userId){
    var a = roleId;
    var b = userId
    return new Promise(function (resolve, reject){
                models.user_role.create({ role_id: a, user_id: b})

                .then(roless => {
                    resolve({success: true, status_code:200 });
                })
                .catch(error => {
                    reject({ error: 'Server error',status_code:400 });
                })
        
    })
 }

 function insertAvailability(availability){ 
     return new Promise(function (resolve, reject){
        models.schedule.bulkCreate(availability)

        .then(response => { 
            resolve({success: true, status_code:200 });
        })
        .catch(error => {
            console.log(error);
            reject({ error: 'Server error',status_code:400 });
        })
     })
 }

 function insertSpeciality(specialities, userId){
    var service  = [];
    var obj = {service_id: 0, user_id: 0};
    for(var k = 0; k < specialities.length; k++) {
        obj.service_id = specialities[k];
        obj.user_id = userId;
        service[k] = obj;
        obj = {};
    }

    return new Promise(function (resolve, reject){
        models.speciality.bulkCreate(service)
        .then(response => { 
            //console.log("ïnserted successfully");
            resolve({success: true, status_code:200 });
        })
        .catch(error => {
            console.log(error);
            reject({ error: 'Server error',status_code:400 });
        })
     })
 }


function getAllVisits(req, res, next){
    var con = req.app.get('con');
    var sql = 'SELECT timesheet.from_date, timesheet.to_date, timesheet.from_time, timesheet.to_time, weekday.name, users.id as service_provider, users.id as service_receiver FROM timesheet INNER JOIN users ON users.id = timesheet.service_provider INNER JOIN weekday ON timesheet.weekday = weekday.id';
    con.query(sql, function (err, result){
        if(err) res.status(400).send({error: 'Server error', status_code: 400});

        if(result){
            res.status(200).send({'success': true, data: result, status_code: 200});
        }
    })
}

