const add = arr => arr.reduce((a, b) => a + b)

const sub = arr => arr.reduce((a, b) => a - b)

const mul = arr => arr.reduce((a, b) => a * b)

const div = arr => arr.reduce((a, b) => b === 0 ? "You can't divide by zero." : a / b)

const operate = (op, arr) => {
    if (op === '+') return add(arr);
    if (op === '-') return sub(arr);
    if (op === '*') return mul(arr);
    if (op === '/') return div(arr);
}

const conv = arr => arr.map(Number)

let display = document.querySelector('h1');
let buttons = document.querySelectorAll('button');
let operators = document.querySelectorAll('.operator');

buttons.forEach(btn => btn.addEventListener('click', () => {

    let a = []
    a.push(display.innerHTML);

    if (btn.textContent === '=') {
        while (a[0].include('+')) {
            console.log(a)
        }
    } else if (btn.textContent === 'clear') {
        a = []
        display.textContent = '';
    } else {
        display.textContent += btn.textContent + "";
    }
}))