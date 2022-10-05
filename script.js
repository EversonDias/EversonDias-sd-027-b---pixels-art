const paletteOfColor = document.getElementById('color-palette');
const randomCollectButton = document.getElementById('button-random-color');
const container = document.getElementById('pixel-board');
const clear = document.getElementById('clear-board');
const submit = document.getElementById('generate-board');
let lines = localStorage.getItem('boardSize') || 5;
let columns = localStorage.getItem('boardSize') || 5;
const arrayColor = [];
const obj = JSON.parse(localStorage.getItem('colorPalette')) || {};
let id = 0;

function colorGenerator() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeColor(e) {
  for (let index = 0; index < 4; index += 1) {
    const color = document.getElementById(index);
    if (color.id === e.target.id) {
      e.target.classList.add('selected');
    } else {
      color.classList.remove('selected');
    }
  }
}

function saveArray(colorId, colorObj) {
  arrayColor.push(colorId);
  arrayColor.push(colorObj);
}

function savePaletteColor(props) {
  const saveArrayColor = JSON.stringify(props);
  localStorage.setItem('colorPalette', saveArrayColor);
}

function positionOfIndex() {
  const position = [];
  for (let index = 0; index < obj.length; index += 1) {
    if (index % 2 !== 0) {
      position.push(index);
    }
  }
  return position;
}

function fillColor(color) {
  const position = positionOfIndex();
  if (color.id === '0') {
    color.style.backgroundColor = obj[position[color.id]] || '#000000';
    color.classList.add('selected');
    saveArray(color.id, obj[position[color.id]] || color.style.backgroundColor);
  } else {
    color.style.backgroundColor = obj[position[color.id]] || colorGenerator();
    saveArray(color.id, obj[position[color.id]] || color.style.backgroundColor);
  }
  savePaletteColor(arrayColor);
}

for (let index = 0; index < 4; index += 1) {
  const color = document.createElement('div');
  color.className = 'color';
  color.id = index;
  color.addEventListener('click', changeColor);
  fillColor(color);
  paletteOfColor.appendChild(color);
}

randomCollectButton.addEventListener('click', () => {
  localStorage.removeItem('colorPalette');
  window.location.reload();
});

clear.addEventListener('click', () => {
  const pixel = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
});

function savePixelBoard() {
  const pixel = document.getElementsByClassName('pixel');
  const save = [];
  for (let index = 0; index < pixel.length; index += 1) {
    save.push(pixel[index]);
    save.push(pixel[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(save));
}

function toPaint(e) {
  const color = document.getElementsByClassName('selected');
  for (let index = 0; index < 4; index += 1) {
    if (color[index]) {
      const paint = color[index].style.backgroundColor;
      e.target.style.backgroundColor = paint;
    }
  }
  savePixelBoard();
}

function saveSizeBoard(size) {
  localStorage.setItem('boardSize', size);
}

function createBoard(linesBoard, columnsBoard) {
  for (let line = 0; line < linesBoard; line += 1) {
    const row = document.createElement('div');
    for (let column = 0; column < columnsBoard; column += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.classList.add('inline');
      pixel.id = id;
      pixel.style.backgroundColor = 'white';
      pixel.addEventListener('click', toPaint);
      row.appendChild(pixel);
      container.appendChild(row);
      id += 1;
    }
  }
}

function verifyBoard() {
  const number = document.getElementById('board-size');
  let size = number.value;
  if (size < 1) {
    alert('Board Inválido!');
  } else {
    if (size < 5) {
      size = 5;
    } else if (size > 50) {
      size = 50;
    }
    lines = size;
    columns = size;
    saveSizeBoard(size);
  }
  container.innerHTML = '';

  createBoard(lines, columns);
}

submit.addEventListener('click', verifyBoard);

for (let line = 0; line < lines; line += 1) {
  const row = document.createElement('div');
  for (let column = 0; column < columns; column += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.classList.add('inline');
    pixel.id = id;
    pixel.style.backgroundColor = 'white';
    pixel.addEventListener('click', toPaint);
    row.appendChild(pixel);
    container.appendChild(row);
    id += 1;
  }
}

if (localStorage.getItem('pixelBoard') !== null) {
  const pixel = document.getElementsByClassName('pixel');
  const save = localStorage.getItem('pixelBoard');
  const saveObg = JSON.parse(save);
  const color = [];
  for (let index = 0; index < saveObg.length; index += 1) {
    if (index % 2 !== 0) {
      color.push(saveObg[index]);
    }
  }
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = color[index];
  }
}
