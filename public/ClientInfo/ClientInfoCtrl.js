'use strict';

angular
  .module('myApp')
  .component('clientInfo', {
    templateUrl: 'ClientInfo/ClientInfoPage.html',
    controller: function(LoginService) {
      LoginService
        .getUser()
        .then(user => {
          this.user = user;
      });
      console.log(this.user)
    }
});