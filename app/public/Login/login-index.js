const loginPage = document.querySelector('#login_page');
const loginForm = document.querySelector('#login_form');
const loginBtn = document.querySelector('#login_btn');
const socket = io();

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  socket.emit('login user', data);
  loginPage.style.setProperty('--loginVis', 'hidden');
});