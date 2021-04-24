const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency
const commentSchema = new Schema({
    rating:{
        min: 1,
        max: 5,
        required:true,
        type: String
    },
    comment:{
        type:String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

const dishSchema = new Schema({

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
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:{
        type:[commentSchema]
    }
},
{
    timestamps:true
})

var Dishes = mongoose.model('dish',dishSchema)

module.exports = Dishes