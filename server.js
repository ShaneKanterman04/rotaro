const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  socket.on('gyro', data => {
    io.emit('gyro', { id: socket.id, ...data });
  });
});

server.listen(3000, () => console.log('listening on 3000'));
