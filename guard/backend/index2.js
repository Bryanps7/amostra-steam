// ---------- Importando bibliotecas necessárias -------------------
const express = require('express')
const app = express()
const cors = require('cors')
const { createServer } = require('http')
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
const port = new SerialPort({ path: 'COM9', baudRate: 9600 })
const dadosLer = port.pipe(new ReadlineParser({ delimiter: '\n' }))

port.on('open', () => {
    console.log('Conexão com porta serial com sucesso!')
})

port.on('error', (err) => {
    console.error('Erro na porta Serial', err)
})

let dadosRecebidos = []
let dadosMaisRecentes = null

dadosLer.on('data', (linha) => {
    const dados = linha.trim()
    // console.log(dados)
    
    if (!isNaN(dados)) {
        const numero = Number(dados)

        // Exibir o valor recebido no console para depuração
        console.log(`Valor recebido: ${numero}`);

        // console.log("================================\n")
        
        if (dadosRecebidos.length === 0) {
            // Se é o primeiro número, adiciona na lista
            dadosRecebidos.push(numero)
            // console.log(`S1: ${numero}`) // Identifica como valor do Sensor 1
            // console.log('-----------------------')
        } else {
            const esperado = dadosRecebidos.length

            if (esperado === 1) {
                // Adiciona o valor do segundo sensor
                dadosRecebidos.push(numero)
                // console.log(`S2: ${numero}`) // Identifica como valor do Sensor 2
                // console.log('-----------------------')
            } else if (esperado === numero) {
                // Quando receber o comprimento, assume que todos os dados foram recebidos
                console.log(`Recebido ${esperado} valores: ${dadosRecebidos.join(', ')}`)
                dadosMaisRecentes = { sensor1: dadosRecebidos[0], sensor2: dadosRecebidos[1] }
                io.emit('dadosArduino', dadosMaisRecentes)
                dadosRecebidos = [] // Limpar os dados para a próxima leitura
            }
        }
    }
})

app.get('/dados', (req, res) => {
    res.status(200).json(dadosMaisRecentes)
})
