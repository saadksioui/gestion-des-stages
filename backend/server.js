require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const authRoute = require('./routes/authRoute')


const app = express()
const port = process.env.PORT_ONE || 5000

connectDB()

app.use(express.json()) // Middleware for parsing JSON bodies
app.use(express.urlencoded({extended: false})) // Middleware for parsing urlencoded bodies

app.use('/api/auth', authRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
