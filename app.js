const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = '8080'
const dotenv = require('dotenv').config()
const cors = require('cors')

mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to MongoDB"))
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//routes
const user = require('./routes/userRoute')

user(app)

app.listen(port, () => {console.log('Listening on port: ' + port)})