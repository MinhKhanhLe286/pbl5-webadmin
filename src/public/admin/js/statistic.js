document.addEventListener("DOMContentLoaded", () => {
  setDefaultDateTime();

  const data = {
    startTime: $("#start-time").val(),
    endTime: $("#end-time").val(),
  };
  fetch_Data(data);

  document
    .getElementById("filter-statistic-data-btn")
    .addEventListener("click", () => {
      const startTime = document.getElementById("start-time").value;
      const endTime = document.getElementById("end-time").value;

      if (!startTime || !endTime) {
        alert("Please select both start and end times.");
        return;
      }

      const data = {
        startTime: $("#start-time").val(), // Sửa lại id đúng
        endTime: $("#end-time").val(), // Sửa lại id đúng
      };

      fetch_Data(data);
      console.log(`Filtering data from ${startTime} to ${endTime}`);
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
    .then((response) => response.json())
    .then((data) => {
      // Kiểm tra dữ liệu từ server
      if (data && Array.isArray(data)) {
        const lightData = data.map((entry) => parseFloat(entry.light));
        const soilData = data.map((entry) => parseFloat(entry.soil));
        const temperatureData = data.map((entry) =>
          parseFloat(entry.temperature)
        );
        const humidityData = data.map((entry) => parseFloat(entry.humidity));
        const times = data.map((entry) => entry.time);
        drawChart(times, lightData, temperatureData, soilData, humidityData);
      } else {
        console.error("Dữ liệu trả về không hợp lệ");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
}
function drawChart(times, lightData, temperatureData, soilData, humidityData) {
  loadChart(
    "temperature-chart",
    "Temperature (°C)",
    times,
    temperatureData,
    "rgba(255, 99, 132, 0.2)",
    "#ff6384"
  );
  loadChart(
    "humidity-chart",
    "Air Humidity (%)",
    times,
    humidityData,
    "rgba(76, 175, 80, 0.2)",
    "#4caf50"
  );
  loadChart(
    "light-chart",
    "Light Intensity (Lux)",
    times,
    lightData,
    "rgba(255, 179, 71, 0.2)",
    "#ffb347"
  );
  loadChart(
    "moisture-chart",
    "Soil Moisture (%)",
    times,
    soilData,
    "rgba(52, 152, 219, 0.2)",
    "#3498db"
  );
}
function loadChart(
  canvasId,
  label,
  labels,
  data,
  backgroundColor,
  borderColor
) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels, // Thay vì cố định, nhận từ đầu vào
      datasets: [
        {
          label: label,
          data: data,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: label },
        },
      },
    },
  });
}

const setDefaultDateTime = () => {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

  // Định dạng datetime-local (yyyy-MM-ddTHH:mm)
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Gán giá trị mặc định cho các input
  $("#start-time").val(formatDateTime(thirtyMinutesAgo));
  $("#end-time").val(formatDateTime(now));
};
