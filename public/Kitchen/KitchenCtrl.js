'use strict';

angular.module('myApp')
  .controller('KitchenCtrl', function(
    OrderService, 
    $sessionStorage, 
    mySocket, 
    $q
  ){
    const vm = this;
    const reloadLists = (user) => $q
      .all([OrderService.getOrderList(user), OrderService.getCookingList(user)])
      .then(results => {
        vm.orderedDishes = results[0].data;
        vm.cookingDishes = results[1].data;
      });
    reloadLists($sessionStorage.user);

    mySocket.on('reloadList', () => {
      reloadLists($sessionStorage.user);
    });

    vm.startCook = dish => {
      dish.status = 'Готовится';
      OrderService.cookDish({user: $sessionStorage.user, dish: dish})
        .catch(err => console.error(err));
    };

    vm.endCook = dish => {
      dish.status = 'Доставляется';
      OrderService.sendDish({dish: dish, user: $sessionStorage.user});
    };

  });