const gridContainer = document.querySelector(".ms_grid-container");
const playButton = document.getElementById("play-button");
const difficultySelect = document.getElementById("difficulty-selection");


playButton.addEventListener("click", function(){
    gridContainer.innerHTML = createGrid();
    for (let i = 0; i < gridContainer.children.length; i++){
        onClickActivateCell(gridContainer.children[i]);
        onClicklogInnerHtml(gridContainer.children[i]);
    }
})



// Create a grid (according to the difficulty)
function createGrid(){

    const temporaryDiv = document.createElement("div");
    const gameDifficulty = difficultySelect.value;

    let cellsNumber;
    let gridType;

    switch(gameDifficulty){
        case "Easy":
        default:
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


function onClickActivateCell (htmlElement){
    htmlElement.addEventListener("click", function(){
        htmlElement.classList.add("ms_active-element");
    });
}


function onClicklogInnerHtml (htmlElement){
    htmlElement.addEventListener("click", function(){
        if(htmlElement.classList.contains("ms_active-element")){
            console.log(htmlElement.innerHTML);
        }
    })
}


function generateBomb (cell_range){
    // Easy 1-100
    // Medium 1-81
    // Hard 1-49
    const bombFilledCells = [];

    for (let i = 0; i < 16; i++){
        let bombLocation = Math.floor(Math.random() * (cell_range + 1 - 1) + 1);
        while (bombFilledCells.includes(bombLocation)){
            bombLocation = Math.floor(Math.random() * (cell_range + 1 - 1) + 1);
        }
        bombFilledCells.push(bombLocation);    
    }

    return bombFilledCells;
}

console.log(generateBomb(100));