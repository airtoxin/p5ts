import { Sketch } from "../Sketch";
import { random, sample } from "lodash";

interface Point {
  x: number;
  y: number;
}

export class Sketch2018081301 extends Sketch {
  private point: Point | null = null;

  setup() {
    super.setup();

    this.redraw();
  }

  private redraw() {
    this.p5.background(255);
    this.point = {
      x: random(this.SIZE, false),
      y: random(this.SIZE, false),
    };
  }

  draw() {
    super.draw();

    if (!this.point) return;

    this.p5.point(this.point.x, this.point.y);
    this.point = this.getNextPoint(this.point);
  }

  private getNextPoint({ x, y }: Point): Point | null {
    const points = (
      [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
      ] as any as number[][]
    ).filter(([px, py]) => {
      const [r, g, b] = this.p5.get(px, py) as number[];
      return r !== 0 && g !== 0 && b !== 0;
    });

    if (points.length === 0) return null;

    const [px, py] = sample(points) as number[];
    return { x: px, y: py };
  }
}
