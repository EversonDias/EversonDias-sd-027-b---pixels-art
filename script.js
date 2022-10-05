const paletteOfColor = document.getElementById('color-palette');
const randomCollectButton = document.getElementById('button-random-color');
const container = document.getElementById('pixel-board');
const clear = document.getElementById('clear-board');
let lines = 5;
let columns = 5;
let id= 0;

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
  if (localStorage.length === 4) {
    if (color.id == 0) {
      color.style.backgroundColor = '#000000';
      color.classList.add('selected');
    } else {
      color.style.backgroundColor = localStorage.getItem(color.id)
    }
  } else {
    fillColor(color)
  }
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
  let colorRandom = colorGenerator()
  if (color.id == 0) {
    color.style.backgroundColor = '#000000';
    color.classList.add('selected');
  } else {
    color.style.backgroundColor = colorRandom;
  }
  savePaletteColor(color.id, colorRandom)
}

randomCollectButton.addEventListener('click', () => {
  for (let index = 0; index < 4; index++) {
    let color = document.getElementById(index);
    fillColor(color)
  }
})

clear.addEventListener('click',() => {
  let pixel = document.getElementsByClassName('pixel')
  console.log(pixel);
  for (let index = 0; index < pixel.length; index++) {
    console.log(index);
    pixel[index].style.backgroundColor = 'white';
  }
})

function savePaletteColor(position, color) {
  localStorage.setItem(position, color)
}

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
    id ++;
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
  
}
