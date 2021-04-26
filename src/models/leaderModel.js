const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)

const leaderSchema = new Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        required: true,
    },
    featured:{
        type:Boolean,
        required:true
    }
},
{
    timestamps:true
})

var Leaders = mongoose.model('leader',leaderSchema)

module.exports = Leaders