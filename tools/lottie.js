/**
 * @author 爱呵呵
 * @description lottie 动画  支持AE 导出的JSON
 * 还在测试，目前发现很多ae效果都不支持！
 */

const path = require("path");
const {
  FFAlbum,
  FFAudio,
  FFCreator,
  FFImage,
  FFText,
  FFScene,
  FFLottie,
} = require("ffcreator");
const { width, height, fps } = require("../conf");

const Compos = new FFCreator({
  width,
  height,
  cacheDir: path.join(__dirname, "..", "cache"),
  outputDir: path.join(__dirname, "..", "video"),
  output: "lottie.mp4",
  fps: 25,
});

// const lottie = new FFLottie({
//   x: width / 2,
//   y: height / 2,
//   width,
//   height,
//   file: path.join(__dirname, "../json/test.json"),
//   loop: true,
// });

/**
 * 实现高斯模糊 效果 相册背景
 */

// const arr = [];
// for (let i = 1; i < 21; i++) {
//   arr.push(i);
// }
// arr.forEach(async (e, index) => {
//   console.log(e);
//   const res = await fetch("https://yjpsix.com/my/blur.json").then((res) =>
//     res.json()
//   );

//   let scene = new FFScene();
//   let lottie = new FFLottie({
//     x: width / 2,
//     y: height / 2,
//     width,
//     height,
//     data: res,
//   });
//   lottie.replaceAsset("image_0", path.join(__dirname, "../assets/img/15.jpg"));
//   lottie.replaceAsset("image_1", path.join(__dirname, "../assets/img/15.jpg"));

//   scene.setDuration("DreamyZoom");
//   scene.setDuration(3);
//   scene.addChild(lottie);
//   Compos.addChild(scene);
// });

let scene = new FFScene();

let lottie = new FFLottie({
  x: width / 2,
  y: height / 2,
  width,
  height,
  file: path.join(__dirname, "../json/blur.json"),
});
lottie.replaceAsset("image_0", path.join(__dirname, "../assets/img/2.jpg"));
// lottie.replaceAsset("image_1", path.join(__dirname, "../assets/img/2.jpg"));

scene.addChild(lottie);
Compos.addChild(scene);

// 开始渲染
Compos.start();

Compos.on("error", (e) => {
  console.log(`渲染失败....${e.pos}, ${e.type}, ${e.error}`);
});

Compos.on("progress", (e) => {
  console.log(`合成视频中...${(e.percent * 100) >> 0}%- - - - - - ${e.type}`);
});

Compos.on("complete", (e) => {
  console.log(`合成完成....\n UGAE: ${e.useage} \n PATH: ${e.output}`);
});
