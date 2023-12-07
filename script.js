const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

/// stopwatch variables

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let interval;

let startTime;
let running = false;

startButton.addEventListener('click',startTimer);
pauseButton.addEventListener('click',pauseTimer);
stopButton.addEventListener('click',stopTimer);
resetButton.addEventListener('click',resetTimer);


function startTimer() {
    if (!running) {
        startTime = performance.now() - milliseconds;
        interval = setInterval(updateTimer, 1);
        startButton.disabled = true;
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(interval);
        addToLapList();
        resetTimerData();
        startButton.disabled = false;
        running = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(interval);
        running = false;
        startButton.disabled = false;

        // Store the current elapsed time when pausing
        const elapsedMilliseconds = performance.now() - startTime;

        // Calculate the remaining seconds and update timer values
        minutes = Math.floor(elapsedMilliseconds / 60000);
        seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);
        milliseconds = Math.floor(elapsedMilliseconds % 1000);

        displayTimer();
    }
}



function resetTimer() {
    if (running) {
        clearInterval(interval);
        running = false;
    }
    resetTimerData();
    startButton.disabled = false;
}

function updateTimer() {
    const elapsedMilliseconds = performance.now() - startTime;
    minutes = Math.floor(elapsedMilliseconds / 60000);
    seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);
    milliseconds = Math.floor(elapsedMilliseconds % 1000);
    displayTimer();
}


function displayTimer(){
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);    
}

function padTime(time){
    return time.toString().padStart(2,'0');
}

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}