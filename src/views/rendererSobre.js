<<<<<<< HEAD
/**
 * Processo de renderização do documento sobre.html
 */

// enviar uma mensagem para o processo principal fechar a janela sobre
function exit() {
    //executar a função aboutExit() vinculada ao preload.js, através da api do electron (ipcRenderer)
=======
function exit() {
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
    api.aboutExit()
}