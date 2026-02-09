// ============================================================
// LAFA Battery Health Monitor — Heatmap + Degradation Curves
// ============================================================
(function () {
  const L = window.LAFA;

  // ---------- Init ----------
  L.initPage('battery', 'Monitor de Baterías', '');

  // ---------- KPIs ----------
  setTimeout(() => L.animateCounter(document.getElementById('kpi-soh'), L.FLEET_STATS.avgSOH, 800, '', '%'), 100);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-anomalies'), L.FLEET_STATS.anomalies, 600), 200);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-temp'), L.FLEET_STATS.avgTemp, 800, '', '°C'), 300);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-cycles'), L.FLEET_STATS.avgCycles, 800), 400);

  // ---------- Heatmap ----------
  let selectedVehicle = null;
  let degradationChart = null;
  let chargeChart = null;

  function getFilteredDrivers() {
    let drivers = [...L.DRIVERS];
    const oem = document.getElementById('heatmap-oem').value;
    const product = document.getElementById('heatmap-product').value;
    const sort = document.getElementById('heatmap-sort').value;

    if (oem) drivers = drivers.filter(d => d.oem === oem);
    if (product) drivers = drivers.filter(d => d.product === product);

    if (sort === 'soh') drivers.sort((a, b) => a.soh - b.soh);
    else if (sort === 'cycles') drivers.sort((a, b) => b.cycles - a.cycles);

    return drivers;
  }

  function sohCellColor(soh) {
    if (soh >= 96) return L.COLORS.sohExcellent;
    if (soh >= 92) return L.COLORS.sohGood;
    if (soh >= 90) return L.COLORS.sohFair;
    if (soh >= 85) return L.COLORS.sohWatch;
    return L.COLORS.sohCritical;
  }

  function renderHeatmap() {
    const grid = document.getElementById('heatmap-grid');
    const drivers = getFilteredDrivers();
    const cols = Math.min(25, drivers.length);
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    grid.innerHTML = drivers.map(d => `
      <div class="heatmap-cell ${selectedVehicle && selectedVehicle.id === d.id ? 'selected' : ''}"
           data-id="${d.id}"
           style="background: ${sohCellColor(d.soh)}"
           data-vehicle="${d.vehicleId}"
           data-oem="${d.oem}"
           data-soh="${d.soh.toFixed(1)}"
           data-cycles="${d.cycles}">
      </div>
    `).join('');

    // Hover tooltip
    const tooltip = document.getElementById('heatmap-tooltip');
    grid.querySelectorAll('.heatmap-cell').forEach(cell => {
      cell.addEventListener('mouseenter', (e) => {
        tooltip.innerHTML = `
          <div class="font-semibold text-white">${cell.dataset.vehicle}</div>
          <div class="text-gray-400">${cell.dataset.oem} — SOH: <span style="color:${sohCellColor(+cell.dataset.soh)}">${cell.dataset.soh}%</span></div>
          <div class="text-gray-500">${cell.dataset.cycles} ciclos</div>
        `;
        tooltip.style.display = 'block';
      });
      cell.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
      });
      cell.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
      cell.addEventListener('click', () => {
        const driver = L.DRIVERS.find(d => d.id === +cell.dataset.id);
        if (driver) selectVehicle(driver);
      });
    });
  }

  // ---------- Vehicle Detail ----------
  function selectVehicle(driver) {
    selectedVehicle = driver;
    renderHeatmap();

    const detail = document.getElementById('vehicle-detail');
    detail.classList.remove('hidden');
    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });

    document.getElementById('detail-vehicle-id').textContent = driver.vehicleId + ' — ' + driver.oem + ' ' + driver.model;

    // Info
    document.getElementById('detail-info').innerHTML = `
      <div class="flex justify-between text-sm"><span class="text-gray-500">Vehículo</span><span>${driver.vehicleId}</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">OEM / Modelo</span><span>${driver.oem} ${driver.model}</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">Conductor</span><span>${driver.shortName}</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">Producto</span><span>${L.productBadge(driver.product)}</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">Estado</span><span>${L.statusBadge(driver.status)}</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">SOH Actual</span><span style="color:${L.sohColor(driver.soh)}" class="font-semibold">${driver.soh.toFixed(1)}%</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">Ciclos</span><span>${driver.cycles}</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">Temp Promedio</span><span>${driver.avgTemp.toFixed(1)}°C</span></div>
    `;

    // Projections
    const projectedSOH48 = Math.max(driver.soh - (driver.cycles / 1200 * 12), 70).toFixed(1);
    const residualPct = projectedSOH48 > 80 ? 0.45 : (projectedSOH48 > 70 ? 0.30 : 0.15);
    const batteryValue = 120000; // MXN estimated new battery
    const residualValue = Math.round(batteryValue * residualPct);

    document.getElementById('detail-projections').innerHTML = `
      <div class="flex justify-between text-sm"><span class="text-gray-500">SOH proyectado (48 meses)</span><span class="font-semibold" style="color:${L.sohColor(+projectedSOH48)}">${projectedSOH48}%</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">Vida útil estimada</span><span>${projectedSOH48 > 80 ? '6-8 años' : '4-5 años'}</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">Valor residual batería</span><span class="font-semibold">${L.formatMXN(residualValue)}</span></div>
      <div class="flex justify-between text-sm"><span class="text-gray-500">Segunda vida viable</span><span class="${projectedSOH48 > 70 ? 'text-green-400' : 'text-red-400'}">${projectedSOH48 > 70 ? 'Sí' : 'Evaluar'}</span></div>
    `;

    // Recommendations
    const recs = [];
    if (driver.soh < 88) recs.push({ icon: 'alert-triangle', color: 'text-red-400', text: 'Programar diagnóstico completo de batería' });
    if (driver.avgTemp > 26) recs.push({ icon: 'alert-triangle', color: 'text-yellow-400', text: 'Revisar patrón de carga — evitar carga rápida en horas pico' });
    if (driver.cycles > 900) recs.push({ icon: 'clock', color: 'text-blue-400', text: 'Monitorear degradación acelerada por alto ciclaje' });
    if (recs.length === 0) recs.push({ icon: 'check-circle', color: 'text-green-400', text: 'Batería en rango óptimo. Continuar monitoreo estándar.' });

    document.getElementById('detail-recs').innerHTML = recs.map(r => `
      <div class="flex items-start gap-2 text-sm">
        <span class="${r.color} mt-0.5">${L.lucideIcon(r.icon, 'w-4 h-4')}</span>
        <span class="text-gray-300">${r.text}</span>
      </div>
    `).join('');

    // Degradation Chart
    renderDegradationChart(driver);
    renderChargeChart(driver);
  }

  function renderDegradationChart(driver) {
    // Generate curves: this vehicle, fleet avg, expected LFP
    const months = Array.from({ length: 49 }, (_, i) => i);
    const currentMonth = Math.min(Math.round(driver.cycles / 25), 48);

    // This vehicle — extrapolate from current SOH
    const vehicleCurve = months.map(m => {
      if (m <= currentMonth) {
        return +(100 - (100 - driver.soh) * (m / currentMonth)).toFixed(1);
      }
      const rate = (100 - driver.soh) / currentMonth;
      return +(100 - rate * m).toFixed(1);
    });

    // Fleet average
    const fleetCurve = months.map(m => +(100 - m * 0.18).toFixed(1));

    // Expected LFP (CDMX conditions — excellent)
    const lfpCurve = months.map(m => +(100 - m * 0.15).toFixed(1));

    degradationChart = L.createChart('chart-degradation', {
      chart: { type: 'line', height: 256 },
      series: [
        { name: driver.vehicleId, data: vehicleCurve },
        { name: 'Promedio flota', data: fleetCurve },
        { name: 'LFP esperado (CDMX)', data: lfpCurve },
      ],
      xaxis: {
        categories: months,
        title: { text: 'Meses', style: { color: L.COLORS.gray500, fontSize: '11px' } },
        labels: { style: { fontSize: '10px' } },
        tickAmount: 8,
      },
      yaxis: {
        min: 70, max: 101,
        title: { text: 'SOH %', style: { color: L.COLORS.gray500, fontSize: '11px' } },
        labels: { formatter: v => v.toFixed(0) + '%', style: { fontSize: '10px' } },
      },
      colors: [L.COLORS.orange, L.COLORS.teal, L.COLORS.green],
      stroke: { width: [3, 2, 2], dashArray: [0, 4, 6] },
      annotations: {
        yaxis: [{ y: 80, borderColor: L.COLORS.red, strokeDashArray: 3, label: { text: 'EOL 80%', style: { color: L.COLORS.red, background: 'transparent', fontSize: '10px' } } }],
        xaxis: [{ x: currentMonth, borderColor: L.COLORS.gray500, strokeDashArray: 3, label: { text: 'Hoy', style: { color: L.COLORS.gray400, background: 'transparent', fontSize: '10px' } } }],
      },
      legend: { position: 'top', horizontalAlign: 'right', labels: { colors: L.COLORS.gray400 }, fontSize: '11px' },
    }, degradationChart);
  }

  function renderChargeChart(driver) {
    // Generate 30 days of charge data
    const r = L.seededRandom(driver.id * 7);
    const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    const charges = days.map(() => {
      const v = r();
      return +(v * 60 + 20).toFixed(0); // kWh
    });

    chargeChart = L.createChart('chart-charge', {
      chart: { type: 'area', height: 192 },
      series: [{ name: 'Carga (kWh)', data: charges }],
      xaxis: { categories: days, labels: { style: { fontSize: '10px' } }, tickAmount: 10, title: { text: 'Día', style: { color: L.COLORS.gray500, fontSize: '11px' } } },
      yaxis: { labels: { formatter: v => v + ' kWh', style: { fontSize: '10px' } } },
      colors: [L.COLORS.teal],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
      dataLabels: { enabled: false },
    }, chargeChart);
  }

  // ---------- Anomaly Table ----------
  function renderAnomalyTable() {
    const anomalies = L.DRIVERS.filter(d => d.soh < 88).sort((a, b) => a.soh - b.soh);
    const tbody = document.getElementById('anomaly-table');

    tbody.innerHTML = anomalies.map((d, i) => {
      const expected = 93 + L.randFloat(-1, 1);
      const deviation = +(d.soh - expected).toFixed(1);
      const priority = d.soh < 82 ? 'Crítica' : d.soh < 85 ? 'Alta' : 'Media';
      const priorityColor = d.soh < 82 ? 'text-red-400 bg-red-500/10' : d.soh < 85 ? 'text-yellow-400 bg-yellow-500/10' : 'text-blue-400 bg-blue-500/10';

      return `
        <tr class="hover:bg-white/[0.03] cursor-pointer" data-id="${d.id}">
          <td class="px-5 py-3">
            <span class="px-2 py-1 rounded text-xs font-medium ${priorityColor}">${priority}</span>
          </td>
          <td class="px-5 py-3">
            <div class="text-sm font-medium">${d.vehicleId}</div>
            <div class="text-xs text-gray-500">${d.oem} ${d.model}</div>
          </td>
          <td class="px-5 py-3 text-sm text-gray-300">Degradación acelerada detectada</td>
          <td class="px-5 py-3 text-sm text-right font-medium" style="color:${L.sohColor(d.soh)}">${d.soh.toFixed(1)}%</td>
          <td class="px-5 py-3 text-sm text-right text-gray-400">${expected.toFixed(1)}%</td>
          <td class="px-5 py-3 text-sm text-right text-red-400 font-medium">${deviation}%</td>
          <td class="px-5 py-3">
            <button class="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-gray-300 transition-colors btn-diagnose" data-id="${d.id}">Diagnosticar</button>
          </td>
        </tr>
      `;
    }).join('');

    // Click to select vehicle
    tbody.querySelectorAll('tr').forEach(tr => {
      tr.addEventListener('click', () => {
        const driver = L.DRIVERS.find(d => d.id === +tr.dataset.id);
        if (driver) selectVehicle(driver);
      });
    });
  }

  // ---------- Filter Events ----------
  L.bindFilters(['heatmap-oem', 'heatmap-product', 'heatmap-sort'], renderHeatmap);

  // ---------- Init ----------
  renderHeatmap();
  renderAnomalyTable();
})();
