class Sprite {
  constructor(options) {
    this.ctx = options.ctx;
    this.image = options.image;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.width = options.width;
    this.height = options.height;
    this.start();
  }

  update() {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  render(scale) {
    const canvasBasic = document.querySelector("#canvas");
    canvasBasic.style.transform = `scale(${scale}, ${scale})`;
    this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height);
    this.ctx.drawImage(
      this.image,
      (this.frameIndex * this.width) / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      0,
      0,
      this.width / this.numberOfFrames,
      this.height
    );
  }

  start() {
    let scale = 0.1;
    let scaleMiddle = 0.5;
    let count = 0;
    let margin = 100;
    let loop = scale => {
      this.update();
      this.render(scale);
    };

    const timerId = setInterval(function() {
      if (scale > 0.5) {
        if (count > 40) {
          
          const canvas = document.querySelector("#canvas");
          const canvasWrapper = document.querySelector(".wrapper-canvas");
          canvas.width = 326;
          canvas.height = 337;
          let coinImageFinish = new Image();
          coinImageFinish.src = "./assets/img/bri_big_anim_finish.png";
          sprite.image = coinImageFinish;
          sprite.width = 1304;
          sprite.height = 337;
          loop(scaleMiddle);
          scaleMiddle = scaleMiddle - 0.01;          
          canvasWrapper.style.marginTop = `${margin = margin - 4}px`;
          console.log(canvasWrapper.style.marginTop)
          if (scaleMiddle < 0.2) {
            clearInterval(timerId);
          }
        } else {
          let canvas = document.getElementById("canvas");
          canvas.width = 449;
          canvas.height = 432;
          let coinImageMiddle = new Image();
          coinImageMiddle.src = "./assets/img/bri_big_anim_middle.png";
          sprite.image = coinImageMiddle;
          sprite.width = 1796;
          sprite.height = 432;
          loop(scaleMiddle);
          count++;
        }
      } else {
        loop(scale);
        scale = scale + 0.01;
      }
    }, 60);
  }
}

let canvas = document.getElementById("canvas");
canvas.width = 392;
canvas.height = 372;

let coinImage = new Image();
coinImage.src = "./assets/img/bri_big_anim_start.png";

let sprite = new Sprite({
  ctx: canvas.getContext("2d"),
  image: coinImage,
  width: 1568,
  height: 372,
  numberOfFrames: 4,
  ticksPerFrame: 4
});
