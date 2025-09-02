document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navigation");
    
    console.log('Hamburger:', hamburger);
    console.log('Navbar:', navbar);

    if (hamburger && navbar) {
        hamburger.addEventListener("click", () => {
            console.log('Hamburger clicked!');
            hamburger.classList.toggle("active");
            navbar.classList.toggle("visible-navbar");
        });
    }

    const changingMediaQuery = () => {
        if (window.innerWidth >= 768) {
            hamburger.classList.remove("active");
            navbar.classList.remove("visible-navbar");
        } else {
            navbar.classList.remove("visible-navbar");
        }
    };
    
    window.addEventListener("resize", changingMediaQuery);
});

let currentInput = '';
let currentOperation = '';
let previousInput = '';


function appendNumber(number) {
    currentInput += number;
    document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
}
function appendOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById('display').value = `${previousInput} ${currentOperation}`;
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        case '*':
            result = prev * current;
            break;
        default:
            return;
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

function changeTimer() {
    document.getElementById('stopwatch').style.display = 'none';

    document.getElementById('clock').style.display = 'block';
}

function showStopwatch() {
    document.getElementById('stopwatch').style.display = 'block';
    document.getElementById('clock').style.display = 'none';

}

function showTimer() {
    document.getElementById('stopwatch').style.display = 'none';
    document.getElementById('clock').style.display = 'block';
}
let interval = null;
function startTimer() {
    let time = parseInt(document.getElementById('timer-input').value, 10);
    const timerDisplay = document.getElementById('timer-display');

    if (isNaN(time) || time <= 0) {
        alert('Please enter a valid number of seconds.');
        return;
    }

    // Проверяем, если таймер уже запущен, не запускаем новый
    if (interval !== null) {
        alert('Timer is already running!');
        return;
    }

    interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval);
            interval = null; // Сбрасываем переменную после завершения таймера
            timerDisplay.value = '00:00:00';
        } else {
            time--;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerDisplay.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
}

function resetTimer() {
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.value = '00:00:00';

    // Останавливаем таймер, если он запущен
    if (interval !== null) {
        clearInterval(interval);
        interval = null; // Сбрасываем переменную
    }
}