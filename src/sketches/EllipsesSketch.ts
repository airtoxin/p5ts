import { Sketch } from "../Sketch";

export class EllipsesSketch extends Sketch {
  private frames: number = 0;
  private canvas: HTMLCanvasElement | undefined;

  setup() {
    const renderer = this.p5.createCanvas(500, 500);
    this.p5.noStroke();
    this.canvas = (renderer as any).canvas;
    this.startCapture();
  }

  draw() {
    this.frames++;

    this.p5.background(100);
    this.p5.ellipse(Math.sin(Math.PI/2/50 * this.frames) * 250 + 250, 250, 50, 50);
    this.capture(this.canvas);

    if (this.frames >= 200) {
      this.stopCapture();
      this.saveCaptured();
    }
  }
}
