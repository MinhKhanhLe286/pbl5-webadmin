document.addEventListener("DOMContentLoaded", () => {
  const soilMoistureData = [40, 42, 45, 50, 55, 60, 62, 65, 68, 70, 72, 75];
  const timeLabels = [
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
  ];

  const ctx = document.getElementById("moisture-chart-canvas").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Soil Moisture (%)",
          data: soilMoistureData,
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

  document
    .getElementById("filter-moisture-data-btn")
    .addEventListener("click", () => {
      const startTime = document.getElementById("start-time-moisture").value;
      const endTime = document.getElementById("end-time-moisture").value;

      if (!startTime || !endTime) {
        alert("Please select both start and end times.");
        return;
      }

      console.log(`Filtering data from ${startTime} to ${endTime}`);
      chart.update();
    });
});
