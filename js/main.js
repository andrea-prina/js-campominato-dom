const gridContainer = document.querySelector(".ms_grid-container");
const playButton = document.getElementById("play-button");

let playerScore = 0;
const BOMBS_NUMBER = 1;





playButton.addEventListener("click", function(){
    startGame();
})




function startGame(){

    playerScore = 0;
    //  0. Recupera la difficoltà della partita e
    const cellsNumber = setCellsNumberBasedOnDifficulty();
    const maxPlayerScore = cellsNumber - BOMBS_NUMBER;
    console.log(maxPlayerScore);

    //  1. Genera la griglia ed assegna un valore ad ogni cella
    gridContainer.innerHTML = createGrid(cellsNumber);

    //  2. Genera le bombe
    const bombsArray = generateBomb(cellsNumber);
    console.log(bombsArray);

    //  3. Aggiungo verifica al click della cella se il valore è bomba o meno
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
    // Recupero il valore dell'elemento cliccato
    const cellValue = parseInt(htmlElement.innerHTML);
    // Controllo se è presente nel'elenco delle bombe e aggiungo la classe di conseguenza
    if (bombsLocation.includes(cellValue)){
        htmlElement.classList.add("ms_bomb-element");
        stopGame();
    } else {
        htmlElement.classList.add("ms_safe-element");
        playerScore += 1;
        console.log(playerScore);
        if(playerScore === maxScore){
            stopGame();
        }
    }
}


function stopGame(){
    alert(`PARTITA TERMINATA. Hai totalizzato ${playerScore} punti!!!`);
}











