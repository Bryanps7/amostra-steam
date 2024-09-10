// ---------- Importando bibliotecas necessárias -------------------
const express = require('express')
const app = express()
const cors = require('cors')
const { createServer } = require('http') // Importar createServer do módulo http
const { Server } = require('socket.io') 
const { SerialPort } = require('serialport') 
const { ReadlineParser } = require('@serialport/parser-readline')


const PORT = 3000;
const hostname = 'localhost'

app.use(cors())

// Criar servidor HTTP usando o Express
const server = createServer(app)
const io = new Server(server)

// Iniciar o servidor
server.listen(PORT, hostname, () => {
    console.log(`Servidor rodando em ${hostname}:${PORT}`)
})

// Configuração da comunicação serial
const port = new SerialPort({ path: 'COM5', baudRate: 9600 })
const dadosLer = port.pipe(new ReadlineParser({ delimiter: '\n' }))

port.on('open', () => {
    console.log('Conexão com porta serial com sucesso!')
})

port.on('error', (err) => {
    console.error('Erro na porta Serial', err)
})

let dadosMaisRecentes = null

dadosLer.on('data', (dados) => {
  const sensor1 = Number(dados)
  console.log(sensor1)
  dadosMaisRecentes = { sensor1 }
  io.emit('dadosArduino', sensor1)
})

app.get('/dados', (req, res) => {
    res.status(200).json(dadosMaisRecentes)
})