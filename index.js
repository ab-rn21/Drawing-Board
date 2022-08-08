const DEFAULT_COLOR = "#000";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;

function createBoard() {
    let grid = document.createElement("div");
    grid.classList.add("grid");
    grid.onmousedown = () => (mouseDown = true);
    grid.onmouseup = () => (mouseDown = false);
    for (let i = 0; i < currentSize ** 2; i++) {
        let gridbox = document.createElement("div");
        gridbox.classList.add("grid-box");
        grid.appendChild(gridbox);
        gridbox.style.backgroundColor = "#fff";
        let size = 360000 / Math.pow(currentSize,2);
        size = Math.sqrt(size);
        gridbox.style.width = size + "px";
        gridbox.style.height = size + "px";
        gridbox.addEventListener("mousedown", draw);
        gridbox.addEventListener("mouseover", draw);
    }
    document.body.appendChild(grid);
}


function createButtons() {
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    let clearButton, eraserButton, colorButton, mixieButton, sizeSlider;
    clearButton = document.createElement("button");
    clearButton.appendChild(document.createTextNode("Clear Grid"));
    eraserButton = document.createElement("button");
    eraserButton.appendChild(document.createTextNode("Eraser"));
    colorButton = document.createElement("button");
    colorButton.appendChild(document.createElement("input"));
    colorButton.lastChild.setAttribute("type", "color");
    colorButton.lastChild.setAttribute("value", currentColor);
    mixieButton = document.createElement("button");
    mixieButton.appendChild(document.createTextNode("Mixie"));
    let sliderContainer = document.createElement("div");
    sizeSlider = document.createElement("input");
    sizeSlider.type = "range";
    sizeSlider.min = "1";
    sizeSlider.max = "64";
    sizeSlider.value = "16";
    let sliderText = document.createElement("span");
    sliderContainer.appendChild(sizeSlider);
    sliderContainer.appendChild(document.createElement("br"));
    sliderText.appendChild(document.createTextNode(`${currentSize} x ${currentSize}`));
    sliderContainer.appendChild(sliderText);
    buttonContainer.appendChild(clearButton);
    buttonContainer.appendChild(eraserButton);
    buttonContainer.appendChild(colorButton);
    buttonContainer.appendChild(mixieButton);
    buttonContainer.appendChild(sliderContainer);
    document.body.appendChild(buttonContainer);
    
    clearButton.addEventListener("click", () => {
        let grid = document.querySelector(".grid");
        document.body.removeChild(grid);
        createBoard();
    });

    eraserButton.addEventListener("click", () => {
        currentColor = "#fff";
    });

    colorButton.lastChild.addEventListener("input", () => {
        if (mixieButton.getAttribute("class") == "active") {
            mixieButton.removeAttribute("class");
        }
        currentColor = colorButton.lastChild.value;
    });

    mixieButton.addEventListener("click", () => {
        mixieButton.className = "active";
    });

    sizeSlider.addEventListener("change", () => {
        currentSize = sizeSlider.value;
        let span = document.getElementsByTagName("span");
        span[0].textContent =`${currentSize} x ${currentSize}`;
        createBoard();
    })

}



function draw(e) {
    let mixButton = document.querySelector(".button-container");
    mixButton = mixButton.lastChild.previousSibling;
    if (mixButton.getAttribute("class") == "active") {
        currentColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }
    if (e.type === "mouseover" && !mouseDown) return;
    else e.target.style.backgroundColor = currentColor;
}

createButtons();
createBoard();