let Router = require('express')
let clientRouter = Router()
let {update} = require('../controllers/clientController')
clientRouter.put("/:id",update)

module.exports = {
    clientRouter : clientRouter,
}