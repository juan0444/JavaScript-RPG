class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = frames;

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.sprites = sprites;
  }

  // 앞으로 움직이는 애니메이션을 구현하려면 아래 0,0으로 표시된 부분을 변경하면 된다.
  // 4개의 캐릭터가 같이있는 이미지를 하나씩 차례대로 보여주는 것
  // 전체 192픽셀이면 4로 나눠서 48로 48씩 반복: 03:10:00
  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height
    );
  }
}

// 16(픽셀) * 4(400%)
class Boundary {
  static width = 64;
  static height = 64;
  constructor({ position }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
  }

  // 충돌 표시
  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0)';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
