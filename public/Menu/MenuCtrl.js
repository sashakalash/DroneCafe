'use strict';

angular
  .module('myApp')
  .controller('MenuCtrl', function(MenuService) {
     MenuService.getMenu().then(data => {
      this.menu = data.data;
      
     });
  });
