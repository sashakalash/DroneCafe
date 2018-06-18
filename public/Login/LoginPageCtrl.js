'use strict';

angular.module('myApp')
  .controller('LoginPageCtrl', function(LoginService, $localStorage, $state) {
    const vm = this;
    vm.formSended = false;
    vm.formSubmit = () => {
      LoginService.loginUser(vm.user) 
        .then(res => {
          $localStorage.user = res.data;
          $state.go('OrderPage');
        })
        .catch(err => console.log(err.message));
    vm.loginForm.$setPristine();
    vm.formSended = true;
  };
});
   
