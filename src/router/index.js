const Router = require('express')
const {jsonTokenRouter} = require('./jsontoken')
const {authentication}  = require('../middlewars/authentication')
const {agencyRouter} = require('../router/agencyrouter')
const {clientRouter} = require("../router/clientRouter")
let router = Router()
router.use("/admin",jsonTokenRouter)
router.use("/agency",authentication,agencyRouter)
router.use("/client",clientRouter)
module.exports =  {
    router:router
};