'use strict';

angular
  .module('myApp')
  .component('clientInfo', {
    templateUrl: 'ClientInfo/ClientInfoPage.html',
    controller: function ($localStorage) {
      this.user = $localStorage.user;
      this.refund = () => {
        this.user.balance += 100;
      };
    },
  });
