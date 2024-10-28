import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const numberInput = document.querySelector('.number-input');
const button = document.querySelector('.creat-btn');
const form = document.querySelector('form');

button.addEventListener('click', event => {
  event.preventDefault();
  const state = form.elements['state'].value;
  const delay = +numberInput.value;
  if (delay < 1) {
    return;
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled'
        ? resolve(`✅ Fulfilled promise in ${delay}ms`)
        : reject(`❌ Rejected promise in ${delay}ms`);
    }, delay);
  });
  promise
    .then(value => {
      iziToast.show({
        message: value,
        messageSize: '20px',
        messageLineHeight: '1.5',
        position: 'topRight',
        color: '#59a10d',
        messageColor: '#fff',
        theme: 'dark',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
        position: 'topRight',
        messageSize: '20px',
        messageLineHeight: '1.5',
        color: '#ef4040',
        messageColor: '#fff',
        theme: 'dark',
        iconColor: '#AF1740',
      });
    });
  form.reset();
});
