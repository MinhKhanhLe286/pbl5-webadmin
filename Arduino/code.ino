#include <WiFi.h>
#include <HTTPClient.h>

const char *ssid = "Nha tro 26DC";
const char *password = "0905070017";

// Địa chỉ server Node.js
const char *serverUrl = "http://<Node-Server-IP>:3333/data"; // Thay <Node-Server-IP> bằng IP của máy chủ Node.js

void setup()
{
    Serial.begin(115200);

    // Kết nối WiFi
    Serial.println("Đang kết nối WiFi...");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nKết nối thành công!");
    Serial.print("Địa chỉ IP: ");
    Serial.println(WiFi.localIP());
}

void loop()
{
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        // Tạo dữ liệu JSON
        String jsonData = "{\"sensor1\": " + String(random(0, 100)) +
                          ", \"sensor2\": " + String(random(0, 100)) +
                          ", \"sensor3\": " + String(random(0, 100)) +
                          ", \"sensor4\": " + String(random(0, 100)) + "}";

        // Gửi yêu cầu POST
        int httpResponseCode = http.POST(jsonData);
        if (httpResponseCode > 0)
        {
            String response = http.getString();
            Serial.println("Server response: " + response);
        }
        else
        {
            Serial.println("Error sending POST request");
        }

        http.end();
    }

    delay(3000); // Gửi dữ liệu mỗi 3 giây
}
