const paletteOfColor = document.getElementById('color-palette');
const randomCollectButton = document.getElementById('button-random-color');
const container = document.getElementById('pixel-board');
let lines = 5
let columns = 5


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
  if (localStorage.length === 4) {
    if (color.id == 0) {
      color.style.backgroundColor = '#000000';
    } else {
      color.style.backgroundColor = localStorage.getItem(color.id)
    }
  } else {
    fillColor(color)
  }
  paletteOfColor.appendChild(color);
}

function fillColor(color) {
  let colorRandom = colorGenerator()
  if (color.id == 0) {
    color.style.backgroundColor = '#000000';
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

function savePaletteColor(position, color) {
  localStorage.setItem(position, color)
}
// container.style.display = 'grid';
// container.style.gridColumn = columns;
for (let index = 0; index < lines; index ++) {
    container.innerHTML += '<br>'
  for (let index = 0; index < columns; index ++) {
    let pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.classList.add('inline');
    pixel.style.backgroundColor = 'white';
    container.appendChild(pixel);
  }
}
