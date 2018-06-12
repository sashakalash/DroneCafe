'use strict';

angular
  .module('myApp')
  .controller('ClientInfoCtrl', function(LoginService) {
    const vm = this;
    LoginService
      .getUser()
      .then(user => {
        vm.user = user;
      })
      .catch(err => console.log(err))
    vm.refund = () => {
      vm.user.balance += 100;
    };
  })
  .component('clientInfo', {
    template: '<div>Имя: {{$ctrl.user.name}}, Баланс: {{$ctrl.user.balance}}</div>',
    controller: function () {},
    bindings: {
      user: '<'
    }
  });
