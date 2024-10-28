import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const numberInput = document.querySelector('.number-input');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const state = form.elements['state'].value;
  const delay = +numberInput.value;
  if (delay < 1) {
    return;
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
  promise
    .then(value => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${value}ms`,
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
        message: `❌ Rejected promise in ${error}ms`,
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
