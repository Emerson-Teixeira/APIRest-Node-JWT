const express = require('express')
const morgan = require('morgan')
const PORT = 3000
const hostname = 'localhost'
const mongoose = require('mongoose')
const Dishes = require('./models/dishes')
const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url)
const app = express()

connect.then((db)=>{
    console.log('Connected to server')
},(err)=>{console.log(err)})


app.use(express.json())
app.use(morgan('dev'))
app.use('/dishes',require('./routes/dishRouter'))
app.use('/promotions',require('./routes/promoRouter'))
app.use('/leaders',require('./routes/leaderRouter'))


app.listen(PORT,hostname,()=>
{
    console.log(`Server running at http://${hostname}:${PORT}`)
})