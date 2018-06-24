'use strict';

angular.module('myApp')
  .controller('KitchenCtrl', function(
    OrderService, 
    $sessionStorage, 
    mySocket, 
    $q
  ){
    const vm = this;
    const reloadLists = () => $q
      .all([OrderService.getOrderList(), OrderService.getCookingList()])
      .then(results => {
        vm.orderedDishes = results[0].data;
        vm.cookingDishes = results[1].data;
      });
    reloadLists();

    mySocket.on('reloadList', () => {
      reloadLists();
    });

    vm.startCook = dish => {
      dish.status = 'Готовится';
      OrderService.cookDish(dish)
        .catch(err => console.error(err));
    };

    vm.endCook = dish => {
      dish.status = 'Доставляется';
      OrderService.sendDish({dish: dish, user: $sessionStorage.user});
    };

  });