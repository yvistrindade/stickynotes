/**
 * Processo de renderização do documento index.html
    */
console.log("Processo de renderização")

// estratégia para renderizar (desenhar) as notas adesivas
// usar uma lista para preencher de forma dinâmica os itens (notas)

// vetor global para manipular os dados do banco
let arrayNotes = []

// captura o id da list <ul> do documento index.html
const list = document.getElementById('listNotes')

// Inserção da data no rodapé
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

document.getElementById('dataAtual').innerHTML = obterData()

// Trocar do icone do banco de dados (status de conexão)
// Uso da api do preload.js
api.dbStatus((event, message) => {
    // Teste de recebimento da mensagem
    console.log(message)
    if (message === "conectado") {
        document.getElementById('iconeDB').src = "../public/img/dbon.png"
    } else {
        document.getElementById('iconeDB').src = "../public/img/dboff.png"
    }
})

// ======================================================
// == CRUD Read =========================================

// Passo 1: Enviar ao main um pedido para listar as notas

api.listNotes()

// Passo 5: Recebimento da notas via IPC e renderização(desenho) das notas no documento index.html
api.renderNotes((event, notes) => {
    const renderNotes = JSON.parse(notes) // JSON.parse converte de string paa JSON
    console.log(renderNotes) // teste de recebimento do passo 5
    // renderizar no index.html o conteúdo do array
    arrayNotes = renderNotes // atribuir ao vetor o JSON recebido
    // uso do laço forEach para percorrer o vetor e extrair os dados
    arrayNotes.forEach((n) => {
        // adição de tag <li> no documento index.html
        list.innerHTML += `
            <br>
            <li>
                <p>${n._id}</p>
                <p>${n.texto}</p>
                <p>${n.cor}</p>
            </li>
        `
    })
})

// == Fim CRUD Read =====================================
// ======================================================