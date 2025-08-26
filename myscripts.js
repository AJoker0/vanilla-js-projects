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