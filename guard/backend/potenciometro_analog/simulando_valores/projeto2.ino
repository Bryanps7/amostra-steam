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
  Serial.print(umidade);
  Serial.print("\n");
  Serial.print(temperatura);
  Serial.print("\n");
  /* 
  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.print(" Temperatura: ");
  Serial.print(temperatura); 
  Serial.print("\n");
  */
  delay(2000); // Wait for 10 millisecond(s)
}
