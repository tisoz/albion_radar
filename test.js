const { exec } = require('child_process');

// 运行系统命令，查找名称为 notepad.exe 的进程
exec('tasklist /FI "IMAGENAME eq fiddler.exe"', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }

    // 解析输出，获取PID
    const outputLines = stdout.trim().split('\n');
    const pidLine = outputLines[outputLines.length - 1];
    const pid = parseInt(pidLine.substr(26, 5));

    console.log(`notepad.exe 的PID为：${pid}`);
});
