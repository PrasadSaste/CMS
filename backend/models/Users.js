const mongoose = require('mongoose');
const connDB = require('../config/db');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Users",userSchema);