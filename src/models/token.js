let Moongoose = require('mongoose')
let Schema = Moongoose.Schema
const jwt = require('jwt-simple');
const Random = require('meteor-random');
const moment = require('moment');

const tokenSchema  = new Schema({
    _id:{
        type:String,
        default:()=>`token_${Random.id()}`,
        required:true
    },
    randomkey:{
        type:String,
        required:[true,"A key is required to generate your webtoken"]
    },
})
tokenSchema.method({
    token(){
        const payload = {
            exp: moment().add(20, "minutes").unix(),
            iat: moment().unix(),
            sub: this._id,
          };
          return jwt.encode(payload,process.env.JWT_SECRET_KEY)
    }
})
module.exports = Moongoose.model('tokens',tokenSchema)
