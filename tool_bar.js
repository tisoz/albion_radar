const {ipcRenderer} = require('electron');
//创建公共样式
let css_layui = document.createElement("link");
css_layui.setAttribute("rel", "stylesheet");
css_layui.setAttribute("href", "./layui/css/layui.css");

let script_layui = document.createElement("script");
script_layui.setAttribute("src", "./layui/layui.js");


var toolbar = document.createElement("ul");
toolbar.innerHTML =
    `
<li class="layui-nav-item"><button id="close-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon">&#x1006; </i> </button></li>
<li class="layui-nav-item"><button id="maximize-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon">&#xe622; </i> </button></li>
<li class="layui-nav-item"><button id="minimize-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon layui-icon-subtraction"> </i> </button></li>
<li class="layui-nav-item" style="position: absolute;left: 30px;font-weight: bold"><i class="layui-icon layui-icon-rss"></i><span>T Radar</span></li>`
toolbar.classList.add("layui-nav");
toolbar.setAttribute("style", "direction:rtl");

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
document.body.appendChild(toolbar)



