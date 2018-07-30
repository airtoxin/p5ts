import { Sketch } from "../Sketch";

const SIZE = 500;
const NUM_LINES = 100;

export class Sketch2018072803 extends Sketch {
  private canvas: HTMLCanvasElement | undefined;

  setup() {
    const renderer = this.p5.createCanvas(SIZE, SIZE);
    this.canvas = (renderer as any).canvas;
  }

  draw() {
    this.p5.background(100);
    this.p5.stroke(255);

    for (let i = 0; i < NUM_LINES; i++) {
      const x = SIZE / NUM_LINES * (i + 1);
      const offset = Math.sin(Math.PI * 2 / NUM_LINES * this.p5.frameCount / 3) * SIZE / 2 + SIZE / 2;
      this.p5.line(x + offset, 100, x, 400);
    }

    for (let i = 0; i < NUM_LINES; i++) {
      const y = SIZE / NUM_LINES * (i + 1);
      const offset = Math.sin(Math.PI * 2 / NUM_LINES * this.p5.frameCount / 3) * SIZE / 2 + SIZE / 2;
      this.p5.line(100, y + offset, 400, y);
    }
  }
}
