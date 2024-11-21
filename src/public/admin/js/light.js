// Kết nối với server qua Socket.IO
var socket = io();

// Nhận dữ liệu ánh sáng từ server
socket.on("Server-response-sensor-data", (data) => {
  let light = data.light;
  $("#light-value").text(`${light}`);
});

// Khi tài liệu sẵn sàng
$(document).ready(() => {
  // Đặt giá trị mặc định khi tải trang
  $("#light-value").text(`Loading...`);
  setDefaultDateTime();

  // Gọi API ban đầu
  const data = {
    startTime: $("#start-time-light").val(),
    endTime: $("#end-time-light").val()
  };
  fetch_Data(data);

  // Handle filter button click for Light
  $("#filter-light-data-btn").click(() => {
    const data = {
      startTime: $("#start-time-light").val(),
      endTime: $("#end-time-light").val()
    };
    fetch_Data(data);
  });
});

// Fetch light data from API
function fetch_Data(data) {
  fetch("/admin/API", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      // Kiểm tra dữ liệu từ server
      if (data && Array.isArray(data)) {
        const lightData = data.map((entry) => parseFloat(entry.light));
        const timeLabels = data.map((entry) => entry.time);
        drawChart(lightData, timeLabels);
      } else {
        console.error("Dữ liệu trả về không hợp lệ");
      }
    })
    .catch(error => {
      console.error("Lỗi khi gọi API:", error);
    });
}

// Vẽ biểu đồ ánh sáng
function drawChart(lightData, timeLabels) {
  const ctx = document.getElementById("light-chart-canvas").getContext("2d");
  if (window.chart) {
    // Cập nhật dữ liệu cho biểu đồ nếu biểu đồ đã tồn tại
    window.chart.data.labels = timeLabels;
    window.chart.data.datasets[0].data = lightData;
    window.chart.update(); // Cập nhật biểu đồ
  } else {
    // Tạo mới biểu đồ nếu chưa có
    window.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: "Light Intensity (Lux)",
            data: lightData,
            borderColor: "#ffcc00", // Màu đường biên
            backgroundColor: "rgba(255, 204, 0, 0.2)", // Màu nền
            fill: true,  // Điền màu nền dưới đường biểu đồ
            tension: 0.4, // Độ cong của đường
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.raw} Lux`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: { display: true, text: "Light Intensity (Lux)" },
          },
        },
      },
    });
  }
}

// Hàm thiết lập thời gian mặc định cho các input
const setDefaultDateTime = () => {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

  // Định dạng datetime-local (yyyy-MM-ddTHH:mm)
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Gán giá trị mặc định cho các input
  $("#start-time-light").val(formatDateTime(thirtyMinutesAgo));
  $("#end-time-light").val(formatDateTime(now));
};
