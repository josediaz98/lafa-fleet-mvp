// ============================================================
// LAFA Collections Bot — Chat Simulation + Agent Dashboard
// ============================================================
(function () {
  const L = window.LAFA;

  // ---------- Init ----------
  L.initPage('collections', 'Bot de Cobranza WhatsApp',
    '',
    { 'phone-icon': 'phone' });

  // ---------- Scenarios ----------
  const SCENARIOS = {
    cooperative: {
      driver: L.DRIVERS.find(d => d.vehicleId === 'LAF-042') || L.DRIVERS[41],
      name: 'Carlos Mendoza López',
      shortName: 'Carlos Mendoza',
      initials: 'CM',
      photo: '../images/carlos.jpg',
      meta: 'LTO — LAF-042 — DiDi — Condesa',
      overdue: 7,
      amount: 4200,
      rating: 4.7,
      riskScore: 35,
      riskColor: L.COLORS.green,
      riskLabel: 'Riesgo Bajo',
      escalationPct: 35,
      messages: [
        { from: 'bot', text: 'Hola Carlos, te recordamos que tu pago semanal de $4,200 MXN vence el viernes 14 de marzo. Puedes pagar aquí: pay.lafa.com.mx/042', time: '12 Mar, 10:00', intent: null },
        { from: 'bot', text: 'Hola Carlos, tu pago de $4,200 MXN venció hoy. Si ya realizaste el pago, envía tu comprobante. Si necesitas ayuda, escríbenos.', time: '14 Mar, 09:00', intent: null },
        { from: 'driver', text: 'Tuve un problema con mi cuenta, no pude depositar. ¿Puedo pagar el lunes?', time: '14 Mar, 14:32', intent: { label: 'Solicitud de extensión', confidence: 92, action: 'Ofrecer plan de pago', actionColor: 'text-green-400' } },
        { from: 'bot', text: 'Entiendo, Carlos. Tenemos opciones para ti:\n\n1️⃣ Pago completo el lunes 17 (sin recargo)\n2️⃣ 50% hoy + 50% el lunes (+$50 recargo)\n3️⃣ Plan 3 semanas ($1,450/sem + $150 recargo)\n\n¿Cuál prefieres?', time: '14 Mar, 14:33', intent: null },
        { from: 'driver', text: 'La 2, pago la mitad hoy y la otra el lunes', time: '14 Mar, 14:40', intent: { label: 'Aceptación de plan parcial', confidence: 97, action: 'Generar link de pago parcial', actionColor: 'text-green-400' } },
        { from: 'bot', text: 'Perfecto. Tu plan queda así:\n\n✅ Hoy: $2,100 MXN\n📅 Lun 17 Mar: $2,150 MXN (incluye recargo)\n\nLink de pago: pay.lafa.com.mx/042-partial\n\nUna vez confirmado, actualizaremos tu cuenta.', time: '14 Mar, 14:41', intent: null },
        { from: 'system', text: '✅ Caso resuelto sin escalamiento humano. Pago parcial recibido $2,100 MXN.', time: '14 Mar, 15:12', intent: { label: 'Caso resuelto', confidence: 100, action: 'Cerrar caso — monitorear pago pendiente', actionColor: 'text-green-400' } },
      ],
    },
    evasive: {
      driver: L.DRIVERS[15] || L.DRIVERS[10],
      name: 'Roberto Flores Ramírez',
      shortName: 'Roberto Flores',
      initials: 'RF',
      photo: '../images/luis.jpg',
      meta: 'LTO — LAF-016 — Uber — Roma Norte',
      overdue: 14,
      amount: 8400,
      rating: 4.3,
      riskScore: 68,
      riskColor: L.COLORS.yellow,
      riskLabel: 'Riesgo Medio-Alto',
      escalationPct: 65,
      messages: [
        { from: 'bot', text: 'Hola Roberto, tu pago de $4,200 MXN tiene 7 días de retraso. Es importante ponerte al corriente para mantener tu cuenta activa.', time: '7 Mar, 09:00', intent: null },
        { from: 'driver', text: 'Ya voy a pagar, déjame en paz', time: '7 Mar, 11:15', intent: { label: 'Evasión / Irritación', confidence: 85, action: 'Mantener tono empático, recordar consecuencias', actionColor: 'text-yellow-400' } },
        { from: 'bot', text: 'Entiendo Roberto. Solo queremos ayudarte. Tu saldo pendiente es de $8,400 MXN (2 semanas). Después del día 14 el caso pasa a revisión. ¿Te gustaría un plan de pago?', time: '7 Mar, 11:16', intent: null },
        { from: 'driver', text: 'No tengo dinero ahorita, la próxima semana sin falta', time: '8 Mar, 16:42', intent: { label: 'Promesa vaga sin compromiso', confidence: 78, action: 'Solicitar fecha específica + monto', actionColor: 'text-yellow-400' } },
        { from: 'bot', text: 'Roberto, necesitamos una fecha y monto específicos para registrar tu compromiso. ¿Puedes confirmar cuánto y cuándo? Sin esto, el caso avanza a revisión el viernes.', time: '8 Mar, 16:43', intent: null },
        { from: 'driver', text: '...', time: '', intent: { label: 'Sin respuesta (48h)', confidence: 90, action: 'Escalar a agente humano', actionColor: 'text-red-400' } },
        { from: 'system', text: '⚠️ Sin respuesta después de 48h. Caso escalado a agente humano. Próximo paso: llamada telefónica.', time: '10 Mar, 16:43', intent: { label: 'Escalamiento automático', confidence: 100, action: 'Intervención humana requerida', actionColor: 'text-red-400' } },
      ],
    },
    unresponsive: {
      driver: L.DRIVERS[25] || L.DRIVERS[20],
      name: 'María García Torres',
      shortName: 'María García',
      initials: 'MG',
      photo: '../images/ana.jpg',
      meta: 'LTO — LAF-026 — DiDi — Del Valle',
      overdue: 21,
      amount: 12600,
      rating: 4.1,
      riskScore: 89,
      riskColor: L.COLORS.red,
      riskLabel: 'Riesgo Alto',
      escalationPct: 90,
      messages: [
        { from: 'bot', text: 'Hola María, tu pago semanal de $4,200 MXN vence mañana. Recuerda pagar a tiempo para evitar recargos.', time: '28 Feb, 10:00', intent: null },
        { from: 'bot', text: 'María, tu pago tiene 7 días de retraso ($4,200). Por favor comunícate con nosotros.', time: '7 Mar, 09:00', intent: null },
        { from: 'bot', text: 'María, acumulas 14 días de retraso y $8,400 MXN pendientes. Tu caso será revisado por nuestro equipo legal si no recibimos respuesta en 48h.', time: '14 Mar, 09:00', intent: null },
        { from: 'bot', text: '⚠️ Último aviso: tu deuda es de $12,600 MXN (3 semanas). Sin respuesta, procederemos con recuperación del vehículo según contrato.', time: '21 Mar, 09:00', intent: null },
        { from: 'system', text: '🔴 21 días sin respuesta. GPS tracking activado. Caso transferido a equipo legal para recuperación de vehículo.', time: '21 Mar, 12:00', intent: { label: 'Recuperación de activo', confidence: 100, action: 'Proceso legal + GPS recovery', actionColor: 'text-red-400' } },
      ],
    },
  };

  let currentScenario = 'cooperative';
  let animationTimer = null;

  // ---------- Render Scenario ----------
  function loadScenario(key) {
    currentScenario = key;
    const sc = SCENARIOS[key];
    const driver = sc.driver;

    // Update header
    document.getElementById('chat-driver-name').textContent = sc.shortName;
    document.getElementById('chat-driver-sub').textContent = `${driver.product} — ${driver.vehicleId} — ${sc.overdue} días de retraso`;

    // Avatars
    document.getElementById('chat-avatar').src = sc.photo;
    document.getElementById('agent-avatar').src = sc.photo;

    // Agent dashboard
    document.getElementById('agent-name').textContent = sc.name;
    document.getElementById('agent-meta').textContent = sc.meta;
    document.getElementById('agent-overdue').textContent = sc.overdue;
    document.getElementById('agent-amount').textContent = L.formatMXN(sc.amount);
    document.getElementById('agent-rating').textContent = sc.rating;

    // Payment history
    const paymentsEl = document.getElementById('agent-payments');
    paymentsEl.innerHTML = driver.payments.slice(-8).map(p => `
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-500">Sem ${p.week}</span>
        <span class="text-gray-300">${L.formatMXN(p.amount)}</span>
        ${L.statusBadge(p.status)}
      </div>
    `).join('');

    // Reset intent
    document.getElementById('intent-label').textContent = 'Esperando mensaje...';
    document.getElementById('intent-confidence').style.width = '0%';
    document.getElementById('intent-action').textContent = '—';
    document.getElementById('intent-action').className = 'text-sm font-medium';

    // Risk score
    const riskArc = document.getElementById('risk-arc');
    riskArc.setAttribute('stroke', sc.riskColor);
    riskArc.setAttribute('stroke-dasharray', `${sc.riskScore}, 100`);
    document.getElementById('risk-value').textContent = sc.riskScore;
    document.getElementById('risk-value').style.color = sc.riskColor;
    document.getElementById('risk-label').textContent = sc.riskLabel;
    document.getElementById('risk-label').style.color = sc.riskColor;

    // Escalation
    document.getElementById('escalation-fill').style.width = sc.escalationPct + '%';

    // Clear chat
    document.getElementById('chat-messages').innerHTML = '';
  }

  // ---------- Animate Messages ----------
  function playMessages() {
    const sc = SCENARIOS[currentScenario];
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';

    if (animationTimer) clearTimeout(animationTimer);

    let i = 0;
    function showNext() {
      if (i >= sc.messages.length) return;

      // Show typing indicator first
      const typing = document.createElement('div');
      typing.className = sc.messages[i].from === 'driver' ? 'msg-driver p-3' : (sc.messages[i].from === 'system' ? 'msg-system p-3' : 'msg-bot p-3');
      typing.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
      container.appendChild(typing);
      container.scrollTop = container.scrollHeight;

      animationTimer = setTimeout(() => {
        // Replace typing with actual message
        const msg = sc.messages[i];
        typing.innerHTML = `
          <p class="text-sm text-white whitespace-pre-line">${msg.text}</p>
          ${msg.time ? `<p class="text-[10px] text-gray-500 mt-1 text-right">${msg.time}</p>` : ''}
        `;
        container.scrollTop = container.scrollHeight;

        // Update intent if applicable
        if (msg.intent) {
          document.getElementById('intent-label').textContent = msg.intent.label;
          document.getElementById('intent-confidence').style.width = msg.intent.confidence + '%';
          document.getElementById('intent-action').textContent = msg.intent.action;
          document.getElementById('intent-action').className = `text-sm font-medium ${msg.intent.actionColor}`;
        }

        i++;
        if (i < sc.messages.length) {
          animationTimer = setTimeout(showNext, 1500);
        }
      }, 1200);
    }

    showNext();
  }

  // ---------- Event Listeners ----------
  document.getElementById('scenario-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-pill');
    if (!tab) return;
    document.querySelectorAll('#scenario-tabs .filter-pill').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadScenario(tab.dataset.scenario);
    playMessages();
  });

  // ---------- Init ----------
  loadScenario('cooperative');
  setTimeout(playMessages, 500);
})();
