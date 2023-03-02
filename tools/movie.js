/**
 * @author 爱呵呵
 * @description 视频模糊背景的效果
 */

const path = require('path')
const { FFAlbum, FFAudio, FFCreator, FFImage, FFText, FFScene, FFVideo } = require('ffcreator')

const pathReslove = dir => path.join(__dirname, dir),
	width = 576, height = 1024;

// 入口
const Compos = new FFCreator({
	width,
	height,
	fps: 25,
	output: 'movie.mp4',
	render: 'gl',
	cacheDir: pathReslove('../cache') ,
	outputDir: pathReslove('../video/'),
	cover: pathReslove('../assets/img/2.jpg'),
})

// 添加全局背景音乐
const BackgroundMusic = new FFAudio({
	path: path.join(__dirname, '..', 'assets', '乌云 - 董唧唧.mp3'),
	volume: 0.9,
	fadeIn: 4,
	fadeOut: 4
})
// 制作视频背景的就不添加背景音乐了
// Compos.addAudio(BackgroundMusic)

const scene = new FFScene()
const videos = new FFVideo({
	path: pathReslove('../assets/v.mp4'),
	y: height / 2,
	x: width / 2,
	width,
	height: height / 2,
})

const bg = new FFVideo({
	path: pathReslove('../assets/v.mp4'),
	y: height / 2,
	x: width / 2,
	width,
	height
})

bg.setBlur(50)
scene.addChild(bg)
scene.addChild(videos)

scene.setDuration(30)
Compos.addChild(scene)


// 开始渲染
Compos.start()

Compos.on('error', e => {
	console.log(`渲染失败....${e.pos}, ${e.type}, ${e.error}`)
})

Compos.on('progress', e => {
	console.log(`合成视频中...${(e.percent * 100) >> 0}%- - - - - - ${e.type}`)
})

Compos.on('complete', e => {
	console.log(`合成完成....\n UGAE: ${e.useage} \n PATH: ${e.output}`)
})