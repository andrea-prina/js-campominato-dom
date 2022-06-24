const gridContainer = document.querySelector(".ms_grid-container");
const playButton = document.getElementById("play-button");
const difficultySelect = document.getElementById("difficulty-selection");


// PRESS PLAY

function startGame(){

    //  0. Recupera la difficoltà della partita
    const gameDifficulty = difficultySelect.value;

    //  1. Genera la griglia ed assegna un valore ad ogni cella
    gridContainer.innerHTML = createGrid(gameDifficulty);

    //  2. Genera le bombe
    const bombsArray = generateBomb(gameDifficulty);
    console.log(bombsArray);

    //  3. Aggiungo verifica al click della cella se il valore è bomba o meno
    for (let i = 0; i < gridContainer.children.length; i++){
        gridContainer.children[i].addEventListener("click", function(){
            checkBomb(gridContainer.children[i], bombsArray)
            console.log(gridContainer.children[i].classList);
        });
    }
}


function checkBomb(htmlElement, bombsLocation){
    // Recupero il valore dell'elemento cliccato
    const cellValue = parseInt(htmlElement.innerHTML);
    // Controllo se è presente nel'elenco delle bombe e aggiungo la classe di conseguenza
    if (bombsLocation.includes(cellValue)){
        htmlElement.classList.add("ms_bomb-element");
    } else {
        htmlElement.classList.add("ms_safe-element");
    }
}





playButton.addEventListener("click", function(){
    startGame();
    })



// Create a grid (according to the difficulty)
function createGrid(difficulty){

    const temporaryDiv = document.createElement("div");

    let cellsNumber;
    let gridType;

    switch(difficulty){
        case "Easy":
        default:
            // If the user modifies the HTML to input an unacceptable value, set the difficulty to easy
            cellsNumber = 100;
            gridType = "easy-grid";
            break;

        case "Medium":
            cellsNumber = 81;
            gridType = "medium-grid";
            break;

        case "Hard":
            cellsNumber = 49;
            gridType = "hard-grid";
            break;
    }
    
    for(let i = 1; i<= cellsNumber; i++){
        const gridElement = document.createElement("div");
        gridElement.classList.add("ms_grid-element", gridType);
        gridElement.innerHTML = i;
        temporaryDiv.append(gridElement);
    }

    return temporaryDiv.innerHTML;
}


function generateBomb (difficulty){
    // Easy 1-100
    // Medium 1-81
    // Hard 1-49
    let cellRange = 0;

    switch(difficulty){
        case "Easy":
        default:
            // If the user modifies the HTML to input an unacceptable value, set the difficulty to easy
            cellRange = 100;
            break;

        case "Medium":
            cellRange = 81;
            break;

        case "Hard":
            cellRange = 49;
            break;
    }

    const bombFilledCells = [];

    for (let i = 0; i < 16; i++){
        let bombLocation = Math.floor(Math.random() * (cellRange + 1 - 1) + 1);
        while (bombFilledCells.includes(bombLocation)){
            bombLocation = Math.floor(Math.random() * (cellRange + 1 - 1) + 1);
        }
        bombFilledCells.push(bombLocation);    
    }

    return bombFilledCells;
}