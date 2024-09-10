int val1 = 0;
int val2 = 0;

void setup() {
  // pinMode(12,OUTPUT);
  Serial.begin(9600);

}

void loop() {
  val1 = analogRead(A0);   // leitura do primeiro sensor no pino A0
  val2 = analogRead(A1);   // leitura do segundo sensor no pino A1
 
  // Enviar os valores dos sensores
  Serial.println(val1);    // enviar valor do primeiro sensor
  Serial.println("------------------------");
  // Serial.println(val2);    // enviar valor do segundo sensor

  // Enviar o comprimento dos dados (número de linhas enviadas)

  // Serial.println(2);       // neste caso, estamos enviando 2 valores

  delay(1000);
}
