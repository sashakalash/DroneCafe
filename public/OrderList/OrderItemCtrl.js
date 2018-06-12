angular.module('myApp')
  .component('orderItem', { 
    templateUrl: 'OrderList/OrderItem.html',
    bindings: {
        dish: '<',
    },
    controller: function() {
        const vm = this;
    }
  });