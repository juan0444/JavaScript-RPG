const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// c.fillStyle = 'white';
// c.fillRect(0, 0, canvas.width, canvas.height);

const collisionsMap = [];
// map 이미지 너비가 60타일
for (let i = 0; i < collisions.length; i += 60) {
  collisionsMap.push(collisions.slice(i, 60 + i));
}

const boundaries = [];
const offset = {
  x: -1055,
  y: -400,
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

const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png';

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';

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

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 48 / 2,
    y: canvas.height / 2 - 68 / 5,
  },
  image: playerDownImage,

  // 움직임이 필요한 캐릭터인 경우 4프레임
  // frames: {
  //   max: 4
  // }
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: mapImage,
});

// 캐릭터보다 앞에 있어서 배경이 캐릭터 위로 가는 부분
const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
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

const movebles = [background, ...boundaries, foreground];

// 플레이어의 충돌을 알기위한 x좌표 y좌표
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  // 애니메이션 프레임을 만들기 위한 무한 루프 : requestAnimationFrame
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;
  if (keys.w.pressed && lastKey === 'KeyW') {
    // 플레이어와 충돌
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 4,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    // 플레이어와 충돌 X
    if (moving) {
      movebles.forEach((moveble) => {
        moveble.position.y += 4;
      });
    }
  } else if (keys.a.pressed && lastKey === 'KeyA') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 4,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movebles.forEach((moveble) => {
        moveble.position.x += 4;
      });
    }
  } else if (keys.s.pressed && lastKey === 'KeyS') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 4,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movebles.forEach((moveble) => {
        moveble.position.y -= 4;
      });
    }
  } else if (keys.d.pressed && lastKey === 'KeyD') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 4,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movebles.forEach((moveble) => {
        moveble.position.x -= 4;
      });
    }
  }
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
