// Variables
let ms = 0;
let sec = 0;
let min = 0;
let timer = null;
let isRunning = false;
let lapCount = 0;

// Update Display
function updateDisplay() {
    let formatMS = ms < 10 ? '0' + ms : ms;
    let formatSec = sec < 10 ? '0' + sec : sec;
    let formatMin = min < 10 ? '0' + min : min;

    document.getElementById('display').innerText = 
        `${formatMin}:${formatSec}:${formatMS}`;
}

// Update Status
function updateStatus(text, color) {
    document.getElementById('statusText').innerText = text;
    document.querySelector('.status-dot').style.background = color;
}

// Start Timer
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    updateStatus('Running...🏃‍♂️', '#00b09b');
    
    timer = setInterval(() => {
        ms++;

        if (ms === 100) {
            ms = 0;
            sec++;
        }

        if (sec === 60) {
            sec = 0;
            min++;
        }

        updateDisplay();
    }, 10);
}

// Stop Timer
function stopTimer() {
    if (!isRunning) return;
    
    clearInterval(timer);
    isRunning = false;
    updateStatus('Paused!⏸️', '#ff416c');
}

// Reset Timer
function resetTimer() {
    stopTimer();
    ms = 0;
    sec = 0;
    min = 0;
    lapCount = 0;
    document.getElementById('lapsList').innerHTML = '';
    updateDisplay();
    updateStatus('Ready to Start!🎯', '#ff6b9d');
}

// Lap Timer
function lapTimer() {
    if (!isRunning) {
        updateStatus('Start First!⚡', '#ff6b9d');
        return;
    }
    
    lapCount++;
    let lapTime = document.getElementById('display').innerText;
    let lapItem = document.createElement('li');
    lapItem.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>${lapTime}</span>
    `;
    
    let lapsList = document.getElementById('lapsList');
    lapsList.insertBefore(lapItem, lapsList.firstChild);
    
    // Scroll to top
    lapsList.scrollTop = 0;
}

// Initialize
updateDisplay();