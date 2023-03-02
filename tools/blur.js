const path = require('path')
const { FFAlbum, FFAudio, FFCreator, FFImage, FFText, FFScene } = require('ffcreator')
const { width, height, fps } = require('../conf')

const pathReslove = dir => path.join(__dirname, dir)

const Compos = new FFCreator({
	width,
	height,
	render: 'gl',
	outputDir: pathReslove('../video/'),
	cacheDir: pathReslove('../cache/'),
	clarity: 'high',
	fps
})


Compos.addAudio(
	new FFAudio({
		path: pathReslove('../assets/乌云 - 董唧唧.mp3'),
		volume: 0.9,
		fadeIn: 4,
		fadeOut: 4
	})
)


const list = Array.from({ length: 20 }, (v, i) => (
	{ 
		url: `https://yjpsix.com/my/${i}.jpg`,
		animat: i % 3 === 0 ? 'DreamyZoom' : i % 3 === 2 ? 'CrossZoom' : 'FilmBurn',
	}
))


list.forEach(item => {
	const scene = new FFScene()

	const bg = new FFImage({
		path: item.url,
		x: width / 2,
		y: height / 2,
		width,
		height
	})
	bg.setBlur(40) // 添加模糊
	const img = new FFImage({
		path: item.url,
		x: width / 2,
		y: height / 2,
		width,
		height: height / 2
	})

	scene.setDuration(3)
	scene.setTransition(item.animat)
	scene.addChild(bg)
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
