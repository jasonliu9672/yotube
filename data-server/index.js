const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user.js')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.use('/user',userRouter)
const http = require('http').Server(app)
const io = require('socket.io')(http)
http.listen(4000, () => {
    console.log('Listening on port *: 4000');
});