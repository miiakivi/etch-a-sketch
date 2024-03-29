const sketchBoard = document.querySelector(".sketch-board");

const eraseButton = document.querySelector(".eraser-button");
const colorButtons = document.querySelectorAll(".color-button");
const newGridButton = document.querySelector(".new-grid-button");

const sliderText = document.querySelector('.range-number');
const sizeSlider = document.querySelector(".slider");

let color = '#000000';
let gridPixelSize = 16;


function createGrid(pixelSize) {
    clearGrid();

    console.log("Create grid " + pixelSize);

    let gridArea = pixelSize * pixelSize;

    for(let i = 0; i < gridArea; i++) {
        let gridCell = document.createElement('div');
        gridCell.classList.add("pixel")

        sketchBoard.style.gridTemplateColumns = `repeat(${pixelSize}, 1fr)`;
        sketchBoard.style.gridTemplateRows = `repeat(${pixelSize}, 1fr)`;
        sketchBoard.appendChild(gridCell);
    }
    let gridPixels = sketchBoard.querySelectorAll('div');

    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', pixelColor));


}

//Color buttons functions
function pixelColor() {
    this.style.backgroundColor = color;
}

function drawRedShade() {
    let red = 255;
    let green = Math.floor(Math.random()*160);
    let blue = Math.floor(Math.random()*150);
    color = `rgb(${red}, ${green}, ${blue})`;
}

function drawBlueShade() {
    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = 255;
    color = `rgb(${red}, ${green}, ${blue})`;
}

function drawWhite() {
    color = '#FFFFFF';
}

function eraseAllColor() {
    let gridPixels = sketchBoard.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff');
}

function playersPickedColor(val) {
    color = val;
}


function colorPicker(event) {
    switch(event.target.dataset.color) {
        case 'red':
            drawRedShade();
            break;
        case 'blue':
            drawBlueShade();
            break;
        case 'random':
            playersPickedColor(this.value)
            break;
        case 'white':
            drawWhite();
            break;            
        case 'black':
            color = 'black';
            break;   
    }
}

function pixelSizeText() {
    sliderText.textContent = sizeSlider.value + ' pixels';

    sizeSlider.addEventListener('mousemove', function() {
        if (sizeSlider.value == gridPixelSize) {
            return;
        }
        sliderText.textContent = sizeSlider.value + ' pixels';
        gridPixelSize = sizeSlider.value;
        createGrid(gridPixelSize);
    })
    
}

//When new pixel size is chosen, old divs are removed and then new grid is drawn
function clearGrid() {  
    while (sketchBoard.firstChild) {
        sketchBoard.removeChild(sketchBoard.lastChild);
    }
}


pixelSizeText();
createGrid(gridPixelSize)


colorButtons.forEach(colorButton => colorButton.addEventListener('click', colorPicker));
eraseButton.addEventListener('click', eraseAllColor);










