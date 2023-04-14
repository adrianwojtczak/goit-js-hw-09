import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

const dateTimePicker = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let timerId = null;
btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      btnStart.setAttribute('disabled', true);
      clearInterval(timerId);
      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr(dateTimePicker, options);

btnStart.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value);

  if (selectedDate < new Date()) {
    window.alert('Please choose a date in the future');
    return;
  } else {
    btnStart.setAttribute('disabled', true);
  }

  clearInterval(timerId);
  dataDays.textContent = '00';
  dataHours.textContent = '00';
  dataMinutes.textContent = '00';
  dataSeconds.textContent = '00';

  timerId = setInterval(() => {
    const remainingTime = selectedDate - new Date();
    if (remainingTime < 0) {
      clearInterval(timerId);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
