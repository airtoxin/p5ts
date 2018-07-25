import { Sketch } from "../Sketch";

export class SampleSketch extends Sketch {
  setup() {
    this.p5.createCanvas(500, 500);
  }

  draw() {
    this.p5.background(100);
    this.p5.ellipse(Math.random() * 500, Math.random() * 500, Math.random() * 500,);
  }
}
