let choice = ['rock', 'paper', 'scissors']

function getComputerChoice(){
    let arg = parseInt(Math.random() * 3);
    console.log(arg);
    return choice[arg];
}

console.log(getComputerChoice());