const choice = ['rock', 'paper', 'scissors']
let humanScore = 0;
let computerScore = 0;
const matchups = {
    rock: {weakTo: 'paper', strongTo: 'scissors'},
    paper: {weakTo: 'scissors', strongTo: 'rock'},
    scissors: {weakTo: 'rock', strongTo: 'scissors'}
}

function getComputerChoice(){
    let arg = parseInt(Math.random() * 3);
    return choice[arg];
}

function getHumanChoice(){
    return prompt("Enter either rock, paper, or scissors").toLowerCase();
}

function playRound(humanSelection, computerSelection){
    if(humanSelection === computerSelection){
        console.log('It was a tie...');
    }
    if(matchups[humanSelection].strongTo === computerSelection){
        console.log(`You win! ${humanSelection} beats ${computerSelection}`);
        humanScore++;
    } else{
        console.log(`You lose! ${computerSelection} beats ${humanSelection}`);
        computerScore++;
    }
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();
