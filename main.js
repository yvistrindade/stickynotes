<<<<<<< HEAD
console.log("Electron - Processo principal")

// importação dos recursos do framework
// app (aplicação)
// BrowserWindow (criação da janela)
// nativeTheme (definir tema claro ou escuro)
// Menu (definir um menu personalizado)
// shell (acessar links externos no navegador padrão)
// ipcMain (permite estabelecer uma comunicação entre processos (IPC) main.js <=> renderer.js)
// dialog (caixas de mensagem)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog } = require('electron/main')

// Ativação do preload.js (importação do path)
const path = require('node:path')

// Importação dos métodos conectar e desconectar (módulo de conexão)
const { connectDB, disconnectDB } = require('./database.js')

// Importação do modelo de dados (Notes.js)
const noteModel = require('./src/models/Notes.js')

// Janela principal
=======
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog } = require('electron/main')

const path = require('node:path')
const { connectDB, disconnectDB } = require('./database.js')
const noteModel = require('./src/models/Notes.js')
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
let win

const createWindow = () => {
  nativeTheme.themeSource = 'light'
  win = new BrowserWindow({
    width: 1010,
    height: 720,
<<<<<<< HEAD
    //frame: false,
    //resizable: false,
    //minimizable: false,
    //closable: false,
    //autoHideMenuBar: true,
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

<<<<<<< HEAD
  // Carregar o menu personalizado
  // Atenção! Antes importar o recurso Menu
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
=======
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')
}
let about
function aboutWindow() {
  nativeTheme.themeSource = 'light'

  const mainWindow = BrowserWindow.getFocusedWindow()
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
  if (mainWindow) {
    about = new BrowserWindow({
      width: 300,
      height: 200,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
<<<<<<< HEAD
      // estabelecer uma relação hierárquica entre janelas
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
      parent: mainWindow,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }

  about.loadFile('./src/views/sobre.html')
<<<<<<< HEAD

  //recebimento da mensagem do renderizador da tela sobre para fechar a janela usando o botão OK
  ipcMain.on('about-exit', () => {
    //validação (se existir a janela e ela não estiver sido destruída, fechar)
=======
  ipcMain.on('about-exit', () => {
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
    if (about && !about.isDestroyed()) {
      about.close()
    }
  })
}

<<<<<<< HEAD
// janela nota
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
let note
function noteWindow() {
  nativeTheme.themeSource = 'light'
  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    note = new BrowserWindow({
      width: 400,
      height: 270,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
<<<<<<< HEAD
      // estabelecer uma relação hierárquica entre janelas
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
      parent: mainWindow,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }

  note.loadFile('./src/views/nota.html')
}

<<<<<<< HEAD
// inicialização da aplicação (assíncronismo)
app.whenReady().then(() => {
  createWindow()

  // Melhor local para estabelecer a conexão com o banco de dados
  // No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida do aplicativo e encerrar a conexão quando o aplicativo for finalizado
  // ipcMain.on (receber mensagem)
  // db-connect (rótulo da mensagem)
  ipcMain.on('db-connect', async (event) => {
    //a linha abaixo estabelece a conexão com o banco de dados e verifica se foi conectado com sucesso (return true)
    const connected = await connectDB()
    if (connected) {
      // enviar ao renderizador uma mensagem para trocar a imagem do ícone do status do banco de dados (criar um delay de 0.2 ou 0.5s para sincronização com a nuvem)
      setTimeout(() => {
        // enviar ao renderizador a mensagem "conectado"
        // db-status (IPC - comunicação entre processos - preload.js)
        event.reply('db-status', "conectado")
      }, 200) //200ms = 0.2s
    }
  })

  // só ativar a janela principal se nenhuma outra estiver ativa
=======
app.whenReady().then(() => {
  createWindow()

  ipcMain.on('db-connect', async (event) => {
   
    const connected = await connectDB()
    if (connected) {
      setTimeout(() => {
        event.reply('db-status', "conectado")
      }, 200) 
    }
  })

>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

<<<<<<< HEAD
// se o sistem não for MAC encerrar a aplicação quando a janela for fechada
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

<<<<<<< HEAD
// IMPORTANTE! Desconectar do banco de dados quando a aplicação for finalizada
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
app.on('before-quit', async () => {
  await disconnectDB()
})

<<<<<<< HEAD
// Reduzir a verbosidade de logs não críticos (devtools)
app.commandLine.appendSwitch('log-level', '3')

// template do menu
=======
app.commandLine.appendSwitch('log-level', '3')

>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
const template = [
  {
    label: 'Notas',
    submenu: [
      {
        label: 'Criar nota',
        accelerator: 'Ctrl+N',
        click: () => noteWindow()
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
        label: 'Reduzir',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar o zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Recarregar',
        click: () => updateList()
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
        click: () => shell.openExternal('https://github.com/professorjosedeassis/stickynotes')
      },
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  }
]

<<<<<<< HEAD
// =================================================
// == CRUD Create ==================================

// Recebimento do objeto que contem os dados da nota
ipcMain.on('create-note', async (event, stickyNote) => {
  //IMPORTANTE! Teste de recebimento do objeto - Passo 2
  console.log(stickyNote)
  //uso do try-catch para tratamento de excessões
  try {
    //Criar uma nova estrutura de dados para salvar no banco
    //Atenção! Os atributos da estrutura precisam ser idênticos ao modelo e os valores são obtidos através do objeto stickNote
=======
ipcMain.on('create-note', async (event, stickyNote) => {
  try {
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
    const newNote = noteModel({
      texto: stickyNote.textNote,
      cor: stickyNote.colorNote
    })
    newNote.save()
<<<<<<< HEAD
    // Enviar ao renderizador um pedido para limpar os campos e setar o formulário com os padrões originais (foco no texto), usando o preload.js
    event.reply('reset-form')
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
  } catch (error) {
    console.log(error)
  }
})

<<<<<<< HEAD
// == Fim - CRUD Create ============================
// =================================================


// =================================================
// == CRUD Read ====================================

// Passo 2: Receber do renderer o pedido para listar as notas e fazer a busca no banco de dados
ipcMain.on('list-notes', async (event) => {
  //console.log("teste IPC [list-notes]")
  try {
    // Passo 3: obter do banco a listagem de notas cadastradas
    const notes = await noteModel.find()
    console.log(notes) // teste do passo 3
    // Passo 4: enviar ao renderer a listagem das notas
    // obs: IPC (string) | banco (JSON) (é necessário uma conversão usando JSON.stringify())
    // event.reply() resposta a solicitação (específica do solicitante)
=======
ipcMain.on('list-notes', async (event) => {
  try {
    const notes = await noteModel.find()
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
    event.reply('render-notes', JSON.stringify(notes))
  } catch (error) {
    console.log(error)
  }
})

<<<<<<< HEAD
// == Fim - CRUD Read ==============================
// =================================================


// =================================================
// == Atualização da lista de notas ================

// atualização das notas na janela principal
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
ipcMain.on('update-list', () => {
  updateList()
})

function updateList() {
<<<<<<< HEAD
  // validação (se a janela principal existir e não tiver sido encerrada)
  if (win && !win.isDestroyed()) {
    // enviar ao renderer.js um pedido para recarregar a página
    win.webContents.send('main-reload')
    // enviar novamente um pedido para troca do ícone de status do banco
    setTimeout(() => {
      win.webContents.send('db-status', "conectado")
    }, 200) // tempo para garantir que o renderer esteja pronto
  }
}

// == Fim - Atualização da lista de notas ==========
// =================================================


// =================================================
// == CRUD Delete ==================================

ipcMain.on('delete-note', async (event, id) => {
  console.log(id) //teste do Passo 2 (importante!)
  // excluir o registro do banco (passo 3) IMPORTANTE! (confirmar antes da exclusão)
  // win (janela principal)
=======
  if (win && !win.isDestroyed()) {
    win.webContents.send('main-reload')
    setTimeout(() => {
      win.webContents.send('db-status', "conectado")
    }, 200) 
  }
}

ipcMain.on('delete-note', async (event, id) => {
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
  const result = await dialog.showMessageBox(win, {
    type: 'warning',
    title: "Atenção!",
    message: "Tem certeza que deseja excluir esta nota?\nEsta ação não poderá ser desfeita.",
<<<<<<< HEAD
    buttons: ['Cancelar', 'Excluir'] // [0, 1]
=======
    buttons: ['Cancelar', 'Excluir'] 
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
  })
  if (result.response === 1) {
    try {
      const deleteNote = await noteModel.findByIdAndDelete(id)
      updateList()
    } catch (error) {
      console.log(error)
    }
  }
})
<<<<<<< HEAD

// == Fim - CRUD Delete ============================
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
// =================================================