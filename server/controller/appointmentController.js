const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
var secret = 'hdhjkhak-dhamneshbangar-shdkj';

module.exports = {
    createAppointments,
    getAllServiceReceiverAppointment,
    getServiceProviderAppointment,
    getServiceReceiverAppointment,
    getServiceProviderAppointmentFilter,
    getServiceReceiverAppointmentFilter
};

function createAppointments(req,res,next){
    var con = req.app.get('con');
    console.log(">>>><<>>>>><>>>>>");
    console.log(JSON.stringify(req.body));
    console.log(req.body.service_plan);
    console.log(req.body.availabilities);

    var _appointment =  req.body;

    var service_receiver = _appointment[0].service_receiver;
    var _availabilities =  _appointment[0].availabilities;

    console.log(JSON.stringify(_availabilities));
    console.log(_availabilities);

    return new Promise(function(resolve,reject){
        var i = 0;
        insertAppointment(0);
        function insertAppointment(i){
            console.log("insert appointment for i = " + i);
            if(i < _availabilities.length){
                // console.log(_availabilities[i].fromDate);
                // console.log(_availabilities[i].toDate);
                // console.log(_availabilities[i].fromTime);
                // console.log(_availabilities[i].toTime);
                var user_id;
                for(var e = 0; e < _availabilities[i].caregiverDetails.length; e++){
                    console.log("_availabilities[i].caregiverDetails[e].caregiver_id" + _availabilities[i].caregiverDetails[e].caregiver_id);
                    if(_availabilities[i].caregiverDetails[e].caregiver_id){
                        var user_id = _availabilities[i].caregiverDetails[e].user_id;
                        console.log(user_id);
                        var k = _availabilities[i].caregiverDetails[e].display_name;
                        var day = k.substring(k.indexOf('/') + 1, k.length);
                        console.log("dayname" + day);
                        if(day == "Monday"){
                            weekday_id = 1;
                        }else if(day == "Tuesday"){
                            weekday_id = 2;
                        }else if(day == "Wednesday"){
                            weekday_id = 3;
                        }else if(day == "Thursday"){
                            weekday_id = 4;
                        }else if(day == "Friday"){
                            weekday_id = 5;
                        }else if(day == "Saturday"){
                            weekday_id = 6;
                        }else if(day == "Sunday"){
                            weekday_id = 7;
                        }
                        console.log("weekday" + weekday_id);
                    }
                }
                var sql = 'INSERT INTO appointments (from_date, to_date, start_time, end_time, weekday, service_receiver, service_provider) VALUES ("'+ _availabilities[i].fromDate +'", "' + _availabilities[i].toDate + '", "' + _availabilities[i].fromTime + '", "' + _availabilities[i].toTime + '", "' + weekday_id + '", "' + service_receiver + '", "' + user_id + '")';
                console.log(sql);
                con.query(sql, function (err, response){
                    if(err) res.status(400).send({error: 'Server error', status_code: 400});

                    if(response){
                        console.log(">>>>>><<<<<<<<><<<<<<");
                        console.log(response);
                        insertAppointment(i + 1);
                    }
                })
            }
        }
    });




    // var from_date = req.body.from_date;
    // var to_date = req.body.to_date;
    // var start_time = req.body.start_time;
    // var end_time = req.body.end_time;
    // var status = req.body.status;
    // var service_provider = req.body.service_provider;
    // var service_receiver = req.body.service_receiver;

    // var service = req.body.service;
    // var weekday = req.body.weekday;

    // var sql = 'INSERT INTO appointments (start_time, end_time, status, service_provider, service_receiver) VALUES ("'+ start_time +'", "' + end_time + '", "' + status + '", "' + service_provider + '", "' + service_receiver + '")';
    // con.query(sql, function (err, appointments) {
    //     if(err) return res.status(400).send({ error: 'server error',status_code:400 });
    //     if(appointments) {
    //         var letInsert = insertServiceAndWeekday(appointments.insertId, con, service, weekday);
    //         letInsert.then(res1=>{
    //             return res.status(200).send({ sucess:true, status_code:200 });
    //         }).catch(err=>{
    //             if(err) return res.status(400).send({ error: 'server error',status_code:400 });
    //         })
    //     }
    // });


    // function insertServiceAndWeekday(appointment_id, con, service, weekday){
    //     return new Promise(function(resolve,reject){
    //         var i = 0;
    //         insertService(0);

    //         function insertService(i){
    //             if(i < service.length){
    //                 var j = 0;
    //                 insertWeekday(0);
    //                 function insertWeekday(j) {
    //                     if(j < weekday.length) {
    //                           var sql = 'INSERT INTO service_provided (appointment_id, service_id, weekday) VALUES ("'+ appointment_id +'", "'+ service[i] +'", "'+ weekday[j] +'")';
    //                           con.query(sql, function(err, result) {
    //                               if(err) reject({ error: 'server error',status_code:400 });

    //                               if(result){
    //                                 insertWeekday(j + 1);
    //                               }
    //                           })
    //                     }else{
    //                         insertService(i + 1);
    //                     }
    //                 }
    //             }
    //             else{
    //                 resolve({sucess: true,status_code:200 });
    //             }
    //         }
    //     })
    // }
}

function getAllServiceReceiverAppointment(req, res, next){
  var con = req.app.get('con');

  var sql = 'SELECT ap.*, us.display_name as receiver_name, usr.display_name as provider_name FROM appointments as ap INNER JOIN user_role as ussr ON ap.service_receiver = ussr.user_id INNER JOIN users as us ON ap.service_receiver = us.id INNER JOIN users as usr on ap.service_provider = usr.id WHERE ussr.role_id ='+ 2 +'';
  console.log(sql);
  con.query(sql, function (err, result){
    if(err) res.status(400).send({error: 'Server error', status_code: 400});

    if(result){
      console.log(result);
      res.status(200).send({success: true, data: result, status_code: 200});
    }
  })
}


function getServiceProviderAppointment(req, res, next){
    var service_provider = req.params.service_provider;
    var con = req.app.get('con');
    var data = [];
    var sql = 'SELECT * FROM appointments where appointments.service_provider='+ service_provider +'';
    con.query(sql, function(err, response){
        if(err) res.status(400).send({error: 'Server error', status_code: 400});

        if(response){
            if(response.length != 0){
                var i = 0;
                    getServiceProvidedDetails(i);
                    function getServiceProvidedDetails(i){
                        if(i < response.length){
                            var sql2 = 'SELECT appointments.from_date, appointments.to_date, appointments.start_time, appointments.service_receiver, appointments.end_time, status.name as status, status.id as status_id, services.description, service_provided.service_id, service_provided.weekday as weekday_id, weekday.name FROM service_provided INNER JOIN appointments ON service_provided.appointment_id = appointments.id INNER JOIN services ON service_provided.service_id = services.id INNER JOIN weekday ON service_provided.weekday = weekday.id INNER JOIN status ON appointments.status = status.id WHERE service_provided.appointment_id='+ response[i].id +'';
                            con.query(sql2, function (err, result){
                                if(err) res.status(400).send({error: 'Server error', status_code: 400});
                                if(result){
                                    data[i] = result;
                                    getServiceProvidedDetails(i + 1);
                                }
                            })
                        }
                        else{
                            res.status(200).send({success: true, data: data, status_code: 200});
                        }
                    }
            }
            else{
                res.status(200).send({success: true, data: data, status_code: 200});
            }
        }
    })
}

function getServiceReceiverAppointment(req, res, next){
    var service_receiver = req.params.service_receiver;
    var con = req.app.get('con');
    var data = [];
    var sql = 'SELECT * FROM appointments WHERE appointments.service_receiver='+ service_receiver +'';
    con.query(sql, function(err, response){
        if(err) res.status(400).send({error: 'Server error', status_code: 400});

        if(response){
            if(response.length != 0){
                var i = 0;
                    getServiceReceiverDetails(i);
                    function getServiceReceiverDetails(i){
                        if(i < response.length){
                            var sql2 = 'SELECT appointments.from_date, appointments.to_date, appointments.start_time, appointments.service_receiver, appointments.end_time, status.name as status, status.id as status_id, services.description, service_provided.service_id, service_provided.weekday as weekday_id, weekday.name FROM service_provided INNER JOIN appointments ON service_provided.appointment_id = appointments.id INNER JOIN services ON service_provided.service_id = services.id INNER JOIN weekday ON service_provided.weekday = weekday.id INNER JOIN status ON appointments.status = status.id WHERE service_provided.appointment_id='+ response[i].id +'';
                            con.query(sql2, function (err, result){
                                if(err) res.status(400).send({error: 'Server error', status_code: 400});
                                if(result){
                                    data[i] = result;
                                    getServiceReceiverDetails(i + 1);
                                }
                            })
                        }
                        else{
                            res.status(200).send({success: true, data: data, status_code: 200});
                        }
                    }
            }
            else{
                res.status(200).send({success: true, data: data, status_code: 200});
            }
        }
    })
}

function getServiceProviderAppointmentFilter(req, res, next){
    var filter_type =  req.body.filter_type;
    var _date = new Date();
    var utcF = _date.toUTCString();
    var _utcF = new Date(utcF);
    var timeF = _utcF.getTime();
    console.log(timeF);

     if(filter_type == 1){
        var sql = 'SELECT ap.id,usr.*, cnt.*, avl.*, svs.description From appointments as ap Inner join users as usr On ap.service_provider = usr.id Inner join contacts as cnt On usr.contact_id = cnt.id Inner join user_availability as usa On usa.user_id = usr.id Inner join availabilities as avl On usa.availability_id = avl.id Inner join weekday as wkd On avl.weekday = wkd.id Inner join speciality as spl On spl.user_id = usr.id Inner join services as svs On svs.id = spl.service_id Where 1527186600000 Between ap.from_date AND ap.to_date';
        con.query(sql, function (err, result){
            //Working task
        })
     }
}

function getServiceReceiverAppointmentFilter(req, res, next){
    //working task
}

// function getCaregiverNamesThroughAppointments(){
//     req.body.availabilities
// }
