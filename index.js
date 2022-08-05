let grid = document.createElement("div");
grid.classList.add("grid");
for (let i = 0; i < 16; i++) {
    grid.appendChild(document.createElement("div"));
}

let gridBoxes = document.querySelectorAll(".grid div");
for (let i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].classList.add("grid-box");
}