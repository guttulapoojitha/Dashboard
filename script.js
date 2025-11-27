async function loadDashboard() {
    try {
        const response = await fetch("api/dashboard.json");
        const data = await response.json();

        document.getElementById("siteName").textContent = data.site_name;
        document.getElementById("date").textContent = new Date().toLocaleString();

        document.getElementById("totalTickets").textContent = data.kpis.total_tickets;
        document.getElementById("openTickets").textContent = data.kpis.open_tickets;
        document.getElementById("avgResolution").textContent = data.kpis.avg_resolution_time_hours;
        document.getElementById("mttr").textContent = data.kpis.mttr_hours;
        document.getElementById("uptime").textContent = data.kpis.uptime_percent;

        const tbody = document.getElementById("deptTable");
        data.open_tickets_by_department.forEach(item => {
            const row = `<tr><td>${item.department}</td><td>${item.count}</td></tr>`;
            tbody.innerHTML += row;
        });

        const percentage = (data.fuel.fuel_consumed_liters / data.fuel.fuel_capacity_liters) * 100;
        document.getElementById("fuelFill").style.width = percentage + "%";

        document.getElementById("fuelUsed").textContent = data.fuel.fuel_consumed_liters;
        document.getElementById("fuelCapacity").textContent = data.fuel.fuel_capacity_liters;


        const chartbar = document.getElementById("mttrChart").getContext("2d");

        const labels = data.mttr_history.map(item => item.date.slice(5));
        const values = data.mttr_history.map(item => item.mttr);

        new Chart(chartbar, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "MTTR (hours)",
                    data: values,
                    backgroundColor: "rgba(31, 95, 244, 0.6)"
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true },
                    x: { ticks: { color: "#000" } }
                }
            }
        });

    } catch (err) {
        console.error("Error loading dashboard:", err);
    }
}

loadDashboard();
