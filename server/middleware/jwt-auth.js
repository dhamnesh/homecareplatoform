var jwt = require('jsonwebtoken');
var secret = 'hdhjkhak-dhamneshbangar-shdkj';

module.exports = function(req,res,next) {
  
  const bearerHeader = req.headers['authorization'];
  //console.log(bearerHeader);
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // verifies secret and checks exp
        jwt.verify(bearerToken, secret, function(err, decoded) {
            if (err) { //failed verification.
              return res.status(403).send({
                  "error": "Invalid token"
              });
            }
            req.token = bearerToken;
            next(); //no error, proceed
        });
  }else {
    return res.status(403).send({
        "error": "token is not present"
    });
   }
}
