// ============================================================
// LAFA Collections Bot — Chat Simulation + Agent Dashboard
// ============================================================
(function () {
  const L = window.LAFA;

  // ---------- Init ----------
  L.initPage('collections', t('collections.title'),
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
      riskLabelKey: 'collections.risk.low',
      escalationPct: 35,
      messages: [
        { from: 'bot', text: 'Hola Carlos, te recordamos que tu pago semanal de $4,200 MXN vence el viernes 14 de marzo. Puedes pagar aquí: pay.lafa.com.mx/042', text_en: 'Hi Carlos, this is a reminder that your weekly payment of $4,200 MXN is due on Friday March 14. You can pay here: pay.lafa.com.mx/042', time: '12 Mar, 10:00', intent: null },
        { from: 'bot', text: 'Hola Carlos, tu pago de $4,200 MXN venció hoy. Si ya realizaste el pago, envía tu comprobante. Si necesitas ayuda, escríbenos.', text_en: 'Hi Carlos, your $4,200 MXN payment was due today. If you already paid, send your receipt. If you need help, write to us.', time: '14 Mar, 09:00', intent: null },
        { from: 'driver', text: 'Tuve un problema con mi cuenta, no pude depositar. ¿Puedo pagar el lunes?', text_en: 'I had an issue with my account, I couldn\'t deposit. Can I pay on Monday?', time: '14 Mar, 14:32', intent: { label: 'Solicitud de extensión', label_en: 'Extension request', confidence: 92, action: 'Ofrecer plan de pago', action_en: 'Offer payment plan', actionColor: 'text-green-400' } },
        { from: 'bot', text: 'Entiendo, Carlos. Tenemos opciones para ti:\n\n1️⃣ Pago completo el lunes 17 (sin recargo)\n2️⃣ 50% hoy + 50% el lunes (+$50 recargo)\n3️⃣ Plan 3 semanas ($1,450/sem + $150 recargo)\n\n¿Cuál prefieres?', text_en: 'I understand, Carlos. We have options for you:\n\n1️⃣ Full payment Monday 17 (no surcharge)\n2️⃣ 50% today + 50% Monday (+$50 surcharge)\n3️⃣ 3-week plan ($1,450/wk + $150 surcharge)\n\nWhich do you prefer?', time: '14 Mar, 14:33', intent: null },
        { from: 'driver', text: 'La 2, pago la mitad hoy y la otra el lunes', text_en: 'Option 2, I\'ll pay half today and the rest on Monday', time: '14 Mar, 14:40', intent: { label: 'Aceptación de plan parcial', label_en: 'Partial plan acceptance', confidence: 97, action: 'Generar link de pago parcial', action_en: 'Generate partial payment link', actionColor: 'text-green-400' } },
        { from: 'bot', text: 'Perfecto. Tu plan queda así:\n\n✅ Hoy: $2,100 MXN\n📅 Lun 17 Mar: $2,150 MXN (incluye recargo)\n\nLink de pago: pay.lafa.com.mx/042-partial\n\nUna vez confirmado, actualizaremos tu cuenta.', text_en: 'Perfect. Your plan is:\n\n✅ Today: $2,100 MXN\n📅 Mon Mar 17: $2,150 MXN (includes surcharge)\n\nPayment link: pay.lafa.com.mx/042-partial\n\nOnce confirmed, we\'ll update your account.', time: '14 Mar, 14:41', intent: null },
        { from: 'system', text: '✅ Caso resuelto sin escalamiento humano. Pago parcial recibido $2,100 MXN.', text_en: '✅ Case resolved without human escalation. Partial payment received $2,100 MXN.', time: '14 Mar, 15:12', intent: { label: 'Caso resuelto', label_en: 'Case resolved', confidence: 100, action: 'Cerrar caso — monitorear pago pendiente', action_en: 'Close case — monitor pending payment', actionColor: 'text-green-400' } },
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
      riskLabelKey: 'collections.risk.medHigh',
      escalationPct: 65,
      messages: [
        { from: 'bot', text: 'Hola Roberto, tu pago de $4,200 MXN tiene 7 días de retraso. Es importante ponerte al corriente para mantener tu cuenta activa.', text_en: 'Hi Roberto, your $4,200 MXN payment is 7 days overdue. It\'s important to get current to keep your account active.', time: '7 Mar, 09:00', intent: null },
        { from: 'driver', text: 'Ya voy a pagar, déjame en paz', text_en: 'I\'m going to pay, leave me alone', time: '7 Mar, 11:15', intent: { label: 'Evasión / Irritación', label_en: 'Evasion / Irritation', confidence: 85, action: 'Mantener tono empático, recordar consecuencias', action_en: 'Maintain empathetic tone, remind of consequences', actionColor: 'text-yellow-400' } },
        { from: 'bot', text: 'Entiendo Roberto. Solo queremos ayudarte. Tu saldo pendiente es de $8,400 MXN (2 semanas). Después del día 14 el caso pasa a revisión. ¿Te gustaría un plan de pago?', text_en: 'I understand Roberto. We just want to help. Your outstanding balance is $8,400 MXN (2 weeks). After day 14 the case goes to review. Would you like a payment plan?', time: '7 Mar, 11:16', intent: null },
        { from: 'driver', text: 'No tengo dinero ahorita, la próxima semana sin falta', text_en: 'I don\'t have money right now, next week for sure', time: '8 Mar, 16:42', intent: { label: 'Promesa vaga sin compromiso', label_en: 'Vague promise without commitment', confidence: 78, action: 'Solicitar fecha específica + monto', action_en: 'Request specific date + amount', actionColor: 'text-yellow-400' } },
        { from: 'bot', text: 'Roberto, necesitamos una fecha y monto específicos para registrar tu compromiso. ¿Puedes confirmar cuánto y cuándo? Sin esto, el caso avanza a revisión el viernes.', text_en: 'Roberto, we need a specific date and amount to register your commitment. Can you confirm how much and when? Without this, the case moves to review on Friday.', time: '8 Mar, 16:43', intent: null },
        { from: 'driver', text: '...', text_en: '...', time: '', intent: { label: 'Sin respuesta (48h)', label_en: 'No response (48h)', confidence: 90, action: 'Escalar a agente humano', action_en: 'Escalate to human agent', actionColor: 'text-red-400' } },
        { from: 'system', text: '⚠️ Sin respuesta después de 48h. Caso escalado a agente humano. Próximo paso: llamada telefónica.', text_en: '⚠️ No response after 48h. Case escalated to human agent. Next step: phone call.', time: '10 Mar, 16:43', intent: { label: 'Escalamiento automático', label_en: 'Automatic escalation', confidence: 100, action: 'Intervención humana requerida', action_en: 'Human intervention required', actionColor: 'text-red-400' } },
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
      riskLabelKey: 'collections.risk.high',
      escalationPct: 90,
      messages: [
        { from: 'bot', text: 'Hola María, tu pago semanal de $4,200 MXN vence mañana. Recuerda pagar a tiempo para evitar recargos.', text_en: 'Hi María, your weekly payment of $4,200 MXN is due tomorrow. Remember to pay on time to avoid surcharges.', time: '28 Feb, 10:00', intent: null },
        { from: 'bot', text: 'María, tu pago tiene 7 días de retraso ($4,200). Por favor comunícate con nosotros.', text_en: 'María, your payment is 7 days overdue ($4,200). Please contact us.', time: '7 Mar, 09:00', intent: null },
        { from: 'bot', text: 'María, acumulas 14 días de retraso y $8,400 MXN pendientes. Tu caso será revisado por nuestro equipo legal si no recibimos respuesta en 48h.', text_en: 'María, you have accumulated 14 days overdue and $8,400 MXN pending. Your case will be reviewed by our legal team if we don\'t receive a response in 48h.', time: '14 Mar, 09:00', intent: null },
        { from: 'bot', text: '⚠️ Último aviso: tu deuda es de $12,600 MXN (3 semanas). Sin respuesta, procederemos con recuperación del vehículo según contrato.', text_en: '⚠️ Final notice: your debt is $12,600 MXN (3 weeks). Without a response, we will proceed with vehicle recovery per contract.', time: '21 Mar, 09:00', intent: null },
        { from: 'system', text: '🔴 21 días sin respuesta. GPS tracking activado. Caso transferido a equipo legal para recuperación de vehículo.', text_en: '🔴 21 days without response. GPS tracking activated. Case transferred to legal team for vehicle recovery.', time: '21 Mar, 12:00', intent: { label: 'Recuperación de activo', label_en: 'Asset recovery', confidence: 100, action: 'Proceso legal + GPS recovery', action_en: 'Legal process + GPS recovery', actionColor: 'text-red-400' } },
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
    document.getElementById('chat-driver-sub').textContent = `${driver.product} — ${driver.vehicleId} — ${t('collections.daysDelay', { n: sc.overdue })}`;

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
    paymentsEl.innerHTML = driver.payments.slice(-5).map(p => `
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-500">${t('collections.weekLabel', { n: p.week })}</span>
        <span class="text-gray-300">${L.formatMXN(p.amount)}</span>
        ${L.statusBadge(p.status)}
      </div>
    `).join('');

    // Reset intent
    document.getElementById('intent-label').textContent = t('collections.agent.waiting');
    document.getElementById('intent-confidence').style.width = '0%';
    document.getElementById('intent-action').textContent = t('collections.agent.noAction');
    document.getElementById('intent-action').className = 'text-xs font-medium';

    // Risk score
    const riskArc = document.getElementById('risk-arc');
    riskArc.setAttribute('stroke', sc.riskColor);
    riskArc.setAttribute('stroke-dasharray', `${sc.riskScore}, 100`);
    document.getElementById('risk-value').textContent = sc.riskScore;
    document.getElementById('risk-value').style.color = sc.riskColor;
    document.getElementById('risk-label').textContent = t(sc.riskLabelKey);
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
        const msgText = localField(msg, 'text');
        typing.innerHTML = `
          <p class="text-sm text-white whitespace-pre-line">${msgText}</p>
          ${msg.time ? `<p class="text-[10px] text-gray-500 mt-1 text-right">${msg.time}</p>` : ''}
        `;
        container.scrollTop = container.scrollHeight;

        // Update intent if applicable
        if (msg.intent) {
          document.getElementById('intent-label').textContent = localField(msg.intent, 'label');
          document.getElementById('intent-confidence').style.width = msg.intent.confidence + '%';
          document.getElementById('intent-action').textContent = localField(msg.intent, 'action');
          document.getElementById('intent-action').className = `text-xs font-medium ${msg.intent.actionColor}`;
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
    const tab = e.target.closest('.scenario-card');
    if (!tab) return;
    document.querySelectorAll('#scenario-tabs .scenario-card').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadScenario(tab.dataset.scenario);
    playMessages();
  });

  // ---------- Language change ----------
  window.addEventListener('langchange', () => {
    loadScenario(currentScenario);
    playMessages();
    const titleEl = document.querySelector('#page-header h1');
    if (titleEl) titleEl.textContent = t('collections.title');
  });

  // ---------- Init ----------
  loadScenario('cooperative');
  setTimeout(playMessages, 500);
})();
