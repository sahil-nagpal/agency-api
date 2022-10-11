const Router = require('express')
const {createToken} = require('../controllers/tokenControllers')
let jsonTokenRouter = Router()

jsonTokenRouter.post("/getToken",createToken)
module.exports =  {
    jsonTokenRouter:jsonTokenRouter
}