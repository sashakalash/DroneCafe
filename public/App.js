'use strict';

angular.module('myApp', ['ui.router', 'btford.socket-io'])
  .config(function($stateProvider) {

    $stateProvider
      .state({
        name: 'clientInfo',
        url: '/client',
        templateUrl: 'ClientInfo/ClientInfoPage.html',
        controller: 'ClientInfoCtrl as vm'
      })
      .state({
        name: 'menu',
        url: '/menu',
        templateUrl: 'Menu/Menu.html',
        controller: 'MenuCtrl as vm'
      });
  })
  .factory('mySocket', socketFactory => {
    const myIoSocket = io.connect();

    const mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
  });