let tokens = require('../models/token')

const createToken = async(req,res,next)=>{
    try{
        let data = req.body
        let tokenEntries  = await tokens.create(data)
        tokenEntries.save()
        let userToken = tokenEntries.token()
        res.status(200).json({"success":true,"message":"token added","token":userToken})
    }
    catch(err){
        res.status(500).json({"success":false,"message":err.message})
        console.log("Error in createToken ::: ",err)
    }
}

module.exports = {
    createToken:createToken
}