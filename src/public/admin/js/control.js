<script src="/socket.io/socket.io.js"></script>
socket = io();
const manual = null;
socket.on(Server-response-sensor-data,(data)=>{
  $("#light-intensity").val(data.light);
  $("#air-humidity").val(data.humidity);
  $("#temperature").val(data.temperature);
  $("soil-moisture").val(data.soil);

})

$(document).ready(() => {
  $("#toggle-mode-btn").click(()=>{
    manual.openRoof = 0;
    manual.fanSpeed = 0;
    manual.pump = 0;
    socket.emit("Switch-to-manual", manual)

    $('#fan-control-btn').click(()=>{
      manual.fanSpeed = (manual.fanSpeed == 0) ? 1: 0;
      socket.emit("Switch-to-manual", manual)
    });
    $('#pump-control-btn').click(()=>{
      manual.pump = (manual.pump == 0) ? 1: 0;
      socket.emit("Switch-to-manual", manual)
    });
    $('#roof-control-btn"').click(()=>{
      manual.openRoof = (manual.openRoof == 0) ? 255 : 0;
      socket.emit("Switch-to-manual", manual)
    });

  })
  $("#toggle-auto-btn").click(()=>{
    socket.emit("Switch-to-auto", null)
  })
});

