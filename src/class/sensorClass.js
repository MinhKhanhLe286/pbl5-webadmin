// sensorInfo.js
class SensorClass {
    constructor(temperature, soil, humidity, light) {
        this.temperature = temperature;
        this.soil = soil;
        this.humidity = humidity;
        this.light = light ;
    }

    toString() {
        
        return (`Temperature: ${this.temperature}°C : Soil: ${this.soil}% : Humidity: ${this.humidity}% : Light: ${this.light}% ` ) ;
        
    }
}

module.exports = SensorClass;
