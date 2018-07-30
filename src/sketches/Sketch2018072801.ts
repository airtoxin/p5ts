import { Sketch } from "../Sketch";

export class Sketch2018072801 extends Sketch {
  setup() {
    super.setup();

    this.p5.background(0);
    this.p5.blendMode(this.p5.DIFFERENCE);
    this.p5.noLoop();
  }

  draw() {
    for (let i = 0; i < 800; i += 5) {
      this.p5.ellipse(this.SIZE / 2, this.SIZE / 2, i, i);
    }
  }
}
