import express from 'express'
import auth from './routes/auth.js';
import profile from './routes/profile.js'
import connectDb from './config/database.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config()

const app = express()
// app.use(express.json());
//parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


const port = 8000;
const uri = 'mongodb://localhost:27017' 
const options = {
    "dbName":"school",
}

connectDb(uri,options)
/*
    middlewares
*/
app.use('/api',auth)
app.use('/api/profile',profile)

app.listen(port,()=>{
    console.log(`listening on port:${port}`)
})

console.log(process.env.MAIL_PASSWORD)