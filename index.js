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

// const refund = (userInfo, db) => {
//   return new Promise((done, fail) => {
//     db.update({email: userInfo.email}, )
//   });
// };

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log(`Couldn't connect to Mongo's server. Err: ${err}`);
  }
  const collection = db.collection('clients');
  http.listen(PORT, () => console.log(`listening on ${PORT}`));

  app.post('/login', (req, res) => {
    const userData = JSON.parse(req.data);
    checkUser(userData, collection)
       .then(result => {
         userData.balance = result.balance? result.balance: 100;
         res.json(userData);
        });
  });


  io.on('connection', socket => {});
      
});

