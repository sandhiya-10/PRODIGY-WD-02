let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000 / 60);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    elapsedTime = 0;
    displayTime(0);
    laps.innerHTML = '';
    lapCount = 0;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = elapsedTime;
        const lapItem = document.createElement('li');
        lapCount++;
        lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        laps.appendChild(lapItem);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    display.textContent = formatTime(time);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '') +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds)
    );
}