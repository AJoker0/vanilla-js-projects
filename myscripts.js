// ==== Navbar (hamburger) =====================================================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navigation");

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navbar.classList.toggle("visible-navbar");
    });
  }

  const changingMediaQuery = () => {
    if (window.innerWidth >= 768) {
      hamburger?.classList.remove("active");
      navbar?.classList.remove("visible-navbar");
    } else {
      navbar?.classList.remove("visible-navbar");
    }
  };
  window.addEventListener("resize", changingMediaQuery);
});

// ==== Calculator =============================================================
let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
  currentInput += number;
  document.getElementById('display').value =
    `${previousInput} ${currentOperation} ${currentInput}`;
}
function appendOperation(operation) {
  if (currentInput === '') return;
  if (previousInput !== '') calculate();
  currentOperation = operation;
  previousInput = currentInput;
  currentInput = '';
  document.getElementById('display').value =
    `${previousInput} ${currentOperation}`;
}
function calculate() {
  if (previousInput === '' || currentInput === '') return;
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  switch (currentOperation) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '/':
      if (current === 0) { alert("Cannot divide by zero"); return; }
      result = prev / current; break;
    case '*': result = prev * current; break;
    default: return;
  }
  currentInput = result.toLocaleString();
  currentOperation = '';
  previousInput = '';
  document.getElementById('display').value = currentInput;
}
function clearDisplay() {
  currentInput = '';
  previousInput = '';
  currentOperation = '';
  document.getElementById('display').value = '';
}

// ==== Timer view switch ======================================================
function showStopwatch() {
  document.getElementById('stopwatch').style.display = 'block';
  document.getElementById('clock').style.display = 'none';
}
function showTimer() {
  document.getElementById('stopwatch').style.display = 'none';
  document.getElementById('clock').style.display = 'block';
}

// ==== Countdown timer (accurate) ============================================
let countdownInterval = null;

function startTimer() {
  const input = parseInt(document.getElementById('timer-input').value, 10);
  const display = document.getElementById('timer-display');
  const timerBox = document.querySelector('.timer');
  const sound = document.getElementById('timer-sound');

  if (isNaN(input) || input <= 0) return;
  if (countdownInterval) return;

  const endAt = Date.now() + input * 1000;

  update();
  countdownInterval = setInterval(update, 200); // smoother updates

  function update() {
    const diff = endAt - Date.now();
    const secs = Math.max(0, Math.ceil(diff / 1000));
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    display.value = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

    if (secs <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;

      // Play sound (if user interacted before, browser should allow it)
      if (sound) {
        try {
          sound.currentTime = 0;
          sound.play().catch(() => {});
        } catch (_) {}
      }
      showConfettiBurst(timerBox);
    }
  }
}

function resetTimer() {
  const display = document.getElementById('timer-display');
  display.value = '00:00';
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

// ==== Confetti inside timer box =============================================
function showConfettiBurst(container, count = 40) {
  if (!container) return;
  
  const pieces = [];
  for (let i = 0;  i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const size = 6 + Math.random() * 6;
    const rot = (Math.random() * 720 - 360).toFixed(0);
    const hue = Math.floor(Math.random() * 360);

    piece.style.setProperty('--dx', `${dx}px`);
    piece.style.setProperty('--dy', `${dy}px`);
    piece.style.setProperty('--rot', `${rot}deg`);
    piece.style.setProperty('--size', `${size}px`);
    piece.style.setProperty('--hue', hue);

    container.appendChild(piece);
    pieces.push(piece);

    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
}

function generateRandomNumber() {
    const number = Math.floor(Math.random() * 101);
    document.getElementById('random-display').value = number;
}
window.generateRandomNumber = generateRandomNumber;

// expose for inline onclicks
window.appendNumber = appendNumber;
window.appendOperation = appendOperation;
window.calculate = calculate;
window.clearDisplay = clearDisplay;

window.showStopwatch = showStopwatch;
window.showTimer = showTimer;

window.startTimer = startTimer;
window.resetTimer = resetTimer;
