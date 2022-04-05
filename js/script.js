const add = (a, b) => a + b

const sub = (a, b) => a - b

const mul = (a, b) => a * b

const div = (a, b) => b === 0 ? alert("You can't divide by 0!") : a / b

const operate = (op, a, b) => {
    a = Number(a)
    b = Number(b)
    if (op === '+') return add(a, b);
    if (op === '-') return sub(a, b);
    if (op === '*') return mul(a, b);
    if (op === '/') return div(a, b);
}

let firstOp = ''
let secondOp = ''
let currentOp = null
let resetScreen = false

const lastDisplay = document.querySelector('.last')
const currentDisplay = document.querySelector('.current')
const display = document.querySelector('.display')
const clearBtn = document.querySelector('.clear')
const deleteBtn = document.querySelector('.delete')
const operators = document.querySelectorAll('.operator')
const numberBtn = document.querySelectorAll('.number')
const pointBtn = document.querySelector('.point')
const equalBtn = document.querySelector('.equal')
const calculator = document.querySelector('.calculator')
const body = document.querySelector('body')

window.addEventListener('keydown', handleKeyboardInput)
equalBtn.addEventListener('click', evaluate)
clearBtn.addEventListener('click', clear)
deleteBtn.addEventListener('click', deleteNumber)
pointBtn.addEventListener('click', appendPoint)

calculator.addEventListener('mouseover', () => {
    body.style.setProperty('backdrop-filter', 'blur(5px)')
    calculator.classList.add('scaler')
})
calculator.addEventListener('mouseout', () => {
    body.style.setProperty('backdrop-filter', 'blur(0px)')
    calculator.classList.remove('scaler')
})

numberBtn.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operators.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentDisplay.textContent === '0' || resetScreen) resetScr()
    currentDisplay.textContent += number
}

function deleteNumber() {
    currentDisplay.textContent = currentDisplay.textContent.toString().slice(0, -1)
}

function setOperation(operator) {
    if (currentDisplay !== null) evaluate()
    firstOp = currentDisplay.textContent
    currentOp = operator
    lastDisplay.textContent = `${firstOp} ${currentOp}`
    resetScreen = true
}

function evaluate() {
    if (currentOp === null || resetScreen) return
    secondOp = currentDisplay.textContent
    currentDisplay.textContent = roundResult(operate(currentOp, firstOp, secondOp))
    lastDisplay.textContent = `${firstOp} ${currentOp} ${secondOp} =`
    currentOp = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function resetScr() {
    currentDisplay.textContent = ''
    resetScreen = false
}

function clear() {
    currentDisplay.textContent = '0'
    lastDisplay.textContent = ''
    firstOp = ''
    secondOp = ''
    currentOp = null
}

function appendPoint() {
    if (resetScreen) resetScr()
    if (currentDisplay.textContent === '')
        currentDisplay.textContent = '0'
    if (currentDisplay.textContent.includes('.')) return
    currentDisplay.textContent += '.'
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(e.key)
}