const Model = require("../../model/sensorModel");
const convertTime = require("../../helper/convertTime");

// [POST] admin/API
async function apiTemperature(req, res) {
  try {
    console.log("Request Body:", req.body);

    // Chuyển đổi thời gian sang UTC
    const startTime = convertTime.convertToUTC(req.body.startTime);
    const endTime = convertTime.convertToUTC(req.body.endTime);

    console.log("Converted Start Time (UTC):", startTime);
    console.log("Converted End Time (UTC):", endTime);

    const data = await Model.find({
      createdAt: {
        $gte: startTime,
        $lte: endTime,
      },
    });

    // Lọc và chuyển đổi dữ liệu
    const sanitizedData = data.map(({ temperature, soil, humidity, light, createdAt }) => ({
      temperature : temperature,
      humidity,
      soil,
      light,
      time : convertTime.vietnameseTimeConvert(createdAt)
    }));
    console.log(sanitizedData);
    res.status(200).json(sanitizedData);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = apiTemperature;
