import { Sketch } from "../Sketch";

export class Sketch2018072802 extends Sketch {
  protected SIZE: number = 300;
  private chunks: any[] = [];
  private recorder: any;

  setup() {
    super.setup();

    this.p5.background(0);
    const stream = (this.canvas as any).captureStream(30);
    this.recorder = new (window as any).MediaRecorder(stream);
    this.recorder.ondataavailable = (e: any) => {
      if (e.data.size) {
        this.chunks.push(e.data);
      }
    };
    this.recorder.onstop = () => {
      const blob = new Blob(this.chunks);
      const video = document.createElement("video");
      video.id = "recorded";
      video.controls = true;
      video.setAttribute("type", "video/mp4");
      video.src = URL.createObjectURL(blob);
      document.body.appendChild(video);
      video.play();
    };
    this.recorder.start();
  }

  draw() {
    this.p5.background(0);

    for (let i = 0; i < 500; i += 5) {
      if (i % 2 === 0) {
        this.p5.fill(0);
      } else {
        this.p5.fill(255);
      }
      this.p5.ellipse(
        150 + this.getDiffX(i),
        150 + this.getDiffY(i),
        500 - i,
        500 - i
      );
    }

    if (this.p5.frameCount >= 360) {
      this.recorder.stop();
    }
  }

  private getDiffX(i: number) {
    const deg = this.p5.frameCount + i;
    return Math.cos(((Math.PI * 2) / 360) * deg) * 50;
  }

  private getDiffY(i: number) {
    const deg = this.p5.frameCount + i;
    return Math.sin(((Math.PI * 2) / 360) * deg) * 50;
  }
}
