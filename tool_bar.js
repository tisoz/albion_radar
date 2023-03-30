const {ipcRenderer} = require('electron');
//创建公共样式
let css_layui = document.createElement("link");
css_layui.setAttribute("rel", "stylesheet");
css_layui.setAttribute("href", "./layui/css/layui.css");

let script_layui = document.createElement("script");
script_layui.setAttribute("src", "./layui/layui.js");

var tool_container = document.createElement("div");
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
frame_container.setAttribute("style", "height:100%;")
frame_container.setAttribute("class", "layui-side layui-bg-black")

var menu = document.createElement("ul")
menu.setAttribute("class", "layui-nav layui-nav-tree")
menu.setAttribute("lay-filter", "nav")
menu.innerHTML =
    `<li class="layui-nav-item"><a href="">云市场</a></li>
    <li class="layui-nav-item"><a href="">社区</a></li>`
frame_container.appendChild(menu)
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



