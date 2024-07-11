const mongoose = require('mongoose')
const doenv = require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
const cookie = require('cookie-parser')
const routes = require('./routes')

doenv.config(
    {
        path: './.env'
    }
)
const port = 5000

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}))
app.use(express.json())
app.use(cookie())
app.use('/', routes)

app.listen(port, ()=>{console.log("Listening at the port : "+port)})

mongoose.connect(process.env.db_url)
.then(console.log('DB Connected'))
.catch((err)=>{console.log('error: ',err)})

require('./trigger/otprm')
require('./trigger/userrm')