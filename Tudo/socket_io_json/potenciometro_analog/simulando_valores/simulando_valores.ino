int sensor1Valor = 90; // Valor inicial do "sensor 1"
int sensor2Valor = 40; // Valor inicial do "sensor 2"
int sensor1Incremento = 5; // Incremento para o "sensor 1"
int sensor2Incremento = -3; // Incremento para o "sensor 2" (começando a diminuir)

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Simular os valores dos sensores
  Serial.println(sensor1Valor); // Enviar valor simulado do "sensor 1"
  Serial.println(sensor2Valor); // Enviar valor simulado do "sensor 2"

  // Atualizar os valores para a próxima iteração
  sensor1Valor += sensor1Incremento;
  sensor2Valor += sensor2Incremento;

  // Verificar se os valores atingiram os limites da sequência e inverter a direção
  if (sensor1Valor >= 100 || sensor1Valor <= 10) {
    sensor1Incremento = -sensor1Incremento; // Inverter a direção da sequência do "sensor 1"
  }
  if (sensor2Valor >= 70 || sensor2Valor <= 10) {
    sensor2Incremento = -sensor2Incremento; // Inverter a direção da sequência do "sensor 2"
  }

  // Enviar o comprimento dos dados (número de linhas enviadas)
  Serial.println(2);

  // Enviar a linha de separação
  // Serial.println("------------------------");

  delay(500); // Aguardar 1 segundo antes de enviar o próximo valor
}
