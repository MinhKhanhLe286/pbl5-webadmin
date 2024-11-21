var socket = io();
  socket.on("Server-response-sensor-data", (data) => {
    let air_humidity = data.humidity;
    // document.getElementById("humidity-value").textContent = `${air_humidity}`;
    $("#humidity-value").text(`${air_humidity}`)
  });

document.addEventListener('DOMContentLoaded', () => {

  // Đặt giá trị mặc định cho temperature
  document.getElementById("humidity-value").textContent = '....';
  setDefaultDateTime();

  // Gọi API ban đầu
  const data = {
    startTime: document.getElementById('start-time-humidity').value,
    endTime: document.getElementById('end-time-humidity').value
  };
  fetch_Data(data);

  // Handle filter button click
  document.getElementById('filter-humidity-data-btn').addEventListener('click', () => {
    const data = {
      startTime: document.getElementById('start-time-humidity').value,
      endTime: document.getElementById('end-time-humidity').value
    };
    fetch_Data(data);
  });
});

// Hàm để gọi API và lấy dữ liệu
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
        const humidityData = data.map(entry => parseFloat(entry.humidity));
        const timeLabels = data.map(entry => entry.time);
        drawChart(humidityData, timeLabels);
      } else {
        console.error("Dữ liệu trả về không hợp lệ");
      }
    })
    .catch(error => {
      console.error("Lỗi khi gọi API:", error);
    });
}

// Hàm vẽ biểu đồ
function drawChart(humidityData, timeLabels) {
  const ctx = document.getElementById("humidity-chart-canvas").getContext("2d");
  if (window.chart) {
    // Cập nhật dữ liệu cho biểu đồ nếu biểu đồ đã tồn tại
    window.chart.data.labels = timeLabels;
    window.chart.data.datasets[0].data = humidityData;
    window.chart.update(); // Cập nhật biểu đồ
  } else {
    // Tạo mới biểu đồ nếu chưa có
    window.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: "Humidity (%)",
            data: humidityData,
            borderColor: "#4caf50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
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
            title: { display: true, text: "Humidity (%)" },
          },
        },
      },
    });
  }
}

// Hàm để thiết lập thời gian mặc định
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
  document.getElementById("start-time-humidity").value = formatDateTime(thirtyMinutesAgo);
  document.getElementById("end-time-humidity").value = formatDateTime(now);
};
