'use strict';

angular
  .module('myApp')
  .factory('MenuService', function($http) {
    return {
      getMenu: () => {
        return $http.get('Data/menu.json');
      }
    };
  });