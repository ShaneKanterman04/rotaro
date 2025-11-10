const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static('public'));

// Serve host page at /host (so requesting /host returns host.html)
app.get('/host', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'host.html'));
});

app.get('/client', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  socket.on('gyro', data => {
    io.emit('gyro', { id: socket.id, ...data });
  });
});

server.listen(3000, () => console.log('listening on 3000'));
