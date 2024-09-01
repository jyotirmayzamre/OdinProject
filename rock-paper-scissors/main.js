let choice = ['rock', 'paper', 'scissors']
let humanScore = 0;
let computerScore = 0;

function getComputerChoice(){
    let arg = parseInt(Math.random() * 3);
    console.log(arg);
    return choice[arg];
}

function getHumanChoice(){
    return prompt("Enter either rock, paper, or scissors");
}


