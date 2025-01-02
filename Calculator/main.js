let disp = document.getElementById('display');
let clearButton = document.getElementById('clear');
let delButton = document.getElementById('del');

//event listener for clear button
clearButton.addEventListener('click', function(){
    disp.textContent = '';
})

//event listener for delete button
delButton.addEventListener('click', function(){
    disp.textContent = disp.textContent.slice(0, -1);
})


let dispButtons = document.querySelectorAll('button.disp');

//event listeners for num and oper buttons
dispButtons.forEach((item) => {
    item.addEventListener('click', function() {
        disp.textContent += item.textContent;
    })
})



const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mult = (a, b) => a * b;
const div = (a, b) => a / b;

function operate(a, b, oper){
    
}
