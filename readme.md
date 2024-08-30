# 项目环境介绍
`nodejs`: v18.12.1
`webstorm`
`npcap`: include_root_directory , (thanks frankie-zeng : https://github.com/frankie-zeng/node_npcap)
`photoparser`: include_root_directory , (thanks mr.rise : https://www.npmjs.com/package/photon-packet-parser)


# 修改指引 

工程项目名称：[package.json](package.json)
软件启动标题：[main.js](main.js)
npcap数据捕获管理：[pcap_model.js](pcap_model.js)
雷达解析数据处理总线：[pcap_deal.js](pcap_deal.js)
游戏中各类事件：[event](event)目录

# 项目构成

layui: 前端UI框架
TweenMax: 动画库
nodejs: 后端服务
npcap: 数据捕获
photoparser: 数据解析
i18.js：国际化

```支持高质量图片以及高帧渲染，创建后存入缓冲池优化总线结构```



# 免责声明
本开源项目由社区贡献并发布。请仔细阅读以下免责声明：

1. 责任限制
   本项目是按“原样”（"as is"）提供的。在适用法律允许的最大范围内，项目的贡献者不对因使用、修改或分发本项目所造成的任何直接或间接的损害、损失或任何其他责任负责。用户在使用本项目时应自行承担风险。

2. 无担保声明
   本项目及其任何衍生作品不提供任何明示或暗示的担保，包括但不限于适销性、适合特定用途和非侵权的担保。我们不保证本项目的功能或内容的准确性、可靠性或完整性。

3. 版权声明
   本项目的版权归其贡献者所有。用户可以根据所附的许可证条款自由使用、复制、修改和分发本项目的代码，但须保留本项目的原始版权声明和许可条款。

4. 许可证信息
   本项目受 CC BY-NC许可证的约束。使用本项目即表示用户已同意并接受该许可证的所有条款和条件。

5. 其他声明
   本项目可能包含第三方库或代码，这些第三方部分可能受其各自的许可证和条款约束。用户在使用这些第三方部分时应遵守相应的许可要求。