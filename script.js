let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime(elapsedTime);
}

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateTimer();
        }, 100);
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
});

document.getElementById('reset').addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateTimer();
    lapsList.innerHTML = '';
});

document.getElementById('start').addEventListener('dblclick', () => {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${formatTime(elapsedTime)}`;
    lapsList.appendChild(lapItem);
});
