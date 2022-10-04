const paletteOfColor = document.getElementById('color-palette');

function colorGenerator(){
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

for (let index = 0; index < 4; index += 1) {
  let color = document.createElement('div');
  color.classList.add('color');
  color.id = index;
  paletteOfColor.appendChild(color);
  if (index === 0) {
    color.style.backgroundColor = 'black';
  } else {
    color.style.background = colorGenerator();
  }
}
