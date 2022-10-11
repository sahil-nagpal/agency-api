
let clientModel = require("../models/client")

const update = async(req,res,next)=>{
    let {id} = req.params || req.query
    console.log("update data :::::: ",req.body)
    let data = req.body
   
    let response = {
        "success":false,
        "message":'',
        "error":null
    }
    
    try{
        let updatedResponse = await clientModel.updateOne({
            "_id":id
        },data)
        response.success = true
        response.message= "Successfully updated"
        res.status(200).json(response)
    }
    catch(err){
        response.error = err.message
        response.message = "error in updating client"
        res.status(500).json(response)
    }
}

const getAgencyAndClientData = async(req,res,next)=>{
    try{
        const {id:agencyId} = req.params || req.query
        console.log("agencyId:",agencyId)
        let clients = await clientModel.find({"agencyId":agencyId}).populate({
            path:"agencyId",
            model:'agency'
        })
        let clientData = []
        for (var index in clients){
            let client = clients[index]
            console.log("clients :::::",client)
            let temp = {
                "agencyName":client.agencyId.name,
                "clientName":client.name,
                "totalBill":client.totalBill
            }
            clientData.push(temp)
        }
        return res.status(200).json({"success":true,agencyData:clientData})
    }
    catch(err){
        console.log("error in getAgencyAndClientData ::: ",err)
        return res.status(500).json({
            "success":true,
            "error":err.message
        })
        
    }
}

module.exports = {
    update:update,
    getAgencyAndClientData:getAgencyAndClientData
}