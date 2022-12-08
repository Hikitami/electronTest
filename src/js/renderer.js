//var fetch = require('node-fetch');

const information = document.getElementById('info');
const button = document.querySelector('.getButton');

const func = async () => {
  let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

  let text = await response.text(); // прочитать тело ответа как текст
  
  console.log(text);
}

button.addEventListener('click', () => {
  let time = new Date();
  func()
  window.versions.fetchq()
  //information.textContent = `${versions.pid()}`;
})

setInterval(() => {
  let time = new Date();
}, 1000)


setInterval(() => {
  window.versions.ping()
  window.versions.pong()
},5000)