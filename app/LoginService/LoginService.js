'use strict';

angular
  .module('myApp')
  .factory('LoginService', function($http) {
    return {
      loginUser: (userData) => {
        return $http({
          method: 'POST',
          url: '/auth',
          data: JSON.stringify(userData)
        });
      }
    };
  });