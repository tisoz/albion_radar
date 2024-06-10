const {app, dialog, BrowserWindow, session, ipcMain, globalShortcut, clipboard} = require('electron')
const path = require('path')


process.env.no_proxy = "8.218.34.95";
global.ignore = false;
require("./pcap_model.js")

function createWindow() {
    // webSecurity: 如果设置为 false，则禁用跨站点安全策略，允许加载来自不同源的资源。这对于开发和测试时很有用，但在生产环境中禁用跨站点安全策略会带来安全风险。
    // devTools: 如果应用程序没有被打包（即处于开发模式），则启用开发工具。打包后，开发工具将被禁用。这对于生产环境中的安全性很重要。
    // preload: 设置预加载脚本的路径，这个脚本将在渲染进程中最先被执行。预加载脚本可以访问 Node.js 的 API，这使得在渲染进程中使用 Node.js 的 API 变得容易。
    // nodeIntegration: 如果设置为 true，则在渲染进程中启用 Node.js 整合。这允许渲染进程使用 Node.js 的 API。
    // contextIsolation: 如果设置为 true，则启用上下文隔离。这样可以防止恶意网站对你的应用程序造成安全威胁，但也会使得在渲染进程和主进程之间传递数据变得更加复杂。如果设置为 false，则禁用上下文隔离。
    app.commandLine.appendSwitch('no-proxy-server');
    app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

    session.defaultSession.setProxy({proxyRules: 'direct://'}).then((res) => {
        console.log(res)
    })
    const win = new BrowserWindow({
        width: 650,
        height: 400,
        minWidth: 650,
        minHeight: 400,
        frame: false,
        transparent: true,
        icon: "./favicon.ico",
        webPreferences: {
            webSecurity: false,
            backgroundThrottling: false,
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
    ipcMain.on('open-file-dialog', () => {
        dialog.showOpenDialog({
            properties: ['openFile'], // 允许用户选择文件
            filters: [
                {name: 'Voices', extensions: ['mp3', 'wav']}
            ]
        }).then(result => {
            if (!result.canceled) {
                console.log(result.filePaths);
                // 这里可以处理选中的文件路径
                win.webContents.send("file_path", result.filePaths)
            }
        }).catch(err => {
            console.error(err);
        });
    });
    ipcMain.on('close-window', () => {
        win.close();
    });
    ipcMain.on('window-drag', (event, arg) => {
        // 获取当前窗口的位置
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
        win.setAlwaysOnTop(arg)
    })
    ipcMain.on('window_opt', (event, arg) => {
        // 获取当前窗口的位置
        if (arg) {
            win.setOpacity(arg / 100)
        }

    })
    ipcMain.on('copy', (event, text) => {
        clipboard.writeText(text);
    });
    global.web_content = win.webContents;
    win.on('focus', () => {
        win.webContents.send("focus", true)
    });

    win.on('blur', () => {
        win.webContents.send("focus", false)
    });
    win.loadFile("./login.html")
    // 冰蜘蛛触发数据
    // 隐藏普通怪物 , 隐藏资源怪物
    // 修复部分玩家不显示装备的bug
    // win.maximize()
    // win.webContents.openDevTools()
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
        let win = BrowserWindow.getAllWindows()[0]
        global.ignore = !global.ignore;
        win.setIgnoreMouseEvents(ignore)
        global.web_content.send("click_through", ignore)
    })
    globalShortcut.register('F7', () => {
        global.web_content.send("change_voice_tip", 1)
    })
    globalShortcut.register('DEL', () => {
        global.web_content.send("del_info", 1)
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
