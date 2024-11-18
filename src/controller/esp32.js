// [POST] ESP32/getdata
function getData(req, res) {
  const data = req.body;
  console.log("Received data from ESP32:", data);
  _data = data;
  // Gửi dữ liệu cho tất cả các client WebSocket
  _io.sockets.emit("Server-response-sensor-data", data);
  res.status(200).send("Data received");
}
//
// _data = {light: 93, temperature: 27.6, humidity: 85, soil: 0}
//
// [POST] ESP32/senddata
function sendData(req, res) {
  let fanSpeed = 0;
  if (_data.temperature < 28) {
    fanSpeed = 0;
  } else if (_data.temperature >= 28 && _data.temperature <= 32) {
    fanSpeed = 155;
  } else {
    fanSpeed = 255;
  }

  let pump = _data.soil < 30 ? 1 : 0;
  let bright_light = _data.light < 40 ? 1 : 0;
  let opendoor = 1;
  // Trả về một đối tượng JSON
  res.status(200).json({
    fanSpeed: fanSpeed,
    pump: pump,
    bright_light: bright_light,
    open_door: opendoor,
  });
}
module.exports = {
  getData,
  sendData,
};
