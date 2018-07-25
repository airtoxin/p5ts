export interface SketchConfig {
  preload(): void;
  setup(): void;
  draw(): void;
  windowResized(): void;
}

export class Sketch implements SketchConfig {
  static bindToP5(p5: p5): void {
    const sketch = new Sketch(p5);
    p5.preload = sketch.preload.bind(sketch);
    p5.setup = sketch.setup.bind(sketch);
    p5.draw = sketch.draw.bind(sketch);
    p5.windowResized = sketch.windowResized.bind(sketch);
  }

  private constructor(
    private p5: p5
  ) {}

  preload() {
    // NOTHING
  }

  setup() {
    this.p5.createCanvas(500, 500);
  }

  draw() {
    this.p5.background(100);
    this.p5.ellipse(Math.random() * 500, Math.random() * 500, Math.random() * 500, Math.random() * 500);
  }

  windowResized() {
    // NOTHING
  }
}
