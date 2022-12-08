const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const path = require('path')

console.log(path.join(__dirname, './preload.js'))
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: false,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    }
  });

  mainWindow.webContents.openDevTools();
  ipcMain.handle('ping', () => {
    mainWindow.alwaysOnTop = true;
    BrowserWindow.getAllWindows().shift().show(); BrowserWindow.getAllWindows().shift().focus();
  })
  ipcMain.handle('pong', () => {
    mainWindow.alwaysOnTop = false;
  })
  ipcMain.handle('fetchq', () => {
    const { net } = require('electron')
    const request = net.request('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
    request.on('response', (response) => {
      /*console.log(`STATUS: ${response.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`)*/
      response.on('data', (chunk) => {
        console.log(`${chunk}`)
      })
      response.on('end', () => {
      // console.log('No more data in response.')
      })
    })
    request.end()
  })
  mainWindow.loadFile('index.html');
  mainWindow.on('close', (ev) => {
    if (mainWindow?.isVisible()) {
      ev.preventDefault();
      mainWindow.hide();
    }
  });

}
function createTray() {
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
    { type: 'separator' },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        BrowserWindow.getAllWindows().forEach((w) => w.destroy());
        app.quit();
      }
    }
  ]);

  const tray = new Tray('./favpng_joystick.png');
  tray.setToolTip('Shortcutter');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    BrowserWindow.getAllWindows().shift().show();
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('activate', () => {
  const window = BrowserWindow.getAllWindows().shift();
  
  if (window) {
    window.show();
  } else {
    createWindow();
  }
});

function qwe () {
}