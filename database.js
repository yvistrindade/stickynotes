const mongoose = require('mongoose')
const url = 'mongodb+srv://admin:123Senac@cluster01.kxl89.mongodb.net/dbnote'

<<<<<<< HEAD
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
=======
let connected = false

const connectDB = async () => {
    if (!connected) {
        try {
            await mongoose.connect(url)
            connected = true 
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

<<<<<<< HEAD
// método para desconectar com o banco de dados
const disconnectDB = async () => {
    // se estiver conectado
    if (connected) {
        // desconectar
        try {
            await mongoose.disconnect(url) // desconectar
            connected = false // setar a variável
            console.log("MongoDB Desconnect")
=======
const disconnectDB = async () => {
    if (connected) {
        try {
            await mongoose.disconnect(url) 
            connected = false 
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

<<<<<<< HEAD
// exportar para o main os métodos conectar e desconectar
=======
>>>>>>> b7d79323e04ad183ca2cde4fb4e0f7b058fab6f3
module.exports = { connectDB, disconnectDB }