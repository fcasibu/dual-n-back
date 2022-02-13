const gridContainer = document.querySelector(".grid-container");
const container = document.querySelector(".container");

function createGrid() {
  for (let i = 0; i < 9; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  }
}

const buttonContainerTop = document.createElement("div");
const buttonContainerBottom = document.createElement("div");
buttonContainerTop.classList.add("button-container");
buttonContainerBottom.classList.add("button-container");
container.prepend(buttonContainerTop);
document.body.append(buttonContainerBottom);

function createButtons() {
  for (let i = 0; i < 5; i++) {
    const button = document.createElement("button");
    button.classList.add("button");
    buttonContainerTop.appendChild(button);
  }
  buttonContainerTop.children[0].setAttribute("data-button", "speed-trial");
  buttonContainerTop.children[1].setAttribute("data-button", "ncount");
  buttonContainerTop.children[2].setAttribute("data-button", "start");
  buttonContainerTop.children[4].setAttribute("data-button", "help");
  buttonContainerTop.children[0].textContent = "Adjust speed & trial count";
  buttonContainerTop.children[1].textContent = "Adjust n back";
  buttonContainerTop.children[2].textContent = "Start game";
  buttonContainerTop.children[3].textContent = "Reset";
  buttonContainerTop.children[4].textContent = "Help";

  for (let i = 0; i < 2; i++) {
    const button = document.createElement("button");
    button.classList.add("button");
    buttonContainerBottom.appendChild(button);
  }

  buttonContainerBottom.children[0].setAttribute("data-key", "a");
  buttonContainerBottom.children[1].setAttribute("data-key", "d");
  buttonContainerBottom.children[0].textContent = "Position (a)";
  buttonContainerBottom.children[1].textContent = "Color (d)";
}

window.onload = createGrid();
window.onload = createButtons();

const titleNCount = document.querySelector(".n-count");
const buttonConfirm = document.querySelectorAll(".button-confirm");

const adjustSpeedTrial = document.querySelector(".adjust-speed-trial");
const speedInput = document.querySelector("#speed");
const trialInput = document.querySelector("#trial");

const adjustNCount = document.querySelector(".adjust-ncount");
const nCountInput = document.querySelector("#n-count-number");
const nCountError = document.querySelector(".ncount-error");

const helpBox = document.querySelector(".help-box");
window.onload = helpBox.classList.add("help-show");

const endScreen = document.querySelector(".end-screen");

function showAdjustSpeedTrial(e) {
  if (e.dataset.button === "speed-trial") {
    adjustSpeedTrial.classList.toggle("adjust-speed-trial-show");
    adjustNCount.classList.remove("adjust-ncount-show");
    helpBox.classList.remove("help-show");
  }
}

function showAdjustNCount(e) {
  if (e.dataset.button === "ncount") {
    adjustNCount.classList.toggle("adjust-ncount-show");
    adjustSpeedTrial.classList.remove("adjust-speed-trial-show");
    helpBox.classList.remove("help-show");
    nCountError.style.visibility = "hidden";
    nCountError.style.opacity = 1;
  }
}

function startGameButton(e) {
  if (e.dataset.button === "start") {
    startGame();
  }
}

function helpButton(e) {
  if (e.dataset.button === "help") {
    helpBox.classList.toggle("help-show");
    adjustSpeedTrial.classList.remove("adjust-speed-trial-show");
    adjustNCount.classList.remove("adjust-ncount-show");
  }
}

[...buttonContainerTop.children].forEach((button) =>
  button.addEventListener("click", () => {
    showAdjustSpeedTrial(button);
    showAdjustNCount(button);
    startGameButton(button);
    helpButton(button);
  })
);

let n = 0;
let trialCount = 0;
let speed = 2000;

buttonConfirm.forEach((button) =>
  button.addEventListener("click", () => {
    if (button.classList.contains("speed-trial")) {
      adjustSpeedTrial.classList.remove("adjust-speed-trial-show");
    } else if (button.classList.contains("ncount")) {
      if (nCountInput.value.length < 2 && nCountInput.value !== "0") {
        n = Number(nCountInput.value);
        titleNCount.textContent = n;
        adjustNCount.classList.remove("adjust-ncount-show");
      } else {
        nCountError.style.visibility = "visible";
        nCountError.style.opacity = 1;
      }
    } else if (button.classList.contains("help")) {
      helpBox.classList.remove("help-show");
    } else if (button.classList.contains("end")) {
      endScreen.classList.remove("end-screen-show");
    }
  })
);

// Game functionalities
let index = 0;
let colorIndex = "";
let positionArr = [];
let colorArr = [];

const position = document.querySelector(".position");
let positionNoAnswer = false;

const color = document.querySelector(".color");
let colorNoAnswer = false;

// Flags
let positionPauseFlag = false;
let colorPauseFlag = false;
let waitFlag = false;
let startFlag = false;

// Counters
let positionCounter = 0;
let colorCounter = 0;

// Scores
let totalPosition = 0;
let totalColor = 0;
let userScorePosition = 0;
let userScoreColor = 0;

function randomizeColor() {
  const colors = ["#ee176b", "#008a73", "#325179"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  colorIndex = randomColor;
  colorArr.push(randomColor);
  return randomColor;
}

function randomizePosition() {
  const randomNum = Math.floor(Math.random() * 9);
  index = randomNum;
  gridContainer.children[randomNum].style.backgroundColor = `${randomizeColor()}`;
  positionArr.push(randomNum);
}

function removeColor() {
  setTimeout(() => {
    gridContainer.children[index].style.background = "none";
  }, 500);
}

function changeColor() {
  setTimeout(() => {
    position.parentElement.style.color = "var(--light-grey)";
    color.parentElement.style.color = "var(--light-grey)";
  }, 300);
}

function checkPosition(e) {
  if (e.dataset.key === "a") {
    if (waitFlag) {
      if (index === positionArr[positionArr.length - n - 1]) {
        if (positionPauseFlag) {
          positionCounter++;
          userScorePosition++;
          positionPauseFlag = false;
        }
        position.textContent = positionCounter;
        position.parentElement.style.color = "green";
        positionNoAnswer = true;
        changeColor();
      } else {
        position.parentElement.style.color = "red";
        changeColor();
      }
    }
  }
}

function checkColor(e) {
  if (e.dataset.key === "d") {
    if (waitFlag) {
      if (colorIndex === colorArr[colorArr.length - n - 1]) {
        if (colorPauseFlag) {
          colorCounter++;
          userScoreColor++;
          colorPauseFlag = false;
        }
        color.textContent = colorCounter;
        color.parentElement.style.color = "green";
        colorNoAnswer = true;
        changeColor();
      } else {
        color.parentElement.style.color = "red";
        changeColor();
      }
    }
  }
}

window.addEventListener("keydown", (e) => {
  const key = document.querySelector(`button[data-key="${e.key}"]`);
  if (e.key === "Escape") {
    adjustNCount.classList.remove("adjust-ncount-show");
    adjustSpeedTrial.classList.remove("adjust-speed-trial-show");
    helpBox.classList.remove("help-show");
  }
  if (!key) return;
  key.click();
});

[...buttonContainerBottom.children].forEach((button) =>
  button.addEventListener("click", () => {
    if (startFlag) {
      checkPosition(button);
      checkColor(button);
    }
  })
);

function checkPositionAndColor() {
  if (index === positionArr[positionArr.length - n - 1]) {
    if (!positionNoAnswer) {
      position.parentElement.style.color = "blue";
      changeColor();
      totalPosition++;
      waitFlag = false;
    }
  } else if (colorIndex === colorArr[colorArr.length - n - 1]) {
    if (!colorNoAnswer) {
      color.parentElement.style.color = "blue";
      changeColor();
      totalColor++;
      waitFlag = false;
    }
  }
}

function clearAll() {
  totalPosition = 0;
  totalColor = 0;
  userScorePosition = 0;
  userScoreColor = 0;
  positionArr = [];
  colorArr = [];
  index = 0;
  colorIndex = "";
  positionCounter = 0;
  colorCounter = 0;
  position.textContent = 0;
  color.textContent = 0;
  [...gridContainer.children].forEach((item) => (item.style.background = "none"));
}

const errorBox = document.querySelector(".error-box");

function startGame() {
  speed = Number(speedInput.value) * 1000;
  trialCount = Number(trialInput.value);
  if (n !== 0) {
    randomizePosition();
    removeColor();
    const interval = setInterval(() => {
      randomizePosition();
      removeColor();
      trialCount--;
      startFlag = true;
      waitFlag = true;
      positionPauseFlag = true;
      colorPauseFlag = true;
      colorNoAnswer = false;
      positionNoAnswer = false;
      setTimeout(() => {
        checkPositionAndColor();
      }, speed + 1000);

      if (trialCount === 0) {
        clearInterval(interval);
        endGame();
      }
      buttonContainerTop.children[3].addEventListener("click", () => {
        clearInterval(interval);
        clearAll();
      });
    }, speed);
  } else {
    errorBox.style.display = "block";
    setTimeout(() => {
      errorBox.style.display = "none";
    }, 1000);
  }
}

const scorePosition = document.querySelector(".score-position");
const totalPositionScore = document.querySelector(".total-position-score");
const scoreColor = document.querySelector(".score-color");
const totalColorScore = document.querySelector(".total-color-score");
const totalPercent = document.querySelector(".total-percent");

function endGame() {
  endScreen.classList.add("end-screen-show");
  scorePosition.textContent = userScorePosition;
  totalPositionScore.textContent = totalPosition;
  scoreColor.textContent = userScoreColor;
  totalColorScore.textContent = totalColor;
  clearAll();
  if (totalPosition === 0 && totalColor === 0) {
    totalPercent.textContent = "100%";
  } else {
    totalPercent.textContent = `${Math.floor(
      ((userScorePosition + userScoreColor) / (totalPosition + totalColor)) * 100
    )}%`;
  }
}

const currentTheme = localStorage.getItem("theme");
const toggleThemeInput = document.querySelector("#toggle-theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleThemeInput.checked = true;
  }
}

function toggleTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleThemeInput.addEventListener("change", toggleTheme);
