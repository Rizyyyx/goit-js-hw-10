import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker')


startBtn.disabled = true;

let userSelectedDates = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
          
          iziToast.error({
            message: `Please choose a date in the future`,
            position: 'topRight'
          });
            return;
     }
        userSelectedDates = selectedDates[0];
                startBtn.disabled = false;
                iziToast.success({
            message: `Вибрана дата: ', ${selectedDates[0]}`,
            position: 'topRight'
          });

  },
};

flatpickr('#datetime-picker', options);

function pad(value) {
  return String(value).padStart(2, '0');
}

function ms2str(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return {
    days,
    hours,
    minutes: mins,
    seconds: secs,
  };
}

let intervalId;

startBtn.addEventListener('click', () => {
  if (intervalId) return;          
  if (!userSelectedDates) return;  


  if (userSelectedDates <= Date.now()) {
    iziToast.error({ message: 'Выберите будущую дату', position: 'topRight' });
    startBtn.disabled = true;
    return;
  }

  datetimePicker.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDates - currentTime;

    if (diff < 1000) {
      clearInterval(intervalId);
      intervalId = null;       
      updateTimerUI(ms2str(0));
      datetimePicker.disabled = false;
      startBtn.disabled = true;      
    }

    updateTimerUI(ms2str(diff));
  }, 1000);
});


function updateTimerUI({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days;
  document.querySelector('[data-hours]').textContent = hours;
  document.querySelector('[data-minutes]').textContent = minutes;
  document.querySelector('[data-seconds]').textContent = seconds;
}