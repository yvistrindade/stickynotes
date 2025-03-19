console.log("Electron - Processo principal")

// importação dos recursos do framework
// app (aplicação)
// BrowserWindow (criação da janela)
// nativeTheme está relacionado ao tema (claro ou escuro)
// Menu (definir um menu personalizado)
// shell (acessar links externos no navegador padrão)
// ipcMain (permite estabelecer uma comunicação entre processos (IPC) main.js <=> renderer.js)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron/main')

// ativação do preload.js (importação do path)
const path = require('node:path')

// importação dos metodos conectar a desconectar (modulo de conexão)
const { conectar, desconectar } = require('./database.js')

// janela principal
let win
const createWindow = () => {
  // definindo o tema da janela claro ou escuro
  nativeTheme.themeSource = 'light'
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    //frame: false, // totem de pedido
    //resizable: false, // retira o redimensionamento
    //minimizable: false, // retira a opção de minimizar
    //closable: false, // retira a opção close
    //autoHideMenuBar: true // esconder o menu
    // movable: false
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // carregar o menu personalizado
  // ATENÇÃO: Antes importar o recurso Menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  // carregar o documento html na janela
  win.loadFile('./src/views/index.html')
}

// janela sobre
let about
function aboutWindow() {
  nativeTheme.themeSource = 'light'
  // obter a janela principal
  const mainWindow = BrowserWindow.getFocusedWindow()
  // validação (se existir a janela principal)
  if (mainWindow) {
    about = new BrowserWindow({
      width: 320,
      height: 280,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      // estabelecer uma relação hierárquica entre janelas
      parent: mainWindow,
      // criar uma janela modal (só retorna a principal quando encerrada)
      modal: true
    })
  }
  about.loadFile('./src/views/sobre.html')
}

// Inicialização da aplicação (assincronismo)
app.whenReady().then(() => {
  createWindow()

  // Melhor local para estabelecer a conexão com o banco de dados
  // No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida do aplicativo e encerrar a conexão quando o aplicação for finalizar
  // Só ativar a janela principal se nenhuma outra estiver ativa
  ipcMain.on('db-connect', async (event) => {
    // A linha abaixo estabelece conexão ao banco de dados
    await conectar()
    // Enviar ao renderizador uma mensagem para trocar a imagem do ícone do banco de dados (criar um delay de 0.5 ou 1s para sincronização com a nuvem)
    setTimeout(() => {
      // Enviar ao renderizador a mensagem "conectado"
      // db-status (IPC - comunicação entre processos - preload.js)
      event.reply('db-status', "conectado")
    }, 500) // 500 = 0.5s
  })

  // Só ativa a janela principal se nenhuma outra estiver ativa
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Se o sistema MAC não encerrar a aplicação quando a janela for fechada
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IMPORTANTE! Desconectar do banco de dados quando a aplicação for finalizada
app.on('before-quit', async () => {
  await desconectar()
})

// Reduzir a verbozidade de logs não críticos (devtools)
app.commandLine.appendSwitch('log-level', '3')

// Template do menu
const template = [
  {
    label: 'Notas',
    submenu: [
      {
        label: 'Criar nota',
        accelerator: 'Ctrl+N',
      },
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        accelerator: 'Alt+F4',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir zoom',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: "Recarregar",
        role: "reload"
      },
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Repositório',
        click: () => shell.openExternal('https://github.com/clxsilva/stickynotes')
      },
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  }
]