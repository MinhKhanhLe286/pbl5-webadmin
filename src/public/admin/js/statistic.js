document.addEventListener("DOMContentLoaded", () => {
  function loadChart(canvasId, label, data, backgroundColor, borderColor) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "12 AM",
          "2 AM",
          "4 AM",
          "6 AM",
          "8 AM",
          "10 AM",
          "12 PM",
          "2 PM",
          "4 PM",
          "6 PM",
          "8 PM",
          "10 PM",
        ],
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

  loadChart(
    "temperature-chart",
    "Temperature (°C)",
    [22, 24, 26, 28, 27, 29, 30, 32, 31, 30, 28, 27],
    "rgba(255, 99, 132, 0.2)",
    "#ff6384"
  );
  loadChart(
    "humidity-chart",
    "Air Humidity (%)",
    [45, 50, 55, 60, 65, 70, 75, 80, 78, 76, 72, 68],
    "rgba(76, 175, 80, 0.2)",
    "#4caf50"
  );
  loadChart(
    "light-chart",
    "Light Intensity (Lux)",
    [200, 250, 300, 350, 400, 380, 360, 340, 320, 310, 290, 270],
    "rgba(255, 179, 71, 0.2)",
    "#ffb347"
  );
  loadChart(
    "moisture-chart",
    "Soil Moisture (%)",
    [40, 42, 45, 50, 55, 60, 62, 65, 68, 70, 72, 75],
    "rgba(52, 152, 219, 0.2)",
    "#3498db"
  );

  document.getElementById("filter-data-btn").addEventListener("click", () => {
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    if (!startTime || !endTime) {
      alert("Please select both start and end times.");
      return;
    }

    console.log(`Filtering data from ${startTime} to ${endTime}`);
  });
});
