// ============================================================
// LAFA Fleet Map — Real-Time Vehicle Tracking
// Uses Leaflet.js with CartoDB Dark Matter tiles
// ============================================================
(function () {
  // Use L_LAFA to avoid collision with Leaflet's global L
  const L_LAFA = window.LAFA;

  // ---------- Init Page ----------
  L_LAFA.initPage('fleetmap', t('fleetmap.title'), t('fleetmap.subtitle', { n: 200 }));

  // ---------- CDMX Colonia Coordinates ----------
  const CDMX_COORDS = {
    'Condesa':      [19.4115, -99.1740],
    'Roma Norte':   [19.4195, -99.1625],
    'Roma Sur':     [19.4050, -99.1620],
    'Polanco':      [19.4320, -99.1950],
    'Del Valle':    [19.3830, -99.1720],
    'Narvarte':     [19.3920, -99.1570],
    'Coyoacán':     [19.3500, -99.1620],
    'Santa Fe':     [19.3660, -99.2610],
    'Juárez':       [19.4270, -99.1580],
    'Centro':       [19.4326, -99.1332],
    'Tlalpan':      [19.2960, -99.1670],
    'Iztapalapa':   [19.3580, -99.0930],
    'Xochimilco':   [19.2620, -99.1040],
    'Azcapotzalco': [19.4870, -99.1870],
    'Reforma':      [19.4270, -99.1700],
  };

  // ---------- LAFA Centers ----------
  const LAFA_CENTERS = [
    { id: 'vallejo', nameKey: 'fleetmap.center.vallejo', lat: 19.4890, lng: -99.1640, vehicles: 70 },
    { id: 'granada', nameKey: 'fleetmap.center.granada', lat: 19.4400, lng: -99.2030, vehicles: 80 },
    { id: 'roma', nameKey: 'fleetmap.center.roma', lat: 19.4170, lng: -99.1600, vehicles: 50 },
  ];

  // ---------- Charging Stations ----------
  const CHARGING_STATIONS = [
    { id: 'cs1', name: 'Electrolinera Polanco',    lat: 19.4340, lng: -99.1980, ports: 8, available: 3 },
    { id: 'cs2', name: 'Carga LAFA Centro',        lat: 19.4130, lng: -99.1560, ports: 12, available: 5 },
    { id: 'cs3', name: 'EV Station Coyoacán',      lat: 19.3520, lng: -99.1580, ports: 6, available: 2 },
    { id: 'cs4', name: 'Supercharger Santa Fe',    lat: 19.3680, lng: -99.2580, ports: 10, available: 4 },
    { id: 'cs5', name: 'Electrolinera Azcapotzalco', lat: 19.4850, lng: -99.1850, ports: 6, available: 3 },
  ];

  // ---------- Generate Vehicle Positions ----------
  const rng = L_LAFA.seededRandom(123);

  function jitter(lat, lng, radius) {
    const angle = rng() * Math.PI * 2;
    const r = rng() * radius;
    return [lat + r * Math.cos(angle), lng + r * Math.sin(angle)];
  }

  function generateVehiclePositions(drivers) {
    return drivers.map(d => {
      let lat, lng;
      if (d.status === 'charging') {
        // Place near a charging station
        const station = CHARGING_STATIONS[Math.floor(rng() * CHARGING_STATIONS.length)];
        [lat, lng] = jitter(station.lat, station.lng, 0.002);
      } else if (d.status === 'maintenance') {
        // Place at a LAFA center
        const center = LAFA_CENTERS[Math.floor(rng() * LAFA_CENTERS.length)];
        [lat, lng] = jitter(center.lat, center.lng, 0.003);
      } else {
        // Place in their assigned colonia
        const coords = CDMX_COORDS[d.colonia] || CDMX_COORDS['Centro'];
        [lat, lng] = jitter(coords[0], coords[1], 0.012);
      }
      return { ...d, lat, lng };
    });
  }

  const vehicles = generateVehiclePositions(L_LAFA.DRIVERS);

  // ---------- Filter State ----------
  const filters = {
    layers: { dae: true, lto: true, centers: true, charging: true, soh: false },
    status: { active: true, charging: true, maintenance: true, idle: true },
    oem: { Geely: true, JAC: true, GAC: true },
    sohRange: { '95': true, '90': true, '85': true, 'below': true },
  };

  // ---------- Map Init ----------
  const map = L.map('map', {
    center: [19.40, -99.16],
    zoom: 12,
    zoomControl: true,
    attributionControl: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // Layer groups
  let vehicleLayer = L.layerGroup().addTo(map);
  let centerLayer = L.layerGroup().addTo(map);
  let chargingLayer = L.layerGroup().addTo(map);

  // ---------- SOH Color for overlay ----------
  function sohMarkerColor(soh) {
    if (soh >= 95) return '#16A34A';
    if (soh >= 90) return '#22C55E';
    if (soh >= 85) return '#EAB308';
    return '#EF4444';
  }

  // ---------- Create Vehicle Marker ----------
  function createVehicleMarker(v) {
    const sohMode = filters.layers.soh;
    const color = sohMode ? sohMarkerColor(v.soh) : (v.product === 'DaE' ? '#14B8A6' : '#F59E0B');

    const borderStyle = v.status === 'active' ? '2px solid rgba(0,0,0,0.4)' :
                        v.status === 'charging' ? '2px solid #3B82F6' :
                        v.status === 'maintenance' ? '2px solid #EAB308' :
                        '2px solid rgba(255,255,255,0.2)';

    const icon = L.divIcon({
      className: '',
      html: `<div class="vehicle-marker" style="background:${color};border:${borderStyle};"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    const marker = L.marker([v.lat, v.lng], { icon });
    marker.bindPopup(() => buildPopupContent(v), { maxWidth: 260, minWidth: 200 });
    return marker;
  }

  // ---------- Build Popup Content ----------
  function buildPopupContent(v) {
    const initials = v.firstName[0] + v.lastName[0];
    const avatarBg = v.product === 'DaE' ? 'background:#14B8A6' : 'background:#F59E0B';
    return `
      <div style="font-family:'Inter Tight',system-ui,sans-serif;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <div style="width:28px;height:28px;border-radius:50%;${avatarBg};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;">${initials}</div>
          <div>
            <div style="font-weight:600;font-size:13px;">${v.shortName}</div>
            <div style="font-size:11px;color:#9CA3AF;">${v.vehicleId}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;font-size:11px;">
          <div style="color:#6B7280;">${t('fleetmap.popup.model')}</div><div>${v.oem} ${v.model}</div>
          <div style="color:#6B7280;">${t('fleetmap.popup.product')}</div><div style="color:${v.product === 'DaE' ? '#14B8A6' : '#F59E0B'};font-weight:500;">${v.product}</div>
          <div style="color:#6B7280;">${t('fleetmap.popup.status')}</div><div>${t('shared.status.' + (v.status === 'on-time' ? 'onTime' : v.status))}</div>
          <div style="color:#6B7280;">${t('fleetmap.popup.soh')}</div><div style="color:${L_LAFA.sohColor(v.soh)};font-weight:500;">${v.soh.toFixed(1)}%</div>
          <div style="color:#6B7280;">${t('fleetmap.popup.revenue')}</div><div>${L_LAFA.formatMXN(v.weeklyRevenue)}</div>
          <div style="color:#6B7280;">${t('fleetmap.popup.platform')}</div><div>${v.platform}</div>
          <div style="color:#6B7280;">${t('fleetmap.popup.zone')}</div><div>${v.colonia}</div>
        </div>
      </div>
    `;
  }

  // ---------- Create Center Marker ----------
  function createCenterMarker(center) {
    const icon = L.divIcon({
      className: '',
      html: `<div class="center-marker"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker([center.lat, center.lng], { icon, zIndexOffset: 500 });
    marker.bindPopup(`
      <div style="font-family:'Inter Tight',system-ui,sans-serif;text-align:center;">
        <div style="font-weight:600;font-size:14px;color:#FF5A00;margin-bottom:4px;">${t(center.nameKey)}</div>
        <div style="font-size:12px;color:#9CA3AF;">${center.vehicles} ${t('roadmap.vehicles')}</div>
      </div>
    `, { maxWidth: 180 });
    return marker;
  }

  // ---------- Create Charging Marker ----------
  function createChargingMarker(station) {
    const icon = L.divIcon({
      className: '',
      html: `<div class="charging-marker">${station.available}</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    const marker = L.marker([station.lat, station.lng], { icon, zIndexOffset: 400 });
    marker.bindPopup(`
      <div style="font-family:'Inter Tight',system-ui,sans-serif;">
        <div style="font-weight:600;font-size:13px;margin-bottom:4px;">${station.name}</div>
        <div style="font-size:12px;color:#9CA3AF;">${station.available}/${station.ports} puertos disponibles</div>
      </div>
    `, { maxWidth: 200 });
    return marker;
  }

  // ---------- SOH Range Check ----------
  function passesSohFilter(soh) {
    if (soh >= 95 && filters.sohRange['95']) return true;
    if (soh >= 90 && soh < 95 && filters.sohRange['90']) return true;
    if (soh >= 85 && soh < 90 && filters.sohRange['85']) return true;
    if (soh < 85 && filters.sohRange['below']) return true;
    return false;
  }

  // ---------- Apply Filters ----------
  function applyFilters() {
    // Clear layers
    vehicleLayer.clearLayers();
    centerLayer.clearLayers();
    chargingLayer.clearLayers();

    // Filter vehicles
    let visibleCount = 0;
    let activeCount = 0, chargingCount = 0, maintCount = 0;
    let totalSoh = 0, sohCount = 0, alertCount = 0;

    vehicles.forEach(v => {
      // Layer filter (product)
      if (v.product === 'DaE' && !filters.layers.dae) return;
      if (v.product === 'LTO' && !filters.layers.lto) return;

      // Status filter
      if (!filters.status[v.status]) return;

      // OEM filter
      if (!filters.oem[v.oem]) return;

      // SOH range filter
      if (!passesSohFilter(v.soh)) return;

      // Vehicle passes all filters
      const marker = createVehicleMarker(v);
      vehicleLayer.addLayer(marker);
      visibleCount++;

      // KPI counts
      if (v.status === 'active') activeCount++;
      if (v.status === 'charging') chargingCount++;
      if (v.status === 'maintenance') maintCount++;
      totalSoh += v.soh;
      sohCount++;
      if (v.soh < 88) alertCount++;
    });

    // Centers
    if (filters.layers.centers) {
      LAFA_CENTERS.forEach(c => centerLayer.addLayer(createCenterMarker(c)));
    }

    // Charging stations
    if (filters.layers.charging) {
      CHARGING_STATIONS.forEach(s => chargingLayer.addLayer(createChargingMarker(s)));
    }

    // Update KPIs
    document.getElementById('kpi-active').textContent = activeCount;
    document.getElementById('kpi-charging').textContent = chargingCount;
    document.getElementById('kpi-maintenance').textContent = maintCount;
    const avgSoh = sohCount > 0 ? (totalSoh / sohCount).toFixed(1) : '0';
    document.getElementById('kpi-soh').textContent = avgSoh + '%';
    document.getElementById('kpi-soh').style.color = L_LAFA.sohColor(parseFloat(avgSoh));
    document.getElementById('kpi-alerts').textContent = alertCount;

    // Vehicle count — show "Mostrando X de Y" when filtered, just "Y vehículos" when all visible
    const totalCount = vehicles.length;
    const countEl = document.getElementById('vehicle-count');
    if (visibleCount < totalCount) {
      countEl.textContent = t('fleetmap.filter.vehicleCountFiltered', { visible: visibleCount, total: totalCount });
    } else {
      countEl.textContent = t('fleetmap.filter.vehicleCount', { n: totalCount });
    }
  }

  // ---------- Wire Filter Controls ----------
  // Toggle switches
  document.querySelectorAll('.toggle-switch[data-layer]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const layer = toggle.dataset.layer;
      filters.layers[layer] = !filters.layers[layer];
      toggle.classList.toggle('active', filters.layers[layer]);
      applyFilters();
    });
  });

  // Status checkboxes
  document.querySelectorAll('input[data-status]').forEach(cb => {
    cb.addEventListener('change', () => {
      filters.status[cb.dataset.status] = cb.checked;
      applyFilters();
    });
  });

  // OEM checkboxes
  document.querySelectorAll('input[data-oem]').forEach(cb => {
    cb.addEventListener('change', () => {
      filters.oem[cb.dataset.oem] = cb.checked;
      applyFilters();
    });
  });

  // SOH range checkboxes
  document.querySelectorAll('input[data-soh]').forEach(cb => {
    cb.addEventListener('change', () => {
      filters.sohRange[cb.dataset.soh] = cb.checked;
      applyFilters();
    });
  });

  // ---------- Reset Filters ----------
  document.getElementById('reset-filters').addEventListener('click', () => {
    // Reset state to defaults
    filters.layers = { dae: true, lto: true, centers: true, charging: true, soh: false };
    filters.status = { active: true, charging: true, maintenance: true, idle: true };
    filters.oem = { Geely: true, JAC: true, GAC: true };
    filters.sohRange = { '95': true, '90': true, '85': true, 'below': true };

    // Update toggle switches
    document.querySelectorAll('.toggle-switch[data-layer]').forEach(toggle => {
      toggle.classList.toggle('active', filters.layers[toggle.dataset.layer]);
    });

    // Check all checkboxes
    document.querySelectorAll('#filter-panel .custom-checkbox').forEach(cb => {
      cb.checked = true;
    });

    applyFilters();
  });

  // ---------- Mobile Filter Toggle ----------
  const filterToggle = document.getElementById('filter-toggle-mobile');
  const filterPanel = document.getElementById('filter-panel');

  filterToggle.addEventListener('click', () => {
    filterPanel.classList.toggle('show');
  });

  // Close filter panel when clicking on map (mobile)
  document.getElementById('map').addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      filterPanel.classList.remove('show');
    }
  });

  // ---------- Vehicle Movement Simulation ----------
  function startSimulation() {
    setInterval(() => {
      const activeVehicles = vehicles.filter(v => v.status === 'active');
      const count = Math.min(3 + Math.floor(Math.random() * 3), activeVehicles.length);

      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * activeVehicles.length);
        const v = activeVehicles[idx];
        // Nudge ~50m in random direction
        v.lat += (Math.random() - 0.5) * 0.001;
        v.lng += (Math.random() - 0.5) * 0.001;
      }

      applyFilters();
    }, 3000);
  }

  // ---------- Language Change Handler ----------
  window.addEventListener('langchange', () => {
    // Update page title
    const titleEl = document.querySelector('#page-header h1');
    if (titleEl) titleEl.textContent = t('fleetmap.title');
    const subtitleEl = document.querySelector('#page-header p');
    if (subtitleEl) subtitleEl.textContent = t('fleetmap.subtitle', { n: 200 });

    // Rebuild map (popups get recreated on click via function binding)
    applyFilters();
  });

  // ---------- Init ----------
  applyFilters();
  startSimulation();

  // Fix Leaflet rendering on sidebar toggle (invalidate size)
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      setTimeout(() => map.invalidateSize(), 350);
    });
  }
  // Also on window resize
  window.addEventListener('resize', () => map.invalidateSize());
})();
