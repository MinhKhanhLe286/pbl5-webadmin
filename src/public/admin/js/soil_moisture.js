var socket = io();
socket.on("Server-response-sensor-data", (data) => {
  let soil = data.soil;
  $("#moisture-value").text(`${soil}`);
});

$(document).ready(() => {
  // Đặt giá trị mặc định cho độ ẩm đất
  $("#moisture-value").text(`....`);
  setDefaultDateTime();

  // Gọi API ban đầu
  const data = {
    startTime: $("#start-time-moisture").val(),
    endTime: $("#end-time-moisture").val()
  };
  fetch_Data(data);

  // Handle filter button click
  $("#filter-moisture-data-btn").click(() => {
    const data = {
      startTime: $("#start-time-moisture").val(),
      endTime: $("#end-time-moisture").val()
    };
    fetch_Data(data);
  });
});

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
        const moistureData = data.map((entry) => parseFloat(entry.soil));
        const timeLabels = data.map((entry) => entry.time);
        drawChart(moistureData, timeLabels);
      } else {
        console.error("Dữ liệu trả về không hợp lệ");
      }
    })
    .catch(error => {
      console.error("Lỗi khi gọi API:", error);
    });
}

function drawChart(moistureData, timeLabels) {
  const ctx = document.getElementById("moisture-chart-canvas").getContext("2d");
  if (window.chart) {
    // Cập nhật dữ liệu cho biểu đồ nếu biểu đồ đã tồn tại
    window.chart.data.labels = timeLabels;
    window.chart.data.datasets[0].data = moistureData;
    window.chart.update(); // Cập nhật biểu đồ
  } else {
    // Tạo mới biểu đồ nếu chưa có
    window.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: "Soil Moisture (%)",
            data: moistureData,
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.raw} %`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Soil Moisture (%)" },
          },
        },
      },
    });
  }
}

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
  $("#start-time-moisture").val(formatDateTime(thirtyMinutesAgo));
  $("#end-time-moisture").val(formatDateTime(now));
};
