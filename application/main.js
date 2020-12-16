const path = require('path');
const {
    app,
    globalShortcut,
    BrowserWindow
} = require('electron');

// Function to create the main window
function createWindow() {
    const win = new BrowserWindow({
        fullscreen: true,
        title: 'Name of application',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webPreferences: true,
        },
    });

    win.loadFile('./html/index.html');

    // uncomment this line for debug tools
    // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// disable shortcut keys
app.on('ready', () => {
    globalShortcut.register('alt+tab', () => {
        return false;
    });
})


// macOS requirements
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Hot reload feature in test mode
// Usage: npm test
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
    });
}