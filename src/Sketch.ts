export class Sketch {
  protected SIZE: number = 500;
  protected canvas?: HTMLCanvasElement;

  constructor(
    protected p5: p5,
    private capturer: any = new (window as any).CCapture({ format: "gif", workersPath: '' })
  ) {
  }

  preload() {
    // NOTHING
  }

  setup() {
    const renderer = this.p5.createCanvas(this.SIZE, this.SIZE);
    this.canvas = (renderer as any).canvas;
  }

  draw() {
    // NOTHING
  }

  windowResized() {
    // NOTHING
  }

  startCapture() {
    this.capturer.start();
  }

  capture() {
    this.capturer.capture(this.canvas);
  }

  stopCapture() {
    this.capturer.stop();
    this.capturer.save();
  }

}

type Constructor<T = {}> = new (...args: any[]) => T;

export const bindSketchToP5 = (SketchConstructor: Constructor<Sketch>) => (p5: p5) => {
  const sketch = new SketchConstructor(p5);
  p5.preload = sketch.preload.bind(sketch);
  p5.setup = sketch.setup.bind(sketch);
  p5.draw = sketch.draw.bind(sketch);
  p5.windowResized = sketch.windowResized.bind(sketch);
}
