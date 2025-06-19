const dateInput = document.getElementById("dateInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let countdownInterval;

window.onload = () => {
  const now = new Date();
  const local = now.toISOString().slice(0, 16);
  dateInput.min = local;

  const savedDate = localStorage.getItem("countdownDate");
  if (savedDate) {
    const targetDate = new Date(savedDate);
    dateInput.value = savedDate.slice(0, 16);
    startCountdown(targetDate);
  }
};

startBtn.addEventListener("click", () => {
  const targetDate = new Date(dateInput.value);

  if (isNaN(targetDate.getTime())) {
    alert("Please select a valid date and time.");
    return;
  }

  const now = new Date();
  if (targetDate <= now) {
    alert("Please choose a future date!");
    return;
  }

  localStorage.setItem("countdownDate", dateInput.value); 
  clearInterval(countdownInterval);
  startCountdown(targetDate);
});

resetBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  localStorage.removeItem("countdownDate");
  updateDisplay(0, 0, 0, 0);
  alert("Countdown reset.");
});

function startCountdown(targetDate) {
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      localStorage.removeItem("countdownDate");
      updateDisplay(0, 0, 0, 0);
      alert("Time is up!");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function updateDisplay(days, hours, minutes, seconds) {
  animateFlip(daysEl, days);
  animateFlip(hoursEl, hours);
  animateFlip(minutesEl, minutes);
  animateFlip(secondsEl, seconds);
}

function animateFlip(element, newValue) {
  const current = element.textContent;
  const formatted = String(newValue).padStart(2, '0');

  if (current !== formatted) {
    const flip = document.createElement("span");
    flip.className = "flip";
    flip.textContent = formatted;
    element.innerHTML = "";
    element.appendChild(flip);

    setTimeout(() => {
      element.textContent = formatted;
    }, 500);
  }
}
