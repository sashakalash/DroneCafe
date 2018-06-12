'use strict';

angular.module('myApp', ['ui.router'])
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
  });