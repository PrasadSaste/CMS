const mongoose = require('mongoose');

const clientSchema=mongoose.Schema({
    name:   {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Active"
    },
})
module.exports=mongoose.model("Client",clientSchema);