'use strict';

angular
  .module('myApp')
  .controller('ClientInfoCtrl', function(LoginService) {
    let vm = this;
    LoginService
      .getUser()
      .then(user => {
        console.log('ok')
        vm.user = user;
        console.log(user, vm.user)
      });
    }).component('clientInfo', {
    template: '<div>Имя: {{$ctrl.user.name}}, Баланс: {{$ctrl.user.balance}}</div>',
    controller: function () {},
    bindings: {
      user: '='
    }
  });
