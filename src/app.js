const express = require('express')
const morgan = require('morgan')
const PORT = 3000
const hostname = 'localhost'
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url)
const app = express()

connect.then((db)=>{
    console.log('Connected to server')
},(err)=>{console.log(err)})


app.use(express.json())
app.use(morgan('dev'))

function auth(req,res,next){
    var authHeader = req.headers.authorization
    if(!authHeader){
        res.setHeader('WWW-Authenticate','Basic')
        return res.status(401).json({msg:'You didn\'t pass credentials, please fix your header and try again'})
    }

    var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    if(auth[0] === 'admin' && auth[1] === 'password'){
        next()
    }
    else{
        res.setHeader('WWW-Authenticate','Basic')
        return res.status(401).json({msg:'Wrong credentials! Try again'})
    }
}

app.use(auth)
app.use('/dishes',require('./routes/dishRouter'))
app.use('/promotions',require('./routes/promoRouter'))
app.use('/leaders',require('./routes/leaderRouter'))


app.listen(PORT,hostname,()=>
{
    console.log(`Server running at http://${hostname}:${PORT}`)
})