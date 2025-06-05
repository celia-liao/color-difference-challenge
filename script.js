let score = 0, mistake = 0, time = 30, timer, answerIndex, gridSize = 2;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('restart-button').addEventListener('click', startGame);
    startGame(); 
  });

function startGame() {
  score = 0;
  mistake = 0;
  time = 30;
  gridSize = 2;
  document.getElementById('score').textContent = score;
  document.getElementById('mistake').textContent = mistake;
  document.getElementById('result').textContent = '';
  document.getElementById('time').textContent = time;
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById('time').textContent = time;
    if (time <= 0) endGame('時間到！');
  }, 1000);
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('grid');
  let totalCells = gridSize * gridSize;
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
  grid.innerHTML = '';
  answerIndex = Math.floor(Math.random() * totalCells);
  const baseColor = getRandomColor();
  const diffColor = getSimilarColor(baseColor, Math.max(50 - score * 3, 10));
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.backgroundColor = i === answerIndex ? diffColor : baseColor;
    cell.addEventListener('click', () => handleClick(i));
    grid.appendChild(cell);
  }
}

function handleClick(index) {
  if (index === answerIndex) {
    score++;
    document.getElementById('score').textContent = score;
    if (score % 3 === 0 && gridSize < 6) gridSize++;
    renderGrid();
  } else {
    mistake++;
    document.getElementById('mistake').textContent = mistake;
    if (mistake >= 3) endGame('失誤過多，遊戲結束');
  }
}

function endGame(reason) {
  clearInterval(timer);
  document.getElementById('grid').innerHTML = '';
  const comment = getComment(score);
  document.getElementById('result').textContent = `${reason} 最終分數：${score} 分｜${comment}`;
}

function getComment(score) {
  if (score >= 10) return "視力王者 👑";
  else if (score >= 5) return "普通人類 👁️";
  else return "請去看眼科 🥲";
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r},${g},${b})`;
}

function getSimilarColor(base, diff) {
  const rgb = base.match(/\d+/g).map(Number);
  rgb[0] = Math.min(255, rgb[0] + diff);
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}
