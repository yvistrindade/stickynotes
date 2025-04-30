const mongoose = require('mongoose')
const url = 'mongodb+srv://admin:123Senac@cluster01.kxl89.mongodb.net/dbnote'

let connected = false

const connectDB = async () => {
    if (!connected) {
        try {
            await mongoose.connect(url)
            connected = true 
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

const disconnectDB = async () => {
    if (connected) {
        try {
            await mongoose.disconnect(url) 
            connected = false 
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

module.exports = { connectDB, disconnectDB }