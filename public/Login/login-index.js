const loginPage = document.querySelector('#login_page');
const loginForm = document.querySelector('form');
const socket = io();

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  socket.emit('login user', data);
  loginPage.style.setProperty('--loginVis', 'hidden');
  return false;

});