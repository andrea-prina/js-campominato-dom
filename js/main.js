let playerScore = 0;
let maxPlayerScore = 0;
let bombsArray = [];
let gameOver = false;
const BOMBS_NUMBER = 16;

const playButton = document.getElementById("play-button");
const gridContainer = document.querySelector(".ms_grid-container");




playButton.addEventListener("click", function(){
    startGame();
})




function startGame(){

    playButton.innerHTML = "Reset";
    gameOver = false;
    playerScore = 0;

    const cellsNumber = setCellsNumberBasedOnDifficulty();
    maxPlayerScore = cellsNumber - BOMBS_NUMBER;

    gridContainer.innerHTML = createGrid(cellsNumber);

    bombsArray = generateBomb(cellsNumber);

    for (let i = 0; i < gridContainer.children.length; i++){
        gridContainer.children[i].addEventListener("click", function(){
            checkBombOrSafe(gridContainer.children[i], bombsArray, maxPlayerScore);
        });
    }
}




function setCellsNumberBasedOnDifficulty (){

    const difficultySelect = document.getElementById("difficulty-selection").value;
    let gridCells = 0;

    switch(difficultySelect){
        case "Easy":
        default:
            // If the user modifies the HTML to input an unacceptable value, set the difficulty to easy
            gridCells = 100;
            break;

        case "Medium":
            gridCells = 81;
            break;

        case "Hard":
            gridCells = 49;
            break;
    }

    return gridCells;
}




function createGrid(gridCells){

    const temporaryDiv = document.createElement("div");
    
    for(let i = 1; i<= gridCells; i++){
        const gridElement = document.createElement("div");
        gridElement.classList.add("ms_grid-element");
        gridElement.style.width = `calc(100% / ${Math.sqrt(gridCells)})`;
        gridElement.style.height = `calc(100% / ${Math.sqrt(gridCells)})`;
        gridElement.innerHTML = i;
        temporaryDiv.append(gridElement);
    }

    return temporaryDiv.innerHTML;
}




function generateBomb (cellRange){

    const bombFilledCells = [];

    for (let i = 0; i < BOMBS_NUMBER; i++){
        let bombLocation = Math.floor(Math.random() * (cellRange + 1 - 1) + 1);
        while (bombFilledCells.includes(bombLocation)){
            bombLocation = Math.floor(Math.random() * (cellRange + 1 - 1) + 1);
        }
        bombFilledCells.push(bombLocation);    
    }

    return bombFilledCells;
}




function checkBombOrSafe(htmlElement, bombsLocation, maxScore){

    const cellValue = parseInt(htmlElement.innerHTML);


    if (bombsLocation.includes(cellValue)){
        htmlElement.classList.add("ms_bomb-element");
        htmlElement.innerHTML = `<i class="fa-solid fa-land-mine-on"></i>`;
        stopGame();
    } else {

        if (htmlElement.classList.contains("ms_safe-element") === false){

            htmlElement.classList.add("ms_safe-element");

            playerScore = increaseScore(playerScore, gameOver);
            if(playerScore === maxScore){
                stopGame();
        }

        }
    }
}




function increaseScore(pScore, gameStatus){
    if (gameStatus === false){
        pScore += 1;
        return pScore;
    }
}



function stopGame(){

    const gridDisabler = document.createElement("div");
    gridDisabler.classList.add("grid-disabler");

    const gameEndBanner = document.createElement("div");
    gameEndBanner.classList.add("endgame-alert");
    if (playerScore === maxPlayerScore){
        gameOver = true;
        gameEndBanner.innerHTML = `<h1>CONGRATULAZIONI!!!</h1><h3>Hai completato la partita col massimo dei punti (${playerScore})</h3><h6>Premi <strong>Play</strong> per rigiocare</h6>`;
    } else {
        gameOver = true;
        showAllBombs(bombsArray);
        gameEndBanner.innerHTML = `<h1>PARTITA TERMINATA</h1><h3>Hai totalizzato ${playerScore} pt.</h3><h6>Premi <strong>Play</strong> per rigiocare</h6>`;
    }

    gridContainer.append(gridDisabler);
    gridContainer.append(gameEndBanner);
    playButton.innerHTML = "Play";
}




function showAllBombs(bombsPositionList){
    for (let i = 0; i < gridContainer.children.length; i++){
        if (bombsPositionList.includes(parseInt(gridContainer.children[i].innerHTML))){
            gridContainer.children[i].innerHTML = `<i class="fa-solid fa-land-mine-on"></i>`;
            gridContainer.children[i].classList.add("ms_bomb-element"); 
        }
    }
}








