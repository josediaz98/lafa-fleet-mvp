// ============================================================
// LAFA AI Roadmap — Project & Milestone Data
// Extracted from roadmap.js for maintainability
// ============================================================

window.ROADMAP_DATA = {

// ---------- Project Data (from ai-roadmap.md) ----------
PROJECTS: [
  {
    id: 'P0.1', name: 'Base de Datos Operacional', track: 'foundation', phase: 0,
    description: 'PostgreSQL centralizado: conductores, vehículos, pagos, carga, mantenimiento',
    startMonth: 1, endMonth: 2, effortWeeks: 4,
    primaryUsers: ['Todos los equipos'],
    stack: ['PostgreSQL', 'FastAPI', 'Alembic', 'AWS RDS'],
    dependsOn: [],
    blocks: ['P0.2', 'P0.3', 'P0.4', 'P0.5a', 'P0.5b', 'P0.5c', 'P0.5d', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'No existe una base de datos centralizada. La información de conductores, vehículos, pagos, mantenimiento y carga vive dispersa en procesos manuales sin sistema centralizado. A escala actual ya es doloroso; al crecer 10x es imposible.',
    deliverables: ['Esquema PostgreSQL (drivers, vehicles, payments, contracts, charging_events, maintenance_logs, shifts, telematics)', 'ETL desde Conekta/SPEI, Geotab, fuentes existentes', 'API FastAPI para CRUD + migraciones con Alembic'],
    architecture: 'PostgreSQL + FastAPI + Alembic migrations + AWS RDS. ETL: Conekta webhooks → payments, Geotab API → telematics, manual entry → maintenance/charging, legacy data migration → all tables.',
    metrics: [
      { kpi: 'Tablas operativas', before: '0 (sin sistema)', target: '8+ tablas normalizadas' },
      { kpi: 'Fuentes integradas', before: 'Manual', target: 'Conekta + Geotab + forms' }
    ],
    benchmark: null
  },
  {
    id: 'P0.2', name: 'Dashboard Básico (Metabase)', track: 'foundation', phase: 0,
    description: '4 dashboards Metabase: flota, pagos, vehículos, conductores',
    startMonth: 1, endMonth: 2, effortWeeks: 2,
    primaryUsers: ['Head of Product', 'CEO', 'Stakeholders'],
    stack: ['Metabase', 'PostgreSQL', 'AWS'],
    dependsOn: ['P0.1'],
    blocks: ['P7'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'El equipo de producto necesita transparencia para stakeholders y mejores decisiones. Hoy nadie puede responder "cómo va el negocio?" sin revisar múltiples fuentes manuales.',
    deliverables: ['Vista de flota: vehículos online, ingreso semanal, utilización %', 'Vista de pagos: % a tiempo, defaults, pipeline de cobranza', 'Vista de vehículos: batería %, downtime, mantenimiento pendiente', 'Vista de conductores: activos, onboarding, morosos'],
    architecture: 'Metabase open-source conectado a PostgreSQL (P0.1). Dashboards pre-construidos — sin frontend custom.',
    metrics: [
      { kpi: 'Tiempo para responder "cómo va el negocio?"', before: 'Horas (proceso manual)', target: '<10 segundos' },
      { kpi: 'Vistas operativas', before: '0', target: '4 dashboards' }
    ],
    benchmark: 'Shipday: 9 report types segmented by stakeholder (Sales, Drivers, Performance, Heatmap, etc). LAFA P0.2: 4 dashboard views. Evolve to 8+ segmented reports in P7.'
  },
  {
    id: 'P0.3', name: 'Tracking de Mantenimiento', track: 'foundation', phase: 0,
    description: 'Historial de servicio, alertas automáticas por km/tiempo, downtime tracking',
    startMonth: 1, endMonth: 2, effortWeeks: 2,
    primaryUsers: ['Fleet Ops Manager'],
    stack: ['FastAPI', 'PostgreSQL', 'WhatsApp API'],
    dependsOn: ['P0.1'],
    blocks: ['P4'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'LAFA mantiene los vehículos. Con la flota actual y crecimiento proyectado a miles de unidades, el tracking manual de mantenimiento es insostenible. Un vehículo fuera de servicio = conductor sin ingreso + vehículo sin generar revenue.',
    deliverables: ['CMS simple: historial de servicio, costos, próximo servicio, alertas', 'Alertas automáticas: "Vehículo LAF-042 necesita servicio en 500 km"', 'Dashboard en Metabase: vehículos con mantenimiento pendiente', 'Registro de downtime (para calcular utilización real)'],
    architecture: 'FastAPI + PostgreSQL + WhatsApp Business API para alertas automáticas al equipo de ops.',
    metrics: [
      { kpi: 'Vehículos con tracking', before: '0%', target: '100%' },
      { kpi: 'Alertas proactivas', before: '0', target: 'Automáticas por km/tiempo' }
    ],
    benchmark: 'Shipday: Tab-based task management (Current/Scheduled/Completed/Incomplete/History) with sortable columns. Pattern replicable for maintenance workflows.'
  },
  {
    id: 'P0.4', name: 'Dispatch de Turnos (WhatsApp)', track: 'dae', phase: 0,
    description: 'Asignación diaria de turnos y vehículos via WhatsApp con confirmación',
    startMonth: 2, endMonth: 2, effortWeeks: 2,
    primaryUsers: ['Fleet Ops Manager'],
    stack: ['WhatsApp API', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.1'],
    blocks: ['P5'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'Para el producto DaE, LAFA asigna turnos y vehículos. Sin sistema, la coordinación es via grupo de WhatsApp — propenso a errores, no escalable al crecer la flota.',
    deliverables: ['Notificación diaria al conductor: turno, vehículo, batería', 'Asignación de vehículo por disponibilidad y zona', 'Confirmación via WhatsApp (responder "OK" o "NO")', 'Vista de turnos en Metabase', 'Fase 2: Tablero Kanban visual (Turnos asignados | Vehículos disponibles) con drag-and-drop para asignación rápida (patrón Shipday Dispatch)'],
    architecture: 'WhatsApp Business API + FastAPI + PostgreSQL. Lógica de asignación basada en disponibilidad de vehículo y zona del conductor.',
    metrics: [
      { kpi: 'Turnos confirmados via sistema', before: '0%', target: '>90%' },
      { kpi: 'Tiempo de coordinación', before: '1-2 hrs/día', target: '<15 min/día' }
    ],
    benchmark: 'Shipday: Kanban dispatch (Assigned by driver | New Orders) with drag-and-drop. LAFA P0.4 MVP = WhatsApp; visual Kanban = Phase 2 upgrade when fleet exceeds 500 vehicles.'
  },
  {
    id: 'P0.5a', name: 'HR/Nómina (Runa/Worky)', track: 'dae', phase: 0,
    description: 'Integración Runa/Worky: nómina quincenal, IMSS, CFDI 4.0 automatizados',
    startMonth: 2, endMonth: 3, effortWeeks: 3,
    primaryUsers: ['HR/Payroll Admin'],
    stack: ['Runa/Worky API', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.1'],
    blocks: [],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'LAFA opera con nómina formal para todos los conductores DaE. La ley laboral mexicana requiere nómina quincenal, IMSS, vacaciones, aguinaldo, PTU y CFDI 4.0. Al escalar, nómina manual = riesgo de cumplimiento.',
    deliverables: ['Conectar SaaS de nómina (Runa/Worky) a P0.1 via API', 'Sincronizar tabla drivers (tipo empleado) con sistema de nómina', 'Automatizar: alta de nuevo empleado, nómina quincenal, IMSS', 'Vista en Metabase: costo de nómina por conductor, estatus IMSS'],
    architecture: 'Comprar, no construir. Runa (~MXN $99/empleado/mes) o Worky. El trabajo es integración, no construcción.',
    metrics: [
      { kpi: 'Nómina automatizada', before: '0%', target: '100%' },
      { kpi: 'Errores de nómina', before: 'Frecuentes', target: '<1%' }
    ],
    benchmark: null
  },
  {
    id: 'P0.5b', name: 'Estado de Cuenta LTO', track: 'lto', phase: 0,
    description: 'Bot WhatsApp: saldo, pagos, vencimientos + PDF mensual automático',
    startMonth: 2, endMonth: 3, effortWeeks: 2,
    primaryUsers: ['Customer Support Lead'],
    stack: ['WhatsApp API', 'FastAPI', 'PostgreSQL', 'WeasyPrint'],
    dependsOn: ['P0.1'],
    blocks: ['P2'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'Los conductores LTO realizan pagos mensuales significativos sin visibilidad de su cuenta. No conocen su saldo, historial de pagos, ni fecha de vencimiento. Esto genera llamadas de soporte innecesarias y erosiona la confianza.',
    deliverables: ['WhatsApp bot: "Estado de cuenta" → saldo, últimos 5 pagos, próximo vencimiento', 'Estado de cuenta mensual PDF automático via WhatsApp', 'Reduce consultas de soporte 60-80%'],
    architecture: 'WhatsApp Business API + FastAPI + PostgreSQL (P0.1) + WeasyPrint para generación de PDF.',
    metrics: [
      { kpi: 'Consultas de soporte por estado de cuenta', before: '100%', target: '-60-80%' },
      { kpi: 'Satisfacción del conductor LTO', before: 'Baja (sin visibilidad)', target: 'Alta (autoservicio)' }
    ],
    benchmark: 'Shipday: Daily Payment tab per driver — full breakdown (deliveries, base pay, tips, adjustments, total). LAFA: weekly breakdown (lease payment, insurance deduction, maintenance credit, net amount). Payment transparency = driver retention.'
  },
  {
    id: 'P0.5c', name: 'Reporte de Incidentes', track: 'foundation', phase: 0,
    description: 'Formulario guiado WhatsApp: tipo, ubicación, fotos → tabla estructurada',
    startMonth: 2, endMonth: 3, effortWeeks: 2,
    primaryUsers: ['Fleet Ops Manager', 'Insurance Admin'],
    stack: ['WhatsApp API', 'FastAPI', 'PostgreSQL', 'AWS S3'],
    dependsOn: ['P0.1'],
    blocks: ['P0.5d'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'Accidentes, robos y fallas mecánicas se reportan via mensajes ad-hoc en grupos de WhatsApp. No hay registro estructurado, no hay tracking, no hay datos para reclamos de seguro.',
    deliverables: ['Formulario estructurado WhatsApp: flujo guiado (tipo, ubicación, fotos, descripción)', 'Datos en tabla incidents en PostgreSQL', 'Dashboard en Metabase: incidentes abiertos, tiempo de resolución, costos', 'Auto-notificación a ops + contacto de seguro'],
    architecture: 'WhatsApp Business API + FastAPI + PostgreSQL (P0.1) + AWS S3 (fotos). Flujo guiado de reporte via bot conversacional.',
    metrics: [
      { kpi: 'Incidentes con datos estructurados', before: '0%', target: '100%' },
      { kpi: 'Tiempo promedio de resolución', before: 'Sin tracking', target: 'Medido y visible' }
    ],
    benchmark: null
  },
  {
    id: 'P0.5d', name: 'Módulo de Seguros', track: 'foundation', phase: 0,
    description: 'Tracking de pólizas, renovaciones y reclamos vinculado a vehículos',
    startMonth: 2, endMonth: 3, effortWeeks: 2,
    primaryUsers: ['Finance Lead', 'Fleet Ops Manager'],
    stack: ['FastAPI', 'PostgreSQL', 'Metabase', 'WhatsApp API'],
    dependsOn: ['P0.1', 'P0.5c'],
    blocks: [],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'El costo de seguros crece linealmente con la flota — a escala completa, representa decenas de millones anuales. El tracking de pólizas, renovaciones y reclamos no está estructurado. Una renovación perdida = vehículo sin seguro en la calle.',
    deliverables: ['Tablas: insurance_policies + claims vinculadas a vehículos e incidentes', 'Dashboard: pólizas por vencer en 30/60/90 días, reclamos activos, costo por vehículo', 'Alertas automáticas de renovación via WhatsApp', 'Vinculación con reporte de incidentes (P0.5c)'],
    architecture: 'FastAPI + PostgreSQL (P0.1) + Metabase + WhatsApp para alertas automáticas de renovación.',
    metrics: [
      { kpi: 'Pólizas con tracking', before: '0%', target: '100%' },
      { kpi: 'Renovaciones perdidas', before: 'Riesgo alto', target: '0 (alertas proactivas)' }
    ],
    benchmark: null
  },
  {
    id: 'P1', name: 'Onboarding AI', track: 'foundation', phase: 1,
    description: 'Clasificación de documentos con Vision AI + validación automática de reglas',
    startMonth: 3, endMonth: 4, effortWeeks: 4,
    primaryUsers: ['Onboarding Coordinator'],
    stack: ['WhatsApp API', 'GPT-4o Vision', 'FastAPI', 'PostgreSQL', 'Metabase'],
    dependsOn: ['P0.1'],
    blocks: ['P2', 'P6'],
    impact: { 500: [45000, 75000], 1000: [90000, 150000], 2000: [180000, 300000] },
    problem: 'Cada conductor nuevo requiere que un coordinador recopile 5+ documentos por WhatsApp, los valide manualmente contra foto y base de datos, y registre el resultado. Con una flota pequeña, una persona lo resuelve. Al escalar, la rotación natural genera cientos de onboardings mensuales — físicamente imposible sin automatización.',
    deliverables: ['Conductor envía documentos (INE, licencia, comprobante) via WhatsApp y recibe confirmación en <2 min', 'Sistema clasifica INE y Licencia automáticamente con >90% confianza — solo excepciones llegan al coordinador', 'Motor de reglas valida edad, vigencia de licencia y tipo DaE/LTO sin intervención humana', 'Panel en Metabase muestra pipeline completo: pendientes, aprobados, rechazados, tiempo promedio', 'Conductor recibe aprobación o rechazo en WhatsApp en <5 min tras envío completo'],
    architecture: 'WhatsApp → Document Classification (GPT-4o Vision) → OCR + Data Extraction → Rules Engine → Application Dashboard (Metabase) → WhatsApp Notification.',
    architectureBreakdown: [
      { icon: '💬', label: 'Canal', detail: 'WhatsApp Business API (Twilio/Meta)' },
      { icon: '🧠', label: 'El Cerebro', detail: 'GPT-4o Vision + OCR (extracción y clasificación)' },
      { icon: '⚙️', label: 'Motor', detail: 'FastAPI (reglas de negocio: edad, vigencia, tipo)' },
      { icon: '📊', label: 'Visibilidad', detail: 'Metabase (panel de control) + alertas automáticas' }
    ],
    metrics: [
      { kpi: 'Tiempo de onboarding', before: '>48 horas', target: '<4 horas' },
      { kpi: 'Documentos procesados sin intervención humana', before: '0%', target: '>70%' },
      { kpi: 'Costo por onboarding', before: 'Alto (proceso manual)', target: '>60% reducción' }
    ],
    benchmark: 'OCN: 90 min (incluye video remoto). LAFA V1: <4 horas. Meta V2: <90 min con video.'
  },
  {
    id: 'P4', name: 'Monitoreo de Baterías', track: 'foundation', phase: 1,
    description: 'Telemática → TimescaleDB → curvas de degradación + detección de anomalías',
    startMonth: 3, endMonth: 4, effortWeeks: 4,
    primaryUsers: ['Fleet Ops Manager', 'Finance Lead'],
    stack: ['Geotab SDK', 'TimescaleDB', 'Python/scipy', 'scikit-learn', 'Metabase', 'Grafana', 'WhatsApp API'],
    dependsOn: ['P0.1'],
    blocks: ['P5', 'P7'],
    impact: { 500: [400000, 1000000], 1000: [800000, 2000000], 2000: [1600000, 4000000] },
    problem: 'La batería representa 40-50% del costo del EV. Sin monitoreo, LAFA no sabe si un vehículo se degrada más rápido de lo esperado. Al escalar, el valor total en baterías es de decenas de millones — activos críticos a proteger.',
    deliverables: ['Integración telemática (Geotab/OBD-II/OEM API)', 'Pipeline de datos a TimescaleDB', 'Dashboard de salud de batería en Metabase: SOC, historial de carga, ciclos', 'Modelo de curva de degradación por vehículo', 'Detección de anomalías (Isolation Forest)', 'Alertas proactivas al equipo de ops', 'Vista de mapa en tiempo real: vehículos con markers de SOC, alertas, estatus de carga (patrón Shipday: Performance overlay sobre mapa)'],
    architecture: 'Vehicle Telematics → Data Pipeline (Kinesis/Kafka lite) → TimescaleDB → Battery Analytics Engine (SOH estimation, degradation curve fitting, anomaly detection) → Alert System (WhatsApp + Metabase).',
    metrics: [
      { kpi: 'Flota con monitoreo activo', before: '0%', target: '100%' },
      { kpi: 'SOH promedio a 12 meses', before: 'Sin dato', target: '>96%' },
      { kpi: 'Baterías con degradación anómala detectada <30 días', before: '0%', target: '100%' },
      { kpi: 'Downtime por problemas de batería', before: 'Sin tracking', target: '>50% reducción' }
    ],
    benchmark: 'VEMO: plataforma ZEE monitorea baterías con ML en 900+ EVs, predice degradación, optimiza carga. LAFA: 20% de las features entrega 80% del valor.'
  },
  {
    id: 'P3', name: 'Bot de Cobranza (WhatsApp)', track: 'foundation', phase: 1,
    description: 'Escalamiento graduado automático + clasificación de intención con LLM',
    startMonth: 4, endMonth: 6, effortWeeks: 6,
    primaryUsers: ['Collections Specialist'],
    stack: ['WhatsApp API', 'LangChain', 'GPT-4o-mini', 'Conekta', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis'],
    dependsOn: ['P0.1'],
    blocks: ['P2', 'P7'],
    impact: { 500: [115000, 188000], 1000: [230000, 375000], 2000: [460000, 750000] },
    problem: 'Cobranza es el proceso más labor-intensivo. Con pagos semanales, hay 4 ciclos de cobranza por mes por conductor. Al escalar, los ciclos de cobranza semanales generan miles de interacciones mensuales que no escalan con personas.',
    deliverables: ['Integración WhatsApp Business API + flujos automatizados', 'Escalamiento graduado: Día -2 → Día 0 → Día +3 → Día +7 → Día +14', 'Clasificación de intención con LLM (excusas vs emergencias reales)', 'Modelo de predicción de default v1 (regresión logística)', 'Dashboard de cobranza con contexto completo'],
    architecture: 'Payment Tracking (Conekta/SPEI) → Product Segmentation (DaE/LTO) → Conversational Engine (WhatsApp + LangChain) → Agent Escalation → Analytics Dashboard.',
    metrics: [
      { kpi: 'Cobranzas resueltas sin intervención humana', before: '0%', target: '>60%' },
      { kpi: 'Días promedio de mora', before: '14', target: '<5' },
      { kpi: 'Costo de cobranza por vehículo/mes', before: 'Alto (manual)', target: '>70% reducción' },
      { kpi: 'Tasa de default', before: 'Sin mejora', target: '-2-3 puntos porcentuales' }
    ],
    benchmark: 'Shipday: Tab-based order states (Current/Scheduled/Completed/Incomplete/History) + sortable tables. LAFA: apply same pattern to collections pipeline states (Upcoming/Overdue/In Negotiation/Escalated/Resolved).'
  },
  {
    id: 'P5', name: 'Optimización de Carga (Depot)', track: 'dae', phase: 1,
    description: 'Programación lineal para escalonar carga y evitar picos de demanda CFE',
    startMonth: 5, endMonth: 6, effortWeeks: 4,
    primaryUsers: ['Fleet Ops Manager', 'Finance Lead'],
    stack: ['OR-Tools', 'TimescaleDB', 'Grafana', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.4', 'P4'],
    blocks: ['P7'],
    impact: { 500: [250000, 800000], 1000: [500000, 1600000], 2000: [1000000, 3200000] },
    problem: 'El costo de electricidad crece linealmente con la flota. Optimizar cuándo y cómo se carga puede ahorrar 30-40%. Cargo por demanda de CFE hace crítico el manejo de carga simultánea — cada kW de pico evitado reduce costos fijos significativamente.',
    deliverables: ['Integración de datos SOC (desde P4) + horarios de turnos (P0.4)', 'Algoritmo de optimización (programación lineal)', 'Gestión de carga: escalonamiento para no exceder X kW simultáneos', 'Peak shaving: detener carga si demanda total se acerca al límite contratado', 'Dashboard de costo de carga por vehículo, día, semana'],
    architecture: 'Vehicle SOC Data (P4) + Shift Schedule (P0.4) → Depot Optimization Engine (OR-Tools/PuLP, linear programming) → Load Management (stagger, prioritize, peak shave) → Ops Dashboard (Metabase + Grafana).',
    metrics: [
      { kpi: 'Carga en tarifa base (off-peak)', before: 'Bajo', target: '>70%' },
      { kpi: 'Costo promedio de carga/vehículo/semana', before: 'Sin optimizar', target: '>30% reducción' },
      { kpi: 'Cargo por demanda mensual', before: 'Sin gestión', target: '>40% reducción' }
    ],
    benchmark: null
  },
  {
    id: 'P6', name: 'Automatización de Documentos', track: 'foundation', phase: 1,
    description: 'Templates Jinja2 + auto-llenado + firma electrónica (Mifiel)',
    startMonth: 5, endMonth: 6, effortWeeks: 4,
    primaryUsers: ['Legal/Admin', 'Onboarding Coordinator'],
    stack: ['Jinja2', 'WeasyPrint', 'GPT-4o', 'Mifiel', 'AWS S3', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.1', 'P1'],
    blocks: [],
    impact: { 500: [12000, 18000], 1000: [24000, 36000], 2000: [48000, 72000] },
    problem: 'Cada nuevo contrato de arrendamiento (LTO) o empleo (DaE) requiere documentos legales personalizados. Con dos productos, la complejidad se duplica. Al escalar el onboarding, se requieren cientos de contratos mensuales.',
    deliverables: ['Templates Jinja2 para contratos LTO + DaE', 'Auto-llenado desde base de datos + generación PDF', 'Asistente LLM para reportes de siniestro via WhatsApp', 'Firma electrónica básica (Mifiel/ISign, NOM-151)'],
    architecture: 'Template Engine (Jinja2) → LLM Layer (incident report generation, portfolio summaries) → Digital Signing (Mifiel/ISign) → Document Repository (AWS S3 + PostgreSQL metadata).',
    metrics: [
      { kpi: 'Tiempo de generación de contrato', before: '2 horas', target: '<10 minutos' },
      { kpi: 'Errores en contratos', before: 'Frecuentes', target: '>90% reducción' },
      { kpi: 'Contratos firmados digitalmente', before: '0%', target: '>90%' }
    ],
    benchmark: null
  },
  {
    id: 'P2', name: 'Credit Scoring AI', track: 'lto', phase: 2,
    description: 'XGBoost + Circulo de Crédito + Belvo → scoring con datos propietarios',
    startMonth: 6, endMonth: 7, effortWeeks: 6,
    primaryUsers: ['Finance Lead', 'Underwriting'],
    stack: ['Circulo de Crédito', 'Belvo', 'MetaMap', 'XGBoost', 'MLflow', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.1', 'P0.5b', 'P1', 'P3'],
    blocks: ['P7'],
    impact: { 500: [64000, 128000], 1000: [128000, 255000], 2000: [255000, 510000] },
    problem: '60% de la población mexicana es "thin file". Para escalar LTO, LAFA necesita evaluar conductores sin buró tradicional. Competidores han demostrado que AI underwriting reduce default rates significativamente. Para este punto, LAFA tendrá meses de datos de pago reales (warm start).',
    deliverables: ['Integración Circulo de Crédito + Belvo (banking + SAT fiscal)', 'MetaMap para KYC completo (upgrade de P1)', 'Feature engineering + modelo XGBoost v1 con datos reales de LAFA', 'Dashboard de scoring + motor de decisión (Green/Yellow/Red)', 'Framework A/B para iterar el modelo'],
    architecture: 'Post-Onboarding (P1) → Bureau Check (Circulo de Crédito) → Open Banking (Belvo) → LAFA Internal Data (payment history, telematics, collections) → Platform Data (Uber/DiDi) → XGBoost Scoring Engine → Decision Engine (Rules + ML).',
    metrics: [
      { kpi: 'Tasa de default (LTO)', before: '10-15% (sin scoring)', target: '<5% (6 meses), <3% (12 meses)' },
      { kpi: 'Tiempo de decisión crediticia', before: 'Manual', target: '<15 min' },
      { kpi: 'Model AUC', before: 'N/A', target: '>0.80 (warm start)' }
    ],
    benchmark: 'Competidores en la región han logrado tasas de default single-digit con AI underwriting. LAFA ventaja: warm start con datos propietarios de operación real.'
  },
  {
    id: 'P7', name: 'Dashboard Mejorado', track: 'foundation', phase: 2,
    description: 'dbt + alertas avanzadas + P&L por vehículo + mapa de flota en tiempo real',
    startMonth: 7, endMonth: 9, effortWeeks: 4,
    primaryUsers: ['CEO', 'Head of Product', 'Todos'],
    stack: ['Metabase', 'dbt', 'PostgreSQL', 'TimescaleDB', 'FastAPI'],
    dependsOn: ['P0.2', 'P3', 'P4', 'P5'],
    blocks: [],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'El dashboard básico (P0.2) existe desde Mo 1. Esta fase agrega: transformaciones dbt, alertas avanzadas, reportes automatizados, vistas financieras sofisticadas, P&L por vehículo, análisis de cohortes.',
    deliverables: ['Modelos dbt para métricas calculadas', 'Vistas financieras avanzadas: P&L por vehículo, cohortes, unit economics', 'Vista de riesgo: conductores rankeados por probabilidad de default', 'Sistema de alertas (Slack/WhatsApp para anomalías)', 'Reportes PDF semanales/mensuales automatizados para stakeholders', '8 reportes segmentados: Fleet Health, Driver Performance, Financiero, Mantenimiento, Carga, Cobranza, Seguros, Compliance (patrón Shipday: reports como cards con iconos + descripción)', 'Mapa de flota en tiempo real con overlay de KPIs: vehículos activos, cargando, en mantenimiento, alertas (patrón Shipday: Map + Performance panel)'],
    architecture: 'Data Layer (PostgreSQL + TimescaleDB + S3) → Aggregation Layer (dbt transformations) → Visualization (Metabase Enhanced) → Alerting Layer (Slack/WhatsApp + automated PDF reports).',
    metrics: [
      { kpi: 'KPIs en tiempo real', before: 'Básicos (P0.2)', target: '>30 métricas calculadas' },
      { kpi: 'Reportes automatizados', before: '0', target: 'Semanal + mensual (PDF)' }
    ],
    benchmark: null
  },
  {
    id: 'P8', name: 'Knowledge Bot (RAG)', track: 'foundation', phase: 2,
    description: 'RAG con pgvector: bot Slack interno + bot WhatsApp FAQ para conductores',
    startMonth: 8, endMonth: 9, effortWeeks: 4,
    primaryUsers: ['Todos los equipos', 'Customer Support'],
    stack: ['LangChain', 'pgvector', 'OpenAI', 'Slack SDK', 'WhatsApp API'],
    dependsOn: ['P0.1'],
    blocks: [],
    impact: { 500: [15000, 60000], 1000: [30000, 120000], 2000: [60000, 240000] },
    problem: 'Al escalar la flota significativamente, el equipo crece proporcionalmente. El conocimiento operativo hoy vive en pocas personas. Sin documentación indexable, cada nuevo empleado tarda semanas en ser productivo.',
    deliverables: ['Recopilación y estructuración de documentación', 'Pipeline RAG con LangChain + pgvector', 'Bot Slack para equipo interno', 'Bot WhatsApp FAQ para conductores (top 20 preguntas)'],
    architecture: 'Knowledge Base (manuals, policies, contracts, FAQs, vehicle specs) → RAG Pipeline (chunking + embeddings + pgvector + cosine similarity + reranking) → LLM Response (GPT-4o-mini with citations) → Interfaces (Slack + WhatsApp).',
    metrics: [
      { kpi: 'Consultas respondidas correctamente', before: 'N/A', target: '>85%' },
      { kpi: 'Tiempo de respuesta', before: 'Manual', target: '<10 segundos' },
      { kpi: 'Tiempo de onboarding de empleado', before: '4 semanas', target: '<2 semanas' }
    ],
    benchmark: null
  }
],

// ---------- Track Colors ----------
TRACK_COLORS: {
  foundation: window.LAFA.COLORS.orange,
  dae: window.LAFA.COLORS.teal,
  lto: window.LAFA.COLORS.amber
},

TRACK_LABELS: {
  foundation: 'Fundación',
  dae: 'Driver-as-Employee',
  lto: 'Lease-to-Own'
},

// ---------- Growth Milestones ----------
MILESTONES: [
  {
    fleet: 300, title: 'Base Digital',
    techRequired: ['P0.1', 'P0.2', 'P0.3', 'P0.4', 'P0.5a', 'P0.5b', 'P0.5c', 'P0.5d'],
    vision: 'Una plataforma digital única: cada vehículo, conductor y peso rastreado en tiempo real.'
  },
  {
    fleet: 750, title: 'Escala Autónoma',
    techRequired: ['P1', 'P4', 'P3', 'P5', 'P6'],
    vision: 'Onboarding, cobranza y carga optimizada. La operación escala sin fricción.'
  },
  {
    fleet: 1500, title: 'Motor Financiero',
    techRequired: ['P2'],
    vision: 'Datos propietarios alimentan el scoring: cada lease aprobado con riesgo medido.'
  },
  {
    fleet: 2000, title: 'Stack Completo',
    techRequired: ['P7', 'P8'],
    vision: 'Visibilidad financiera total y conocimiento operativo accesible para todo el equipo.'
  }
]

}; // end window.ROADMAP_DATA
