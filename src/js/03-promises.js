import Notiflix from 'notiflix';

const elements = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name="delay"]'),
  stepDelay: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};
elements.form.addEventListener('submit', onSubmitPromise)

function onSubmitPromise(event) {
  event.preventDefault();

  let delay = elements.firstDelay.valueAsNumber;
  const stepValue = elements.stepDelay.valueAsNumber;
  const amountValue = elements.amount.valueAsNumber;

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += stepValue;
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

}