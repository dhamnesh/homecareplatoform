const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const serviceController = require('../controller/serviceController');
const roleController = require('../controller/roleController');
const helperController = require('../controller/helperController');
const appointmentController = require('../controller/appointmentController');
const availabilityController = require('../controller/availabilityController');
var verifyToken = require('../middleware/jwt-auth');
var path = require('path');
var multer  = require('multer');
var crypto = require('crypto');

var storage = multer.diskStorage({
    destination: './server/assets/uploads/img/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })

  var upload = multer({ storage: storage });


// var upload = multer({ dest: './server/assets/uploads/img/' });
var fs = require('fs');

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//auth API's
router.post('/login', authController.login);
router.get('/logout', authController.logout);

//users API's
router.get('/users', verifyToken, userController.getAllUsers);
router.post('/add_user', verifyToken, userController.createUsers);
router.get('/getUserById/:user_id', verifyToken, userController.getUserById);
router.put('/updateUser/:user_id', verifyToken, userController.updateUser);
router.get('/user/getAllVisits/:user_id', verifyToken, userController.getAllVisits);

//services API's
router.get('/services', verifyToken, serviceController.getAllServices);
router.delete('/delete_userservice/:user_id/:service_id', verifyToken, serviceController.deleteUserService);
router.post('/add_userspeciality/:user_id', verifyToken, serviceController.addUserService);

//roles API's
router.get('/roles', verifyToken, roleController.getAllRoles);

//Helper API's
router.get('/weekday', verifyToken, helperController.getWeekdays);
router.get('/status', verifyToken, helperController.getStatus);

// Appointment's API's
router.post('/add_appointments', verifyToken, appointmentController.createAppointments);
router.get('/getAllServiceReceiverAppointment', verifyToken, appointmentController.getAllServiceReceiverAppointment);
router.get('/getServiceProviderAppointments/:service_provider', verifyToken, appointmentController.getServiceProviderAppointment);
router.get('/getServiceReceiverAppointments/:service_receiver', verifyToken, appointmentController.getServiceReceiverAppointment);
router.get('/getServiceProviderAppointmentFilter', verifyToken, appointmentController.getServiceProviderAppointmentFilter);
router.get('/getServiceReceiverAppointmentFilter', verifyToken, appointmentController.getServiceReceiverAppointmentFilter);
// router.post('/getCaregiverNamesThroughAppointments', verifyToken, appointmentController.getCaregiverNamesThroughAppointments)

// Availability API's
router.delete('/user_availability/:user_id/:availability_id', verifyToken, availabilityController.deleteUserAvailability);
router.post('/adduser_availability/:user_id', verifyToken, availabilityController.addUserAvailability);
router.post('/compareClientAndCaregiverAvailability', verifyToken, availabilityController.compareClientAndCaregiverAvailability);


//image upload
router.post('/user/imageUpload', upload.any(), function (req, res, err){
    var con = req.app.get('con');
    var user_id = req.body.user_id;
    var path = 'img/' + req.files[0].filename;

    if(user_id){
        var sql = 'select * from users where users.id='+ user_id +'';
        con.query(sql, function(err, imageresult){
            if(err) res.status(400).send({error: 'Server error', status_code: 400});
            if(imageresult[0].image && imageresult[0].image != undefined && imageresult[0].image != 'undefined' && imageresult[0].image != ' '){
                console.log('not blank image');
                var fs = require('fs');
                var filePath = './server/assets/uploads/' + imageresult[0].image;
                fs.unlinkSync(filePath);

                var sql1 = 'UPDATE users SET image=? WHERE users.id=?';
                var values = [path, user_id];
                con.query(sql1, values, function (err, result){
                    if(err) res.status(400).send({error: 'Server error', status_code: 400});

                    if(result){
                        res.status(200).send({success: true, status_code: 200});
                    }
                });
            }
            else{
                if(req.files){
                    var sql1 = 'UPDATE users SET image=? WHERE users.id=?';
                    var values = [path, user_id];
                    con.query(sql1, values, function (err, result){
                        if(err) res.status(400).send({error: 'Server error', status_code: 400});

                        if(result){
                            res.status(200).send({success: true, status_code: 200});
                        }
                    });
                }
            }
        })
    }
});


module.exports = router;
