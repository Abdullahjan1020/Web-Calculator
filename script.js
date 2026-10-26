let currentNumber = "0";
let previousNumber = null;
let operator = null;
let waitingForNewNumber = false;

const display = document.querySelector(".output_screen td");
const cells = document.querySelectorAll("table tr:not(.output_screen) td");
const menuButton = document.querySelector("#menu_button");
const menuOptions = document.querySelector("#menu_options");
const modePanels = document.querySelectorAll(".mode_panel");

menuButton.addEventListener("click", function () {
    const isOpen = menuOptions.hidden;
    menuOptions.hidden = !isOpen;
    menuButton.setAttribute("aria-expanded", String(isOpen));
});

menuOptions.addEventListener("click", function (event) {
    const mode = event.target.dataset.mode;
    if (!mode) {
        return;
    }

    modePanels.forEach(function (panel) {
        panel.hidden = panel.id !== mode + "_panel";
    });
    menuOptions.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
});

function updateDisplay(){
    if(previousNumber !== null && operator !== null){
        if(waitingForNewNumber){
            display.textContent = previousNumber + " " + operator;
        } else{
            display.textContent = previousNumber + " " + operator + " " + currentNumber;
        }
    } else {
        display.textContent = currentNumber;
    }
}
updateDisplay();

const unitDefinitions = {
    length: {
        units: { m: 1, km: 1000, cm: 0.01, ft: 0.3048, in: 0.0254 },
        decimals: 6
    },
    weight: {
        units: { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.0283495231 },
        decimals: 6
    },
    temperature: {
        units: ["C", "F", "K"],
        decimals: 2
    }
};

const unitCategory = document.querySelector("#unit_category");
const unitFrom = document.querySelector("#unit_from");
const unitTo = document.querySelector("#unit_to");

function populateUnits() {
    const definition = unitDefinitions[unitCategory.value];
    const units = Array.isArray(definition.units) ? definition.units : Object.keys(definition.units);
    unitFrom.innerHTML = "";
    unitTo.innerHTML = "";

    units.forEach(function (unit, index) {
        unitFrom.add(new Option(unit, unit));
        unitTo.add(new Option(unit, unit));
        if (index === 1) {
            unitTo.value = unit;
        }
    });
}

unitCategory.addEventListener("change", populateUnits);
populateUnits();

document.querySelectorAll("[data-scientific]").forEach(function (button) {
    button.addEventListener("click", function () {
        const value = Number(currentNumber);
        const operation = button.dataset.scientific;
        let result;

        if (operation === "sqrt") {
            result = value < 0 ? NaN : Math.sqrt(value);
        } else if (operation === "square") {
            result = value ** 2;
        } else {
            result = Math[operation](value * Math.PI / 180);
        }

        if (Number.isNaN(result)) {
            display.textContent = "Invalid input";
            return;
        }
        currentNumber = String(Number(result.toFixed(10)));
        previousNumber = null;
        operator = null;
        waitingForNewNumber = true;
        updateDisplay();
    });
});

function convertTemperature(value, from, to) {
    let celsius = from === "F" ? (value - 32) * 5 / 9 : from === "K" ? value - 273.15 : value;
    return to === "F" ? celsius * 9 / 5 + 32 : to === "K" ? celsius + 273.15 : celsius;
}

document.querySelector("#convert_unit").addEventListener("click", function () {
    const value = Number(document.querySelector("#unit_value").value);
    const definition = unitDefinitions[unitCategory.value];
    const result = unitCategory.value === "temperature"
        ? convertTemperature(value, unitFrom.value, unitTo.value)
        : value * definition.units[unitFrom.value] / definition.units[unitTo.value];
    document.querySelector("#unit_result").textContent =
        `${value} ${unitFrom.value} = ${Number(result.toFixed(definition.decimals))} ${unitTo.value}`;
});

const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, PKR: 278, JPY: 149.5 };

document.querySelector("#convert_currency").addEventListener("click", function () {
    const value = Number(document.querySelector("#currency_value").value);
    const from = document.querySelector("#currency_from").value;
    const to = document.querySelector("#currency_to").value;
    const result = value / currencyRates[from] * currencyRates[to];
    document.querySelector("#currency_result").textContent =
        `${value} ${from} = ${result.toFixed(2)} ${to}`;
});

cells.forEach(function(cell){
    cell.addEventListener("click", function() {
        const value = cell.textContent.trim();
        if (!isNaN(value) || value === "."){
            enterNumber(value)
        } else if (value === "C") {
            clearCalculator();
        } else if (value === "⌫") {
            deleteNumber();
        } else if (value === "="){
            calculateResult();
        } else {
            chooseOperator(value)
        }
    });
});

function enterNumber(value){
    if(waitingForNewNumber){
        currentNumber = value;
        waitingForNewNumber = false;
    } else if (value === "." && currentNumber.includes(".")){
        return;
    } else if (currentNumber === "0" && value !== "."){
        currentNumber = value;
    } else {
        currentNumber += value;
    }

    updateDisplay()
}

function chooseOperator(selectedOperator){
    previousNumber = Number(currentNumber);
    operator = selectedOperator;
    waitingForNewNumber = true;

    updateDisplay();
}

function calculateResult(){
    if (previousNumber === null || operator === null){
        return;
    }

    const currentValue = Number(currentNumber);
    let result;

    if(operator === "+"){
        result = previousNumber + currentValue;
    } else if (operator === "-"){
        result = previousNumber - currentValue;
    } else if (operator === "X"){
        result = previousNumber * currentValue;
    } else if (operator === "÷"){
        if (currentValue === 0){
            display.textContent = "Can not divide by 0";
            return;
        }
        result = previousNumber / currentValue;
    } else if (operator === "%"){
        result = previousNumber % currentValue;
    }

    currentNumber = String(result)
    previousNumber = null;
    operator = null;
    waitingForNewNumber = true;

    updateDisplay();
}

function clearCalculator(){
    currentNumber = "0";
    previousNumber = null;
    operator = null;
    waitingForNewNumber = false;

    updateDisplay();
}

function deleteNumber(){
    if(currentNumber.length === 1){
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }

    updateDisplay();
}

updateDisplay()