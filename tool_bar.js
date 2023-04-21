const {ipcRenderer} = require('electron');
new Promise((resolve) => {
    const resource_item_list = require('./item_list.json');
    const resource_item_info = require('./item_info.json');
    const resource_world = require('./world.json');
    const mobs_list = require('./mobs.json');
    const name_tag_list = require('./name_tag.json');
    global.item_list_json = {}
    global.item_info_json = {}
    global.world_list = {}
    for (let item of resource_item_list) {
        global.item_list_json[item['Index']] = {
            unique: item['UniqueName'],
            name: item['LocalizedNames'] ? item['LocalizedNames']['ZH-CN'] : ""
        }
    }
    for (let items in resource_item_info['items']) {
        if (!(resource_item_info['items'][items] instanceof Array)) continue
        for (let item of resource_item_info['items'][items]) {
            if (!item['@uniquename']) continue
            global.item_info_json[item['@uniquename']] = {
                itempower: item['@itempower'] || 0,
            }
            global.item_info_json[`${item['@uniquename']}@1`] = {
                itempower: item['@itempower'] || 0,
            }
            if (item['enchantments']) {
                if (item['enchantments']['enchantment']['@enchantmentlevel']) {
                    global.item_info_json[`${item['@uniquename']}@${item['enchantments']['enchantment']['@enchantmentlevel']}`] = {
                        itempower: item['enchantments']['enchantment']['@itempower'] || 0,
                    }
                    continue
                }

                for (let enc of item['enchantments']['enchantment']) {
                    global.item_info_json[`${item['@uniquename']}@${enc['@enchantmentlevel']}`] = {
                        itempower: enc['@itempower'] || 0,
                    }
                }
            }
        }
    }
    for (let item of resource_world.world.clusters.cluster) {
        world_list[item['@id']] = item
    }
    for (let item of resource_world.world.clusters.cluster) {
        world_list[item['@id']] = item
    }
}).then(() => {
    console.log("load pcap")
    let script_pcap = document.createElement("script");
    script_pcap.setAttribute("src", "./pcap_deal.js");
    document.body.appendChild(script_pcap)
})


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
    <li class="layui-nav-item" style="margin: 0 20px;"><button id="sub_log" type="button" class="layui-btn layui-btn-sm layui-btn-warm layui-btn-radius layui-btn-sm">上传日志</button></li>
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
    `<li class="layui-nav-item"><a href="#" id="radar_main">雷达</a></li>
    <li class="layui-nav-item"><a href="#" id="radar_setting">雷达设置</a></li>
    <li class="layui-nav-item layui-disabled"><a href="#">自动采集配置(开发中)</a></li>`
lef_bar.appendChild(menu)
frame_container.appendChild(lef_bar)
script_layui.onload = () => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    }
    document.getElementById('minimize-button').addEventListener('click', () => {
        ipcRenderer.send('minimize-window');
    });

    document.getElementById('maximize-button').addEventListener('click', () => {
        ipcRenderer.send('maximize-window');
    });

    document.getElementById('close-button').addEventListener('click', () => {
        ipcRenderer.send('close-window');
    });
    document.getElementById('sub_log').addEventListener('click', () => {
        let data = {
            item_list: globalThis['item_list'],
            monster_list: globalThis['monster_list'],
            player_list: globalThis['player_list'],
            dungeon_list: globalThis['dungeon_list'],
            chest_list: globalThis['chest_list'],
            temp_list: globalThis['temp_list'],
            local_player_position: globalThis['local_player_position']
        };


        let formData = new FormData();

        formData.append('type', 2);
        formData.append('text', JSON.stringify(data));

        fetch('http://43.155.184.183/api/log', {
            method: 'POST',
            body: formData,
            headers: {
                "token": localStorage.getItem('token')
            }
        })
            .then(response => response.text())
            .then(response => {
                layer.msg(response, {
                    icon: 1,
                    time: 1000
                });
            })
            .catch(error => {
                layer.msg(error, {icon: 2, time: 3000}, function () {
                });
            });
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

document.getElementById("radar_main").onclick = function () {
    for (let item of body_container.children) {
        item.style.display = "none";
    }
    document.getElementById("radar_page").style.display = "block";
}
document.getElementById("radar_setting").onclick = function () {
    for (let item of body_container.children) {
        item.style.display = "none";
    }
    document.getElementById("radar_setting_page").style.display = "block";
}
