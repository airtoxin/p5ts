import { Sketch } from "../Sketch";
import bigInt from "big-integer";

export class Sketch2019050102 extends Sketch {
  protected SIZE: number = 500;
  private limit: number = 512;
  private gen: number = 0;
  private state: bigInt.BigInteger[] = [bigInt(1)];
  private mod: number = 5;

  setup() {
    super.setup();
    this.p5.colorMode(this.p5.HSB, 1);
  }

  draw() {
    super.draw();

    if (this.gen < this.limit) {
      this.drawCell();
      this.updateState();
    }
  }

  private drawCell() {
    const p = this.p5;
    const scalar = p.width / this.limit;
    let x = (p.width - this.state.length * scalar) * 0.5;
    const y = this.gen * scalar;
    p.noStroke();
    for (let i = 0; i < this.state.length; i++) {
      const hue = this.state[i].mod(this.mod).toJSNumber() / this.mod;
      p.fill(hue, hue, 1);
      p.rect(x, y, scalar, scalar);
      x += scalar;
    }
  }

  private updateState() {
    let nextState: bigInt.BigInteger[] = [];
    this.state = [bigInt(0), ...this.state, bigInt(0)];
    for (let i = 0; i < this.state.length - 1; i++) {
      nextState[i] = this.transition(i);
    }
    this.state = nextState;
    this.gen++;
  }

  private transition(i: number) {
    return this.state[i].add(this.state[i + 1]);
  }
}
