const choice = ['rock', 'paper', 'scissors'];

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


//contains logic for rock paper scissors game
function playRound(event){
    const computerSelection = getComputerChoice();
    const humanSelection = event.target.textContent.toLowerCase();
    const result = document.getElementById('result');
    let scoreDiv;
    
    if(humanSelection == computerSelection){
        result.textContent = 'It was a tie...'
    } else if(matchups[humanSelection].strongTo == computerSelection){
        result.textContent = `You win! ${humanSelection} beats ${computerSelection}`;
        humanScore++;
        scoreDiv = document.getElementById('myScore');
        scoreDiv.textContent = `You: ${humanScore}`;
    } else{
        result.textContent = `You lose! ${computerSelection} beats ${humanSelection}`;
        computerScore++;
        scoreDiv = document.getElementById('computerScore');
        scoreDiv.textContent = `Computer: ${computerScore}`;
    }
    
}


//event delegation for buttons
const btnParent = document.getElementById('btn-container');
btnParent.addEventListener('click', (e) => playRound(e));



