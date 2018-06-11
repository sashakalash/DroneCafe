'use strict';

angular.module('myApp', ['ui.router'])
  .config(function($stateProvider) {

    $stateProvider
      .state({
        name: 'clientInfo',
        url: '/client',
        templateUrl: 'ClientInfo/ClientInfoPage.html',
        controller: 'ClientInfoCtrl'
      })
});