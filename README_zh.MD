[中文](./README_zh.MD) | [English](./README.MD)

# VideoClip
一个基于ffcreator的nodejs 视频处理工具库文件，
你需要会使用nodejs，同时确保你的环境可以使用node

支持生成
-   相册视频
-   图片视频
-   文字视频
-   AE模板相册
-   Lottie动画

# Demo
> 正在开发中..

1：cd tools  / node index 可看见简单的demo
2：tools 文件夹下就是简单的效果，node  文件名 就可以启动

# 使用方法
项目使用的node版本 v18.14.2

> git clone https://github.com/Slash214/VideoClip.git
> npm install 

如果安装失败很可能是因为项目依赖的canvas 和 gl 拉取失败了
使用下面命令先安装这两个包 再去 npm install

-  1 安装 canvas 命令：
npm install canvas --canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas/

-  2 安装 gl 命令：
npm install gl --gl_binary_host_mirror=https://registry.npmmirror.com/-/binary/gl

# last
感谢ffCreator
[文档地址](https://tnfe.github.io/FFCreator/#/demo/lite)

[支持动画](https://tnfe.github.io/FFCreator/#/guide/animate)