require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const authRoute = require('./routes/authRoute')
const stageRoute = require('./routes/stageRoutes')
const candidatureRoute = require('./routes/candidatureRoutes')
const suiviRoute = require('./routes/suiviRoute')
const responsableRoute = require('./routes/responsableRoute')
const mailRoute = require("./routes/mailRoute");
const cors = require('cors');

const app = express()
const port = process.env.PORT_ONE || 5000

connectDB()
app.use(cors()); //Cross-Origin Resource Sharing

app.use(express.json()) // Middleware for parsing JSON bodies
app.use(express.urlencoded({extended: false})) // Middleware for parsing urlencoded bodies

app.use('/api/auth', authRoute);
app.use('/api/stage', stageRoute);
app.use('/api/candidature', candidatureRoute);
app.use('/api/suivi', suiviRoute);
app.use('/api/responsable', responsableRoute);
app.use("/api/mail", mailRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
