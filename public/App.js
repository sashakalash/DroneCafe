'use strict';

angular.module('myApp', ['ui.router', 'btford.socket-io'])
  .config(function($stateProvider) {

    $stateProvider
      .state({
        name: 'clientInfo',
        url: '/client',
        templateUrl: 'ClientInfo/ClientInfoPage.html',
        controller: 'ClientInfoCtrl as vm'
      });
  })
  angular.module('myApp')
  .factory('mySocket', SocketFactory => {
    console.log('factory')
    const myIOSocket = io.connect('https://netology-socket-io.herokuapp.com');

    mySocket = SocketFactory({ioSocket: myIOSocket});
    
    return mySocket;

  });