#include "DHT.h"

#define DHTPIN 2 

#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE); 

float umidade;
float temperatura;

void setup() {
  dht.begin();
  delay(2000);
  Serial.begin(9600);
}

void loop() {
  umidade=dht.readHumidity();
  temperatura=dht.readTemperature();

  // Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.print("\n");  
  // Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.print("\n");
  // Serial.print("Numero de dados recebidos: ");
  Serial.println(2);

  delay(2000); // Espera 2 segundos

  // Serial.println("\n \n \n \n \n");
}
