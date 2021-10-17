const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose  = require('mongoose')
const route = require('./route/path') 
const expressLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session=require('express-session')


//config env
dotenv.config()

//connecting to mongodb database
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log('Db connected')
})

app.use(express.static("public")); 

//initialise layout
app.use(expressLayout)

//middleware
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

//session handle for flas msg
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));

// Connect Flash for flash messages
app.use(flash());



//intial route
app.use('/',route)

//setting ejs as engine

app.set('view engine','ejs')


app.listen(process.env.PORT,()=>{
    console.log('Running..!')
})
