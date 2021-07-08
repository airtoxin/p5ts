import "p5";
import { bindSketchToP5 } from "./Sketch";

const sketch =
  new URLSearchParams(document.location.search).get("sketch") || "";

import(`./sketches/${sketch}`).then((module) => {
  // tslint:disable-next-line
  new p5(bindSketchToP5(module[sketch]));
});
