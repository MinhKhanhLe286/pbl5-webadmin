const sensorModel = require("../model/sensorModel");
const sensorClass = require("../class/sensorClass")
async function saveData(sersorClass) {
  
  const newSensorData = new sensorModel({
      temperature: sersorClass.temperature,
      soil: sersorClass.soil,
      humidity: sersorClass.humidity,
      light : sersorClass.light
  });

  try {
      const savedData = await newSensorData.save();
      console.log("Data saved successfully:", savedData);
  } catch (error) {
      console.error("Error saving data:", error);
  }
}

module.exports = {
    saveData
};