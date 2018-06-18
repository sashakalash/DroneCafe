'use strict';

angular.module('myApp')
  .controller('OrderListCtrl', function(mySocket) {
    const vm = this;
    this.dishes = [];
    mySocket.on('order dish', data => {
      console.log('ok')
      this.isShowMenu = false;
      data.status = 'Заказано';
      this.dishes.push(data);
      console.log(this.dishes)
    });
    this.isShowMenu = false;
    this.menuBtnText = 'Выбрать блюдо';
    this.showMenu = () => {
      this.isShowMenu = !this.isShowMenu;
      this.menuBtnText = this.isShowMenu? 'Скрыть меню': 'Выбрать блюдо';
    }
  });

   
    