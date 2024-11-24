const sendMail = require("./../services/mailer.service");
const Modeluser = require("../model/userModel");

let lastEmailSentTime = null;

// [POST] ESP32/getdata
async function getData(req, res) {
  const data = req.body;

  if (
    !data ||
    typeof data.soil === "undefined" ||
    typeof data.light === "undefined" ||
    typeof data.temperature === "undefined"
  ) {
    return res.status(400).send("Invalid data");
  }
  if (data.soil >= 90 || data.light >= 90 || data.temperature >= 35) {
    const now = new Date();
    if (!lastEmailSentTime || now - lastEmailSentTime >= 5 * 60 * 1000) {
      const emails = await Modeluser.find({}, { email: 1, _id: 0 });
      const emailList = emails.map((user) => user.email).join(", ");
      if (emailList) {
        await sendMail(
          emailList,
          "Cảnh báo quan trong",
          "<h2>Hệ thống quá ngưỡng cho phép</h2>"
        );
        lastEmailSentTime = now;
      }
    }
  }
  console.log("Received data from ESP32:", data);
  _data = data;
  _io.sockets.emit("Server-response-sensor-data", data);
  res.status(200).send("Data received");
}

//
// _data = {light: 93, temperature: 27.6, humidity: 85, soil: 0, openDoor: 0}
// 
const fan = (data)=>{
  if (data < 28) return 0;
  if (data >= 28 && data < 30) return 155;
  return 255;
}


// [POST] ESP32/senddata
function sendData(req, res) {
  console.log("esp32 want to get data");
  if (!_data) {
    return res.status(500).json({ message: "No data available" });
  }

  const response = {
    openRoof: _data.light > 85 ? 1 : 0,
    fanSpeed: fan(_data.temperature),
    pump: _data.soil < 30 ? 1 : 0,
  };
  if(! _manual){
    response.openRoof = _manual.openRoof,
    response.fanSpeed = _manual.fanSpeed,
    response.pump = _manual.pump
  }
  res.status(200).json(response);
}

module.exports = {
  getData,
  sendData,
};
