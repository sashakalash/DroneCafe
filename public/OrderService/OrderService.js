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
      getOrderList: () => {
        return $http({
          method: 'GET',
          url: '/order'
        });
      },
      cookDish: orderData => {
        return $http({
          method: 'POST',
          url: '/cook',
          data: JSON.stringify(orderData)
        });
      },
      getCookingList: () => {
        return $http({
          method: 'GET',
          url: '/cook'
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