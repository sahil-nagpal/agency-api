require('dotenv').config({ path: './src/.env' })
const http = require ('http')
const express = require('express')
const bodyParser = require('body-parser')
let hostname = 'localhost'
let passport = require('passport');
let port = process.env.PORT || 5000
let app = express()
let cors = require('cors')
let moongoose = require('mongoose')
let {router} = require('./src/router')
let {jwt} = require('./passport-config')
const server = http.createServer(app)
const mongoUsername = process.env.MONGO_USERNAME
const mongoPass = process.env.MONGO_PASSWORD
const monoDatabase = process.env.MONGO_DATABASE
const mongoUrl = `mongodb+srv://${mongoUsername}:${mongoPass}@cluster0.bexhm0v.mongodb.net/agencyApi?retryWrites=true&w=majority`


moongoose.connect(mongoUrl,{ user: mongoUsername, pass: mongoPass, useNewUrlParser: true, useUnifiedTopology: true },function(err){
  if(err){
    console.log("mongoUrl :::::",mongoUrl)
    console.log("error in connecting moongoose:::",err)
  }
})

app.use(cors())
app.use(bodyParser.json())
app.use('/api',router)
app.use(passport.initialize())
passport.use('jwt',jwt)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
app.use("*", (req, res) => {
    res.sendStatus(400);
  })