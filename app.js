const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = '8080'
const dotenv = require('dotenv')
const cors = require('cors')

//routes
const user = require('./routes/userRoute')

dotenv.config();

mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to the DB")
})

const app = express()

app.use(
    cors({
        origin: "http://localhost:" + port,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

user(app)

app.listen(8080, () => {
    console.log("+---------------------------------------+");
    console.log("|                                       |");
    console.log(`|  [\x1b[34mSERVER\x1b[37m] Listening on port: \x1b[36m${port} 🤖  \x1b[37m|`);
    console.log("|                                       |");
    console.log("\x1b[37m+---------------------------------------+");
})

module.exports = app
