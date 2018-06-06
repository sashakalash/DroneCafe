'use strict';

angular
  .module('App')
   
    .controller('ClientInfoCtrl', function(LoginPage) {
      const vm = this;
      vm.name = LoginPage.name;
      vm.email = LoginPage.email;
    });