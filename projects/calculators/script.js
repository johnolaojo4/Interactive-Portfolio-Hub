let display = document.getElementById('result');
let historyDisplay = document.getElementById('previous-op');

function appendNumber(num) {
    if (display.value === "0") display.value = num;
    else display.value += num;
}

function appendSymbol(symbol) {
    display.value += symbol;
}

function clearDisplay() {
    display.value = "0";
    historyDisplay.innerText = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    if (display.value === "") display.value = "0";
}

function appendSci(func) {
    
    let currentVal = display.value;
    historyDisplay.innerText = `${func}(${currentVal})`;
    
    // convertion from Degrees to Radians
    let radians = parseFloat(currentVal) * (Math.PI / 180);
    
    if (func === 'Math.sin') display.value = Math.sin(radians).toFixed(4);
    if (func === 'Math.cos') display.value = Math.cos(radians).toFixed(4);
    if (func === 'Math.tan') display.value = Math.tan(radians).toFixed(4);
    if (func === 'Math.log10') display.value = Math.log10(parseFloat(currentVal)).toFixed(4);
}

function calculate() {
    try {
        historyDisplay.innerText = display.value + " =";
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

let calcHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];

function saveToHistory(entry) {
    calcHistory.unshift(entry); 
    if (calcHistory.length > 5) calcHistory.pop(); 
    localStorage.setItem('calcHistory', JSON.stringify(calcHistory));
    updateHistoryUI();
}

function updateHistoryUI() {
    const historyList = document.getElementById('global-history-list');
    if (historyList) {
        historyList.innerHTML = calcHistory
            .map(item => `<li>${item}</li>`)
            .join('');
    }
}


updateHistoryUI();

// prevent double decimal and symbols
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) appendNumber(key);
    if (["+", "-", "*", "/"].includes(key)) appendSymbol(key);
    if (key === "Enter" || key === "=") calculate();
    if (key === "Backspace") deleteLast();
    if (key === "Escape") clearDisplay();
});

function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);
        
        historyDisplay.innerText = expression + " =";
        display.value = result;
        
        // Save to history when result is found
        saveToHistory(`${expression} = ${result}`);
    } catch (error) {
        display.value = "Error";
    }
}