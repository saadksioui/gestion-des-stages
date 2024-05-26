require('dotenv').config();
const express = require('express');
const http = require('http');  // Import http to create a server
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const stageRoute = require('./routes/stageRoutes');
const candidatureRoute = require('./routes/candidatureRoutes');
const suiviRoute = require('./routes/suiviRoute');
const responsableRoute = require('./routes/responsableRoute');
const mailRoute = require("./routes/mailRoute");
const cors = require('cors');
const socketIo = require('socket.io');  

const app = express();
const port = process.env.PORT_ONE ;

// Create a server
const server = http.createServer(app);
const io = socketIo(server);

connectDB();
app.use(cors()); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use('/api/auth', authRoute);
app.use('/api/stage', stageRoute);
app.use('/api/candidature', candidatureRoute);
app.use('/api/suivi', suiviRoute);
app.use('/api/responsable', responsableRoute);
app.use("/api/mail", mailRoute);

// Listen to connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Export io for use in your controller
module.exports = io;

// Start the server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
