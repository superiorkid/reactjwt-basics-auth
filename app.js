import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import bodyParser from 'body-parser'
require('dotenv').config()

const app = express()
const PORT = 8001

import UserRoutes from "./users/user.routes";

// cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

mongoose.set('strictQuery', false)

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Hello, this is basics auth MERN stack"
    })
})

app.use('/auth', UserRoutes)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    app.listen(PORT, () => {
        console.log("Database connected successfully")
        console.log("server started on port 8001")
    })
}).catch((err) => {
    console.log("Error connect to database.")
})
