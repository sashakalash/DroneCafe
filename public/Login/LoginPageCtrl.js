'use strict';

angular
  .module('myApp')
  .component('loginPage', {
    templateUrl: 'Login/LoginPage.html',
    controller: function(LoginService) {
      this.formSended = false;
      this.formSubmit = () => {
        LoginService.loginUser(this.user);
        this.loginForm.$setPristine();
        this.formSended = true;
      };
    }
});
   
