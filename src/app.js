const express = require('express')
const morgan = require('morgan')
const PORT = 3000
const hostname = 'localhost'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/dishes',require('./routes/dishes'))
app.use('/promotions',require('./routes/promotions'))
app.use('/leaders',require('./routes/leaders'))


app.listen(PORT,hostname,()=>
{
    console.log(`Server running at http://${hostname}:${PORT}`)
})