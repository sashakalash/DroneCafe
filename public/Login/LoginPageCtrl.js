'use strict';

angular.module('myApp')
  .controller('LoginPageCtrl', LoginService => {
          this.formSended = false;
          this.formSubmit = () => {
              LoginService.loginUser(this.user); //переделать на промис + inject ngStorage
              /*  userService.userAuth(user)
                      .then(function (res) {
                              console.log('res.data', res.data);
                              $localStorage.token = res.data.token;
                              $localStorage.user = res.data.user;
                              $state.go('view');
                          }
                          , function (err) {
                              console.log(err.message);
                              vm.userExists = true;
                          });
              */
              this.loginForm.$setPristine();
              this.formSended = true;
  };
});
   
