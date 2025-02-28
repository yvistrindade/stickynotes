console.log("Electron - Processo principal")

// importação dos recursos do framework
// app (aplicação)
// BrowserWindow (criação da janela)
const { app, BrowserWindow } = require('electron/main')

// janela principal
let win
const createWindow = () => {
   win = new BrowserWindow({
    width: 1010,
    height: 720,
    //frame: false, // totem de pedido
    //resizable: false, // retira o redimensionamento
    //minimizable: false, // retira a opção de minimizar
    //closable: false, // retira a opção close
    //autoHideMenuBar: true // esconder o menu
  })

  // carregar o documento html na janela
  win.loadFile('./src/views/index.html')
}

// inicialização da aplicação (assincronismo)
app.whenReady().then(() => {
  createWindow()

  // só ativa a janela principal se nenhuma outra estiver ativa
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// se o sistema não for MAC encerrar a aplicação quando a janela for fechada
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})