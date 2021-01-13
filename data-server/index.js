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
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
})
http.listen(4000, () => {
    console.log('Listening on port *: 4000');
});

let onlineCount = {};
io.on('connection', (socket) => {
    let curRoom = "";
    socket.on('newConnect', (room) => {
        console.log("before room: ", room, curRoom);
        if (curRoom !== room) {
            socket.leave(curRoom);
            curRoom = room;
            socket.join(room);
        }
        if (room in onlineCount){
            onlineCount[room] += 1;
        } else {
            onlineCount[room] = 1;
        }
        console.log("room: ", room, curRoom);
        io.in(curRoom).emit("online", onlineCount[curRoom]);
    });
    socket.on('disconnect', () => {
        onlineCount[curRoom] -= 1;
        socket.broadcast.to(curRoom).emit("online", onlineCount[curRoom]);
    });
    socket.on('sendMessage', (data) => {
        console.log(data, curRoom);
        socket.broadcast.to(curRoom).emit('newMessage', data);
    });
})