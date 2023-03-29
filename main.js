const {app, BrowserWindow, session, ipcMain} = require('electron')
const path = require('path')
const pcap = require("npcap");
const PhotonParser = require('photon-packet-parser');

global.manager = new PhotonParser();
var sourcePort = 5056;
var destinationPort = 5056;
var filter = "udp and (src port " + sourcePort + " or dst port " + destinationPort + ")";

for (let i of pcap.findalldevs()) {
    if (i.description.indexOf("Realtek") + 1) {
        var dev = i.name;
    }
    console.log(i.description)
}
global.manager.on('packet', (packet) => {
    // 在这里处理接收到的结果
    console.log(packet);
});
var pcap_session = pcap.createOfflineSession('./1.pcap');

// pcap_session = pcap.createSession(dev, {filter: filter, buffer_timeout: 0})
pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.payload.payload.payload.data;

    console.log(packet.link_type);
    manager.handle(data)
});

function createWindow() {
    // webSecurity: 如果设置为 false，则禁用跨站点安全策略，允许加载来自不同源的资源。这对于开发和测试时很有用，但在生产环境中禁用跨站点安全策略会带来安全风险。
    // devTools: 如果应用程序没有被打包（即处于开发模式），则启用开发工具。打包后，开发工具将被禁用。这对于生产环境中的安全性很重要。
    // preload: 设置预加载脚本的路径，这个脚本将在渲染进程中最先被执行。预加载脚本可以访问 Node.js 的 API，这使得在渲染进程中使用 Node.js 的 API 变得容易。
    // nodeIntegration: 如果设置为 true，则在渲染进程中启用 Node.js 整合。这允许渲染进程使用 Node.js 的 API。
    // contextIsolation: 如果设置为 true，则启用上下文隔离。这样可以防止恶意网站对你的应用程序造成安全威胁，但也会使得在渲染进程和主进程之间传递数据变得更加复杂。如果设置为 false，则禁用上下文隔离。
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 300,
        frame: false,
        webPreferences: {
            webSecurity: false,
            devTools: !app.isPackaged,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    //表示禁用代理，直接连接互联网。
    session.defaultSession.setProxy({proxyRules: 'direct://'})
    ipcMain.on('minimize-window', () => {
        win.minimize();
    });

    ipcMain.on('maximize-window', () => {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });
    ipcMain.on('close-window', () => {
        win.close();
    });
    win.loadFile("./test.html")
    win.maximize()
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
