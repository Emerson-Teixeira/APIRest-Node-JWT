const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
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
app.use(express.urlencoded({extended: true}))
app.use(session({
    name: 'SessId',
    secret:'signKey',
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
}))
app.use(morgan('dev'))

function auth(req,res,next){
    if(!req.session.user){
        var authHeader = req.headers.authorization
        if(!authHeader){
            res.setHeader('WWW-Authenticate','Basic')
            return res.status(401).json({msg:'You didn\'t pass credentials, please fix your header and try again'})
        }

        var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
        if(auth[0] === 'admin' && auth[1] === 'password'){
            req.session.user = auth[0]
            next()
        }
        else{
            res.setHeader('WWW-Authenticate','Basic')
            return res.status(401).json({msg:'Wrong credentials! Try again'})
        }
    }
    else{
        if(req.session.user == 'admin'){
            next()
        }
        else{
            res.setHeader('WWW-Authenticate','Basic')
            return res.status(401).json({msg:'Wrong credentials! Try again'})
        }
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