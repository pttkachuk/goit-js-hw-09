function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId;

buttonStart.addEventListener('click', () => {
    timerId = setInterval(() => {
        const randomColor = getRandomHexColor();
        document.body.style.background = randomColor;
        buttonStart.disabled = true;
        buttonStop.disabled = false;
    }, 1000)
});

buttonStop.addEventListener('click', () => {
    clearInterval(timerId);
    buttonStop.disabled = true;
    buttonStart.disabled = false;
})