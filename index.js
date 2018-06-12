const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const SocketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const path = require('path');
const INDEX = path.join(__dirname, '/index.html');
const io = SocketIO(http);

app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(INDEX));
http.listen(PORT, () => console.log(`listening on ${PORT}`));

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/ClientsDB';

const addUser = (user, db) => {
  return new Promise((done, fail) => {
    db.insert({
      name: user.name, 
      email: user.email, 
      balance: 100
    }, 
    (err, result) => {
      err? fail(err): done(result);
    });
  });
};

const checkUser = (user, db) => {
  return new Promise((done, fail) => {
      db.findOne({email: user.email},
      (err, result) => {
        if (err) {
          fail(err);
        } else if(result) {
          done(result);
        } else {
          addUser(user, db)
            .then(res => done(res))
            .catch(err => console.error(err));
        }
      });
    });
  
};

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log(`Couldn't connect to Mongo's server. Err: ${err}`);
  }
  const collection = db.collection('clients');

  io.on('connection', socket => {
    socket.on('login user', (user) => {
      const userData = JSON.parse(user);
      checkUser(userData, collection)
       .then(res => {
         userData.balance = res.balance? res.balance: 100;
         socket.emit('login answer', JSON.stringify(userData));
        })
       .catch(err => console.error(err));
    });
  });
});

