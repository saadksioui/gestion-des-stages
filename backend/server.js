require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const stageRoute = require('./routes/stageRoutes');
const candidatureRoute = require('./routes/candidatureRoutes');
const suiviRoute = require('./routes/suiviRoute');
const responsableRoute = require('./routes/responsableRoute');
const mailRoute = require("./routes/mailRoute");
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT_ONE || 5000;

connectDB();

app.use(cors()); //Cross-Origin Resource Sharing
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware for parsing urlencoded bodies

app.use('/api/auth', authRoute);
app.use('/api/stage', stageRoute);
app.use('/api/candidature', candidatureRoute);
app.use('/api/suivi', suiviRoute);
app.use('/api/responsable', responsableRoute);
app.use("/api/mail", mailRoute);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Update this to match your client URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.set('socketio', io);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
