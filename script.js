const paletteOfColor = document.getElementById('color-palette');
const randomCollectButton = document.getElementById('button-random-color');

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
  color.classList.add('color');
  color.id = index;
  if (index === 0) {
    color.style.backgroundColor = 'black';
  } else {
    color.style.background = colorGenerator();
  }
  paletteOfColor.appendChild(color);
}

randomCollectButton.addEventListener('click',()=>{
  let color = document.getElementsByClassName('color')
  for (let index = 0; index < 4; index += 1) {
    if (index === 0) {
      color[index].style.backgroundColor = 'black';
      
    } else {
      color[index].style.background = colorGenerator();
    }
  }
})
