const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
var secret = 'hdhjkhak-dhamneshbangar-shdkj';
var async = require("async");
var models  = require('../model');
var sequelize = require('../connection/mysql-connect');
var availCG;
var availCt;

module.exports = {
    deleteUserAvailability,
    addUserAvailability,
    compareClientAndCaregiverAvailability
};

function deleteUserAvailability(req,res,next){
    var con = req.app.get('con');
    var user_id = req.params.user_id;
    var availability_id = req.params.availability_id;
    var sql = 'DELETE from user_availability WHERE user_availability.availability_id='+ availability_id + ' AND user_availability.user_id=' + user_id + '';
    con.query(sql, function(err, result){
        if(err) res.status(400).send({error: 'Server error', status_code: 400});
        if(result){
            res.status(200).send({success: true, status_code: 200});
        }
    })
}

function addUserAvailability(req, res, next){
    var availability = req.body;
    var user_id = req.params.user_id;
    var counter = 0;
    var i = 0;                      
    insertAvailability(0);
    function insertAvailability(i){
        if(i < availability.length){
            var con4 = req.app.get('con');
            
        //var param =  [availability[i].from_date,availability[i].from_time,availability[i].to_date,availability[i].to_time];
        con4.query('SELECT * FROM availabilities WHERE weekday=? AND from_date=? AND from_time=? AND to_date=? AND to_time=?', [availability[i].weekday, availability[i].from_date, availability[i].from_time, availability[i].to_date, availability[i].to_time], function (err,data) { 

            if(err) return res.status(400).send({ error: 'Some error occurred',status_code:400 });  
            if(data.length == 0){
                var con5 = req.app.get('con');
                var sql = 'INSERT INTO availabilities (weekday, from_date, from_time, to_date, to_time) VALUES ("'+ availability[i].weekday +'", "'+ availability[i].from_date +'", "'+ availability[i].from_time +'", "'+ availability[i].to_date +'", "'+ availability[i].to_time +'")';
                con5.query(sql, function (err,availability1) {
                    if(err) return res.status(400).send({ error: 'Some error occurred',status_code:400 });   

                    if(availability1) {                                                    
                        var availability_id =  availability1.insertId;
                        var con6 = req.app.get('con');
                        var sql = 'INSERT INTO user_availability (availability_id, user_id) VALUES ("'+ availability_id +'", "'+ user_id +'")';
                        con6.query(sql, function (err,userAvailability) {
                            if(err) return res.status(400).send({ error: 'Server error',status_code:400 });                 
                            if(userAvailability) {                             
                                insertAvailability(i + 1);
                            }
                        });                      
                    }
                });
            }
            
            else{                                                               
                //return res.status(200).send({ sucess:true, status_code:200 });
                var con = req.app.get('con');
                var availability_id = data[0].id;
                var sql = 'SELECT * from user_availability WHERE user_availability.availability_id='+ availability_id +' AND user_availability.user_id=' + user_id +'';
                con.query(sql, function (err, result){
                    if(err) res.status(400).send({error: 'Server error', status_code: 400})
                    if(result.length == 0){
                        var sql = 'INSERT INTO user_availability (availability_id, user_id) VALUES ("'+ availability_id +'", "'+ user_id +'")';
                        con.query(sql, function (err,userAvailability) {
                            //if(err) return res.status(400).send({ error: 'Email OR Password not matched',status_code:400 });                
                            if(userAvailability) {
                                insertAvailability(i + 1);        
                            }
                        });
                    }
                    else{
                        insertAvailability(i + 1);        
                    }
                })
            }
        })  
        }else{
            return res.status(200).send({ sucess:true, status_code:200 });
        }
    }
}

//Availability comparison
function compareClientAndCaregiverAvailability(req, res, next){
    var availability = [ { id: 1,
        from_date: 1525113000000,
        to_date: 1535394600000,
        start_time: 1529724103000,
        end_time: 1529749303000,
        weekdays: '[1,2]',
        createdAt: '2018-06-23T04:26:09.000Z',
        updatedAt: '2018-06-23T04:26:09.000Z',
        service_provider: 2 },
      { id: 2,
        from_date: 1525113000000,
        to_date: 1532975400000,
        start_time: 1529720740000,
        end_time: 1529742340000,
        weekdays: '[3,4]',
        createdAt: '2018-06-23T04:26:09.000Z',
        updatedAt: '2018-06-23T04:26:09.000Z',
        service_provider: 2 } ];

         //console.log("availability>>>>>" + JSON.stringify(availability));
        sequelize.query("SELECT * FROM `schedules` INNER JOIN user_roles ON schedules.service_provider = user_roles.user_id WHERE user_roles.role_id ="+ 1, { type: sequelize.QueryTypes.SELECT})
        .then(users => {
            console.log("users>>>" + JSON.stringify(users));
            return res.status(200).send({ sucess:true, status_code:200 });
          // We don't need spread here, since only the results will be returned for select queries
        })
        .catch(err => {
            console.log(err);
        });
        
        // models.schedule.findAll({include: [
        //     {model: models.user}
        // ]
        // })
        // .then(users => {
        //     if(users){
        //         console.log("users>>> " + JSON.stringify(users));
        //         var _schedule = users;    
        //         console.log("hello inside the function");
        //         return res.status(200).send({ sucess:true, user: users, status_code:200 });
        //     }
        // })
        // .catch(error => {
        //     console.log(error);
        //     if (error) return res.status(400).send({ error: 'Server error',status_code:400 });
        // })
        
    // var con = req.app.get('con');
    // var availability = req.body;
    // var sql = 'select user_availability.availability_id, user_availability.user_id, users.display_name FROM user_availability INNER JOIN user_role ON user_availability.user_id = user_role.user_id INNER JOIN users ON user_availability.user_id = users.id WHERE user_role.role_id = 1';
    // con.query(sql, function (err, result){
    //     if(err) res.status(400).send({error: 'Server error', status_code: 400});
    //     if(result){
    //         // console.log("before resukt");
    //         console.log(result);          
    //         var compareAvailability1 = compareAvailability(con, result, availability);
    //         compareAvailability1.then(res2=>{
    //             console.log("got the response here");
    //             console.log(JSON.stringify(res2.result));
    //             res.status(200).send({success: true, availability: res2.result, status_code: 200});
    //         }).catch(err=>{
    //             if(err) return res.status(400).send({ error: 'server error',status_code:400 });
    //         });
    //     }
    // })
}


function compareAvailability(con, availabilityCareGiver, availabilityClient){
    console.log("compareAvailability");
     var user_id = [];
     
    return new Promise(function (resolve, reject){
        var availCG = availabilityCareGiver;
        var availCt = availabilityClient;
        var i = 0;
        if(availCt.length > 0 && availCG.length > 0){
            compare(0);
            function compare(i){
                if(i < availCG.length){
                    console.log("for all the entries of caregiver");
                    console.log(availCG[i].availability_id); 
                    var caregiverDetails = [];
                    var z = 0; //this will loop through the entries of client
                    compareClientEntries(z);
                    function compareClientEntries(z){
                        if(z < availCt.length){
                            var sql = 'select * from availabilities where availabilities.id='+ availCG[i].availability_id +' AND availabilities.from_date <= '+ availCt[z].fromDate +' AND availabilities.to_date >= ' + availCt[z].toDate + '';
                            // var sqlTest = 'select * from availabilities where availabilities.id='+ availCG[i].availability_id +' AND availabilities.from_date <= '+ new Date(availCt[i].fromDate) +' AND availabilities.to_date >= ' + new Date(availCt[i].toDate) + '';
                            // console.log(sqlTest);
                            con.query(sql, function (err, result1){
                                if(err) console.log(err);
                                if(result1.length != 0){
                                    console.log("<<<<<<<<<<<result1>>>>>>>>>>>>i values is: >>>>> " + i);
                                    console.log(result1); 
                                    var fromHrsCt = new Date(parseInt(availCt[z].fromTime)).getHours();
                                    var fromMinCt = new Date(parseInt(availCt[z].fromTime)).getMinutes();
        
                                    var toHrsCt = new Date(parseInt(availCt[z].toTime)).getHours();
                                    var toMinCt = new Date(parseInt(availCt[z].toTime)).getMinutes();
        
                                    var fromHrsCG = new Date(parseInt(result1[0].from_time)).getHours();
                                    var fromMinCG = new Date(parseInt(result1[0].from_time)).getMinutes();
        
                                    var toHrsCG = new Date(parseInt(result1[0].to_time)).getHours();
                                    var toMinCG = new Date(parseInt(result1[0].to_time)).getMinutes();
        
                                    if(fromHrsCG < fromHrsCt && toHrsCt < toHrsCG){
                                        console.log("duration is in between");
                                        for(var k = 0; k < availCt[z].weekDays.length; k++){
                                            if(availCt[z].weekDays[k].id == result1[0].weekday){
                                                // availCt[]

                                                // availCt[z].weekDays[k].user_id = availCG[i].user_id;
                                                // availCt[z].weekDays[k].display_name = availCG[i].display_name;

                                                console.log(caregiverDetails.length);
                                                var obj = {user_id: availCG[i].user_id, display_name: availCG[i].display_name + '/' + availCt[z].weekDays[k].name};
                                                
                                                console.log(obj);
                                                caregiverDetails.push(obj);
                                                availCt[z].caregiverDetails = caregiverDetails;
                                                //  availCt[z].user_id = availCG[i].user_id;
                                                //  availCt[z].display_name = availCG[i].display_name + '/' + availCt[z].weekDays[k].name;
                                                // console.log("weekday matched, the value of i is: " + i);
                                                console.log(availCt[z]);  
                                            }
                                        }
                                        console.log("next comparision with z + 1");
                                        compareClientEntries(z+1);
                                    }
                                    else{
                                        console.log("duration is not in between still z + 1");
                                        compareClientEntries(z+1);
                                    }
                                }
                                else{
                                    console.log("no matches for dates for this entry now looping for second entry for same caregiver");
                                    compareClientEntries(z+1);
                                }
                            })
                        }
                        else{
                            console.log("looped for current entry, now changing the availability id");
                            compare(i + 1);
                        }
                    }
                }
                else{
                    console.log("process completed first else");
                    console.log(JSON.stringify(availCt));
                    resolve({success: true, result: availCt, status_code:200 });
                }
            }
        }
        else{
            console.log("process completed with second else");
            res.status(200).send({success: true, status_code: 200});
        }    
    }) 
}
