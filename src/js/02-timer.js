import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
      Notiflix.Notify.failure('Please choose a date in the future');
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
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  } else {
    btnStart.setAttribute('disabled', true);
  }

  clearInterval(timerId);

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

// Add styles
const style = document.createElement('style');
style.innerHTML = `
.timer {
  display: flex;
  gap: 5px;
  max-width: 360px;
  margin-top: 10px;
}

.field {
  padding: 5px;
  border-radius: 20px;
  flex-basis: calc(25% - 5px);
  display: flex;
  flex-direction: column;
  background: rgb(106,106,106);
  background: linear-gradient(180deg, rgba(106,106,106,1) 0%, rgba(133,138,140,1) 50%);
  color: #ffffff;
  line-height: 1.2;
  align-items: center;
}

.value {
  font-size: 36px;
}

#datetime-picker {
  max-width: 265px;
  width:100%
}

button[data-start] {
  max-width: 85px;
  width:100%
}
`;
document.head.appendChild(style);
