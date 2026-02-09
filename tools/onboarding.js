// ============================================================
// LAFA Driver Onboarding — Kanban + WhatsApp + OCR + Modal
// ============================================================
(function () {
  const L = window.LAFA;

  // ---------- Init ----------
  L.initPage('onboarding', 'Onboarding de Conductores', '', {
    'search-icon': 'search',
    'modal-close-icon': 'x',
    'wa-icon': 'message-circle',
  });

  // ---------- Constants ----------
  const STAGES = ['pendiente', 'revision', 'verificado', 'aprobado'];
  const DOCS = ['INE', 'Licencia', 'Comp. Domicilio', 'RFC', 'Screenshot'];

  const DOC_META = {
    'INE':             { color: 'bg-blue-500/15',   iconColor: 'text-blue-400',   icon: 'shield-check' },
    'Licencia':        { color: 'bg-purple-500/15',  iconColor: 'text-purple-400', icon: 'car' },
    'Comp. Domicilio': { color: 'bg-green-500/15',   iconColor: 'text-green-400',  icon: 'home' },
    'RFC':             { color: 'bg-amber-500/15',    iconColor: 'text-amber-400',  icon: 'file-text' },
    'Screenshot':      { color: 'bg-teal-500/15',    iconColor: 'text-teal-400',   icon: 'smartphone' },
  };

  // ---------- Seeded Random ----------
  const r = L.seededRandom(99);
  function aRand() { return r(); }
  function aPick(arr) { return arr[Math.floor(aRand() * arr.length)]; }

  // ---------- Generate Applicants ----------
  const applicants = [];
  const stageCounts = { pendiente: 8, revision: 5, verificado: 7, aprobado: 3 };
  let appId = 1;

  for (const [stage, count] of Object.entries(stageCounts)) {
    for (let i = 0; i < count; i++) {
      const isMale = aRand() > 0.3;
      const firstName = isMale ? aPick(L.DRIVERS.map(d => d.firstName)) : aPick(['Maria', 'Ana', 'Laura', 'Sofia', 'Fernanda']);
      const lastName = aPick(L.DRIVERS.map(d => d.lastName.split(' ')[0]));
      const product = aRand() > 0.5 ? 'DaE' : 'LTO';

      const docsReceived = stage === 'aprobado' ? 5 :
                           stage === 'verificado' ? 5 :
                           stage === 'revision' ? Math.floor(aRand() * 2) + 3 :
                           Math.floor(aRand() * 3) + 1;

      const documents = DOCS.map((name, idx) => ({
        name,
        status: idx < docsReceived ? 'received' : 'pending',
      }));

      // Risk level
      const riskVal = aRand();
      const riskLevel = stage === 'aprobado' ? 'green' :
                        riskVal < 0.5 ? 'green' : riskVal < 0.8 ? 'yellow' : 'red';

      // Credit score (LTO only)
      const creditScore = product === 'LTO' ? Math.floor(aRand() * 50 + 45) : null;

      const phone = `55${Math.floor(aRand() * 9000 + 1000)}${Math.floor(aRand() * 9000 + 1000)}`;
      const curp = `${firstName.substring(0, 2).toUpperCase()}${lastName.substring(0, 2).toUpperCase()}${Math.floor(aRand() * 90 + 10)}0${Math.floor(aRand() * 9 + 1)}${Math.floor(aRand() * 9 + 1)}${Math.floor(aRand() * 2) === 0 ? 'H' : 'M'}DF${firstName.substring(0, 3).toUpperCase()}${Math.floor(aRand() * 90 + 10)}`;

      applicants.push({
        id: appId++,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        product,
        stage,
        date: `${Math.floor(aRand() * 7) + 1} Mar 2026`,
        docsReceived,
        docsTotal: 5,
        documents,
        phone,
        curp,
        riskLevel,
        creditScore,
      });
    }
  }

  // ---------- Demo Timeout Management ----------
  let demoTimeouts = [];

  // ---------- State ----------
  let activeProductFilter = '';
  let searchQuery = '';
  let selectedApplicant = null;
  let previousCounts = {};

  // ---------- Filtering ----------
  function getFilteredApplicants() {
    return applicants.filter(a => {
      if (activeProductFilter && a.product !== activeProductFilter) return false;
      if (searchQuery && !L.normalize(a.fullName).includes(searchQuery)) return false;
      return true;
    });
  }

  // ---------- KPIs ----------
  setTimeout(() => L.animateCounter(document.getElementById('kpi-apps'), 23, 800), 100);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-time'), 4.2, 800, '', 'h'), 200);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-auto'), 78, 800, '', '%'), 300);
  setTimeout(() => L.animateCounter(document.getElementById('kpi-pending'), 12, 600), 400);

  // ---------- KPI Sparklines ----------
  function renderSparkline(containerId, dataPoints, color) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const w = 60, h = 20;
    const max = Math.max(...dataPoints);
    const min = Math.min(...dataPoints);
    const range = max - min || 1;
    const step = w / (dataPoints.length - 1);
    const points = dataPoints.map((v, i) =>
      `${(i * step).toFixed(1)},${(h - ((v - min) / range) * h).toFixed(1)}`
    ).join(' ');
    el.innerHTML = `<svg class="sparkline-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polyline points="${points}" stroke="${color}" /></svg>`;
  }

  renderSparkline('sparkline-apps', [15, 18, 14, 20, 17, 22, 23], '#22C55E');
  renderSparkline('sparkline-time', [8.1, 7.5, 6.8, 5.9, 5.2, 4.8, 4.2], '#22C55E');
  renderSparkline('sparkline-auto', [62, 65, 68, 70, 73, 75, 78], '#22C55E');
  renderSparkline('sparkline-pending', [18, 20, 16, 15, 14, 13, 12], '#22C55E');

  document.getElementById('kpi-apps-trend').textContent = '↑15% vs sem ant';
  document.getElementById('kpi-time-trend').textContent = '↓13% vs sem ant';
  document.getElementById('kpi-auto-trend').textContent = '↑4% vs sem ant';
  document.getElementById('kpi-pending-trend').innerHTML = '<span class="text-green-400">↓8% vs sem ant</span>';

  // ---------- Truncate Phone ----------
  function truncatePhone(phone) {
    if (!phone || phone.length < 6) return phone;
    return phone.substring(0, 2) + '** *** **' + phone.substring(phone.length - 2);
  }

  // ---------- Initials ----------
  function getInitials(name) {
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  // ---------- Render Kanban ----------
  function renderKanban() {
    const filtered = getFilteredApplicants();

    for (const stage of STAGES) {
      const col = document.getElementById('col-' + stage);
      const stageApps = filtered.filter(a => a.stage === stage);
      const countEl = document.getElementById('count-' + stage);
      const prevCount = previousCounts[stage] || 0;
      countEl.textContent = stageApps.length;

      // Badge pulse on count change
      if (prevCount !== stageApps.length && prevCount > 0) {
        countEl.classList.remove('badge-pulse');
        void countEl.offsetWidth; // force reflow
        countEl.classList.add('badge-pulse');
      }
      previousCounts[stage] = stageApps.length;

      if (stageApps.length === 0) {
        col.innerHTML = '<div class="kanban-empty">Sin conductores en esta etapa</div>';
        continue;
      }

      col.innerHTML = stageApps.map(a => {
        const avatarBg = a.product === 'DaE' ? 'background:#14B8A6' : 'background:#F59E0B';
        const pct = (a.docsReceived / a.docsTotal) * 100;
        return `
        <div class="kanban-card bg-lafa-card rounded-lg p-3 border border-white/5 ${selectedApplicant && selectedApplicant.id === a.id ? 'border-[#FF5A00]/50' : ''}"
             draggable="true" data-id="${a.id}">
          <div class="flex items-center gap-2.5 mb-2">
            <div class="avatar-initials" style="${avatarBg};color:#fff">${getInitials(a.fullName)}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="text-sm font-medium text-white truncate">${a.fullName}</span>
                <span class="risk-dot risk-${a.riskLevel}"></span>
              </div>
              <div class="text-xs text-gray-500">${truncatePhone(a.phone)}</div>
            </div>
            ${L.productBadge(a.product)}
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${pct === 100 ? 'bg-green-500' : 'progress-gradient'}" style="width: ${pct}%"></div>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-xs text-gray-500">${a.docsReceived}/${a.docsTotal} docs</span>
            <span class="text-xs text-gray-600">${a.date}</span>
          </div>
        </div>`;
      }).join('');

      // Card click + drag events
      col.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('click', () => {
          const app = applicants.find(a => a.id === +card.dataset.id);
          if (app) openModal(app);
        });
        card.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', card.dataset.id);
          card.classList.add('dragging');
        });
        card.addEventListener('dragend', () => card.classList.remove('dragging'));
      });
    }

    // Drop zones
    document.querySelectorAll('.kanban-col').forEach(colEl => {
      colEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        colEl.classList.add('drag-over');
      });
      colEl.addEventListener('dragleave', () => colEl.classList.remove('drag-over'));
      colEl.addEventListener('drop', (e) => {
        e.preventDefault();
        colEl.classList.remove('drag-over');
        const id = +e.dataTransfer.getData('text/plain');
        const newStage = colEl.dataset.stage;
        const app = applicants.find(a => a.id === id);
        if (app && app.stage !== newStage) {
          const oldStage = app.stage;
          app.stage = newStage;
          renderKanban();
          if (newStage === 'aprobado') {
            showToast(`${app.fullName} aprobada — WhatsApp enviado`, 'check-circle', 'text-green-400');
          }
        }
      });
    });
  }

  // ---------- Filter Controls ----------
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeProductFilter = pill.dataset.filter;
      renderKanban();
    });
  });

  document.getElementById('onboard-search').addEventListener('input', (e) => {
    searchQuery = L.normalize(e.target.value.trim());
    renderKanban();
  });

  // ---------- Modal ----------
  const modalEl = document.getElementById('onboard-modal');
  const modal = L.createModal('onboard-modal', { animated: true, onClose: cancelDemo });

  function openModal(app) {
    // Cancel any previous demo
    cancelDemo();
    selectedApplicant = app;

    // Header
    const avatarBg = app.product === 'DaE' ? '#14B8A6' : '#F59E0B';
    document.getElementById('modal-avatar').style.background = avatarBg;
    document.getElementById('modal-avatar').style.color = '#fff';
    document.getElementById('modal-avatar').textContent = getInitials(app.fullName);
    document.getElementById('modal-name').textContent = app.fullName;
    document.getElementById('modal-product-badge').innerHTML = L.productBadge(app.product);
    document.getElementById('modal-phone').textContent = `+52 ${app.phone.substring(0,2)} ${app.phone.substring(2,6)} ${app.phone.substring(6)}`;

    // Reset all sections
    renderDocThumbnailsPending(app);
    document.getElementById('modal-wa-chat').innerHTML = '';
    document.getElementById('modal-ocr').innerHTML = '';
    document.getElementById('modal-ocr-section').classList.remove('visible');
    document.getElementById('modal-credit-section').classList.remove('visible');
    document.getElementById('modal-timeline-section').classList.remove('visible');
    document.getElementById('modal-completion').classList.remove('visible');
    document.getElementById('modal-replay').classList.remove('visible');
    document.getElementById('modal-credit-gauge').innerHTML = '';

    // Show modal
    modal.open();
    // Start auto-play after modal opens
    demoTimeouts.push(setTimeout(() => runAutoDemo(app), 400));

    renderKanban();
  }

  function cancelDemo() {
    demoTimeouts.forEach(t => clearTimeout(t));
    demoTimeouts = [];
  }

  function closeModal() {
    modal.close();
  }

  document.getElementById('modal-close').addEventListener('click', closeModal);

  // ---------- Document Thumbnails ----------
  function renderDocThumbnailsPending(app) {
    const container = document.getElementById('modal-doc-thumbs');
    container.innerHTML = app.documents.map(doc => {
      const meta = DOC_META[doc.name] || DOC_META['RFC'];
      return `
        <div class="doc-thumb ${meta.color}" data-doc="${doc.name}">
          <div class="flex flex-col items-center gap-1.5 text-center">
            ${L.lucideIcon(meta.icon, 'w-5 h-5 ' + meta.iconColor)}
            <span class="text-xs text-gray-400 leading-tight">${doc.name}</span>
          </div>
          <div class="doc-thumb-status bg-white/5">
            ${L.lucideIcon('clock', 'w-3 h-3 text-gray-500')}
          </div>
        </div>`;
    }).join('');
  }

  function flipDocToGreen(docName) {
    const thumb = document.querySelector(`[data-doc="${docName}"]`);
    if (!thumb) return;
    thumb.classList.add('doc-done', 'doc-pulse');
    const status = thumb.querySelector('.doc-thumb-status');
    status.className = 'doc-thumb-status bg-green-500/20';
    status.innerHTML = L.lucideIcon('check-circle', 'w-3 h-3 text-green-400');
  }

  // ---------- WhatsApp Message Helper ----------
  function addWAMsg(chat, from, text, time) {
    const div = document.createElement('div');
    div.className = `wa-msg ${from === 'bot' ? 'wa-msg-bot' : 'wa-msg-driver'}`;
    div.innerHTML = `<div>${text.replace(/\n/g, '<br>')}</div><div class="wa-msg-time">${time}</div>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  // ---------- Auto-Play Demo Orchestrator ----------
  function runAutoDemo(app) {
    cancelDemo();
    const chat = document.getElementById('modal-wa-chat');
    const productLabel = app.product === 'DaE' ? 'empleado (DaE)' : 'Lease-to-Own (LTO)';
    let t = 0;

    function schedule(delay, fn) {
      t += delay;
      demoTimeouts.push(setTimeout(fn, t));
    }

    // 1. Bot greets
    schedule(100, () => addWAMsg(chat, 'bot',
      `Hola ${app.firstName}! Bienvenido al proceso de onboarding de LAFA. Soy el asistente automatizado.`, '10:00'));

    // 2. Bot lists docs
    schedule(700, () => addWAMsg(chat, 'bot',
      `Para tu solicitud como conductor ${productLabel}, necesitamos:\n1. INE\n2. Licencia\n3. Comp. Domicilio\n4. RFC\n5. Screenshot DiDi`, '10:00'));

    // 3. Driver replies
    schedule(1000, () => addWAMsg(chat, 'driver', 'Si claro, dame un momento', '10:01'));

    // 4. Loop through 5 docs
    DOCS.forEach((docName, i) => {
      // Driver sends doc
      schedule(900, () => addWAMsg(chat, 'driver',
        `[📄 ${docName}]`, `10:${String(2 + i).padStart(2, '0')}`));

      // Bot confirms + flip thumbnail
      schedule(400, () => {
        addWAMsg(chat, 'bot',
          `${docName} verificado ✓`, `10:${String(2 + i).padStart(2, '0')}`);
        flipDocToGreen(docName);
      });
    });

    // 5. Bot final message
    schedule(700, () => addWAMsg(chat, 'bot',
      'Todos los documentos verificados! Tu solicitud esta completa.', '10:07'));

    // 6. OCR section fades in (with scan animation then results)
    schedule(500, () => {
      const ocrSection = document.getElementById('modal-ocr-section');
      const ocr = document.getElementById('modal-ocr');
      ocr.innerHTML = `
        <div class="relative bg-white/5 rounded-xl p-6 overflow-hidden" style="min-height: 160px;">
          <div class="scan-line"></div>
          <div class="text-center text-gray-400 mt-12">
            <p class="text-sm animate-pulse">Procesando con AI...</p>
            <p class="text-xs text-gray-600 mt-2">Extrayendo campos de INE</p>
          </div>
        </div>`;
      ocrSection.classList.add('visible');
    });

    // 7. OCR results replace scan animation
    schedule(1500, () => {
      renderOCRResults(app, document.getElementById('modal-ocr'));
    });

    // 8. Credit gauge (LTO only)
    schedule(300, () => {
      if (app.product === 'LTO' && app.creditScore !== null) {
        renderCreditGauge(app.creditScore);
        document.getElementById('modal-credit-section').classList.add('visible');
      }
    });

    // 9. Timeline lights up
    schedule(500, () => {
      renderTimelineAllActive(app);
      document.getElementById('modal-timeline-section').classList.add('visible');
    });

    // 10. Completion banner
    schedule(500, () => {
      document.getElementById('modal-completion').classList.add('visible');
    });

    // 11. Replay link
    schedule(500, () => {
      document.getElementById('modal-replay').classList.add('visible');
    });
  }

  // ---------- Replay ----------
  function replayDemo() {
    if (!selectedApplicant) return;
    cancelDemo();
    renderDocThumbnailsPending(selectedApplicant);
    document.getElementById('modal-wa-chat').innerHTML = '';
    document.getElementById('modal-ocr').innerHTML = '';
    document.getElementById('modal-ocr-section').classList.remove('visible');
    document.getElementById('modal-credit-section').classList.remove('visible');
    document.getElementById('modal-timeline-section').classList.remove('visible');
    document.getElementById('modal-completion').classList.remove('visible');
    document.getElementById('modal-replay').classList.remove('visible');
    document.getElementById('modal-credit-gauge').innerHTML = '';
    demoTimeouts.push(setTimeout(() => runAutoDemo(selectedApplicant), 300));
  }

  document.getElementById('btn-replay').addEventListener('click', replayDemo);

  // ---------- OCR Results ----------
  function renderOCRResults(app, container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="relative bg-gradient-to-br from-blue-900/30 to-blue-800/10 rounded-xl p-4 border border-blue-500/20 ocr-highlight">
          <div class="flex items-center gap-2 mb-3">
            ${L.lucideIcon('shield-check', 'w-4 h-4 text-blue-400')}
            <span class="text-xs font-semibold text-blue-400 uppercase tracking-wider">INE / Credencial de Elector</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span class="text-xs text-gray-500">Nombre</span>
              <p class="font-medium">${app.fullName}</p>
              <span class="text-xs text-green-400">98% confianza</span>
            </div>
            <div>
              <span class="text-xs text-gray-500">CURP</span>
              <p class="font-mono text-xs">${app.curp}</p>
              <span class="text-xs text-green-400">96% confianza</span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Direccion</span>
              <p class="text-xs text-gray-300">${aPick(['Av. Insurgentes 1234', 'Calle Reforma 567', 'Blvd. Periferico 890'])}, CDMX</p>
              <span class="text-xs text-yellow-400">87% confianza</span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Vigencia</span>
              <p>2029</p>
              <span class="text-xs text-green-400">99% confianza</span>
            </div>
          </div>
        </div>

        <div class="bg-white/5 rounded-xl p-4 space-y-2">
          <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Validacion AI</h4>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-300">Documento autentico</span>
            <span class="text-sm font-semibold text-green-400">SI (96%)</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-300">Vigencia</span>
            <span class="text-sm font-semibold text-green-400">VIGENTE</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-300">CURP validado (RENAPO)</span>
            <span class="text-sm font-semibold text-green-400">SI</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-300">Coincidencia foto/rostro</span>
            <span class="text-sm font-semibold text-green-400">94%</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-300">Lista negra</span>
            <span class="text-sm font-semibold text-green-400">LIMPIO</span>
          </div>
          ${app.product === 'LTO' ? `
          <div class="mt-3 pt-3 border-t border-white/5">
            <h5 class="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Evaluacion Financiera (LTO)</h5>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Ingresos verificados (Palenca)</span>
              <span class="text-sm font-semibold text-green-400">$8,200/sem</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Score crediticio alternativo</span>
              <span class="text-sm font-semibold text-green-400">${app.creditScore}/100</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Capacidad de pago</span>
              <span class="text-sm font-semibold text-green-400">APROBADO</span>
            </div>
          </div>
          ` : ''}
        </div>

        <div class="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
          <p class="text-green-400 font-semibold">Verificacion completa — Auto-aprobado</p>
          <p class="text-xs text-gray-400 mt-1">Tiempo total de procesamiento: 23 segundos</p>
        </div>
      </div>`;
  }

  // ---------- Credit Score Gauge ----------
  function renderCreditGauge(score) {
    const container = document.getElementById('modal-credit-gauge');
    const radius = 45;
    const cx = 60, cy = 55;
    const startAngle = Math.PI;
    const endAngle = 0;
    const totalArc = Math.PI;

    // Background arc path
    function arcPath(start, end) {
      const x1 = cx + radius * Math.cos(start);
      const y1 = cy - radius * Math.sin(start);
      const x2 = cx + radius * Math.cos(end);
      const y2 = cy - radius * Math.sin(end);
      const large = (start - end) > Math.PI ? 1 : 0;
      return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 0 ${x2} ${y2}`;
    }

    // Score proportion (0-100)
    const pct = Math.min(score, 100) / 100;
    const scoreAngle = startAngle - pct * totalArc;

    // Color
    let gaugeColor;
    if (score < 40) gaugeColor = '#EF4444';
    else if (score < 60) gaugeColor = '#EAB308';
    else gaugeColor = '#22C55E';

    // Level
    let level;
    if (score >= 75) level = 'Excelente';
    else if (score >= 60) level = 'Bueno';
    else if (score >= 40) level = 'Regular';
    else level = 'Bajo';

    container.innerHTML = `
      <div class="flex items-center gap-6">
        <div class="relative flex-shrink-0">
          <svg width="120" height="70" viewBox="0 0 120 70">
            <path class="gauge-arc gauge-bg" d="${arcPath(startAngle, endAngle)}" stroke-width="8" />
            <path class="gauge-arc" d="${arcPath(startAngle, scoreAngle)}" stroke="${gaugeColor}" stroke-width="8" />
            <text x="${cx}" y="${cy - 5}" text-anchor="middle" font-size="20" font-weight="700" fill="${gaugeColor}">${score}</text>
            <text x="${cx}" y="${cy + 10}" text-anchor="middle" font-size="9" fill="#6B7280">de 100</text>
          </svg>
        </div>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Nivel:</span>
            <span class="font-medium" style="color:${gaugeColor}">${level}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Ingreso verificado:</span>
            <span class="text-gray-300">$8,200/sem</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Historial plataforma:</span>
            <span class="text-gray-300">6+ meses</span>
          </div>
        </div>
      </div>`;
  }

  // ---------- Timeline ----------
  function renderTimelineAllActive(app) {
    const steps = [
      { label: 'Solicitud', time: '10:00' },
      { label: 'Documentos', time: '10:02' },
      { label: 'OCR / AI', time: '10:04' },
      { label: 'Revision', time: '10:05' },
      { label: 'Decision', time: '10:07' },
    ];

    document.getElementById('modal-timeline').innerHTML = steps.map((s) => `
      <div class="timeline-step text-center active">
        <div class="w-8 h-8 rounded-full bg-[#FF5A00] flex items-center justify-center mx-auto text-xs font-bold text-white">
          ${L.lucideIcon('check-circle', 'w-4 h-4')}
        </div>
        <p class="text-xs font-medium mt-2 text-white">${s.label}</p>
        <p class="text-xs text-gray-400">${s.time}</p>
      </div>
    `).join('');
  }

  // ---------- Toast Notifications ----------
  function showToast(message, icon, colorClass) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${L.lucideIcon(icon || 'check-circle', 'w-4 h-4 ' + (colorClass || 'text-green-400'))} <span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ---------- Init ----------
  renderKanban();
})();
