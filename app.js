const express = require('express')
const path = require('path')



require('dotenv').config()


const app = express()



app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'frontend')))

app.use('/api/wares', require('./controllers/waresController'))
app.use('/api/users', require('./controllers/userController'))


module.exports = app