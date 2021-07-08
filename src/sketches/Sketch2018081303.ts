import p5 from "p5";
import { Sketch } from "../Sketch";
import { random, sample, range } from "lodash";

const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;
const cyclic = (degrees: number, cyclicFn = Math.sin): number =>
  cyclicFn(degToRad(degrees));

const NUM_MARKERS = 200;

interface Point {
  x: number;
  y: number;
}

class Marker {
  constructor(private size: number) {}

  private x: number = random(this.size);
  private y: number = random(this.size);
  private direction: number = random(360);
  private acceleration: number = 1 + this.x / 100;
  private BASE_THICKNESS: number = 2;
  public thickness: number = random(this.BASE_THICKNESS);

  private getNextXY(): [number, number] {
    return [
      this.x + Math.cos(degToRad(this.direction)) * this.acceleration,
      this.y + Math.sin(degToRad(this.direction)) * this.acceleration,
    ];
  }

  private revive(p5: p5): void {
    this.direction = this.direction + p5.noise(this.x, this.y) * 2;
    this.acceleration = 4;
  }

  getLinePoints(): [number, number, number, number] {
    const [nx, ny] = this.getNextXY();
    return [this.x, this.y, nx, ny];
  }

  update(p5: p5) {
    const [x, y] = this.getNextXY();
    this.direction = this.direction + p5.noise(this.x, this.y) * 20;
    this.acceleration = this.acceleration * 0.99;
    [this.x, this.y] = [x, y];
    this.thickness = this.BASE_THICKNESS; // + cyclic(p5.frameCount * 2) * this.BASE_THICKNESS / 2;

    if (this.acceleration <= 0.5) this.revive(p5);
  }
}

export class Sketch2018081303 extends Sketch {
  private markers: Marker[] = range(NUM_MARKERS).map(
    () => new Marker(this.SIZE)
  );
  private chunks: any[] = [];
  private recorder: any;

  setup() {
    super.setup();

    this.canvas && this.canvas.addEventListener("click", () => this.reset());

    this.reset();

    const stream = (this.canvas as any).captureStream(30);
    this.recorder = new (window as any).MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    });
    this.recorder.ondataavailable = (e: any) => {
      if (e.data.size) {
        this.chunks.push(e.data);
      }
    };
    this.recorder.onstop = () => {
      const blob = new Blob(this.chunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "test.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    };
    this.recorder.start();
  }

  private reset() {
    this.p5.background(255);
    this.markers = range(NUM_MARKERS).map(() => new Marker(this.SIZE));
  }

  draw() {
    super.draw();

    this.p5.background(255, 50);

    for (const marker of this.markers) {
      const [x1, y1, x2, y2] = marker.getLinePoints();
      this.p5.strokeWeight(marker.thickness);
      this.p5.line(x1, y1, x2, y2);
      marker.update(this.p5);
    }

    if (this.p5.frameCount === 1000) {
      this.recorder.stop();
    }
  }
}
