import { Sketch } from "../Sketch";

export class Sketch2018072801 extends Sketch {
  private canvas: HTMLCanvasElement | undefined;

  setup() {
    const renderer = this.p5.createCanvas(500, 500);
    this.canvas = (renderer as any).canvas;
    this.p5.background(0);
    this.p5.blendMode(this.p5.DIFFERENCE);
    this.p5.noLoop();
  }

  draw() {
    for (let i = 0; i < 800; i += 5) {
      this.p5.ellipse(250, 250, i, i);
    }
  }
}
