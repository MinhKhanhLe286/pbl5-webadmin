var socket = io();
let manual = {
  openRoof: 0,
  fanSpeed: 0,
  pump: 0
};

socket.on("Server-response-sensor-data", (data) => {
  let light = data.light || 200;
  let humidity = data.humidity || 200;
  let temperature = data.temperature || 200;
  let soil = data.soil || 200;
  $("#light-intensity").text(`${light}`);
  $("#air-humidity").text(`${humidity}`);
  $("#temperature").text(`${temperature}`);
  $("#soil-moisture").text(`${soil}`);
});

$(document).ready(() => {


  $("#light-intensity").text(`Loading...1`);
  $("#air-humidity").text(`Loading...2`);
  $("#temperature").text(`Loading...3`);
  $("#soil-moisture").text(`Loading...4`);

  $("#toggle-mode-btn").click(() => {
    manual.openRoof = 0;
    manual.fanSpeed = 0;
    manual.pump = 0;
    socket.emit("Switch-to-manual", manual);

    $("#fan-control-btn").click(() => {
      manual.fanSpeed = manual.fanSpeed == 0 ? 1 : 0;
      socket.emit("Switch-to-manual", manual);
    });
    $("#pump-control-btn").click(() => {
      manual.pump = manual.pump == 0 ? 1 : 0;
      socket.emit("Switch-to-manual", manual);
    });
    $("#roof-control-btn").click(() => {
      manual.openRoof = manual.openRoof == 0 ? 255 : 0;
      socket.emit("Switch-to-manual", manual);
    });
  });
  $("#toggle-auto-btn").click(() => {
    socket.emit("Switch-to-auto", null);
  });
});
