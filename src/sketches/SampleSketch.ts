import { Sketch } from "../Sketch";

export class SampleSketch extends Sketch {
  private frames: number = 0;
  private capturer = new (window as any).CCapture({ format: "gif", workersPath: '' });
  private canvas: HTMLCanvasElement | null = null;

  setup() {
    const p5Canvas = this.p5.createCanvas(500, 500);
    this.canvas = (p5Canvas as any).canvas as HTMLCanvasElement;
    this.capturer.start();
  }

  draw() {
    this.frames++;

    this.p5.background(100);
    this.p5.ellipse(Math.random() * 500, Math.random() * 500, Math.random() * 500);

    this.capturer.capture(this.canvas);
    if (this.frames >= 100) {
      this.capturer.stop();
      this.capturer.save();
    }
  }
}
