import { Sketch } from "../Sketch";
import { range } from "lodash";

const CELL_SIZE = 50;

export class Sketch2018080801 extends Sketch {
  protected SIZE: number = 800;

  setup() {
    super.setup();

    this.p5.stroke(100);

    this.p5.noLoop();
  }

  draw() {
    super.draw();

    this.p5.background(255);

    this.p5.noFill();
    for (const x of range(-CELL_SIZE, this.SIZE + CELL_SIZE, CELL_SIZE)) {
      for (const y of range(-CELL_SIZE, this.SIZE + CELL_SIZE, CELL_SIZE)) {
        const [r, g, b] = this.randomColor();
        this.p5.fill(r, g, b, 30);
        this.p5.ellipse(x, y, CELL_SIZE * 2, CELL_SIZE * 2);
      }
    }
  }

  private randomColor(): [number, number, number] {
    return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
  }
}
