const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
var secret = 'hdhjkhak-dhamneshbangar-shdkj';
var models  = require('../model');

module.exports = {
  login,
  logout
};

function login(req,res,next){
    var email= req.body.email;
    var password = req.body.password;
    models.user.findOne({ where: {primary_email: email} }).then(result => {
        // console.log(result.dataValues.password_hash);
        bcrypt.compare(password,result.dataValues.password_hash,function(err,isMatched){
          if(err) return res.status(401).send({error:'Unauthorized user', status_code:401});

          if(isMatched){             
                  if(result){
                    console.log("logged in successfully");
                    userss = result.dataValues;
                    suser = userss;
                    delete suser.password_hash;
                    var token = jwt.sign({user: suser}, secret, {
                        expiresIn: '7d',
                        algorithm: 'HS256'
                    });
                    var loggedinuser = [{sucess:true,user:suser,token:'Bearer '+token}];
                    res.send(loggedinuser);
                  }
          }else {
            res.status(400).send({error:'Email or Password is incorrect', status_code:400});
          }
        });
    })
}

function logout(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
     var refreshed = jwtBlacklist.blacklist(bearerToken);
    jwt.verify(bearerToken, secret, function(err, decoded) {
            if (err) { //failed verification.
              res.status(200).send({data: 'user logout successfully', status_code:200});
              return;
            }
            res.status(400).send({data: 'something went wrong,user is not logged out.', status_code:400});
        });
      }else {
      res.status(400).send({data: 'token is not present', status_code:400});
    }
}
