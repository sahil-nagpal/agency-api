let Moongoose = require('mongoose')
let Schema = Moongoose.Schema
const Random = require('meteor-random');

const clientSchema  = new Schema({
    _id:{
        type:String,
        default:()=>`client_${Random.id()}`,
        required:true
    },
    agencyId:{
        type:Schema.Types.Mixed,
        ref:"agency"
    },
     name:{
        type:String,
        required:[true,"Agency name is required"]
    },
    email:{
        type:String,
        required:[true,"email name is required"]
    },
    phoneNumber:{
        type:Number,
        required:[true,"Phone number is required"],
    },
    totalBill:{
        type:Number,
        required:[true,"Total bill is required"]
    }
})

module.exports = Moongoose.model('clients',clientSchema)
