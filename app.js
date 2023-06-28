const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');

const startText = document.getElementById('startText');

let intervalId;
let time = 10;
let isRunning = false;

function startTimer() {
  console.log(startText.textContent);
  let text = startText.textContent.trim().toLocaleLowerCase();
  startText.textContent = text == "start" ? "PAUSE" : "START";
  let container = document.querySelector('#container');
  let timer = document.querySelector('#timer');

  if (text == "start") {
    container.classList.remove('container-start');
    container.classList.add('container-pause');
    timer.classList.remove('timer-start');
    timer.classList.add('timer-pause');
    startText.classList.remove('timer__start-label');
    startText.classList.add('timer__pause-label');
    pauseBtn.classList.remove('timer__button-start');
    pauseBtn.classList.add('timer__button-pause');
    stopBtn.classList.remove('timer__button-start');
    stopBtn.classList.add('timer__button-pause');


    intervalId = setInterval(() => {
      if (time <= 0) {
        clearInterval(intervalId);
        toggleMode();
        return;
      }
      
      displayTime();
      time--;
    }, 1000);
  } else {
    pauseTimer();
    container.classList.remove('container-pause');
    container.classList.add('container-start');
    timer.classList.remove('timer-pause');
    timer.classList.add('timer-start');
    startText.classList.remove('timer__pause-label');
    startText.classList.add('timer__start-label');
    pauseBtn.classList.remove('timer__button-pause');
    pauseBtn.classList.add('timer__button-start');
    stopBtn.classList.remove('timer__button-pause');
    stopBtn.classList.add('timer__button-start');
  }
}

function pauseTimer() {
  clearInterval(intervalId);
  isRunning = false;
}

function stopTimer() {
  clearInterval(intervalId);
  time = 10; 
  isRunning = false;
  displayTime();
}

function displayTime() {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function toggleMode() {
    if (time === 0) {
      time = 300;
      displayTime();
      isRunning = false;
      startTimer();
    } else {
      time = 10;
      displayTime();
      startTimer();
    }
  }
  
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  stopBtn.addEventListener('click', stopTimer);
  
  displayTime();
