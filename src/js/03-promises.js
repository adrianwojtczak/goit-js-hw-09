import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');

// Preventing negative values
delayInput.setAttribute('min', '0');
stepInput.setAttribute('min', '0');
amountInput.setAttribute('min', '0');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 0; i < amount; i++) {
    const promisePosition = i + 1;
    const promiseDelay = delay + step * i;
    createPromise(promisePosition, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          { useIcon: false }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          { useIcon: false }
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((fulfill, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        fulfill({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Add styles
const style = document.createElement('style');
style.innerHTML = `
  .form {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  button {
    align-self: flex-end;
  }
`;
document.head.appendChild(style);
