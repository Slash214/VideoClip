const path = require('path')
const { FFCreatorCenter, FFScene, FFImage, FFText, FFCreator } = require('ffcreatorlite');
const { width, height } = require('../conf')

const Compse = new FFCreator({
	width,
	height,
	outputDir: path.join(__dirname, '../cache/'),
	cacheDir: path.join(__dirname, '../video/'),
	log: true,
})


const scene = new FFScene()
const img = new FFImage({
	width,
	height,
	x: width / 2,
	y: height / 2,
	
})

img.addImagePreFilter()


Compse.start();

Compse.on('progress', e => {
  console.log(`FFCreatorLite progress: ${(e.percent * 100) >> 0}%`);
});

Compse.on('complete', e => {
  console.log(
    `FFCreatorLite completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `,
  );
});