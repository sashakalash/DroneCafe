'use strict';

angular
    .module('myApp')
    .controller('MenuListCtrl', function(MenuService) {
        var vm = this;
        MenuService.getMenu().then(function(menu) {
            vm.menu = menu.data;
        });
    });