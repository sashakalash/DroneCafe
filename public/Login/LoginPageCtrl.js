'use strict';

angular.module('myApp')
  .controller('LoginPageCtrl', function(LoginService, $sessionStorage, $localStorage, $state) {
    const vm = this;
    vm.formSended = false;
    vm.formSubmit = () => {
      LoginService.loginUser(vm.user) 
        .then(res => {
          if (vm.user.member) {
            $localStorage.user = res.data;
          }
          $sessionStorage.user = res.data;
          $state.go('orderPage');
        })
        .catch(err => console.log(err));
    vm.loginForm.$setPristine();
    vm.formSended = true;
  };
});
   
