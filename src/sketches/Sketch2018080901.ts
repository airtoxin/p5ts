import { Sketch } from "../Sketch";
import { range } from "lodash";

const CELL_SIZE = 30;

export class Sketch2018080901 extends Sketch {
  protected SIZE: number = 800;

  setup() {
    super.setup();

    // this.p5.stroke(100);

    // this.p5.noLoop();
  }

  draw() {
    super.draw();

    if (Math.random() < 0.5) {
      this.p5.blendMode(this.p5.LIGHTEST);
    } else {
      this.p5.blendMode(this.p5.BLEND);
    }

    this.p5.background(0);

    const xs = range(-CELL_SIZE, this.SIZE + CELL_SIZE, CELL_SIZE);
    const ys = range(-CELL_SIZE, this.SIZE + CELL_SIZE, CELL_SIZE);

    // render circles
    this.p5.noStroke();
    this.p5.noFill();
    for (const x of xs) {
      for (const y of ys) {
        const [r, g, b] = this.randomColor();
        this.p5.fill(r, g, b);
        this.p5.ellipse(x, y, CELL_SIZE * 2, CELL_SIZE * 2);
      }
    }

    // render lines
    this.p5.stroke(255);
    for (const x of xs) {
      if (Math.random() < 0.5) continue;
      // vertical
      this.p5.line(x, 0, x, this.SIZE);
      this.p5.line(x, 0, 0, x); // left upper ／ line
      this.p5.line(this.SIZE, x, x, this.SIZE); // right bottom ／ line
    }
    for (const y of ys) {
      if (Math.random() < 0.5) continue;
      // horizontal
      this.p5.line(0, y, this.SIZE, y);
      this.p5.line(y, 0, this.SIZE, this.SIZE - y); // right upper ＼ line
      this.p5.line(0, y, this.SIZE - y, this.SIZE); // left bottom ＼ line
    }
    for (const a of xs) {
    }
  }

  private randomColor(): [number, number, number] {
    return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
  }
}
