document.addEventListener("DOMContentLoaded", () => {
  const lightData = [
    200, 250, 300, 350, 400, 380, 360, 340, 320, 310, 290, 270,
  ];
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
  const ctx = document.getElementById("light-chart-canvas").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Light Intensity (Lux)",
          data: lightData,
          borderColor: "#ffb347",
          backgroundColor: "rgba(255, 179, 71, 0.2)",
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
            label: (tooltipItem) => `${tooltipItem.raw} Lux`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Light Intensity (Lux)" },
        },
      },
    },
  });

  const filterButton = document.getElementById("filter-light-data-btn");
  filterButton.addEventListener("click", () => {
    const startTime = document.getElementById("start-time-light").value;
    const endTime = document.getElementById("end-time-light").value;

    if (!startTime || !endTime) {
      alert("Please select both start and end times.");
      return;
    }

    console.log(`Filtering light data from ${startTime} to ${endTime}`);
    chart.update();
  });
});
