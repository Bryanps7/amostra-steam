// Arrays para armazenar os dados dos sensores
const sensor1Data = [];
const sensor2Data = [];

// Função para buscar dados da API e atualizar os arrays e a tela
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/dados'); // Substitua pelo endereço correto
        const data = await response.json();

        if (data) {
            // Adiciona os dados recebidos aos arrays correspondentes
            if (sensor1Data.length >= 20) sensor1Data.shift(); // Remove o primeiro valor se o array tiver 20 elementos
            if (sensor2Data.length >= 20) sensor2Data.shift(); // Remove o primeiro valor se o array tiver 20 elementos

            sensor1Data.push(data.sensor1);
            sensor2Data.push(data.sensor2);

            // Atualiza a tela
            updateDisplay();

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
    sensor1Div.innerHTML = 'Sensor 1:<br>' + sensor1Data.join('<br>');
    sensor2Div.innerHTML = 'Sensor 2:<br>' + sensor2Data.join('<br>');
}

// Chama a função imediatamente
fetchData();

// Atualiza os dados periodicamente a cada 1 segundo (1000 milissegundos)
setInterval(fetchData, 1000);
