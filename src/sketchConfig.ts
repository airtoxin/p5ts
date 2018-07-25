export const sketchConfig = (p: p5) => {
  p.setup = () => {
    p.createCanvas(500, 500);
  };

  p.draw = () => {
    p.background(100);
  };
};
