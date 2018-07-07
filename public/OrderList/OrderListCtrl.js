'use strict';

angular.module('myApp')
  .controller('OrderListCtrl', function(OrderService, $state, mySocket, $sessionStorage) {
    const vm = this;
    vm.isDelivered = false;
    vm.isDelveryFailed = false;
    OrderService.getOrderList($sessionStorage.user)
      .then(data => vm.dishes = data.data)
      .catch(err => console.error(err));

    vm.showMenu = () => $state.go('menu');

    vm.orderDelivered = [];
    mySocket.on('orderDelivered', data => {
      vm.orderDelivered.push(data);
    });
  });

   
    