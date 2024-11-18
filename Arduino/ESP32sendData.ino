#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
///
const char* ssid = "Nha tro 26DC";
const char* password = "0905070017";
const char* serverUrl = "http://192.168.22.68:3333/esp32/getdata";
//
#define DHTPIN 25
#define SOIL_MOISTURE_PIN 34
#define LIGHT_SENSOR_PIN 32
#define BUTTON_PIN 27
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() {
  Serial.begin(115200);
  dht.begin();
  Wire.begin(21, 22);
  lcd.begin(20, 4);
  lcd.backlight();
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // Kết nối WiFi
  Serial.println("Đang kết nối WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nKết nối thành công!");
  Serial.print("Địa chỉ IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  bool ButtonState = digitalRead(BUTTON_PIN);

  if (ButtonState == LOW) {
    lcd.noBacklight();

    lcd.clear();

    return;
  }

  lcd.backlight();


  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int soilMoistureRaw = analogRead(SOIL_MOISTURE_PIN);
  int soil = map(soilMoistureRaw, 4095, 0, 0, 100);
  int lightSensorRaw = analogRead(LIGHT_SENSOR_PIN);
  int light = map(lightSensorRaw, 4095, 0, 0, 100);



  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temperature: " + String(temperature) + "C");
  lcd.setCursor(0, 1);
  lcd.print("Humidity: " + String(humidity) + "%");
  lcd.setCursor(0, 2);
  lcd.print("Soil Moisture: " + String(soil) + "%");
  lcd.setCursor(0, 3);
  lcd.print("Light: " + String(light) + "%");
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  Serial.print("Soil Moisture: ");
  Serial.print(soil);
  Serial.println(" %");

  Serial.print("Light Level: ");
  Serial.print(light);
  Serial.println(" %");

  

  SendDataToNodeJs(light,temperature,humidity,soil);
  delay(1000);
}

void SendDataToNodeJs(float light, float temperature, float humidity, float soil) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Tạo dữ liệu JSON
    String jsonData = "{\"light\": " + String(light) +
                      ", \"temperature\": " + String(temperature) +
                      ", \"humidity\": " + String(humidity) +
                      ", \"soil\": " + String(soil) + "}";

    // Gửi yêu cầu POST
    int httpResponseCode = http.POST(jsonData);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Server response: " + response);
    } else {
      Serial.println("Error sending POST request");
    }

    http.end();
  }
}