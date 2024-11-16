document.addEventListener("DOMContentLoaded", () => {
  const temperatureData = [22, 24, 26, 28, 27, 29, 30, 32, 31, 30, 28, 27];
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
  const ctx = document
    .getElementById("temperature-chart-canvas")
    .getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatureData,
          borderColor: "#ff6f61",
          backgroundColor: "rgba(255, 111, 97, 0.2)",
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
            label: (tooltipItem) => `${tooltipItem.raw}°C`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: "Temperature (°C)" },
        },
      },
    },
  });

  const filterButton = document.getElementById("filter-temperature-data-btn");
  filterButton.addEventListener("click", () => {
    const startTime = document.getElementById("start-time-temperature").value;
    const endTime = document.getElementById("end-time-temperature").value;

    if (!startTime || !endTime) {
      alert("Please select both start and end times.");
      return;
    }

    console.log(`Filtering temperature data from ${startTime} to ${endTime}`);
    chart.update();
  });
});
