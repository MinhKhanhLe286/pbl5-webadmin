document.addEventListener('DOMContentLoaded', () => {
    const humidityData = [45, 50, 55, 60, 65, 70, 75, 80, 78, 76, 72, 68];
    const timeLabels = ['12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'];
    const ctx = document.getElementById('humidity-chart-canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Humidity (%)',
                data: humidityData,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `${tooltipItem.raw} %`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Humidity (%)' }
                }
            }
        }
    });

    const filterButton = document.getElementById('filter-humidity-data-btn');
    filterButton.addEventListener('click', () => {
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        if (!startTime || !endTime) {
            alert('Please select both start and end times.');
            return;
        }

        console.log(`Filtering humidity data from ${startTime} to ${endTime}`);
        chart.update();
    });
});
