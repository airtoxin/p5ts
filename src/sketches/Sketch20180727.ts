import { Sketch } from "../Sketch";

interface RectBox {
  offset: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

const NUM_RECTS_X = 10;
const NUM_RECTS_Y = 10;

export class Sketch20180727 extends Sketch {
  private state: RectBox[] = [];

  setup() {
    super.setup();

    this.startCapture();
    this.p5.noStroke();

    [...Array(NUM_RECTS_X)].forEach((_, xi) => {
      [...Array(NUM_RECTS_Y)].forEach((_, yi) => {
        this.state.push({
          offset: {
            x: (xi * this.SIZE) / NUM_RECTS_X + 1,
            y: (yi * this.SIZE) / NUM_RECTS_Y + 1,
          },
          size: {
            width: this.SIZE / NUM_RECTS_X - 2,
            height: this.SIZE / NUM_RECTS_Y - 2,
          },
        });
      });
    });
  }

  draw() {
    this.render();
    this.capture();

    if (this.p5.frameCount >= 200) {
      this.stopCapture();
    }
  }

  private render() {
    if (this.p5.frameCount % 10 !== 0) return;

    this.p5.background(0, 50);
    this.state.forEach((box) => {
      if (Math.random() < 0.9) return;

      this.p5.fill(52, 123, 193);
      this.p5.rect(box.offset.x, box.offset.y, box.size.width, box.size.height);
      if (Math.random() < 0.5) {
        this.p5.fill(0);
        this.p5.rect(
          box.offset.x + 5,
          box.offset.y + 5,
          box.size.width - 10,
          box.size.height - 10
        );
        this.p5.fill(52, 123, 193);
        this.p5.rect(
          box.offset.x + 10,
          box.offset.y + 10,
          box.size.width - 20,
          box.size.height - 20
        );
        this.p5.fill(0);
        this.p5.rect(
          box.offset.x + 15,
          box.offset.y + 15,
          box.size.width - 30,
          box.size.height - 30
        );
        this.p5.fill(52, 123, 193);
        this.p5.rect(
          box.offset.x + 20,
          box.offset.y + 20,
          box.size.width - 40,
          box.size.height - 40
        );
      }
    });
  }
}
