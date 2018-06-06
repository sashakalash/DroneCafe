const express = require('express');
const app = express();
const http = require('http').Server(app);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

app.get('/kitchen', (req, res) => {
  res.sendFile(__dirname + 'public/Kitchen/index.html');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

const io = require('socket.io')(http);

io.on('connection', socket => {
  console.log(data)

  socket.on('login user', (data) => {
    console.log(data)
  });

});

