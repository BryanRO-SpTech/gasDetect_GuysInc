//Aqui declaramos uma constante (é tipo uma variável, só que você apenas atribui o valor dela uma vez), que está definida para ler a Entrada Analógica A0
const int PINO_SENSOR_MQ2 = A0;
//Aqui declaramos uma constante de valor minimo para ser usado no calculo
const int VALOR_MINIMO = 100;
//Aqui declaramos uma constante de valor máximo para ser usado no calculo
const int VALOR_MAXIMO = 1000;

void setup() {
 Serial.begin(9600);
}

void loop() {
  //Aqui o arduino irá atribuir a uma variável do tipo inteiro, o valor do dado capturado pelo sensor na entrada A0.
  int valorSensor = analogRead(PINO_SENSOR_MQ2);

  //Aqui é o valor do calculo 
  float porcentagem = ((float) (valorSensor - VALOR_MINIMO) / (VALOR_MAXIMO - VALOR_MINIMO)) * 100;

  if (porcentagem < 0) {
    porcentagem = 0;

  } else if (porcentagem > 100) {
    porcentagem = 100;
  }


  Serial.println(porcentagem);


  delay(1000);

}  
