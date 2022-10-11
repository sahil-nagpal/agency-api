let passport = require('passport')
const handleJwt = (req,res,next)=>async(err,document,info)=>{
    console.log("handle>>>>>>>>>>")
    let error = err || info
    if(error){
       return res.json({"success":false,"message":"unauthorised"})
    }
    return next()
}
const authentication = (req, res, next) =>
  passport.authenticate(
    'jwt', {session: false},handleJwt(req,res,next))(req,res,next)

module.exports = {
    authentication:authentication
}