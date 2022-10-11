let agencyModel = require("../models/agency")
let clientModel = require("../models/client")


const saveClient =async(clientData)=>{
    try{
        let clientObj = new clientModel(clientData)
        await clientObj.save()
        return {success:true,error:"none",clientObj:clientObj}
    }
    catch(err){
        console.log("5")
        console.log("error")
        return {success:false,error:err.message+`agency is created with id ${clientData.agencyId}`}
    }
    return {success:false,error:"client not saved"}
}

const create = async(req,res,next)=>{
    let response = {
        "success":false,
        "message":'',
        "error":null
    }
    let status = 200
    try{
        let {agencyData,clientData} = req.body
        let agencyObj = new agencyModel(agencyData)
        try{
            await agencyObj.save()   
        }
        catch(err){
            response.message = "agency not added successfully"
            response.error = err.message
           return  res.status(status).json(response)
        }
        if (clientData){
            if (clientData.agencyId == undefined){
                clientData.agencyId = agencyObj._id
            }
            var clientSaved = await saveClient(clientData)
            if (!clientSaved.success){
                status= 500
                response.success = false
                response.error = clientSaved.error
                return res.status(status).json(response)
            }
            
        }
        else{
            response.success = false
            response.message = `error in client creation but agency added successfully with id : ${agencyObj._id}`
            response.error = "client data is required"
            return  res.status(status).json(response)
        }
        response.success = true
        response.message = `client and agency successfully added with ClienId:${clientSaved.clientObj._id} and agencyId : ${agencyObj._id} `
       return  res.status(status).json(response)
    }
    catch(err){
        response.message = "Error occured in creation please contact developer"
        response.error = err.message
        console.log("error in create ::::: ",err)
       return  res.status(status).json(response)
        
    }
}

module.exports = {
    create:create
}