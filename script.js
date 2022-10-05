const paletteOfColor = document.getElementById('color-palette');
const randomCollectButton = document.getElementById('button-random-color');
const container = document.getElementById('pixel-board');
const clear = document.getElementById('clear-board');
const submit = document.getElementById('generate-board');
let lines = localStorage.getItem('boardSize') && localStorage.getItem('boardSize') || 5;
let columns = localStorage.getItem('boardSize') && localStorage.getItem('boardSize') || 5;
let arrayColor = [];
let obj = localStorage.getItem('colorPalette') && JSON.parse(localStorage.getItem('colorPalette')) || {};
let id = 0;

function colorGenerator() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

for (let index = 0; index < 4; index += 1) {
  let color = document.createElement('div');
  color.className = 'color';
  color.id = index;
  color.addEventListener("click", changeColor)
  fillColor(color);

  paletteOfColor.appendChild(color);
}

function changeColor(e) {
  for (let index = 0; index < 4; index++) {
    let color = document.getElementById(index);
    if (color.id == e.target.id) {
      e.target.classList.add('selected');
    } else {
      color.classList.remove('selected');
    }
  }
}

function fillColor(color) {
  let position = [];
  if (obj.length === 8) {
    for (let index = 0; index < obj.length; index++) {
      if (index % 2 !== 0) {
        position.push(index)
      }
    }
    if (color.id == 0) {
      color.style.backgroundColor = obj[position[color.id]];
      color.classList.add('selected');
      arrayColor.push(color.id);
      arrayColor.push(obj[position[color.id]]);
    } else {
      color.style.backgroundColor = obj[position[color.id]]
      arrayColor.push(color.id);
      arrayColor.push(obj[position[color.id]]);
    }
  } else {
    if (color.id == 0) {
      color.style.backgroundColor = '#000000';
      color.classList.add('selected');
      arrayColor.push(color.id);
      arrayColor.push(color.style.backgroundColor);
    } else {
      color.style.backgroundColor = colorGenerator();
      arrayColor.push(color.id);
      arrayColor.push(color.style.backgroundColor);
    }
  }
  savePaletteColor(arrayColor);
}

randomCollectButton.addEventListener('click', () => {
  localStorage.removeItem('colorPalette');
  for (let index = 0; index < 4; index++) {
    let color = document.getElementById(index);
    fillColor(color);
  }
  location.reload()
})

clear.addEventListener('click', () => {
  let pixel = document.getElementsByClassName('pixel')
  for (let index = 0; index < pixel.length; index++) {
    pixel[index].style.backgroundColor = 'white';
  }
})

submit.addEventListener('click', () => {
  let number = document.getElementById('board-size');
  let size = number.value;
  if (size < 1) {
    alert('Board Inválido!')
  } else {
    if (size < 5) {
      size = 5;
    } else if (size > 50) {
      size = 50;
    }
    lines = size;
    columns = size;
    saveSizeBoard(size)
  }
  container.innerHTML = ''

  for (let line = 0; line < lines; line++) {
    let row = document.createElement('div');
    for (let column = 0; column < columns; column++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.classList.add('inline');
      pixel.id = id;
      pixel.style.backgroundColor = 'white';
      pixel.addEventListener("click", toPaint);
      row.appendChild(pixel)
      container.appendChild(row);
      id++;
    }
  }
})

for (let line = 0; line < lines; line++) {
  let row = document.createElement('div');
  for (let column = 0; column < columns; column++) {
    let pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.classList.add('inline');
    pixel.id = id;
    pixel.style.backgroundColor = 'white';
    pixel.addEventListener("click", toPaint);
    row.appendChild(pixel)
    container.appendChild(row);
    id++;
  }
}

function savePaletteColor(props) {
  let arrayColor = JSON.stringify(props);
  localStorage.setItem('colorPalette', arrayColor)
}

if (localStorage.getItem('pixelBoard') !== null) {
  let pixel = document.getElementsByClassName('pixel');
  let save = localStorage.getItem('pixelBoard');
  let saveObg = JSON.parse(save);
  let color = [];
  for (let index = 0; index < saveObg.length; index++) {
    if (index % 2 !== 0) {
      color.push(saveObg[index]);
    }
  }
  for (let index = 0; index < pixel.length; index++) {
    pixel[index].style.backgroundColor = color[index];
  }
}

function toPaint(e) {
  let color = document.getElementsByClassName('selected');
  for (let index = 0; index < 4; index++) {
    if (color[index]) {
      let paint = color[index].style.backgroundColor;
      e.target.style.backgroundColor = paint;
    }
  }
  savePixelBoard()
}

function savePixelBoard() {
  let pixel = document.getElementsByClassName('pixel')
  let save = [];
  for (let index = 0; index < pixel.length; index++) {
    save.push(pixel[index]);
    save.push(pixel[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(save))
}

function saveSizeBoard(size) {
  localStorage.setItem('boardSize', size)
}
