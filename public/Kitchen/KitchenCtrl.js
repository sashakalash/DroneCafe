'use strict';

angular.module('myApp')
  .controller('KitchenCtrl', function(OrderService, $sessionStorage, mySocket){
    const vm = this;
    OrderService.getOrderList()
      .then(data => vm.orderedDishes = data.data)
      .catch(err => console.error(err));
   
    mySocket.on('cookingListChanged', () => {
      OrderService.getCookingList()
      .then(data => vm.cookingDishes = data.data)
      .catch(err => console.error(err));
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