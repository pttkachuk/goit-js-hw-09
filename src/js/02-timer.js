import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
//========================================
const elements = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    day: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
let timer = null;

elements.btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future')
        } else {
            elements.btnStart.disabled = false;
            elements.btnStart.addEventListener('click', handlerCountdown);

            function handlerCountdown() {
                timer = setInterval(() => {
                    elements.btnStart.disabled = true;
                    const dateChoosenTime = new Date().getTime();
                    const now = new Date().getTime();
                    const timeLeft = dateChoosenTime - now;
                    const { days, hours, minutes, seconds } = convertMs(timeLeft);

                    elements.day.innerHTML = days < 10 ? addLeadingZero(days) : days;
                    elements.hours.innerHTML = days < 10 ? addLeadingZero(hours) : hours;
                    elements.minutes.innerHTML = days < 10 ? addLeadingZero(minutes) : minutes;
                    elements.seconds.innerHTML = days < 10 ? addLeadingZero(seconds) : seconds;

                    if (timeLeft < 1000) {
                        clearInterval(timer);
                        elements.btnStart.disabled = false;
                    }
                }, 1000);

            }
            function addLeadingZero(value) {
                const stringValue = String(value);
                return stringValue.padStart(2, '0');
            }
            function convertMs(ms) {
                const second = 1000;
                const minute = second * 60;
                const hour = minute * 60;
                const day = hour * 24;


                const days = Math.floor(ms / day);
                const hours = Math.floor((ms % day) / hour);
                const minutes = Math.floor(((ms % day) % hour) / minute);
                const seconds = Math.floor((((ms % day) % hour) % minute) / second);

                return { days, hours, minutes, seconds };
            }
        }
    },
};
flatpickr(elements.input, options);
