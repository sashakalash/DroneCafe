'use strict';

angular.module('myApp')
  .component('menu', {
    templateUrl: 'Menu/Menu.html',
    controller: function(MenuService, $localStorage, mySocket) {
      MenuService.getMenu().then(data => {
        this.menu = data.data;
        this.orderBtnData = function(price) {
          const diff = price - $localStorage.user.balance;
          return diff > 0? `Пополните баланс на ${diff}`: 'Заказать';
        };
      });
      this.addOrder = dish => {
        mySocket.emit('order dish', dish);
      };
    }
  });
 
