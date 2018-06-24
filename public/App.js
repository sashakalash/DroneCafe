'use strict';

angular.module('myApp', [
  'ui.router', 
  'btford.socket-io', 
  'ngStorage', 
])
  .run(($sessionStorage, $localStorage, $state, $timeout) => {
    $state.reload('loginPage');
    if(!($sessionStorage.user && $localStorage.user)) {
      $timeout(() => $state.go('loginPage'));
    }
    $state.go('orderPager');
  })
  .config(function($stateProvider) {

    $stateProvider
      .state({
        name: 'loginPage',
        url: '/login',
        templateUrl: 'Login/LoginPage.html',
        controller: 'LoginPageCtrl as vm'
      })
      .state({
        name: 'orderPage',
        url: '/order',
        templateUrl: 'OrderList/OrderList.html',
        controller: 'OrderListCtrl as vm'

      })
      .state({
        name: 'menu',
        url: '/menu',
        templateUrl: 'Menu/Menu.html',
        controller: 'MenuCtrl as vm'
      })
      .state({
        name: 'kitchen',
        url: '/kitchen',
        templateUrl: 'Kitchen/KitchenPage.html',
        controller: 'KitchenCtrl as vm'
      });
  })
  .factory('mySocket', socketFactory => {
    const myIoSocket = io.connect();

    const mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
  })
