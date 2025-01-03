let currDisp = document.getElementById('currDisp');
let lastDisp = document.getElementById('lastDisp');
let clearButton = document.getElementById('clear');
let delButton = document.getElementById('del');
let eqButton = document.getElementById('eq');
let currOper = null;
let dig1 = '';
let dig2 = '';
resetScreen = false;

//functions for operations
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mult = (a, b) => a * b;
const div = (a, b) => a / b;

function operate(a, b, oper){
    let result;
    a = Number(a);
    b = Number(b);
    switch(oper){
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0){return null}
            result = a / b;
            break;
        default:
            return null;
    }
    return String(result);
}

function clearCurrDisp(){
    currDisp.textContent = '';
    resetScreen = false;
}

function clearLastDisp(){
    lastDisp.textContent = '';
}

//function for resetting everything
function RESET(){
    currOper = null;
    dig1 = '';
    dig2 = '';
    clearCurrDisp();
    clearLastDisp();
}

//event listener for clear button
clearButton.addEventListener('click', function(){
    RESET();
})

eqButton.addEventListener('click', evaluate)

//event listener for delete button
delButton.addEventListener('click', function(){
    currDisp.textContent = currDisp.textContent.slice(0, -1);
})


let numButtons = document.querySelectorAll('button.num');
let operButtons = document.querySelectorAll('button.oper');

//event listeners for num and oper buttons
numButtons.forEach((item) => {
    item.addEventListener('click', function() {
        if (resetScreen){clearCurrDisp();}
        currDisp.textContent += item.textContent;
    })
})


function evaluate(){
    if (currOper === null || resetScreen){return}
    dig2 = currDisp.textContent;
    currDisp.textContent = operate(dig1, dig2, currOper);
    lastDisp.textContent = `${dig1} ${currOper} ${dig2} =`
    currOper = null;
}


//attaching event listener for each operation button
operButtons.forEach((item) => {
    item.addEventListener('click', function(){
        if(currOper !== null){evaluate()}
        dig1 = currDisp.textContent;
        currOper = item.textContent;
        lastDisp.textContent = `${dig1} ${currOper}`;
        resetScreen = true;  
    })
})


