
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const promiseForm = document.querySelector('form');

promiseForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const delayValue = Number(e.target.elements.delay.value);
    const stateValue = e.target.elements.state.value;
    const shouldResolve = stateValue === 'fulfilled';
    promiseForm.reset();
    
    createPromise(delayValue, shouldResolve)
    .then((delay) => {
        iziToast.success({
             message: `✅ Fulfilled promise in ${delay}ms`,
             position: 'topRight'
});
    }).catch((delay) => {
        iziToast.error({
             message: `❌ Rejected promise in ${delay}ms`,
             position: 'topRight'
});
    });
    
})

function createPromise(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve ? resolve(delay) : reject(delay);
    }, delay);
  });
}