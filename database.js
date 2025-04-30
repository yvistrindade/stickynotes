/**
 * Módulo de conexão com o banco de dados
 * Uso do framework mongoose
 */

// importação do mongoose
const mongoose = require('mongoose')

// configuração do banco de dados
// ip/link do servidor, autenticação, nome do banco
// ao final da url, definir o nome do banco de dados
const url = 'mongodb+srv://admin:123Senac@cluster01.kxl89.mongodb.net/dbnote'

// validação (evitar a abertura de várias conexões)
let connected = false

// método para conectar com o banco de dados
const connectDB = async () => {
    // se não estiver conectado
    if (!connected) {
        // conectar com o banco de dados
        try {
            await mongoose.connect(url) // conectar
            connected = true // setar a variável
            console.log("MongoDB Connect")
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

// método para desconectar com o banco de dados
const disconnectDB = async () => {
    // se estiver conectado
    if (connected) {
        // desconectar
        try {
            await mongoose.disconnect(url) // desconectar
            connected = false // setar a variável
            console.log("MongoDB Desconnect")
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

// exportar para o main os métodos conectar e desconectar
module.exports = { connectDB, disconnectDB }