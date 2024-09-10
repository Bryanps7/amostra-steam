// Arrays para armazenar os dados dos sensores
const sensor1Data = [];
const sensor2Data = [];

// Função para buscar dados da API e atualizar os arrays e a tela
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/dados');
        const data = await response.json();

        console.log(data)

        if (data) {
            // Adiciona os dados recebidos aos arrays correspondentes
            if (sensor1Data.length >= 30) sensor1Data.shift();
            if (sensor2Data.length >= 30) sensor2Data.shift();

            sensor1Data.push(data.sensor1);
            sensor2Data.push(data.sensor2);

            // Atualiza a tela e o gráfico
            updateDisplay();
            atualizarGrafico();

            // Exibe os arrays no console
            console.log('Sensor 1:', sensor1Data);
            console.log("-----------------------------");
            console.log('Sensor 2:', sensor2Data);
        }
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

// Função para atualizar a exibição na tela
function updateDisplay() {
    const sensor1Div = document.getElementById('sensor1');
    const sensor2Div = document.getElementById('sensor2');

    // Atualiza o conteúdo dos divs com os valores dos sensores
    sensor1Div.innerHTML = 'Umidade:<br>' + sensor1Data.join('<br>');
    sensor2Div.innerHTML = 'Temperatura:<br>' + sensor2Data.join('<br>');
}

// Função para criar o gráfico
function criarGrafico() {
    const ctx = document.getElementById('grafic').getContext('2d');

    // Configuração global do Chart.js
    Chart.defaults.font.size = 24;
    Chart.defaults.font.family = 'sans-serif';
    Chart.defaults.font.weight = 'bold';
    Chart.defaults.color = '#fff';

    // Criação do gráfico com dois datasets (um para cada sensor)
    grafic = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(30).fill(''), // Rótulos iniciais vazios
            datasets: [
                {
                    label: 'Umidade',
                    data: sensor1Data,
                    borderColor: 'rgb(0, 240, 0)',
                    backgroundColor: 'rgba(0, 240, 0, 0.8)',
                    borderWidth: 3,
                    fill: false
                },
                {
                    label: 'Temperatura',
                    data: sensor2Data,
                    borderColor: 'rgb(0, 0, 240)',
                    backgroundColor: 'rgba(0, 0, 240, 0.8)',
                    borderWidth: 3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true // Exibe a legenda
                },
                title: {
                    display: true,
                    text: 'Gráfico de Sensores'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Tempo'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)' // Cor das linhas de grade no eixo x
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Valores'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)' // Cor das linhas de grade no eixo y
                    }
                }
            }
        }
    });
}

// Função para atualizar o gráfico
function atualizarGrafico() {
    if (grafic) {
        grafic.data.labels = Array(sensor1Data.length).fill(''); // Rótulos para cada ponto de dados
        grafic.data.datasets[0].data = sensor1Data;
        grafic.data.datasets[1].data = sensor2Data;
        grafic.update(); // Atualiza o gráfico com os novos dados
    }
}

// Chama a função imediatamente
fetchData();

// Cria o gráfico na inicialização
criarGrafico();

// Atualiza os dados e o gráfico periodicamente a cada 1 segundo
setInterval(fetchData, 1000);
