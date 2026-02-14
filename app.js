let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerOInput = document.querySelector("#playerO");
let playerXInput = document.querySelector("#playerX");
let turnIndicator = document.querySelector("#turn-indicator");
let turnO = true;
let playerO = "O";
let playerX = "X";

playerOInput.addEventListener("input", () => {
    playerO = playerOInput.value || "O";
    updateTurnIndicator();
});

playerXInput.addEventListener("input", () => {
    playerX = playerXInput.value || "X";
    updateTurnIndicator();
});
let winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetgame = () => {
    turnO = true;
    playerO = playerOInput.value || "O";
    playerX = playerXInput.value || "X";
    updateTurnIndicator();
    enable();
}

const updateTurnIndicator = () => {
    turnIndicator.innerText = turnO ? `It's ${playerO}'s turn` : `It's ${playerX}'s turn`;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
       if(box.disabled) return; // Prevent clicking already filled boxes
       
       if(turnO){   //player O
        box.innerHTML = "O";
        box.style.color = "#f472b6";
        turnO = false;
       }else{    //player X
        box.innerHTML = "X";
        box.style.color = "#22d3ee";
        turnO = true;
       }
       box.disabled = true;

       updateTurnIndicator();
       checkwinner();
    })
})
const disable = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enable = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "" ;
        msgContainer.classList.add("hide");
    }
}
const showWinner = (winner) => {
    let winnerName = winner === "O" ? playerO : playerX;
    msg.innerHTML = `Congratulations, ${winnerName}! You Win!`;
    msgContainer.classList.remove("hide");
    disable();
    turnIndicator.innerText = "";
}
const showTie = () => {
    msg.innerHTML = "It's a Tie!";
    msgContainer.classList.remove("hide");
    disable();
    turnIndicator.innerText = "";
}
const checkwinner = () => {
    for(let pattern of winpattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val !=""){
            if(pos1val === pos2val && pos2val === pos3val){
                    showWinner(pos1val);
                    return;
            }
        }
    }
    // Check for tie
    let isFull = true;
    for(let box of boxes){
        if(box.innerText === ""){
            isFull = false;
            break;
        }
    }
    if(isFull){
        showTie();
    }
};

newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);

// Initialize
resetgame();


