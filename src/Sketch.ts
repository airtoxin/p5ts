export class Sketch {
  constructor(
    protected p5: p5
  ) {}

  preload() {
    // NOTHING
  }

  setup() {
    // NOTHING
  }

  draw() {
    // NOTHING
  }

  windowResized() {
    // NOTHING
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
