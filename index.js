const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose  = require('mongoose')
const route = require('./route/path') 


//config env
dotenv.config()

//connecting to mongodb database
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log('Db connected')
})

app.use('/',route)


app.listen(process.env.PORT,()=>{
    console.log('Running..!')
})
