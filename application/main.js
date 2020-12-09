const { app, BrowserWindow } = require('electron');

// Function to create the main window
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Name of application',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webPreferences: true
        }
    });

    win.loadFile('./html/index.html');

    // uncomment this line for debug tools
    // win.webContents.openDevTools();
}

// macOS requirements
app.whenReady().then(createWindow);

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
