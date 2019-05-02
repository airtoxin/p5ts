import { Sketch } from "../Sketch";
import { range } from "lodash";

const CELL_SIZE = 40;

export class Sketch2018081101 extends Sketch {
  protected SIZE: number = 800;

  setup() {
    super.setup();

    this.p5.noLoop();

    this.canvas && this.canvas.addEventListener("click", () => this.draw());
  }

  draw() {
    super.draw();

    this.p5.blendMode(this.p5.BLEND);
    this.p5.background(0);
    this.p5.blendMode(this.p5.LIGHTEST);

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
    this.p5.stroke(255, 200);
  }

  private randomColor(): [number, number, number] {
    return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
  }
}
