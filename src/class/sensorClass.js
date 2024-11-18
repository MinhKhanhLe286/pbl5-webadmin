// sensorInfo.js
class SensorClass {
    constructor(temperature, soil, humidity, light) {
        this.temperature = temperature;
        this.soil = soil;
        this.humidity = humidity;
        this.light = light ;
    }

    toString() {
        
        return (`{ Temperature: ${this.temperature}°C ; Soil: ${this.soil}% ; Humidity: ${this.humidity}% ; Light: ${this.light}% }` ) ;
        
    }
    reset() {
        this.temperature = 0; // hoặc null
        this.soil = 0;        // hoặc null
        this.humidity = 0;    // hoặc null
        this.light = 0;       // hoặc null
    }
    setData(temperature, soil, humidity, light) {
        this.temperature = temperature;
        this.soil = soil;
        this.humidity = humidity;
        this.light = light;
    }
}

module.exports = SensorClass;
