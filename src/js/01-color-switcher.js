const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

// Color changer
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Set buttons
btnStop.setAttribute('disabled', true);

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener('click', () => {
  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
  clearInterval(timerId);
});
