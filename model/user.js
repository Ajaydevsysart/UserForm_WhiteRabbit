const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    introduction:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    experience:{
        type:Number,
    },
    achievements:{
        type:String,
    },

})
module.exports = mongoose.model('user',userSchema)