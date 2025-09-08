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

// ==== Guess Number ===========================================================
const maxNumber = 100;
let secretNumber = null;
let attempts = 0;

const inputEl = document.getElementById('guess-input');
const hintEl = document.getElementById('inputContainer');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const attemptsEl = document.getElementById('attempts');
const historyEl = document.getElementById('history');

// Инициализация новой игры
function initGame() {
  secretNumber = Math.floor(Math.random() * maxNumber) + 1;
  attempts = 0;
  attemptsEl.textContent = `Attempts: ${attempts}`;
  hintEl.textContent = '';
  hintEl.className = 'hint hint--info';
  historyEl.innerHTML = '';
  inputEl.disabled = false;
  guessBtn.disabled = false;
  inputEl.value = '';
  inputEl.focus();
  // console.log(secretNumber); // можно раскомментировать для отладки
}

// Обновление сообщения подсказки
function showHint(message, type = 'info') {
  hintEl.textContent = message;
  hintEl.className = `hint hint--${type}`;
}

// Действие при попытке угадать
function submitGuess() {
  const val = inputEl.value;
  if (val === '') {
    showHint('Введите число.', 'error');
    return;
  }
  const guess = Number(val);
  if (!Number.isFinite(guess) || guess < 1 || guess > maxNumber) {
    showHint(`Введите число от 1 до ${maxNumber}.`, 'error');
    return;
  }

  attempts++;
  attemptsEl.textContent = `Attempts: ${attempts}`;

  const li = document.createElement('li');
  li.textContent = `#${attempts}: ${guess}`;
  historyEl.prepend(li);

  if (guess < secretNumber) {
    showHint('The number is BIGGER. Try again.', 'info');
  } else if (guess > secretNumber) {
    showHint('The number is SMALLER. Try again.', 'info');
  } else {
    showHint(`Congratulations! You guessed the number in ${attempts} attempts.`, 'success');
    inputEl.disabled = true;
    guessBtn.disabled = true;
  }

  inputEl.select();
  inputEl.focus();
}

// Сброс / новая игра
function resetGame() {
  initGame();
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
  guessBtn.addEventListener('click', submitGuess);
  resetBtn.addEventListener('click', resetGame);

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submitGuess();
    }
  });

  initGame();
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


