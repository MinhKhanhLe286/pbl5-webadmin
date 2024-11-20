#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
const char* ssid = "Nha tro 26DC";
const char* password = "0905070017";
const char* serverUrl = "http://192.168.22.68:3333/esp32/senddata";

int fanSpeed;
int pump;
int brightLight;
int openDoor;

const int servoPin = 27;
Servo myServo;
//
void setup() {
  Serial.begin(115200);
  myServo.attach(servoPin);
  myServo.write(0);
  delay(1000);
  // Kết nối WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected.");
  Serial.println("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  getDataFromNodeJS(fanSpeed, pump, brightLight, openDoor);
  if(openDoor == 1){
    myServo.write(90);
    delay(1000);
    
    myServo.write(0);
    delay(1000);
  }
  delay(1000); // Gửi mỗi 5 giây
}

void getDataFromNodeJS(int& fanSpeed, int& pump, int& brightLight, int& openDoor) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    String jsonData = "{\"request\": \"getData\"}";

    // Gửi request
    int httpResponseCode = http.POST(jsonData);

    // Xử lý phản hồi từ server
    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);

      String response = http.getString();
      Serial.println("Response from server:");
      Serial.println(response);

      // Parse JSON
      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, response);
      if (error) {
        Serial.print("deserializeJson() failed: ");
        Serial.println(error.c_str());
        return;
      }
      fanSpeed = doc["fanSpeed"];
      pump = doc["pump"];
      brightLight = doc["bright_light"];
      openDoor = doc["open_door"];

      Serial.println("Parsed JSON values:");
      Serial.print("Fan Speed: ");
      Serial.println(fanSpeed);
      Serial.print("Pump: ");
      Serial.println(pump);
      Serial.print("Bright Light: ");
      Serial.println(brightLight);
      Serial.print("Open Door: ");
      Serial.println(openDoor);

    } else {
      Serial.print("Error in sending POST: ");
      Serial.println(httpResponseCode);
    }

    // Kết thúc HTTP
    http.end();
  } else {
    Serial.println("WiFi disconnected.");
  }
}
