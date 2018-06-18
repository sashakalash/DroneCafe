'use strict';

angular
  .module('myApp')
  .factory('LoginService', ($http) => {
    return {
      loginUser: (userData) => {
        return $http({
          method: 'POST',
          url: '/login',
          data: JSON.stringify(userData)
        });
      }
    };
  });