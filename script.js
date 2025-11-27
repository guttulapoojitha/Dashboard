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

        const svg = document.getElementById("mttrSvg");
        const maxValue = Math.max(...data.mttr_history.map(i => i.mttr));
        const barWidth = 35;
        const gap = 10;

        data.mttr_history.forEach((item, index) => {
            const height = (item.mttr / maxValue) * 150;
            const x = index * (barWidth + gap) + 10;

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", 160 - height);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("height", height);
            rect.setAttribute("fill", "#4a90e2");
            svg.appendChild(rect);

            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", x + 5);
            label.setAttribute("y", 175);
            label.setAttribute("font-size", "10");
            label.textContent = item.date.slice(5);
            svg.appendChild(label);
        });

    } catch (err) {
        console.error("Error loading dashboard:", err);
    }
}

loadDashboard();
