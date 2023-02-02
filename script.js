let operator = "";
let currentValue = "";
let previousValue = "";
let previousText = document.querySelector(".previous");
let currentText = document.querySelector(".current");

let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");
let plusminus = document.querySelector(".plusminus");
let backspace = document.querySelector(".backspace");
let percent = document.querySelector(".percent");
let operators = document.querySelectorAll(".operator");
let numbers = document.querySelectorAll(".number");

numbers.forEach((number) => number.addEventListener("click", function(e) {
    handleNumber(e.target.textContent);
}))

function handleNumber(num) {
    if (currentValue.includes(".") && currentValue.includes("-")) {
        if (currentValue.length < 18) {
            currentValue += num;
        }
    }
    else if (currentValue.includes(".") || currentValue.includes("-")) {
        if (currentValue.length < 17) {
            currentValue += num;
        }
    }
    else if (currentValue.length < 16){
        currentValue += num;
    }
    currentText.textContent = currentValue;
}

operators.forEach((operator) => operator.addEventListener("click", function(e) {
    handleOperator(e.target.textContent);
}))

function handleOperator(op) {
    if (operator != ""){
        calculate();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = "";
    previousText.textContent = previousValue + " " + operator;
    currentText.textContent = currentValue;
}

clear.addEventListener("click", function(e) {
    clearAll();
})

function clearAll() {
    operator = "";
    currentValue = "";
    previousValue = "";
    currentText.textContent = 0;
    previousText.textContent = "";
    let btns = document.querySelectorAll("button");
    btns.forEach((operator) => operator.removeAttribute("disabled"));
}

equal.addEventListener("click", function(e) {
    equation();
})

function equation() {
    if(operator == "") {
        currentText.textContent = currentValue;
    }
    else {
        calculate()
        previousText.textContent = "";
        currentText.textContent = previousValue;
    }
}

decimal.addEventListener("click", function(e) {
    addDecimal();
})

function addDecimal() {
    if (!currentValue.toString().includes(".")) {
        currentText.textContent = currentValue += ".";
    }
}

plusminus.addEventListener("click", function(e) {
    addPlusminus();
}
)

function addPlusminus() {
    currentValue = currentValue * (-1);
    currentValue = currentValue.toString()
    currentText.textContent = currentValue;
}

backspace.addEventListener("click", function(e) {
    exeBackspace();
})

function exeBackspace() {
    if (currentValue.length <= 1) {
        currentValue = 0;
        currentText.textContent = 0;
    }
    else {
        currentValue = currentValue.slice(0, currentValue.length -1);
        currentText.textContent = currentValue;
    }
}

percent.addEventListener("click", function(e) {
    addPercent();
}
)

function addPercent() {
    previousValue = Number(previousValue);
    if (previousValue === 0 || previousValue === "") {
        currentText.textContent = "0";
    }
    else {
        let x = parseFloat((previousValue / 100) * currentValue).toFixed(15);
        previousText.textContent = previousValue + " " + operator + " " + x;
        currentText.textContent = x;
        currentValue = x;
    }
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    if (operator === "+") {
        previousValue += currentValue;
    }
    else if (operator === "-") {
        previousValue -= currentValue;
    }
    else if (operator === "x") {
        previousValue *= currentValue;
    }
    else if (operator === "÷") {
        previousValue /= currentValue;
        if (previousValue === Infinity) {
            previousValue = "Cannot divide by zero";
            let buttons = document.querySelectorAll(".operator, .decimal, .plusminus, .equal, .number, .backspace, .percent")
            buttons.forEach((operator) => operator.setAttribute("disabled", true))
        }
    }
    currentValue = previousValue;
    operator = "";
}

window.addEventListener("keydown", function(e) {
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    else if (e.key === ".") {
        addDecimal();
    }
    else if (e.key === "=" || e.key === 'Enter') {
        equation();
    }
    else if (e.key === "Backspace") {
        exeBackspace();
    }
    else if (e.key === "Escape") {
        clearAll();
    }
    else if (e.key === "+") {
        handleOperator(e.key);
    }
    else if (e.key === "-") {
        handleOperator(e.key);
    }
    else if (e.key === "*") {
        handleOperator("x");
    }
    else if (e.key === '/') {
        handleOperator("÷");
    } 
})