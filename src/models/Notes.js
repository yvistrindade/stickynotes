/**
 * Modelo de dados das notas
 * Criação da coleção
 */

const { version } = require('mongoose')

// Importação dos recursos do mongoose
const { model, Schema } = require('mongoose')

// Criação da estrutura da correção
const noteSchema = new Schema({
    texto: {
        type: String
    },
    cor: {
        type: String
    }
}, {versionKey: false})

// Exportar o modelo de dados para o main
module.exports = model('Notas', noteSchema)
