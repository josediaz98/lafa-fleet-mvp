// ============================================================
// LAFA AI Roadmap — Interactive Strategic Planning Tool
// 16 projects, 3 tracks, Gantt + Detail Panel + Milestones
// ============================================================
(function () {
const L = window.LAFA;
const { PROJECTS, TRACK_COLORS, TRACK_LABELS, MILESTONES } = window.ROADMAP_DATA;

// ---------- State ----------
let state = {
  activeTracks: new Set(['foundation', 'dae', 'lto']),
  selectedProject: null,
  ganttChart: null
};

// ---------- Helper Functions ----------
function impactAtFleet(project, fleet) {
  const ref = project.impact[2000];
  if (!ref || (ref[0] === 0 && ref[1] === 0)) return [0, 0];
  return [Math.round(ref[0] * (fleet / 2000)), Math.round(ref[1] * (fleet / 2000))];
}

function formatMXNShort(amount) {
  if (amount >= 1000000) return `MXN $${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `MXN $${(amount / 1000).toFixed(0)}K`;
  return `MXN $${amount}`;
}

function getFilteredProjects() {
  return PROJECTS.filter(p => state.activeTracks.has(p.track));
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  L.initPage('roadmap', 'AI Roadmap Interactivo', '');

  animateKPIs();
  renderGantt();
  renderMilestones();
  bindEvents();
});

// ---------- KPI Animation ----------
function animateKPIs() {
  L.animateCounter(document.getElementById('kpi-weeks'), 50, 800);
  const impactEl = document.getElementById('kpi-impact');
  const startTime = performance.now();
  function updateImpactKPI(now) {
    const progress = Math.min((now - startTime) / 800, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = 3.6 + (9.1 - 3.6) * eased;
    impactEl.textContent = `$${val.toFixed(1)}M`;
    if (progress < 1) requestAnimationFrame(updateImpactKPI);
  }
  requestAnimationFrame(updateImpactKPI);
}

// ---------- Gantt Chart ----------
function renderGantt() {
  const filtered = getFilteredProjects();

  // Sort by start date (then end date) — ApexCharts renders top-to-bottom in array order
  const ordered = [...filtered]
    .sort((a, b) => a.startMonth - b.startMonth || a.endMonth - b.endMonth);

  const data = ordered.map(p => ({
    x: p.name,
    y: [p.startMonth, p.startMonth === p.endMonth ? p.endMonth + 0.5 : p.endMonth],
    fillColor: TRACK_COLORS[p.track],
    projectId: p.id
  }));

  const series = [{ name: 'Proyectos', data }];

  state.ganttChart = L.createChart('chart-gantt', {
    chart: {
      type: 'rangeBar',
      height: Math.max(400, filtered.length * 36 + 80),
      zoom: { enabled: false },
      toolbar: { show: false },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const bar = data[config.dataPointIndex];
          if (bar && bar.projectId) {
            openDetailPanel(bar.projectId);
          }
        }
      }
    },
    series,
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
        rangeBarGroupRows: false,
        dataLabels: { position: 'center' }
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'numeric',
      min: 0.5,
      max: 9.5,
      tickAmount: 9,
      labels: {
        formatter: (val) => `Mo ${Math.round(val)}`,
        style: { colors: L.COLORS.gray400, fontSize: '11px' }
      },
      title: { text: 'Mes', style: { color: L.COLORS.gray500, fontSize: '12px' } }
    },
    yaxis: {
      labels: {
        style: { colors: L.COLORS.gray300, fontSize: '11px' },
        maxWidth: 280
      }
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } }
    },
    tooltip: {
      custom: function({ series: s, seriesIndex, dataPointIndex, w }) {
        const bar = w.config.series[0].data[dataPointIndex];
        if (!bar || !bar.projectId) return '';
        const p = PROJECTS.find(pr => pr.id === bar.projectId);
        if (!p) return '';
        return `<div style="padding:10px;background:${L.COLORS.dark};border:1px solid rgba(255,255,255,0.1);border-radius:8px;min-width:240px;max-width:360px;word-wrap:break-word;">
          <div style="font-weight:700;color:white;margin-bottom:4px;">${p.name}</div>
          <div style="color:${L.COLORS.gray400};font-size:12px;margin-bottom:6px;line-height:1.4;">${p.description}</div>
          <div style="color:${L.COLORS.gray600};font-size:10px;">Click para ver detalles</div>
        </div>`;
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      customLegendItems: Object.values(TRACK_LABELS),
      markers: { fillColors: Object.values(TRACK_COLORS), radius: 3 },
      labels: { colors: L.COLORS.gray400 }
    },
    annotations: {}
  }, state.ganttChart);

  bindYAxisClicks(ordered);
}

function bindYAxisClicks(orderedProjects) {
  setTimeout(() => {
    document.querySelectorAll('#chart-gantt .apexcharts-yaxis-label').forEach(label => {
      label.style.cursor = 'pointer';
      label.addEventListener('click', () => {
        const tspan = label.querySelector('tspan');
        const name = (tspan || label).textContent.trim();
        const p = orderedProjects.find(pr => pr.name === name);
        if (p) openDetailPanel(p.id);
      });
    });
  }, 300);
}

// ---------- Detail Panel ----------
function openDetailPanel(projectId) {
  const p = PROJECTS.find(pr => pr.id === projectId);
  if (!p) return;
  state.selectedProject = p;

  document.getElementById('detail-id').textContent = p.id;
  document.getElementById('detail-name').textContent = p.name;

  // Badges
  const trackColor = TRACK_COLORS[p.track];
  document.getElementById('detail-badges').innerHTML = `
    <span class="px-2 py-0.5 rounded text-xs font-medium" style="background:${trackColor}20;color:${trackColor}">${TRACK_LABELS[p.track]}</span>
    <span class="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300">Fase ${p.phase}</span>
    <span class="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300">Mo ${p.startMonth}-${p.endMonth} · ${p.effortWeeks} sem</span>
  `;

  // Problem
  document.getElementById('detail-problem').textContent = p.problem;

  // Deliverables
  document.getElementById('detail-deliverables').innerHTML = p.deliverables.map(d =>
    `<li class="flex items-start gap-2 text-sm text-gray-300"><span class="text-gray-500 mt-1">▸</span><span>${d}</span></li>`
  ).join('');

  // Architecture — structured breakdown if available, paragraph fallback
  if (p.architectureBreakdown) {
    document.getElementById('detail-architecture').innerHTML = p.architectureBreakdown.map(b =>
      `<div class="flex items-start gap-2 mb-2">
        <span class="text-sm">${b.icon}</span>
        <div>
          <span class="text-xs font-semibold text-gray-300">${b.label}:</span>
          <span class="text-xs text-gray-400 ml-1">${b.detail}</span>
        </div>
      </div>`
    ).join('');
    // Hide stack badges — breakdown already names the tech
    document.getElementById('detail-stack').innerHTML = '';
  } else {
    document.getElementById('detail-architecture').textContent = p.architecture;
  }

  // Impact
  const [impMin, impMax] = impactAtFleet(p, 2000);
  if (impMin === 0) {
    document.getElementById('detail-impact').textContent = 'Habilitador Crítico';
    const blockCount = p.blocks.length;
    document.getElementById('detail-impact-note').textContent =
      blockCount > 0
        ? `Base para ${blockCount} proyecto${blockCount > 1 ? 's' : ''} de Fase 1-2`
        : 'Infraestructura crítica del stack';
  } else {
    document.getElementById('detail-impact').textContent = `${formatMXNShort(impMin)} – ${formatMXNShort(impMax)}/año`;
    document.getElementById('detail-impact-note').textContent = `A escala completa`;
  }

  // Metrics
  document.getElementById('detail-metrics').innerHTML = p.metrics.map((m, i, arr) =>
    `<div class="flex items-center justify-between text-xs py-2 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}">
      <span class="text-gray-400">${m.kpi}</span>
      <div class="text-right">
        ${m.before ? `<span class="text-red-400/70 line-through mr-2">${m.before}</span>` : ''}
        <span class="text-green-400 font-medium">${m.target}</span>
      </div>
    </div>`
  ).join('');

  // Stack
  document.getElementById('detail-stack').innerHTML = p.stack.map(s =>
    `<span class="px-1.5 py-0.5 rounded text-[11px] font-medium bg-white/5 text-gray-500">${s}</span>`
  ).join('');

  // Dependencies — smart counter with tooltip
  const deps = [];
  if (p.dependsOn.length > 0) {
    const depNames = p.dependsOn.map(d => {
      const proj = PROJECTS.find(pr => pr.id === d);
      return proj ? `${d}: ${proj.name}` : d;
    }).join('\n');
    deps.push(`<p class="text-xs text-gray-400">
      <span class="text-yellow-400 font-medium cursor-help" title="${depNames}">
        Requiere ${p.dependsOn.length} proyecto${p.dependsOn.length > 1 ? 's' : ''} previo${p.dependsOn.length > 1 ? 's' : ''}
      </span>
    </p>`);
  }
  if (p.blocks.length > 0) {
    const blockNames = p.blocks.map(d => {
      const proj = PROJECTS.find(pr => pr.id === d);
      return proj ? `${d}: ${proj.name}` : d;
    }).join('\n');
    deps.push(`<p class="text-xs text-gray-400">
      <span class="text-green-400 font-medium cursor-help" title="${blockNames}">
        Desbloquea ${p.blocks.length} proyecto${p.blocks.length > 1 ? 's' : ''}
      </span>
    </p>`);
  }
  if (deps.length === 0) deps.push('<p class="text-xs text-gray-500">Sin dependencias</p>');
  document.getElementById('detail-deps').innerHTML = deps.join('');

  // Users
  document.getElementById('detail-users').innerHTML = p.primaryUsers.map(u =>
    `<span class="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400">${u}</span>`
  ).join('');

  // Benchmark
  if (p.benchmark) {
    document.getElementById('detail-benchmark-wrap').classList.remove('hidden');
    document.getElementById('detail-benchmark').textContent = p.benchmark;
  } else {
    document.getElementById('detail-benchmark-wrap').classList.add('hidden');
  }

  // Open modal
  document.getElementById('detail-modal').classList.remove('hidden');
}

function closeDetailPanel() {
  document.getElementById('detail-modal').classList.add('hidden');
  state.selectedProject = null;
}

// ---------- Milestones ----------
function renderMilestones() {
  const container = document.getElementById('milestone-cards');
  container.innerHTML = MILESTONES.map((m, i) => {
    const isReached = 200 >= m.fleet;
    return `
      <div class="milestone-card bg-lafa-card rounded-xl p-5 border border-white/5 relative" data-milestone="${i}">
        ${isReached ? '<div class="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-400"></div>' : ''}
        <div class="flex items-baseline gap-1 mb-1">
          <span class="text-3xl font-bold text-white" style="font-variant-numeric:tabular-nums">${m.fleet.toLocaleString('es-MX')}</span>
          <span class="text-sm text-gray-500">vehículos</span>
        </div>
        <p class="text-sm font-semibold text-lafa-orange mb-2">${m.title}</p>
        <p class="text-xs text-gray-500 leading-relaxed">${m.vision}</p>
      </div>
    `;
  }).join('');
}

// ---------- Event Binding ----------
function bindEvents() {
  // Track toggles
  document.querySelectorAll('.track-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const track = toggle.dataset.track;
      if (track === 'all') {
        const allActive = state.activeTracks.size === 3;
        if (allActive) return; // don't deactivate all
        state.activeTracks = new Set(['foundation', 'dae', 'lto']);
        document.querySelectorAll('.track-toggle').forEach(t => t.classList.add('active'));
      } else {
        if (state.activeTracks.has(track)) {
          if (state.activeTracks.size > 1) {
            state.activeTracks.delete(track);
            toggle.classList.remove('active');
          }
        } else {
          state.activeTracks.add(track);
          toggle.classList.add('active');
        }
        // Update "all" button
        const allBtn = document.querySelector('[data-track="all"]');
        if (state.activeTracks.size === 3) {
          allBtn.classList.add('active');
        } else {
          allBtn.classList.remove('active');
        }
      }
      renderGantt();
    });
  });

  // Detail modal close
  document.getElementById('detail-close').addEventListener('click', closeDetailPanel);
  document.getElementById('detail-overlay').addEventListener('click', closeDetailPanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('detail-modal').classList.contains('hidden')) closeDetailPanel();
  });

  // Milestone cards
  document.getElementById('milestone-cards').addEventListener('click', (e) => {
    const card = e.target.closest('.milestone-card');
    if (!card) return;
    const idx = parseInt(card.dataset.milestone);
    const milestone = MILESTONES[idx];

    // Highlight the card
    document.querySelectorAll('.milestone-card').forEach(c => c.classList.remove('highlighted'));
    card.classList.add('highlighted');

    // Reset filters to show all, then highlight relevant projects
    state.activeTracks = new Set(['foundation', 'dae', 'lto']);
    document.querySelectorAll('.track-toggle').forEach(t => t.classList.add('active'));

    renderGantt();

    // Scroll to Gantt
    document.getElementById('section-gantt').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Remove highlight after 3 seconds
    setTimeout(() => card.classList.remove('highlighted'), 3000);
  });
}
})();
