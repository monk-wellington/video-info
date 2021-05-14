const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video-submit', (_, path) => {
    ffmpeg.ffprobe(path, (err, { format: { duration } }) => {
        console.log('File duration is:', duration);
        console.log('Ya heard!');
        mainWindow.webContents.send('video-duration', duration);
    });
});
