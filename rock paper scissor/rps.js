const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scisssor = document.getElementById("scisssor");
const player = document.getElementById("player");
const comp = document.getElementById("comp");
const result = document.getElementById("result");
const psc = document.getElementById("psc");
const csc = document.getElementById("csc");


/* 0 = paper
1 = rock
2 = scissor*/

function rock1(){
    const cchoice = Math.floor(Math.random()*3);
    if(cchoice == 0){
        result.textContent = "YOU LOSE!";
        player.textContent = "PLAYER: ROCK";
        comp.textContent = "COMPUTER: PAPER";
        csc.value = Number(csc.value) + 1;
    }
    else if(cchoice == 1){
        result.textContent = "IT'S A TIE!";
        player.textContent = "PLAYER: ROCK";
        comp.textContent = "COMPUTER: ROCK";
    }
    else{
        result.textContent = "YOU WIN!";
        player.textContent = "PLAYER: ROCK";
        comp.textContent = "COMPUTER: SCISSOR";
        psc.value = Number(psc.value) + 1;
    }
}
function paper1(){
    const cchoice = Math.floor(Math.random()*3);
    if(cchoice == 0){
        result.textContent = "IT'S A TIE!";
        player.textContent = "PLAYER: PAPER";
        comp.textContent = "COMPUTER: PAPER";
    }
    else if(cchoice == 1){
        result.textContent = "YOU WIN!";
        player.textContent = "PLAYER: PAPER";
        comp.textContent = "COMPUTER: ROCK";
        psc.value = Number(psc.value) + 1;

    }
    else{
        result.textContent = "YOU LOSE!";
        player.textContent = "PLAYER: PAPER";
        comp.textContent = "COMPUTER: SCISSOR";
        csc.value = Number(csc.value) + 1;

    }
}
function scissor1(){
    const cchoice = Math.floor(Math.random()*3);
    if(cchoice == 0){
        result.textContent = "YOU WIN!";
        player.textContent = "PLAYER: SCISSOR";
        comp.textContent = "COMPUTER: PAPER";
        psc.value = Number(psc.value) + 1;
    }
    else if(cchoice == 1){
        result.textContent = "YOU LOSE!";
        player.textContent = "PLAYER: SCISSOR";
        comp.textContent = "COMPUTER: ROCK";
        csc.value = Number(csc.value) + 1;

    }
    else{
        result.textContent = "IT'S A TIE!";
        player.textContent = "PLAYER: SCISSOR";
        comp.textContent = "COMPUTER: SCISSOR";
    }
}

