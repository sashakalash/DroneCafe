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
          socket.on('login answer', data => done(JSON.parse(data)));
        });
      }
    };
  });