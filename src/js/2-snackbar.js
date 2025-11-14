import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  if (Number.isNaN(delay) || delay < 0) {
    iziToast.error({
      message: 'Delay should be a non-negative number',
      position: 'topRight',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delayValue => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
      });
    })
    .catch(delayValue => {
      iziToast.error({
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
      });
    });

  event.currentTarget.reset();
}
