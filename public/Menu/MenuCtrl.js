'use strict';

angular
  .module('myApp')
  .component('menuList', {
    templateUrl: 'Menu/Menu.html',
    controller: function(MenuService) {
      MenuService.getMenu().then(data => {
        this.menu = data;
      });
    }
});
