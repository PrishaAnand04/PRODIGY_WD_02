document.addEventListener('DOMContentLoaded', function() {
    let startTime;
    let running = false;
    let interval;
    let lapStartTime;

    const display = document.getElementById('display');
    const startStopButton = document.getElementById('StartBtn');
    const resetButton = document.getElementById('ResetBtn');
    const lapButton = document.getElementById('Lap');
    const lapTimesList = document.getElementById('lapTimes');

    function formatTime(ms) {
        const date = new Date(ms);
        return date.toISOString().substr(11, 8);
    }

    function updateDisplay() {
        const elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }

    function startStop() {
        if (running) {
            clearInterval(interval);
            running = false;
            startStopButton.textContent = 'Start';
        } else {
            startTime = Date.now();
            lapStartTime = Date.now(); // Initialize lapStartTime here
            interval = setInterval(updateDisplay, 10);
            running = true;
            startStopButton.textContent = 'Stop';
        }
    }

    function reset() {
        clearInterval(interval);
        running = false;
        display.textContent = '00:00:00';
        startStopButton.textContent = 'Start';
        lapTimesList.innerHTML = '';
    }

    function lap() {
        if (running) {
            const lapTime = Date.now() - lapStartTime;
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${lapTimesList.childElementCount + 1}: ${formatTime(lapTime)}`;
            lapTimesList.prepend(lapItem);
            lapStartTime = Date.now();
        }
    }

    startStopButton.addEventListener('click', startStop);
    resetButton.addEventListener('click', reset);
    lapButton.addEventListener('click', lap);
});
