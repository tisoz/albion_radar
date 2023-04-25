const {app, BrowserWindow, session, ipcMain, globalShortcut} = require('electron')
const path = require('path')
process.env.no_proxy = "43.155.184.183";
global.ignore = false;
require("./pcap_model.js")

function createWindow() {
    // webSecurity: 如果设置为 false，则禁用跨站点安全策略，允许加载来自不同源的资源。这对于开发和测试时很有用，但在生产环境中禁用跨站点安全策略会带来安全风险。
    // devTools: 如果应用程序没有被打包（即处于开发模式），则启用开发工具。打包后，开发工具将被禁用。这对于生产环境中的安全性很重要。
    // preload: 设置预加载脚本的路径，这个脚本将在渲染进程中最先被执行。预加载脚本可以访问 Node.js 的 API，这使得在渲染进程中使用 Node.js 的 API 变得容易。
    // nodeIntegration: 如果设置为 true，则在渲染进程中启用 Node.js 整合。这允许渲染进程使用 Node.js 的 API。
    // contextIsolation: 如果设置为 true，则启用上下文隔离。这样可以防止恶意网站对你的应用程序造成安全威胁，但也会使得在渲染进程和主进程之间传递数据变得更加复杂。如果设置为 false，则禁用上下文隔离。
    app.commandLine.appendSwitch('no-proxy-server');
    session.defaultSession.setProxy({proxyRules: 'direct://'}).then((res) => {
        console.log(res)
    })
    const win = new BrowserWindow({
        width: 570,
        height: 380,
        minWidth: 570,
        minHeight: 380,
        frame: false,
        icon: "./favicon.ico",
        webPreferences: {
            webSecurity: false,
            devTools: !app.isPackaged,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            partition: 'persist:radar'
        }
    })

    //表示禁用代理，直接连接互联网。

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
    ipcMain.on('window-drag', (event, arg) => {
        // 获取当前窗口的位置
        let win = BrowserWindow.getFocusedWindow()
        let position = win.getPosition()

        // 计算新的窗口位置
        const newPosition = [
            position[0] + arg.x,
            position[1] + arg.y
        ]

        // 移动窗口到新的位置
        win.setPosition(newPosition[0], newPosition[1], true)
    })
    ipcMain.on('window_top', (event, arg) => {
        // 获取当前窗口的位置
        let win = BrowserWindow.getFocusedWindow()
        win.setAlwaysOnTop(arg)
    })
    ipcMain.on('window_opt', (event, arg) => {
        // 获取当前窗口的位置
        if (arg) {
            let win = BrowserWindow.getFocusedWindow()
            win.setOpacity(arg / 100)
        }

    })
    global.web_content = win.webContents;
    win.loadFile("./login.html")
    // 窗口置顶 , 窗口透明
    // 隐藏左边工具栏
    // 2V2炼狱无数据
    // 冰蜘蛛触发数据


    win.maximize()
    win.webContents.openDevTools()
}

app.on('will-quit', () => {
    // 解除所有的全局热键
    globalShortcut.unregisterAll()
})
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    globalShortcut.register('F6', () => {
        let win = BrowserWindow.getFocusedWindow()
        let ignore = !global.ignore;
        win.setIgnoreMouseEvents(ignore)
        global.web_content.send("click_through", ignore)
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
