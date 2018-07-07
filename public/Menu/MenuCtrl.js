'use strict';

angular.module('myApp')
  .controller('MenuCtrl', function (MenuService, $sessionStorage, OrderService) {
    const vm = this;
    MenuService.getMenu().then(data => {
      vm.menu = data.data;
      vm.orderBtnData = function (price) {
        const diff = price - $sessionStorage.user.balance;
        if (diff > 0) {
          vm.checked = true;
          return `Пополните баланс на ${diff}`;
        } else {
          vm.checked = false;
          return 'Заказать';
        }
      };
    });
    vm.addOrder = dish => {
      dish.status = 'Заказано';
      OrderService.addOrder({dish: dish, user: $sessionStorage.user})
        .then(() => $sessionStorage.user.balance -= dish.price)
        .catch(err => console.error(err));
    };
  });