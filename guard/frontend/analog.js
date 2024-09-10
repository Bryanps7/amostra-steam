let valores = document.getElementById('valores') 
let listar = document.getElementById('listar')
let vetor = []
let grafic = null
const maxDataPoints = 20

listar.addEventListener('click', ()=>{
       

    setInterval(()=>{
        buscarDados()
        console.log(vetor)
        valores.innerHTML = '[ ' + vetor.join(',') + ' ]'

    },500)

})

function buscarDados(){
    fetch('http://localhost:3000/dados')
    .then(resposta => resposta.json())
    .then(dados =>{
        vetor.push(dados.valor)
        if(vetor.length > 20){
            vetor.shift()
        }
        atualizarGrafico()
    })
    .catch((err)=>{
        console.error("Erro ao receber os dados do servidor!",err)
    })
}

/* -------------------------------------- */
/* --------- Gráfico -------------------- */
/* -------------------------------------- */

function criarGrafico() {
    let ctx = document.getElementById('grafic').getContext('2d');

    // Configuração do gráfico 
    Chart.defaults.backgroundColor = 'green';
    Chart.defaults.borderColor = 'white';
    Chart.defaults.color = '#fff';
    Chart.defaults.font.size = 24;
    Chart.defaults.font.family = 'sans-serif';
    Chart.defaults.font.weight = 'bold';

    // Dados do gráfico
    const data = {
        labels: Array(maxDataPoints).fill(''),  // ajusta aqui: rótulos iniciais
        datasets: [{
            label: 'Valores',
            data: [], // dados iniciais vazios
            borderColor: 'rgb(0, 0, 255)',
            borderWidth: 2,
            fill: false,
        }]
    };

    // Configuração do gráfico
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true // Exibe a legenda
                },
                title: {
                    display: true,
                    text: 'Gráfico de Temperatura' // Título do gráfico
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Índice'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Valores'
                    }
                }
            }
        }
    };

    grafic = new Chart(ctx, config); // ajusta aqui: cria o gráfico e armazena a referência
}

function atualizarGrafico() {
    if (grafic) {
        // Atualiza os dados do gráfico
        grafic.data.labels = vetor.map((_, i) => i + 1); // ajusta aqui: atualização dos rótulos
        grafic.data.datasets[0].data = vetor; // ajusta aqui: atualização dos dados
        grafic.update(); // ajusta aqui: atualiza o gráfico com os novos dados
    }
}

btn_grafic.addEventListener('click', () => {
    criarGrafico(); // ajusta aqui: cria o gráfico quando o botão é clicado
});