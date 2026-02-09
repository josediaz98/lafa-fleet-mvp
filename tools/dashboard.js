// ============================================================
// LAFA Dashboard — Charts, Table, Interactivity
// ============================================================
(function () {
  const L = window.LAFA;

  // ---------- Init ----------
  L.initPage('dashboard', 'Dashboard de Operaciones', '',
    { 'search-icon': 'search', 'download-icon': 'download' });

  // ---------- Animate KPIs ----------
  setTimeout(() => L.animateCounter(document.getElementById('kpi-vehicles'), L.FLEET_STATS.activeVehicles, 800), 100);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-revenue'), L.FLEET_STATS.weeklyRevenue, 800, '$', ''), 200);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-utilization'), L.FLEET_STATS.fleetUtilization, 800, '', ''), 300);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-payments'), L.FLEET_STATS.paymentsOnTime, 800, '', ''), 400);

  // ---------- Revenue Area Chart ----------
  const revenueChart = L.createChart('chart-revenue', {
    chart: { type: 'area', height: 256 },
    series: [
      { name: 'DaE', data: L.WEEKLY_REVENUE.map(w => w.dae) },
      { name: 'LTO', data: L.WEEKLY_REVENUE.map(w => w.lto) },
    ],
    xaxis: { categories: L.WEEKLY_REVENUE.map(w => w.week), labels: { style: { fontSize: '11px' } } },
    yaxis: { labels: { formatter: v => L.formatMXN(v), style: { fontSize: '11px' } } },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: v => L.formatMXN(v) } },
    colors: [L.COLORS.orange, L.COLORS.amber],
    legend: { position: 'top', horizontalAlign: 'right', labels: { colors: L.COLORS.gray400 }, fontSize: '12px' },
  });

  // ---------- Fleet Status Donut ----------
  const fleetDonut = L.createChart('chart-fleet-status', {
    chart: { type: 'donut', height: 256 },
    series: [L.FLEET_STATS.activeVehicles, L.FLEET_STATS.maintenanceVehicles, L.FLEET_STATS.chargingVehicles, L.FLEET_STATS.idleVehicles],
    labels: ['Activo', 'Mantenimiento', 'Cargando', 'Inactivo'],
    colors: [L.COLORS.green, L.COLORS.yellow, L.COLORS.blue, L.COLORS.gray500],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true, fontSize: '13px', color: L.COLORS.gray400 },
            value: { show: true, fontSize: '22px', fontWeight: 700, color: '#fff' },
            total: { show: true, label: 'Total', fontSize: '13px', color: L.COLORS.gray400,
              formatter: () => L.FLEET_STATS.totalVehicles }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: { position: 'bottom', labels: { colors: L.COLORS.gray400 }, fontSize: '12px' },
    stroke: { show: false },
  });

  // Click donut segment to filter table
  fleetDonut.addEventListener('dataPointSelection', (e, ctx, config) => {
    const statusMap = ['active', 'maintenance', 'charging', 'idle'];
    document.getElementById('filter-status').value = statusMap[config.dataPointIndex] || '';
    filterAndRender();
  });

  // ---------- OEM Distribution Bar ----------
  const oemData = ['Geely', 'JAC', 'GAC'].map(oem => ({
    oem,
    dae: L.DRIVERS.filter(d => d.oem === oem && d.product === 'DaE').length,
    lto: L.DRIVERS.filter(d => d.oem === oem && d.product === 'LTO').length,
  }));

  L.createChart('chart-oem', {
    chart: { type: 'bar', height: 224, stacked: true },
    series: [
      { name: 'DaE', data: oemData.map(o => o.dae) },
      { name: 'LTO', data: oemData.map(o => o.lto) },
    ],
    xaxis: { categories: oemData.map(o => o.oem) },
    plotOptions: { bar: { horizontal: true, barHeight: '50%', borderRadius: 4 } },
    colors: [L.COLORS.teal, L.COLORS.amber],
    dataLabels: { enabled: false },
    legend: { position: 'top', horizontalAlign: 'right', labels: { colors: L.COLORS.gray400 }, fontSize: '12px' },
  });

  // ---------- Payment Status Grouped Bar ----------
  L.createChart('chart-payments', {
    chart: { type: 'bar', height: 224 },
    series: [
      { name: 'A tiempo', data: L.PAYMENT_STATUS_WEEKS.map(w => w.onTime) },
      { name: 'Tarde', data: L.PAYMENT_STATUS_WEEKS.map(w => w.late) },
      { name: 'Impago', data: L.PAYMENT_STATUS_WEEKS.map(w => w.default) },
    ],
    xaxis: { categories: L.PAYMENT_STATUS_WEEKS.map(w => w.week) },
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 3 } },
    colors: [L.COLORS.green, L.COLORS.yellow, L.COLORS.red],
    dataLabels: { enabled: false },
    legend: { position: 'top', horizontalAlign: 'right', labels: { colors: L.COLORS.gray400 }, fontSize: '12px' },
  });

  // ---------- Table ----------
  const ROWS_PER_PAGE = 15;
  let currentPage = 1;
  let sortCol = 'vehicleId';
  let sortAsc = true;
  let filteredDrivers = [...L.DRIVERS];

  function filterAndRender() {
    const search = L.normalize(document.getElementById('table-search').value);
    const oem = document.getElementById('filter-oem').value;
    const product = document.getElementById('filter-product').value;
    const status = document.getElementById('filter-status').value;

    filteredDrivers = L.DRIVERS.filter(d => {
      if (search && !L.normalize(d.fullName).includes(search) && !L.normalize(d.vehicleId).includes(search)) return false;
      if (oem && d.oem !== oem) return false;
      if (product && d.product !== product) return false;
      if (status && d.status !== status) return false;
      return true;
    });

    // Sort
    filteredDrivers.sort((a, b) => {
      let va = a[sortCol], vb = b[sortCol];
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

    currentPage = 1;
    renderTable();
  }

  function renderTable() {
    const tbody = document.getElementById('table-body');
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    const pageData = filteredDrivers.slice(start, start + ROWS_PER_PAGE);

    tbody.innerHTML = pageData.map(d => `
      <tr class="hover:bg-white/[0.03] cursor-pointer transition-colors" data-id="${d.id}">
        <td class="px-5 py-3 text-sm font-mono text-gray-300">${d.vehicleId}</td>
        <td class="px-5 py-3">
          <div class="text-sm font-medium text-white">${d.shortName}</div>
          <div class="text-xs text-gray-500">${d.model}</div>
        </td>
        <td class="px-5 py-3">${L.oemBadge(d.oem)}</td>
        <td class="px-5 py-3">${L.productBadge(d.product)}</td>
        <td class="px-5 py-3">${L.statusBadge(d.status)}</td>
        <td class="px-5 py-3 text-sm text-gray-400">${d.platform}</td>
        <td class="px-5 py-3 text-sm text-right font-medium text-white">${L.formatMXN(d.weeklyRevenue)}</td>
        <td class="px-5 py-3 text-right">
          <span class="text-sm font-medium" style="color:${L.sohColor(d.soh)}">${d.soh.toFixed(1)}%</span>
        </td>
      </tr>
    `).join('');

    // Count
    document.getElementById('table-count').textContent =
      `Mostrando ${start + 1}–${Math.min(start + ROWS_PER_PAGE, filteredDrivers.length)} de ${filteredDrivers.length}`;

    // Pagination
    const totalPages = Math.ceil(filteredDrivers.length / ROWS_PER_PAGE);
    const pag = document.getElementById('table-pagination');
    pag.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = `px-3 py-1 rounded text-xs transition-colors ${i === currentPage ? 'bg-[#FF5A00] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`;
      btn.addEventListener('click', () => { currentPage = i; renderTable(); });
      pag.appendChild(btn);
    }

    // Row click
    tbody.querySelectorAll('tr').forEach(tr => {
      tr.addEventListener('click', () => {
        const driver = L.DRIVERS.find(d => d.id === +tr.dataset.id);
        if (driver) showDetailPanel(driver);
      });
    });
  }

  // Sort headers
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (sortCol === col) sortAsc = !sortAsc;
      else { sortCol = col; sortAsc = true; }
      filterAndRender();
    });
  });

  // Filters
  L.bindFilters(['table-search', 'filter-oem', 'filter-product', 'filter-status'], filterAndRender);

  // Export CSV
  document.getElementById('btn-export').addEventListener('click', () => {
    const headers = ['ID', 'Conductor', 'OEM', 'Modelo', 'Producto', 'Estado', 'Plataforma', 'Ingreso/Sem', 'SOH'];
    const rows = filteredDrivers.map(d => [d.vehicleId, d.shortName, d.oem, d.model, d.product, d.status, d.platform, d.weeklyRevenue, d.soh]);
    L.exportCSV(headers, rows, 'lafa-fleet-export.csv');
  });

  // ---------- Detail Modal ----------
  const modal = L.createModal('detail-modal', { overlay: 'detail-overlay' });

  function showDetailPanel(d) {
    const lastPayment = d.payments[d.payments.length - 1];
    document.getElementById('detail-content').innerHTML = `
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-full bg-[#FF5A00]/20 flex items-center justify-center text-sm font-bold text-[#FF5A00]">
              ${d.firstName[0]}${d.lastName[0]}
            </div>
            <div>
              <h2 class="text-lg font-bold">${d.fullName}</h2>
              <p class="text-sm text-gray-400">${d.vehicleId} — ${d.platform} — ${d.colonia}</p>
            </div>
          </div>
          <button id="close-panel" class="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            ${L.lucideIcon('x', 'w-5 h-5')}
          </button>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <!-- Row 1: Conductor | Ingreso Semanal -->
          <div class="bg-white/5 rounded-xl p-4">
            <h4 class="text-sm font-semibold text-gray-300 mb-3">Conductor</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div><span class="text-gray-500">Producto</span><br>${d.product === 'DaE' ? 'Driver-as-Employee' : 'Lease-to-Own'}</div>
              <div><span class="text-gray-500">Desde</span><br>${d.joinDate}</div>
              <div><span class="text-gray-500">Rating</span><br>${d.rating} / 5.0</div>
              <div><span class="text-gray-500">Viajes</span><br>${L.formatNumber(d.totalTrips)}</div>
            </div>
          </div>

          <div class="bg-white/5 rounded-xl p-4">
            <h4 class="text-sm font-semibold text-gray-300 mb-3">Vehículo</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div><span class="text-gray-500">OEM</span><br>${d.oem}</div>
              <div><span class="text-gray-500">Modelo</span><br>${d.model}</div>
              <div><span class="text-gray-500">Estado</span><br>${L.statusBadge(d.status)}</div>
              <div><span class="text-gray-500">SOH</span><br><span style="color:${L.sohColor(d.soh)}">${d.soh.toFixed(1)}%</span></div>
              <div><span class="text-gray-500">Ciclos</span><br>${d.cycles}</div>
              <div><span class="text-gray-500">Temp Prom</span><br>${d.avgTemp.toFixed(1)}°C</div>
            </div>
          </div>

          <!-- Row 2: Revenue (full width) -->
          <div class="md:col-span-2 bg-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-semibold text-gray-300 mb-1">Ingreso Semanal</h4>
              <p class="text-2xl font-bold text-white">${L.formatMXN(d.weeklyRevenue)}</p>
            </div>
            <div class="text-right">
              <span class="text-xs text-gray-500">Último pago</span>
              <div class="mt-1">${L.statusBadge(lastPayment.status)}</div>
            </div>
          </div>

          <!-- Row 3: Pagos (full width) -->
          <div class="md:col-span-2 bg-white/5 rounded-xl p-4">
            <h4 class="text-sm font-semibold text-gray-300 mb-3">Historial de Pagos (últimas 8 sem)</h4>
            <div class="grid md:grid-cols-2 gap-x-6 gap-y-1.5">
              ${d.payments.slice(-8).map(p => `
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Sem ${p.week}</span>
                  <span class="text-gray-300">${L.formatMXN(p.amount)}</span>
                  ${L.statusBadge(p.status)}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    modal.open();
    document.getElementById('close-panel').addEventListener('click', () => modal.close());
  }

  // ---------- Init ----------
  filterAndRender();
})();
