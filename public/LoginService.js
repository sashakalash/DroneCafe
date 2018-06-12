'use strict';
const socket = io();

angular
  .module('myApp')
  .factory('LoginService', function() {
    return {
      loginUser: (user) => {
        socket.emit('login user', JSON.stringify(user));
      },
      getUser: () => {
        return new Promise((done, fail) => {
          socket.on('login answer', (err, data) => {
            if(err){fail(err)}
            console.log(data, 'data')
            done(JSON.parse(data))
          });
        });
      },
      refund: (newBalance, email) => {
        socket.emit('refund balance', JSON.stringify({newBalance: newBalance, email: email}));
      }
    };
  });