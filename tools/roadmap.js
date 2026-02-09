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
let detailModal;

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
  L.initPage('roadmap', t('roadmap.title'), '');
  detailModal = L.createModal('detail-modal', {
    overlay: 'detail-overlay',
    onClose: () => { state.selectedProject = null; }
  });

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
    x: localField(p, 'name'),
    y: [p.startMonth, p.startMonth === p.endMonth ? p.endMonth + 0.5 : p.endMonth],
    fillColor: TRACK_COLORS[p.track],
    projectId: p.id
  }));

  const series = [{ name: t('roadmap.timeline'), data }];

  state.ganttChart = L.createChart('chart-gantt', {
    chart: {
      type: 'rangeBar',
      height: Math.max(window.innerWidth < 480 ? 300 : 400, filtered.length * (window.innerWidth < 480 ? 24 : 36) + 80),
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
      title: { text: t('roadmap.month'), style: { color: L.COLORS.gray500, fontSize: '12px' } }
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
          <div style="font-weight:700;color:white;margin-bottom:4px;">${localField(p, 'name')}</div>
          <div style="color:${L.COLORS.gray400};font-size:12px;margin-bottom:6px;line-height:1.4;">${localField(p, 'description')}</div>
          <div style="color:${L.COLORS.gray600};font-size:10px;">${t('roadmap.clickHint')}</div>
        </div>`;
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      customLegendItems: [t('roadmap.legend.foundation'), t('roadmap.legend.dae'), t('roadmap.legend.lto')],
      markers: { fillColors: Object.values(TRACK_COLORS), radius: 3 },
      labels: { colors: L.COLORS.gray400 }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        plotOptions: { bar: { horizontal: true, barHeight: '65%' } },
        yaxis: { labels: { style: { fontSize: '10px' }, maxWidth: 120 } },
        xaxis: { labels: { style: { fontSize: '10px' } } }
      }
    }],
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
        const p = orderedProjects.find(pr => localField(pr, 'name') === name);
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

  document.getElementById('detail-name').textContent = localField(p, 'name');

  // Badges
  const trackColor = TRACK_COLORS[p.track];
  const trackLabelKey = 'roadmap.legend.' + p.track;
  document.getElementById('detail-badges').innerHTML = `
    <span class="px-2.5 py-1 rounded-md text-xs font-medium" style="background:${trackColor}20;color:${trackColor}">${t(trackLabelKey)}</span>
  `;

  // Problem
  document.getElementById('detail-problem').textContent = localField(p, 'problem');

  // Deliverables
  const deliverables = localField(p, 'deliverables');
  document.getElementById('detail-deliverables').innerHTML = deliverables.map(d =>
    `<li class="flex items-start gap-2 text-sm text-gray-300"><span class="text-gray-500 mt-1">▸</span><span>${d}</span></li>`
  ).join('');

  // Future Scope (if any)
  const futureWrap = document.getElementById('detail-future-scope');
  if (futureWrap) {
    if (p.futureScope) {
      futureWrap.classList.remove('hidden');
      futureWrap.textContent = localField(p, 'futureScope');
    } else {
      futureWrap.classList.add('hidden');
    }
  }

  // Architecture — structured breakdown if available, paragraph fallback
  if (p.architectureBreakdown) {
    document.getElementById('detail-architecture').innerHTML = p.architectureBreakdown.map(b =>
      `<div class="flex items-start gap-2 mb-2">
        <span class="text-sm">${b.icon}</span>
        <div>
          <span class="text-xs font-semibold text-gray-300">${localField(b, 'label')}:</span>
          <span class="text-xs text-gray-300 ml-1">${localField(b, 'detail')}</span>
        </div>
      </div>`
    ).join('');
  } else {
    document.getElementById('detail-architecture').textContent = localField(p, 'architecture');
  }

  // Impact
  const [impMin, impMax] = impactAtFleet(p, 2000);
  if (impMin === 0) {
    document.getElementById('detail-impact').textContent = t('roadmap.enabler');
    const blockCount = p.blocks.length;
    let noteText = blockCount > 0
      ? t('roadmap.baseFor', { n: blockCount, plural: blockCount > 1 ? 's' : '' })
      : t('roadmap.infraCritical');
    if (p.impactNote) noteText += ` · ${localField(p, 'impactNote')}`;
    document.getElementById('detail-impact-note').textContent = noteText;
  } else {
    document.getElementById('detail-impact').textContent = `${formatMXNShort(impMin)} – ${formatMXNShort(impMax)}${t('roadmap.perYear')}`;
    document.getElementById('detail-impact-note').textContent = t('roadmap.fullScale');
  }

  // Users
  const users = localField(p, 'primaryUsers');
  document.getElementById('detail-users').innerHTML = users.map(u =>
    `<span class="text-gray-300">${u}</span>`
  ).join('<span class="text-gray-600 mx-1">·</span>');

  // Benchmark
  if (p.benchmark) {
    document.getElementById('detail-benchmark-wrap').classList.remove('hidden');
    document.getElementById('detail-benchmark').textContent = localField(p, 'benchmark');
  } else {
    document.getElementById('detail-benchmark-wrap').classList.add('hidden');
  }

  // Open modal
  detailModal.open();
}

function closeDetailPanel() {
  detailModal.close();
}

// ---------- Milestones ----------
function renderMilestones() {
  const container = document.getElementById('milestone-cards');
  container.innerHTML = MILESTONES.map((m, i) => {
    const isReached = 200 >= m.fleet;
    const techBadges = (m.techRequired || []).map(id => {
      const proj = PROJECTS.find(pr => pr.id === id);
      const color = proj ? TRACK_COLORS[proj.track] : L.COLORS.gray400;
      return `<span class="px-1.5 py-0.5 rounded text-[10px] font-medium" style="background:${color}15;color:${color}">${id}</span>`;
    }).join('');
    return `
      <div class="milestone-card bg-lafa-card rounded-xl p-5 border border-white/5 relative" data-milestone="${i}">
        ${isReached ? '<div class="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-400"></div>' : ''}
        <div class="flex items-baseline gap-1 mb-1">
          <span class="text-3xl font-bold text-white" style="font-variant-numeric:tabular-nums">${m.fleet.toLocaleString(window.I18N_LANG === 'en' ? 'en-US' : 'es-MX')}</span>
          <span class="text-sm text-gray-500">${t('roadmap.vehicles')}</span>
        </div>
        <p class="text-sm font-semibold text-lafa-orange mb-2">${localField(m, 'title')}</p>
        <p class="text-xs text-gray-500 leading-relaxed">${localField(m, 'vision')}</p>
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

  // Detail modal close button
  document.getElementById('detail-close').addEventListener('click', closeDetailPanel);

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

// ---------- Language change ----------
window.addEventListener('langchange', () => {
  renderGantt();
  renderMilestones();
  if (state.selectedProject) openDetailPanel(state.selectedProject.id);
  const titleEl = document.querySelector('#page-header h1');
  if (titleEl) titleEl.textContent = t('roadmap.title');
});
})();
