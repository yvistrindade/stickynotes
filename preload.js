/**
 *  preload.js - Usado no frameork electron para aumentar a segurança e o desempenho
 */

//importção dos recursos fo framework electron
//ipcRenderer permite estabelecer uma comunicação entre processos (IPC) main.js <=> renderer.js
// contextBridge: permissões de comunicação entre processos usando um api electron
const{ ipcRenderer, contextBridge } = require('electron')

//enviar uma mensagem para o main.js estabelecer uma conexão com o banco de dados quando iniciar a aplicação 
//send (enviar)
//db-connect (rótulo para identificar a mensagem)
ipcRenderer.send('db-connect')

// permissões para estabelecer a comunicação entre os processos
contextBridge.exposeInMainWorld('api',{
dbStatus: (message) => ipcRenderer.on('db-status', message)
})