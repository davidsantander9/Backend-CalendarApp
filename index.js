const express = require('express')
const cors = require('cors')
const dbConnection = require('./database/config')
require('dotenv').config()


//Create express server

const app = express()

//DataBase

dbConnection()

//CORS
app.use(cors())

//Public directory
app.use( express.static('public') )

//read and parse body
app.use( express.json() )

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//Listen request

app.listen( process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`)
})
