const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  pid: () => mainWindow.webContents.openDevTools(),
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  pong: () => ipcRenderer.invoke('pong'),
  fetchq: () => ipcRenderer.invoke('fetchq')
});

/*console.log(process)
console.log(process.pid)*/