'use strict';

angular.module('myApp')
  .component('orderList', {
    templateUrl: 'OrderList/OrderList.html',
    bindings: {
      dish: '<',
    },
    controller: function () {
      this.dishes = {
       //здесь будут заказанные блюда
      };
    },
  });

   
    