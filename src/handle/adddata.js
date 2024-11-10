const sensorModel = require("../model/sensorModel");
const sensorClass = require("../class/sensorClass")
async function adddata(sersorClass) {
  
  const newSensorData = new sensorModel({
      temperature: sersorClass.temperature,
      soil: sersorClass.soil,
      humidity: sersorClass.humidity,
      light : sensorClass.light
  });

  try {
      const savedData = await newSensorData.save();
      console.log("Data saved successfully:", savedData);
  } catch (error) {
      console.error("Error saving data:", error);
  }
}
function setIntervalSaveData(sensorClass, timeInterval){
    setInterval(() => {
        adddata(sensorClass);  
        sensorClass.displayInfo();
    }, timeInterval * 1000 * 60);
}
module.exports = {
    setIntervalSaveData
};