const {ipcRenderer} = require('electron');
global.token = localStorage.getItem("token")
//创建公共样式
let css_layui = document.createElement("link");
css_layui.setAttribute("rel", "stylesheet");
css_layui.setAttribute("href", "./layui/css/layui.css");

let script_layui = document.createElement("script");
script_layui.setAttribute("src", "./layui/layui.js");

var tool_container = document.createElement("div");
tool_container.id = "tool_bar"
tool_container.setAttribute("style", "width:100%;")
tool_container.setAttribute("class", "layui-header header header-demo")

var toolbar = document.createElement("ul");
toolbar.innerHTML =
    `<li class="layui-nav-item"><button id="close-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon">&#x1006; </i> </button></li>
    <li class="layui-nav-item"><button id="maximize-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon">&#xe622; </i> </button></li>
    <li class="layui-nav-item"><button id="minimize-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon layui-icon-subtraction"> </i> </button></li>
    <li class="layui-nav-item" style="position: absolute;left: 30px;font-weight: bold"><a href="#"><i class="layui-icon layui-icon-rss"></i>T Radar</a></li>`

toolbar.setAttribute("class", "layui-nav")
toolbar.setAttribute("style", "direction:rtl");
tool_container.appendChild(toolbar)


var frame_container = document.createElement("div");
frame_container.setAttribute("style", "position:relative;float:left;height:100%;width:150px;")
frame_container.setAttribute("class", "layui-side layui-bg-black")

var body_container = document.createElement("div");
body_container.setAttribute("style", "position:relative;height:100%;left:0")
body_container.setAttribute("class", "layui-body layui-bg-black")

var lef_bar = document.createElement("div");
lef_bar.setAttribute("class", "layui-nav layui-nav-tree")
lef_bar.setAttribute("style", "")

var menu = document.createElement("ul")
menu.setAttribute("lay-filter", "nav")
menu.innerHTML =
    `<li class="layui-nav-item"><a href="#">雷达</a></li>
    <li class="layui-nav-item layui-disabled"><a href="#">自动采集配置(开发中)</a></li>`
lef_bar.appendChild(menu)
frame_container.appendChild(lef_bar)
script_layui.onload = () => {
    document.getElementById('minimize-button').addEventListener('click', () => {
        ipcRenderer.send('minimize-window');
    });

    document.getElementById('maximize-button').addEventListener('click', () => {
        ipcRenderer.send('maximize-window');
    });

    document.getElementById('close-button').addEventListener('click', () => {
        ipcRenderer.send('close-window');
    });
    layui.form.render()
}
document.head.appendChild(css_layui);
document.body.appendChild(script_layui);
document.body.appendChild(tool_container)
document.body.appendChild(frame_container)
document.body.appendChild(body_container)


//
const font = new FontFace('JetBrainsMono-Bold', 'url(./JetBrainsMono-Bold.woff2)', {
    style: 'normal',
    weight: 'normal',
});

font.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
    console.log('Font loaded successfully.');
}).catch((error) => {
    console.error('Error loading font:', error);
});


