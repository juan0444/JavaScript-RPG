const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// c.fillStyle = 'white';
// c.fillRect(0, 0, canvas.width, canvas.height);

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 60) {
  collisionsMap.push(collisions.slice(i, 60 + i));
}

class Boundary {
  static width = 64;
  static height = 64;
  constructor({ position }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
  }

  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];
const offset = {
  x: -1050,
  y: -350,
};

// 참고: 2:30:00 - 충돌구현
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1682)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const mapImage = new Image();
mapImage.src = './img/map.png';

const playerImage = new Image();
playerImage.src = './img/playerDown.png';

// mapImage.onload = () => {
//   c.drawImage(mapImage, -1050, -350);
// };

// playerImage.onload = () => {
//   c.drawImage(
//     playerImage,
//     0,
//     0,
//     playerImage.width,
//     playerImage.height,
//     canvas.width / 2 - playerImage.width / 2,
//     canvas.height / 2 - playerImage.height / 5,
//     playerImage.width,
//     playerImage.height
//   );
// };

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: mapImage,
});

// 지정한 이동 키보드가 true가 될때마다 이동함
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});

const movebles = [background, testBoundary];
function animate() {
  // 애니메이션 프레임을 만들기 위한 무한 루프 : requestAnimationFrame
  window.requestAnimationFrame(animate);
  background.draw();
  // boundaries.forEach((boundary) => {
  //   boundary.draw();
  // });
  testBoundary.draw();
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 2,
    canvas.height / 2 - playerImage.height / 5,
    playerImage.width,
    playerImage.height
  );

  if (keys.w.pressed && lastKey === 'KeyW') {
    // movebles.forEach((moveble) => {
    //   moveble.position.y += 4;
    // });
    background.position.y += 4;
    testBoundary.position.y += 4;
  } else if (keys.a.pressed && lastKey === 'KeyA') background.position.x += 4;
  else if (keys.s.pressed && lastKey === 'KeyS') background.position.y -= 4;
  else if (keys.d.pressed && lastKey === 'KeyD') background.position.x -= 4;
}
animate();

let lastKey = '';
// 키보드를 누르면 호출
window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'KeyW':
      keys.w.pressed = true;
      lastKey = 'KeyW';
      break;
    case 'KeyA':
      keys.a.pressed = true;
      lastKey = 'KeyA';
      break;
    case 'KeyS':
      keys.s.pressed = true;
      lastKey = 'KeyS';
      break;
    case 'KeyD':
      keys.d.pressed = true;
      lastKey = 'KeyD';
      break;
  }
});

// 누르는 것이 멈춘 키보드는 falue로 변경해줘야함
window.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'KeyW':
      keys.w.pressed = false;
      break;
    case 'KeyA':
      keys.a.pressed = false;
      break;
    case 'KeyS':
      keys.s.pressed = false;
      break;
    case 'KeyD':
      keys.d.pressed = false;
      break;
  }
});
