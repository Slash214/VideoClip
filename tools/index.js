/**
 * @author 爱呵呵
 * @description 合成视频方法
 */


const path = require('path')
const { FFAlbum, FFAudio, FFCreator, FFImage, FFText, FFScene } = require('ffcreator')
const { width, height, fps } = require('../conf')

// 入口
const Compos = new FFCreator({
	width,
	height,
	fps,
	output: 'video.mp4',
	cacheDir: path.join(__dirname, '../cache/'),
	outputDir: path.join(__dirname, '../video/'),
	cover: path.join(__dirname, '../assets/img/15.jpg'),
})

// 添加全局背景音乐
const BackgroundMusic = new FFAudio({
	path: path.join(__dirname, '..', 'assets', '乌云 - 董唧唧.mp3'),
	volume: 0.9,
	fadeIn: 4,
	fadeOut: 4
})
Compos.addAudio(BackgroundMusic)


const list = Array.from({ length: 20 }, (v, i) => (
	{ 
		url: `https://yjpsix.com/my/${i}.jpg`,
		animat: i % 3 === 0 ? 'DreamyZoom' : i % 3 === 2 ? 'CrossZoom' : 'FilmBurn',
		text: '文字'
	}
))

console.log(list)

list.forEach(item => {
	const scene = new FFScene()
	const img = new FFImage({
		x: width / 2,
		y: height / 2,
		width,
		height,
		path: item.url,
	})
	
	scene.setDuration(3)
	scene.setTransition(item.animat)
	scene.addChild(img)
	Compos.addChild(scene)
})


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