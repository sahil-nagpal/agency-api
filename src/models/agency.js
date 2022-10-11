let Moongoose = require('mongoose')
let Schema = Moongoose.Schema
const jwt = require('jwt-simple');
const Random = require('meteor-random');
const moment = require('moment');

const agencySchema  = new Schema({
    _id:{
        type:String,
        default:()=>`agency_${Random.id()}`,
        required:true
    },
     name:{
        type:String,
        required:[true,"Agency name is required"]
    },
    primary_address:{
        type:String,
        required:[true,"Address 1  is required"]
    },
    secondry_address:{
        type:String,
        default:"None"
    },
    state:{
        type:String,
        required:[true,"State is required"]
    },
    city:{
        type:String,
        required:[true,"City is required"]
    },
    phoneNumber:{
        type:Number,
        required:[true,"Phone number is required"],
        validate:{
            validator:(value)=>{
                return (value.toString().length == 10)
            },
            message:props=>`${props.value} is not a valid number`
        }
    }
})

module.exports = Moongoose.model('agency',agencySchema)
