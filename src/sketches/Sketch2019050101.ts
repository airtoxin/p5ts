import { Sketch } from "../Sketch";

export class Sketch2019050101 extends Sketch {
  protected SIZE: number = 500;
  private limit: number = 8;
  private gen: number = 0;
  private state: number[] = [1];

  draw() {
    super.draw();

    if (this.gen < this.limit) {
      this.drawNumber();
      this.updateState();
    }
  }

  private drawNumber() {
    const p = this.p5;
    const scalar = p.width / this.limit;
    let x = p.width - this.state.length * scalar;
    const y = this.gen * scalar;
    p.fill(0);
    for (let i = 0; i < this.state.length; i++) {
      p.textSize(scalar * 0.5);
      p.text(this.state[i], x + scalar * 0.5, y + scalar * 0.5);
      x += scalar;
    }
  }

  private updateState() {
    let nextState: number[] = [];
    this.state = [0, ...this.state, 0];
    for (let i = 0; i < this.state.length - 1; i++) {
      nextState[i] = this.transition(i);
    }
    this.state = nextState;
    this.gen++;
  }

  private transition(i: number) {
    return this.state[i] + this.state[i + 1];
  }
}
