const container = document.querySelector('.container');

// Grid creation
function createGrid() {
  for (let i = 0; i < 9; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    container.appendChild(gridItem);
  }
}

window.onload = createGrid();

const n = prompt("what's the size");

// Game functionalities
let index = 0;
const positionArr = [];

function randomizePosition() {
  const randomNum = Math.floor(Math.random() * 9);
  index = randomNum;
  container.children[randomNum].style.backgroundColor = 'blue';
  positionArr.push(randomNum);
  console.log(randomNum);
}

function removeColor() {
  container.children[index].style.background = 'none';
}

let count = 0;
const interval = setInterval(() => {
  randomizePosition();
  setTimeout(() => {
    removeColor();
  }, 200);
  count++;
  if (count === 15) {
    clearInterval(interval);
  }
}, 2000);

const button = document.querySelector('button');

button.addEventListener('click', () => {
  if (index === positionArr[positionArr.length - n - 1]) {
    console.log('good job');
  } else {
    console.log('wrong');
  }
});
