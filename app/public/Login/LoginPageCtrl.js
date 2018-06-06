'use strict';

angular
  .module('App')
   
    .controller('LoginPageCtrl', function() {
      var vm = this;
      const name = vm.name;
      const email = vm.email;
      return {name, email};
    
      vm.formSubmit = function() {
        vm.loginForm.$setPristine();
      };
    });