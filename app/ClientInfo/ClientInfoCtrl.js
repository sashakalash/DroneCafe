'use strict';

angular
  .module('myApp')
  .component('clientInfo', {
    templateUrl: 'ClientInfo/ClientInfoPage.html',
    controller: function ($sessionStorage, $state) {
      this.user = $sessionStorage.user;
      this.refund = () => {
        this.user.balance += 100;
      };
      this.clearSession = () => {
        localStorage.clear(); 
        $state.go('loginPage');
      };
    },
  });
