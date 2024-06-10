const {ipcRenderer} = require('electron');

const packageJson = require('./package.json');
const resource_item_list = require("./item_list.json");
const resource_item_info = require("./item_info.json");
const resource_world = require("./world.json");
const {debug} = require("electron-log");
const black_map_list = [
    "Ouyos-Aoeuam",
    "Coues-Exakrom",
    "Puros-Amayam",
    "Pures-Ouozlum",
    "Soros-Axaesum",
    "Huyos-Uxeulum",
    "Ceres-Iooinum",
    "Cetos-Obaelos",
    "Oieos-Umiutum",
    "Sebos-Avoirom",
    "Teros-Auiusum",
    "Oebos-Ixakaum",
    "Touos-Uoemtum",
    "Xasos-Aeoilos",
    "Xuros-Eyoztum",
    "Pasos-Avosam",
    "Oasos-Uromlum",
    "Casos-Uruxtum",
    "Ceros-Aeaylum",
    "Xouos-Aioblos",
    "Oasos-Eraerom",
    "Tetos-Igaelum",
    "Hynos-Oiaelos",
    "Hebos-Ulamsum",
    "Hiros-Iuaerom",
    "Cynos-Avixnum",
    "Conos-Avaelum",
    "Tetos-Ulaurom",
    "Oures-Araosum",
    "Hures-Ugumtum",
    "Oasitos-Aoeuam",
    "Curites-Exakrom",
    "Petitos-Amayam",
    "Pynites-Ouozlum",
    "Suyitos-Axaesum",
    "Honitos-Uxeulum",
    "Cuyites-Iooinum",
    "Cieitos-Obaelos",
    "Oonitos-Umiutum",
    "Siritos-Avoirom",
    "Tuyitos-Auiusum",
    "Oieitos-Ixakaum",
    "Turitos-Uoemtum",
    "Xouitos-Aeoilos",
    "Xouitos-Eyoztum",
    "Peritos-Avosam",
    "Oynitos-Uromlum",
    "Conitos-Uruxtum",
    "Cebitos-Aeaylum",
    "Xuyitos-Aioblos",
    "Oebitos-Eraerom",
    "Tebitos-Igaelum",
    "Huritos-Oiaelos",
    "Hynitos-Ulamsum",
    "Hetitos-Iuaerom",
    "Cetitos-Avixnum",
    "Casitos-Avaelum",
    "Tasitos-Ulaurom",
    "Oynites-Araosum",
    "Hilites-Ugumtum",
    "Hasos-Iuimaum",
    "Foros-Egoisum",
    "Hasos-Agoitum",
    "Setos-Avamsum",
    "Tonos-Obayam",
    "Honos-Umayaum",
    "Huyes-Ogozlum",
    "Curos-Avulsum",
    "Cebos-Avemlum",
    "Hasos-Inayaum",
    "Sasos-Egeylos",
    "Coros-Aiayrom",
    "Hiros-Exozlos",
    "Tiros-Ouultum",
    "Cases-Ugumlos",
    "Fynes-Unavtum",
    "Fetos-Aiaylos",
    "Fouos-Agosaum",
    "Huyos-Eyoztum",
    "Xilos-Osayam",
    "Casos-Ayosrom",
    "Souos-Ososlos",
    "Xebos-Emimsum",
    "Oetos-Oyexlos",
    "Xebos-Exostum",
    "Tynos-Eyexrom",
    "Casos-Aximam",
    "Hasos-Ayousum",
    "Fasos-Ayiotum",
    "Pebos-Avosrom",
    "Sases-Avuotum",
    "Xases-Oxoulum",
    "Hieos-Avaolum",
    "Xasos-Aoemaum",
    "Xetos-Obursum",
    "Oetos-Ofailos",
    "Tynos-Igurlum",
    "Puros-Ofavam",
    "Setos-Aiaitum",
    "Tynos-Uxavrom",
    "Souos-Availos",
    "Sebos-Ugersum",
    "Peros-Aiataum",
    "Siros-Ofurlos",
    "Oiros-Alaiam",
    "Huritos-Iuimaum",
    "Fynitos-Egoisum",
    "Huyitos-Agoitum",
    "Soritos-Avamsum",
    "Tasitos-Obayam",
    "Hasitos-Umayaum",
    "Hynites-Ogozlum",
    "Ceritos-Avulsum",
    "Coritos-Avemlum",
    "Heritos-Inayaum",
    "Seritos-Egeylos",
    "Cetitos-Aiayrom",
    "Heritos-Exozlos",
    "Tieitos-Ouultum",
    "Cieites-Ugumlos",
    "Fieites-Unavtum",
    "Foritos-Aiaylos",
    "Fynitos-Agosaum",
    "Heritos-Eyoztum",
    "Xoritos-Osayam",
    "Cieitos-Ayosrom",
    "Synitos-Ososlos",
    "Xetitos-Emimsum",
    "Oeritos-Oyexlos",
    "Xoritos-Exostum",
    "Tieitos-Eyexrom",
    "Cetitos-Aximam",
    "Hynitos-Ayousum",
    "Fuyitos-Ayiotum",
    "Petitos-Avosrom",
    "Suyites-Avuotum",
    "Xerites-Oxoulum",
    "Hasitos-Avaolum",
    "Xilitos-Aoemaum",
    "Xynitos-Obursum",
    "Ouritos-Ofailos",
    "Tonitos-Igurlum",
    "Piritos-Ofavam",
    "Soritos-Aiaitum",
    "Tonitos-Uxavrom",
    "Synitos-Availos",
    "Sasitos-Ugersum",
    "Puyitos-Aiataum",
    "Synitos-Ofurlos",
    "Oouitos-Alaiam",
    "Poues-Unatam",
    "Fouos-Amaurom",
    "Suyos-Onaytum",
    "Xasos-Oneulum",
    "Oynos-Oyozam",
    "Hasos-Osuorom",
    "Oynos-Eramtum",
    "Couos-Ayayaum",
    "Pieos-Ofairom",
    "Sieos-Ofugtum",
    "Tasos-Iriglos",
    "Tiros-Odoxlum",
    "Xases-Ataglos",
    "Oires-Oloblum",
    "Xiros-Aiairom",
    "Silos-Oyarlum",
    "Pirites-Unatam",
    "Fonitos-Amaurom",
    "Seritos-Onaytum",
    "Xetitos-Oneulum",
    "Oebitos-Oyozam",
    "Hilitos-Osuorom",
    "Oiritos-Eramtum",
    "Curitos-Ayayaum",
    "Pouitos-Ofairom",
    "Suyitos-Ofugtum",
    "Toritos-Iriglos",
    "Tebitos-Odoxlum",
    "Xurites-Ataglos",
    "Oynites-Oloblum",
    "Xoritos-Aiairom",
    "Sasitos-Oyarlum",
    "Coros-Atinaum",
    "Sasos-Oiozlum",
    "Xynos-Oyogam",
    "Siros-Obobrom",
    "Firos-Aiavam",
    "Heros-Atoyam",
    "Petos-Aietam",
    "Fonos-Oleraum",
    "Fieos-Aiuttum",
    "Casitos-Atinaum",
    "Souitos-Oiozlum",
    "Xebitos-Oyogam",
    "Setitos-Obobrom",
    "Furitos-Aiavam",
    "Hynitos-Atoyam",
    "Pynitos-Aietam",
    "Fasitos-Oleraum",
    "Fouitos-Aiuttum",
    "Cynos-Oxaeaum",
    "Tynos-Atatlos",
    "Firos-Enomaum",
    "Hynes-Exemrom",
    "Hebes-Ouaylos",
    "Foues-Aeaosum",
    "Souos-Umogaum",
    "Cilos-Avioaum",
    "Fonos-Aiugsum",
    "Synos-Ayailos",
    "Xiles-Aiavlum",
    "Sases-Aoarsum",
    "Casos-Aiagsum",
    "Tieos-Ayoslum",
    "Hieos-Aiigaum",
    "Poros-Aiayrom",
    "Cilos-Ofailos",
    "Silos-Apenlum",
    "Fynos-Alodrom",
    "Firos-Ezatam",
    "Touos-Ataglos",
    "Poros-Oconun",
    "Honos-Oyezam",
    "Fieos-Atezsum",
    "Ooros-Ecunsum",
    "Coros-Alieam",
    "Filos-Abalam",
    "Synos-Oyarlos",
    "Febos-Acalun",
    "Pieos-Eterrom",
    "Conitos-Oxaeaum",
    "Turitos-Atatlos",
    "Feritos-Enomaum",
    "Hebites-Exemrom",
    "Hurites-Ouaylos",
    "Fynites-Aeaosum",
    "Sasitos-Umogaum",
    "Cieitos-Avioaum",
    "Fynitos-Aiugsum",
    "Sonitos-Ayailos",
    "Xonites-Aiavlum",
    "Synites-Aoarsum",
    "Cynitos-Aiagsum",
    "Tetitos-Ayoslum",
    "Hilitos-Aiigaum",
    "Ponitos-Aiayrom",
    "Conitos-Ofailos",
    "Soritos-Apenlum",
    "Firitos-Alodrom",
    "Fynitos-Ezatam",
    "Tilitos-Ataglos",
    "Peritos-Oconun",
    "Hynitos-Oyezam",
    "Fasitos-Atezsum",
    "Oeritos-Ecunsum",
    "Casitos-Alieam",
    "Fynitos-Abalam",
    "Suyitos-Oyarlos",
    "Fuyitos-Acalun",
    "Pilitos-Eterrom",
    "Firos-Osinsum",
    "Soues-Uzurtum",
    "Couos-Opodam",
    "Feros-Oyuctum",
    "Pynos-Opabrom",
    "Foros-Uzazlum",
    "Feritos-Osinsum",
    "Suyites-Uzurtum",
    "Cilitos-Opodam",
    "Fasitos-Oyuctum",
    "Piritos-Opabrom",
    "Filitos-Uzazlum",
    "Ooros-Ataltum",
    "Horos-Ohenlum",
    "Cieos-Atatlum",
    "Huros-Atontum",
    "Ouritos-Ataltum",
    "Huyitos-Ohenlum",
    "Cynitos-Atatlum",
    "Hebitos-Atontum",
    "Hynes-Ieatun",
    "Sasos-Abizaum",
    "Fones-Opavun",
    "Tonos-Aboysum",
    "Sebos-Oyohun",
    "Hurites-Ieatun",
    "Silitos-Abizaum",
    "Febites-Opavun",
    "Tuyitos-Aboysum",
    "Siritos-Oyohun",
    "Fuyes-Izohun",
    "Files-Azazsum",
    "Fiees-Ohohtum",
    "Hiles-Izizaum",
    "Cilos-Otatrom",
    "Filites-Izohun",
    "Fasites-Azazsum",
    "Ferites-Ohohtum",
    "Honites-Izizaum",
    "Cieitos-Otatrom",
    "Quaent-Vynsum",
    "Quaent-Al-Vynsum",
    "Quaent-Tersis",
    "Quaent-Al-Tersis",
    "Quaent-Viesom",
    "Quaent-Al-Viesom",
    "Quaent-Qintis",
    "Quaent-Al-Qintis",
    "Quaent-Al-Odesum",
    "Quaent-In-Odesum",
    "Quaent-Al-Nusis",
    "Quaent-In-Nusis",
    "Qiient-Tersom",
    "Qiient-In-Tersom",
    "Qiient-Odesas",
    "Qiient-Qi-Odesas",
    "Qiient-Nutis",
    "Qiient-In-Nutis",
    "Qiient-Vyntum",
    "Qiient-In-Vyntum",
    "Qiient-Al-Odesum",
    "Qiient-Si-Odesum",
    "Qiient-Al-Vynsis",
    "Qiient-Qi-Vynsis",
    "Qiient-Al-Tersas",
    "Qiient-Qi-Tersas",
    "Qiient-Et-Tertum",
    "Qiient-Si-Tertum",
    "Qiient-Qinsum",
    "Qiient-Et-Qinsum",
    "Qiient-Al-Viesis",
    "Qiient-In-Viesis",
    "Qiient-Al-Nusom",
    "Qiient-Qi-Nusom",
    "Qiient-Et-Nusas",
    "Qiient-Si-Nusas",
    "Qiient-Et-Odetis",
    "Qiient-Sa-Odetis",
    "Qiient-In-Odetum",
    "Qiient-Oc-Odetum",
    "Qiient-Al-Qinsis",
    "Qiient-In-Qinsis",
    "Secent-Odesom",
    "Secent-Qi-Odesom",
    "Secent-Al-Odetis",
    "Secent-Si-Odetis",
    "Secent-Vyntum",
    "Secent-Et-Vyntum",
    "Secent-Viesum",
    "Secent-Al-Viesum",
    "Secent-Et-Odesis",
    "Secent-Sa-Odesis",
    "Secent-Al-Qinsom",
    "Secent-Qi-Qinsom",
    "Secent-Nutum",
    "Secent-Al-Nutum",
    "Secent-Al-Tersum",
    "Secent-In-Tersum",
    "Secent-Duosom",
    "Secent-Al-Duosom",
    "Secent-Et-Qinsas",
    "Secent-Si-Qinsas",
    "Setent-Vietis",
    "Setent-Al-Vietis",
    "Setent-Nusum",
    "Setent-Et-Nusum",
    "Setent-Duosas",
    "Setent-Al-Duosas",
    "Setent-Qintis",
    "Setent-Et-Qintis",
    "Setent-Al-Qinsum",
    "Setent-In-Qinsum",
    "Quatun-Nusas",
    "Quatun-Et-Nusas",
    "Quatun-Odetum",
    "Quatun-Et-Odetum",
    "Qiitun-Et-Vynsom",
    "Qiitun-Si-Vynsom",
    "Qiitun-Vietis",
    "Qiitun-Et-Vietis",
    "Qiitun-Duosum",
    "Qiitun-Al-Duosum",
    "Sectun-Tersas",
    "Sectun-Et-Tersas",
    "Sectun-Qinsom",
    "Sectun-In-Qinsom",
    "Sectun-Al-Vyntis",
    "Sectun-In-Vyntis",
    "Sectun-In-Odesis",
    "Sectun-Oc-Odesis",
    "Settun-Odetum",
    "Settun-Et-Odetum",
    "Settun-Vynsis",
    "Settun-Al-Vynsis",
    "Settun-Tersom",
    "Settun-Al-Tersom",
    "Settun-Al-Odetum",
    "Settun-In-Odetum",
    "Settun-Al-Nusis",
    "Settun-In-Nusis"
]
new Promise((resolve) => {
    const resource_item_list = require('./item_list.json');
    const resource_item_info = require('./item_info.json');
    const resource_world = require('./world.json');
    if (localStorage.getItem("language").toLowerCase() === "zh-cn") {
        global.mobs_list = require('./mobs.json').Mobs.Mob;
        global.name_tag_list = require('./name_tag.json');
        global.item_list_json = {}
        global.item_info_json = {}
        global['transparent'] = false
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
    }
    if (localStorage.getItem("language") === "en") {
        global.mobs_list = require('./mobs.json').Mobs.Mob;
        global.name_tag_list = require('./name_tag_en.json');
        global.item_list_json = {}
        global.item_info_json = {}
        global['transparent'] = false
        global.world_list = {}

        for (let item of resource_item_list) {
            global.item_list_json[item['Index']] = {
                unique: item['UniqueName'],
                name: item['LocalizedNames'] ? item['LocalizedNames']['EN-US'] : ""
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

let i18n = document.createElement("script");
i18n.setAttribute("src", "./i18n.js");

var tool_container = document.createElement("div");
tool_container.id = "tool_bar"
tool_container.setAttribute("style", "width:100%;")
tool_container.setAttribute("class", "layui-header header header-demo")

var toolbar = document.createElement("ul");
toolbar.innerHTML =
    `
    <form class="layui-form" action="">
    <li class="layui-nav-item"><button id="close-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon">&#x1006; </i> </button></li>
    <li class="layui-nav-item"><button id="maximize-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon">&#xe622; </i> </button></li>
    <li class="layui-nav-item"><button id="minimize-button" type="button" class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon layui-icon-subtraction"> </i> </button></li>
    <li class="layui-nav-item" style="margin: 0 20px;"><button id="sub_log" type="button" class="layui-btn layui-btn-sm layui-btn-warm layui-btn-radius layui-btn-sm" language="submit_log">上传日志</button></li>
    
    <li class="layui-nav-item" style="position: relative;float: left;font-weight: bold"><i class="layui-icon layui-icon-rss"></i>T Radar</li>
    <li class="layui-nav-item" style="position: relative;float: left;text-align:left">
        <a href="#" language="radar">雷达</a>
        <dl class="layui-nav-child">
          <dd><a id="radar_main" href="#" language="radar">雷达</a></dd>
          <dd><a id="radar_setting" href="#" language="radar_setting">参数设置</a></dd>
        </dl>
    </li>
    <li class="layui-nav-item" style="position: relative;float: left;text-align:left;direction: ltr">
        <a href="#"  language="set_top">置顶</a>
        <dl class="layui-nav-child">
            <dd style="padding: 10px">
                <div class="layui-form-item">
                    <div id="opticate"></div>
                </div>
                <div class="layui-form-item">
                    <div id="backpack_top"></div>
                </div>
                <div class="layui-form-item">
                    <lable class="layui-form-label" style="font-family: 'Microsoft YaHei UI',serif;text-align: left" language="software_window_top">窗口置顶</lable>
                
                    <div class="layui-input-block">
                        <input type="checkbox" lay-filter="set_top" lay-skin="switch" lay-text="ON|OFF">
                    </div>
                        
                </div>
                 <div class="layui-form-item">
                    <lable class="layui-form-label" style="font-family: 'Microsoft YaHei UI',serif;text-align: left" language="opticate_mode">透明模式</lable>
                
                    <div class="layui-input-block">
                        <input type="checkbox" lay-filter="set_transparent" lay-skin="switch" lay-text="ON|OFF">
                    </div>
                        
                </div>
                <div class="layui-form-item">
                    <lable class="layui-form-label" style="font-family: 'Microsoft YaHei UI',serif;text-align: left" language="cross_window">窗口穿透 : F6快捷键</lable>
                        
                </div>
                <div class="layui-form-item">
                    <lable class="layui-form-label" style="font-family: 'Microsoft YaHei UI',serif;text-align: left" language="tip_player_sound">遇敌提示音 : F7快捷键</lable>
                        
                </div>
            </dd>
        </dl>
    </li>
    <li class="layui-nav-item" style="position: relative;float: left;text-align:left">
        <a id="invote_control"  href="#" language="invite_rewards">邀请奖励</a>
    </li></form>`

toolbar.setAttribute("class", "layui-nav")
toolbar.setAttribute("style", "direction:rtl");
tool_container.appendChild(toolbar)


var frame_container = document.createElement("div");
frame_container.setAttribute("style", "position:relative;float:left;height:100%;width:150px;")
frame_container.setAttribute("class", "layui-side layui-bg-black")

var body_container = document.createElement("div");
body_container.setAttribute("style", "position:relative;height:100%;padding-left:20px;")
body_container.setAttribute("class", "layui-bg-black")

var lef_bar = document.createElement("div");
lef_bar.setAttribute("class", "layui-nav layui-nav-tree")
lef_bar.setAttribute("style", "")

// var menu = document.createElement("ul")
// menu.setAttribute("lay-filter", "nav")
// menu.innerHTML =
//     `
//     <li class="layui-nav-item layui-disabled"><a href="#">自动采集配置(开发中)</a></li>`
// lef_bar.appendChild(menu)
// frame_container.appendChild(lef_bar)
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
            local_player_position: globalThis['local_player_position'],
            white_player_list: globalThis['white_player_list'],
            current_map: globalThis['current_map'],
            config: globalThis['config'],
            version: packageJson.version
        };


        let formData = new FormData();

        formData.append('type', 2);
        formData.append('text', JSON.stringify(data));

        fetch('http://8.218.34.95/api/log', {
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
    layui.slider.render({
        elem: '#opticate'
        , value: 95 //初始值,
        , min: 5
        , setTips: function (value) {
            if (global.transparent) {
                document.getElementById("tool_bar").style.setProperty("opacity", (value / 100).toFixed(2))
            } else {
                ipcRenderer.send('window_opt', value)
            }
            return `${lan_data['opacity']}:${value}%`;
        }
    });
    global['backpack_top'] = 0
    layui.slider.render({
        elem: '#backpack_top'
        , value: 0 //初始值,
        , min: 0
        , max: 100
        , setTips: function (value) {
            global['backpack_top'] = value;
            return `${lan_data['backpack_display_down']}：${value}%`;
        }
    });
    layui.form.on('switch(set_top)', function (obj) {
        ipcRenderer.send('window_top', obj.elem.checked)
    });
    layui.form.on('switch(set_transparent)', function (obj) {
        global['transparent'] = obj.elem.checked
        let style = document.getElementsByClassName("layui-bg-black")[0].style;

        if (global['transparent']) {
            style.setProperty('background-color', 'transparent', 'important');
        } else {
            style.removeProperty('background-color');
        }

    });
    ipcRenderer.on("focus", function (event, args) {
        console.log(args)

    })
    ipcRenderer.on("click_through", function (event, args) {

        layer.msg(`${lan_data['current_cross']} : ${args}`, {
            icon: 1,
            time: 1000
        });
        if (args) {
            document.getElementById("tool_bar").style.opacity = 0
        } else {
            document.getElementById("tool_bar").style.opacity = 1
        }
    })
    ipcRenderer.on("file_path", function (event, args) {
        layui.form.val("setting", {"audio_path": args[0].replaceAll("\\", "/")})
    })
    ipcRenderer.on("del_info", function (event, args) {
        global.clear_data = true
    })
    ipcRenderer.on("change_voice_tip", function (event, args) {
        let setting = JSON.parse(localStorage.getItem("config"));
        setting['tip_for_player_sound'] = !setting['tip_for_player_sound']
        layui.form.val("setting", setting)
        localStorage.setItem("config", JSON.stringify(setting))
    })
    layui.form.render()
}
document.body.appendChild(i18n)
document.head.appendChild(css_layui);
document.body.appendChild(script_layui);
document.body.appendChild(tool_container)
// document.body.appendChild(frame_container)
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

document.getElementById("invote_control").onclick = function () {
    for (let item of body_container.children) {
        item.style.display = "none";
    }
    document.getElementById("invote_page").style.display = "block";
    fetch('http://8.218.34.95/api/get_userinfo', {
        method: 'get',
        headers: {
            "token": localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("invote_id").innerText = data['id']
            if (!data['invote']) {
                document.getElementById("bind_invote").style.display = "block";
            } else {
                document.getElementById("bind_invote").style.display = "none";
                document.getElementById("bind_id").innerText = lan_data['had_bind'] + " ：" + data['invote'];
                document.getElementById("bind_id").classList.add("layui-badge")
            }
        })
        .catch(error => {
            layer.msg(error, {icon: 2, time: 3000}, function () {
            });
        });
    fetch('http://8.218.34.95/api/get_invotecard_list', {
        method: 'get',
        headers: {
            "token": localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            let text = "";
            for (let item of data) {
                text += `${item['cardNumber']}(${item['days']} ${lan_data['day']})(${item['activeStatus'] === 0 ? lan_data['not_use'] : lan_data['use']})(${item['personal']})<br>`
            }
            document.getElementById("card_list").innerHTML = text
        })
        .catch(error => {
            layer.msg(error, {icon: 2, time: 3000}, function () {
            });
        });


}
