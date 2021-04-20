const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = '8080'
const dotenv = require('dotenv').config()
const cors = require('cors')

//routes
const user = require('./routes/userRoute')

mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB")
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

user(app)

app.listen(port, () => {console.log('Listening on port: ' + port)})

// module.exports = app
