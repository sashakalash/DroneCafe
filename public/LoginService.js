'use strict';
const socket = io();

angular
  .module('myApp')
  .factory('LoginService', function(mySocket) {
    return {
      loginUser: (user) => {
        socket.emit('login user', JSON.stringify(user));
        socket.on('login answer',  data => {
          console.log(data, 'data')
          mySocket.emit('login answer', data);
          mySocket.emit('anybody home?')
        });
      }
    };
  });