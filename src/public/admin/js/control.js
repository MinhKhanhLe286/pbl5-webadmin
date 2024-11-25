var socket = io();
let manual = {
  openRoof: 0,
  fanSpeed: 0,
  pump: 0
};

socket.on("Server-response-sensor-data", (data) => {
  // Gán giá trị mặc định nếu thiếu dữ liệu từ server
  let light = data.light ?? 200;
  let humidity = data.humidity ?? 200;
  let temperature = data.temperature ?? 200;
  let soil = data.soil ?? 200;

  // Cập nhật giao diện với dữ liệu nhận được
  $("#light-intensity").text(light);
  $("#air-humidity").text(humidity);
  $("#temperature").text(temperature);
  $("#soil-moisture").text(soil);
});

$(document).ready(() => {
  // Hiển thị thông báo đang tải dữ liệu khi trang mới load
  $("#light-intensity").text("Loading...");
  $("#air-humidity").text("Loading...");
  $("#temperature").text("Loading...");
  $("#soil-moisture").text("Loading...");

  // Xử lý khi chuyển sang chế độ thủ công
  $("#toggle-mode-btn").click(() => {
    manual = { openRoof: 0, fanSpeed: 0, pump: 0 }; // Reset trạng thái
    socket.emit("Switch-to-manual", manual);

    // Điều khiển quạt
    $("#fan-control-btn").off("click").on("click", () => {
      manual.fanSpeed = manual.fanSpeed === 0 ? 255 : 0;
      socket.emit("Switch-to-manual", manual);
    });

    // Điều khiển bơm
    $("#pump-control-btn").off("click").on("click", () => {
      manual.pump = manual.pump === 0 ? 1 : 0;
      socket.emit("Switch-to-manual", manual);
    });

    // Điều khiển mở mái che
    $("#roof-control-btn").off("click").on("click", () => {
      manual.openRoof = manual.openRoof === 0 ? 1 : 0;
      socket.emit("Switch-to-manual", manual);
    });
  });

  // Xử lý khi chuyển sang chế độ tự động
  $("#toggle-auto-btn").click(() => {
    socket.emit("Switch-to-auto", null);
  });
});
