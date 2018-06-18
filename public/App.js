'use strict';

angular.module('myApp', ['ui.router', 'btford.socket-io', 'ngStorage'])
  .run(($localStorage, $state, $timeout) => {
    if(!$localStorage.user) {
      $timeout(() => $state.go('loginPage'));
    }
    return;
  })
  .config(function($stateProvider) {

    $stateProvider
      .state({
        name: 'loginPage',
        url: '/login',
        templateUrl: 'Login/LoginPage.html',
        controller: 'LoginPageCtrl'
      })
      .state({
        name: 'clientInfo',
        url: '/client',
        templateUrl: 'ClientInfo/ClientInfoPage.html',
        controller: 'ClientInfoCtrl'
      })
      .state({
        name: 'menu',
        url: '/menu',
        templateUrl: 'Menu/Menu.html',
        controller: 'MenuCtrl'
      });
  })
  .factory('mySocket', socketFactory => {
    const myIoSocket = io.connect();

    const mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
  });