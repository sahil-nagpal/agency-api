let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt
let tokenModel = require("./src/models/token")
let jwtOptions = {}
jwtOptions['jwtFromRequest'] = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions['secretOrKey'] = process.env.JWT_SECRET_KEY
const jwt = (payload,done) =>{
    try{
        let tokenObj = tokenModel.findOne({"_id":payload.sub},(err,document)=>{
            if(err){
                done(null,false)
            }
            else{
                let copiedtokenObj = JSON.parse(JSON.stringify(document))
                delete copiedtokenObj.password
                done(null,copiedtokenObj)
            }
        })
    }
    catch(err){
        console.log("erorr in jwt function :: ",err.message)
        done(err,false)
    }
}

module.exports = {
    jwt:new JwtStrategy(jwtOptions,jwt)
}