// sensorInfo.js
class SensorClass {
    constructor(temperature, soil, humidity, light) {
        this.temperature = temperature;
        this.soil = soil;
        this.humidity = humidity;
        this.light = light ;
    }

    displayInfo() {
        console.log(`Temperature: ${this.temperature}°C`);
        console.log(`Soil: ${this.soil}%`);
        console.log(`Humidity: ${this.humidity}%`);
        console.log(`Light: ${this.light}%`);
    }
}

module.exports = SensorClass;
