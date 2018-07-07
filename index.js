const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const SocketIO = require('socket.io');
const drone = require('netology-fake-drone-api');

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
const ObjectID = mongodb.ObjectID;

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
      db.findOne({email: user.email}, (err, result) => {
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

const addOrder = (data, db) => {
  return new Promise((done, fail) => {
    db.insert({
      title: data.dish.title, 
      userEmail: data.user.email, 
      status: data.dish.status}, 
      (err, result) => {
        err? fail(err): done(result);
      });
    });
};

const getOrderedList = (user, db) => {
  return new Promise((done, fail) => {
    const selector = {userEmail: user.email};
    db.find(selector).toArray((err, result) => {
      err? fail(err): done(result);
    });
  });
};

const addCookingDish = (orderData, cookDb, orderedDb) => {
  return new Promise((done, fail) => {
    const dishSelector = {"_id": new ObjectID(`${orderData.dish._id}`)};
    const userSelector = {userEmail: orderData.user.email};
    const dishToRemove = orderedDb.find({$and: [dishSelector, userSelector]});
    const dishToRemoveSelector = {_id: new ObjectID(dishToRemove['_id'])};
    console.log(dishSelector, 'dishSelector')
    console.log(userSelector, 'userSelector')
    // console.log(dishToRemove, 'dishToRemove')
    console.log(dishToRemoveSelector, 'dishToRemoveSelector')

    orderedDb.remove(dishToRemoveSelector);
    cookDb.insert({title: orderData.dish.title, userEmail: userSelector, status: orderData.dish.status}, (err, result) => {
      err? fail(err): done(result);
    });
  });
};

const getCookingList = (user, db) => {
  const selector = {userEmail: user.email};
  return new Promise((done, fail) => {
    db.find(selector).toArray((err, result) => {
      err? fail(err): done(result);
    });
  });
};

const deleteFromList = (data, db) => {
  return new Promise((done, fail) => {
    const dishSelector = {_id: new ObjectID(data.dish['_id'])};
    const userSelector = {userEmail: data.user.email};
    const dishToRemove = db.find({$and: [dishSelector, userSelector]});
    const dishToRemoveSelector = {_id: new ObjectID(dishToRemove._id)};
    db.remove(dishToRemoveSelector, (err, res) => {
      err? fail(err): done(res);
    });
  });
};

let socket;

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log(`Couldn't connect to Mongo's server. Err: ${err}`);
  }
  const clients = db.collection('clients');
  const addedOrders = db.collection('addedOrders');
  const cookingOrders = db.collection('cookingOrders');
  http.listen(PORT, () => console.log(`listening on ${PORT}`));

  io.on('connection', connect => socket = connect);

  app.post('/auth', (req, res) => {
    const userData = req.body;
    checkUser(userData, clients)
      .then(result => {
         userData.balance = result.balance? result.balance: 100;
         res.status(200).json(userData);
      })
      .catch(err => console.error(err));
  });

  app.post('/order-list', (req, res) => {
    getOrderedList(req.body, addedOrders)
      .then(result => {
        res.status(200).json(result)})
      .catch(err => console.error(err));
  });
  
  app.post('/cook-list', (req, res) => {
    getCookingList(req.body, cookingOrders)
      .then(result => res.status(200).json(result))
      .catch(err => console.error(err));
  });
  app.post('/order', (req, res) => {
    addOrder(req.body, addedOrders)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => console.error(err));
  }); 

  app.post('/cook', (req, res) => {
    addCookingDish(req.body, cookingOrders, addedOrders)
      .then(result => {
         socket.emit('reloadList');
         res.status(200).json(result);
      })
      .catch(err => console.error(err));
  });

  app.post('/delivery', (req, res) => {
    const user = req.body.user;
    const dish = req.body.dish;
    deleteFromList(req.body, cookingOrders)
      .then(() => socket.emit('reloadList'))
      .catch(err => console.error(err));
    drone.deliver(user, dish)
      .then(() => {
        dish.status = 'Доставлено';
        socket.emit('orderDelivered', dish);
      })
      .catch(() => {
        dish.status = 'Возникли сложности';
        socket.emit('orderDelivered', dish);
      });
  });
});
module.exports = app;
