let Router = require('express')
let agencyRouter = Router()
let {getAgencyAndClientData} = require("../controllers/clientController")
let {create} = require('../controllers/agencyControllers')
agencyRouter.post("/",create)
agencyRouter.get("/:id",getAgencyAndClientData)
module.exports = {
    agencyRouter : agencyRouter
}