'use strict';

angular
  .module('myApp')
  .factory('OrderService', function($http) {
    return {
      addOrder: orderData => {
        return $http({
          method: 'POST',
          url: '/order',
          data: JSON.stringify(orderData)
        });
      },
      getOrderList: user => {
        return $http({
          method: 'POST',
          url: '/order-list',
          data: user
        });
      },
      cookDish: orderData => {
        return $http({
          method: 'POST',
          url: '/cook',
          data: JSON.stringify(orderData)
        });
      },
      getCookingList: user => {
        return $http({
          method: 'POST',
          url: '/cook-list',
          data: user
        });
      },
      sendDish: data => {
        return $http({
          method: 'POST',
          url: '/delivery',
          data: JSON.stringify(data)
        });
      }
    };
  });