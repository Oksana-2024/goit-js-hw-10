import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = new Date();
const button = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
let intervalTimer = null;

const timer = () => {
  if (Date.now() > userSelectedDate) {
    input.disabled = false;
    clearInterval(intervalTimer);
    return;
  }
  const diffTimer = convertMs(userSelectedDate - Date.now());
  for (const key in diffTimer) {
    document.querySelector(`[data-${key}]`).textContent = addLeadingZero(
      diffTimer[key]
    );
  }
};

button.addEventListener('click', () => {
  button.disabled = true;
  input.disabled = true;
  timer();
  intervalTimer = setInterval(timer, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: '#ef4040',
        iconUrl: './img/x-octagon.png',
        messageColor: '#fff',
        theme: 'dark',
      });
      button.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    button.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const string = value.toString();
  return string.length < 2 ? string.padStart(2, '0') : string;
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(1024140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
