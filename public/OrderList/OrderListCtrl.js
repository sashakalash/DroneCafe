'use strict';

angular.module('myApp')
  .controller('OrderListCtrl', function(OrderService, $state, mySocket) {
    const vm = this;
    vm.isDelivered = false;
    vm.isDelveryFailed = false;
    OrderService.getOrderList()
      .then(data => vm.dishes = data.data)
      .catch(err => console.error(err));

    vm.isShowMenu = false;
    vm.menuBtnText = 'Выбрать блюдо';
    vm.showMenu = () => $state.go('menu');

    mySocket.on('orderDelivered', data => {
      vm.isDelivered = true;
      vm.orderDelivered = data;
    });

    mySocket.on('ordersDeliveryFailed', data => {
      vm.isDelveryFailed = true;
      vm.ordersDeliveryFailed = data;
    });
  });

   
    