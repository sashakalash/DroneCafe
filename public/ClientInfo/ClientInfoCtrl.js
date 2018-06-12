'use strict';

angular
  .module('myApp')
  .controller('ClientInfoCtrl', function(LoginService) {
    let vm = this;
    LoginService
      .getUser()
      .then(user => {
        vm.user = user;
      })
      .catch(err => console.log(err))
    }).component('clientInfo', {
    template: '<div>Имя: {{$ctrl.user.name}}, Баланс: {{$ctrl.user.balance}}</div>',
    controller: function () {},
    bindings: {
      user: '<'
    }
  });
