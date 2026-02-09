// ============================================================
// LAFA AI Roadmap — Project & Milestone Data
// Extracted from roadmap.js for maintainability
// Bilingual: ES (default) + EN (_en suffix fields)
// Stack, architecture y benchmarks son bilingües (español + inglés técnico).
// ============================================================

window.ROADMAP_DATA = {

// ---------- Project Data (from ai-roadmap.md) ----------
PROJECTS: [
  {
    id: 'P0.1', name: 'Base de Datos Operacional', name_en: 'Operational Database', track: 'foundation', phase: 0,
    description: 'PostgreSQL centralizado: conductores, vehículos, pagos, carga, mantenimiento',
    description_en: 'Centralized PostgreSQL: drivers, vehicles, payments, charging, maintenance',
    startMonth: 1, endMonth: 2, effortWeeks: 4,
    primaryUsers: ['Todos los equipos'],
    primaryUsers_en: ['All teams'],
    stack: ['PostgreSQL', 'FastAPI', 'Alembic', 'AWS RDS'],
    dependsOn: [],
    blocks: ['P0.2', 'P0.3', 'P0.4', 'P0.5a', 'P0.5b', 'P0.5c', 'P0.5d', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'No existe una base de datos centralizada. La información de conductores, vehículos, pagos, mantenimiento y carga vive dispersa en procesos manuales sin sistema centralizado. A escala actual ya es doloroso; al crecer 10x es imposible.',
    problem_en: 'No centralized database exists. Driver, vehicle, payment, maintenance, and charging data is scattered across manual processes with no centralized system. At current scale it\'s already painful; at 10x growth it\'s impossible.',
    deliverables: ['Esquema PostgreSQL (drivers, vehicles, payments, contracts, charging_events, maintenance_logs, shifts, telematics)', 'ETL desde Conekta/SPEI, Geotab, fuentes existentes', 'API FastAPI para CRUD + migraciones con Alembic'],
    deliverables_en: ['PostgreSQL schema (drivers, vehicles, payments, contracts, charging_events, maintenance_logs, shifts, telematics)', 'ETL from Conekta/SPEI, Geotab, existing sources', 'FastAPI API for CRUD + migrations with Alembic'],
    architecture: 'PostgreSQL + FastAPI + Alembic migrations + AWS RDS. ETL: Conekta webhooks → payments, Geotab API → telematics, manual entry → maintenance/charging, legacy data migration → all tables.',
    metrics: [
      { kpi: 'Tablas operativas', before: '0 (sin sistema)', target: '8+ tablas normalizadas' },
      { kpi: 'Fuentes integradas', before: 'Manual', target: 'Conekta + Geotab + forms' }
    ],
    benchmark: 'Tanto VEMO (ZEE platform) como OCN construyeron DB operacionales centralizadas como primera prioridad técnica. LAFA en Stage 0 (spreadsheets) es el patrón típico pre-escalabilidad.',
    benchmark_en: 'Both VEMO (ZEE platform) and OCN built centralized operational databases as their first technical priority. LAFA at Stage 0 (spreadsheets) is the typical pre-scalability pattern.'
  },
  {
    id: 'P0.2', name: 'Dashboard Básico (Metabase)', name_en: 'Basic Dashboard (Metabase)', track: 'foundation', phase: 0,
    description: '4 dashboards Metabase: flota, pagos, vehículos, conductores',
    description_en: '4 Metabase dashboards: fleet, payments, vehicles, drivers',
    startMonth: 1, endMonth: 2, effortWeeks: 2,
    primaryUsers: ['Head of Product', 'CEO', 'Stakeholders'],
    stack: ['Metabase', 'PostgreSQL', 'AWS'],
    dependsOn: ['P0.1'],
    blocks: ['P7'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'El equipo de producto necesita transparencia para stakeholders y mejores decisiones. Hoy nadie puede responder "cómo va el negocio?" sin revisar múltiples fuentes manuales.',
    problem_en: 'The product team needs transparency for stakeholders and better decisions. Today nobody can answer "how\'s the business doing?" without reviewing multiple manual sources.',
    deliverables: ['Vista de flota: vehículos online, ingreso semanal, utilización %', 'Vista de pagos: % a tiempo, defaults, pipeline de cobranza', 'Vista de vehículos: batería %, downtime, mantenimiento pendiente', 'Vista de conductores: activos, onboarding, morosos'],
    deliverables_en: ['Fleet view: vehicles online, weekly revenue, utilization %', 'Payments view: % on time, defaults, collections pipeline', 'Vehicles view: battery %, downtime, pending maintenance', 'Drivers view: active, onboarding, delinquent'],
    architecture: 'Metabase open-source conectado a PostgreSQL (P0.1). Dashboards pre-construidos — sin frontend custom.',
    architecture_en: 'Open-source Metabase connected to PostgreSQL (P0.1). Pre-built dashboards — no custom frontend.',
    metrics: [
      { kpi: 'Tiempo para responder "cómo va el negocio?"', before: 'Horas (proceso manual)', target: '<10 segundos' },
      { kpi: 'Vistas operativas', before: '0', target: '4 dashboards' }
    ],
    benchmark: 'Shipday: 9 report types segmented by stakeholder (Sales, Drivers, Performance, Heatmap, etc). LAFA P0.2: 4 dashboard views. Evolve to 8+ segmented reports in P7.'
  },
  {
    id: 'P0.3', name: 'Tracking de Mantenimiento', name_en: 'Maintenance Tracking', track: 'foundation', phase: 0,
    description: 'Historial de servicio, alertas automáticas por km/tiempo, downtime tracking',
    description_en: 'Service history, automatic alerts by km/time, downtime tracking',
    startMonth: 1, endMonth: 2, effortWeeks: 2,
    primaryUsers: ['Fleet Ops Manager'],
    stack: ['FastAPI', 'PostgreSQL', 'WhatsApp API'],
    dependsOn: ['P0.1'],
    blocks: ['P4'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'LAFA mantiene los vehículos. Con la flota actual y crecimiento proyectado a miles de unidades, el tracking manual de mantenimiento es insostenible. Un vehículo fuera de servicio = conductor sin ingreso + vehículo sin generar revenue.',
    problem_en: 'LAFA maintains the vehicles. With the current fleet and projected growth to thousands of units, manual maintenance tracking is unsustainable. A vehicle out of service = driver without income + vehicle not generating revenue.',
    deliverables: ['CMS simple: historial de servicio, costos, próximo servicio, alertas', 'Alertas automáticas: "Vehículo LAF-042 necesita servicio en 500 km"', 'Dashboard en Metabase: vehículos con mantenimiento pendiente', 'Registro de downtime (para calcular utilización real)'],
    deliverables_en: ['Simple CMS: service history, costs, next service, alerts', 'Automatic alerts: "Vehicle LAF-042 needs service in 500 km"', 'Metabase dashboard: vehicles with pending maintenance', 'Downtime logging (to calculate real utilization)'],
    architecture: 'FastAPI + PostgreSQL + WhatsApp Business API para alertas automáticas al equipo de ops.',
    architecture_en: 'FastAPI + PostgreSQL + WhatsApp Business API for automatic alerts to ops team.',
    metrics: [
      { kpi: 'Vehículos con tracking', before: '0%', target: '100%' },
      { kpi: 'Alertas proactivas', before: '0', target: 'Automáticas por km/tiempo' }
    ],
    benchmark: 'Shipday: Tab-based task management (Current/Scheduled/Completed/Incomplete/History) with sortable columns. Pattern replicable for maintenance workflows.'
  },
  {
    id: 'P0.4', name: 'Dispatch de Turnos (WhatsApp)', name_en: 'Shift Dispatch (WhatsApp)', track: 'dae', phase: 0,
    description: 'Asignación diaria de turnos y vehículos via WhatsApp con confirmación',
    description_en: 'Daily shift and vehicle assignment via WhatsApp with confirmation',
    startMonth: 2, endMonth: 2, effortWeeks: 2,
    primaryUsers: ['Fleet Ops Manager'],
    stack: ['WhatsApp API', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.1'],
    blocks: ['P5'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'Para el producto DaE, LAFA asigna turnos y vehículos. Sin sistema, la coordinación es via grupo de WhatsApp — propenso a errores, no escalable al crecer la flota.',
    problem_en: 'For the DaE product, LAFA assigns shifts and vehicles. Without a system, coordination is via WhatsApp group — error-prone and not scalable as the fleet grows.',
    deliverables: ['Notificación diaria al conductor: turno, vehículo, batería', 'Asignación de vehículo por disponibilidad y zona', 'Confirmación via WhatsApp (responder "OK" o "NO")', 'Vista de turnos en Metabase'],
    deliverables_en: ['Daily notification to driver: shift, vehicle, battery level', 'Vehicle assignment by availability and zone', 'Confirmation via WhatsApp (reply "OK" or "NO")', 'Shift view in Metabase'],
    futureScope: 'Tablero Kanban visual (Turnos asignados | Vehículos disponibles) con drag-and-drop para asignación rápida (patrón Shipday Dispatch) — futuro: +500 vehículos',
    futureScope_en: 'Visual Kanban board (Assigned Shifts | Available Vehicles) with drag-and-drop for quick assignment (Shipday Dispatch pattern) — future: 500+ vehicles',
    architecture: 'WhatsApp Business API + FastAPI + PostgreSQL. Lógica de asignación basada en disponibilidad de vehículo y zona del conductor.',
    architecture_en: 'WhatsApp Business API + FastAPI + PostgreSQL. Assignment logic based on vehicle availability and driver zone.',
    metrics: [
      { kpi: 'Turnos confirmados via sistema', before: '0%', target: '>90%' },
      { kpi: 'Tiempo de coordinación', before: '1-2 hrs/día', target: '<15 min/día' }
    ],
    benchmark: 'Shipday: Kanban dispatch (Assigned by driver | New Orders) with drag-and-drop. LAFA P0.4 MVP = WhatsApp; visual Kanban = Phase 2 upgrade when fleet exceeds 500 vehicles.'
  },
  {
    id: 'P0.5a', name: 'HR/Nómina (Runa/Worky)', name_en: 'HR/Payroll (Runa/Worky)', track: 'dae', phase: 0,
    description: 'Integración Runa/Worky: nómina quincenal, IMSS, CFDI 4.0 automatizados',
    description_en: 'Runa/Worky integration: biweekly payroll, IMSS, CFDI 4.0 automated',
    startMonth: 2, endMonth: 3, effortWeeks: 3,
    primaryUsers: ['HR/Payroll Admin'],
    stack: ['Runa/Worky API', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.1'],
    blocks: [],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    impactNote: 'Habilitador — evita multas IMSS/SAT por nómina incorrecta',
    impactNote_en: 'Enabler — avoids IMSS/SAT fines for incorrect payroll',
    problem: 'LAFA opera con nómina formal para todos los conductores DaE. La ley laboral mexicana requiere nómina quincenal, IMSS, vacaciones, aguinaldo, PTU y CFDI 4.0. Al escalar, nómina manual = riesgo de cumplimiento.',
    problem_en: 'LAFA operates with formal payroll for all DaE drivers. Mexican labor law requires biweekly payroll, IMSS, vacation, year-end bonus, profit sharing, and CFDI 4.0. At scale, manual payroll = compliance risk.',
    deliverables: ['Conectar SaaS de nómina (Runa/Worky) a P0.1 via API', 'Sincronizar tabla drivers (tipo empleado) con sistema de nómina', 'Automatizar: alta de nuevo empleado, nómina quincenal, IMSS', 'Vista en Metabase: costo de nómina por conductor, estatus IMSS'],
    deliverables_en: ['Connect payroll SaaS (Runa/Worky) to P0.1 via API', 'Sync drivers table (employee type) with payroll system', 'Automate: new employee registration, biweekly payroll, IMSS', 'Metabase view: payroll cost per driver, IMSS status'],
    architecture: 'Comprar, no construir. Runa (~MXN $99/empleado/mes) o Worky. El trabajo es integración, no construcción.',
    architecture_en: 'Buy, don\'t build. Runa (~MXN $99/employee/month) or Worky. The work is integration, not construction.',
    metrics: [
      { kpi: 'Nómina automatizada', before: '0%', target: '100%' },
      { kpi: 'Errores de nómina', before: 'Frecuentes', target: '<1%' }
    ],
    benchmark: 'Runa es el SaaS de nómina #1 en México para startups (5,000+ empresas). Worky es alternativa para equipos <100. La decisión buy-not-build es estándar.',
    benchmark_en: 'Runa is the #1 payroll SaaS in Mexico for startups (5,000+ companies). Worky is an alternative for teams <100. The buy-not-build decision is standard.'
  },
  {
    id: 'P0.5b', name: 'Estado de Cuenta LTO', name_en: 'LTO Account Statement', track: 'lto', phase: 0,
    description: 'Bot WhatsApp: saldo, pagos, vencimientos + PDF mensual automático',
    description_en: 'WhatsApp bot: balance, payments, due dates + automatic monthly PDF',
    startMonth: 2, endMonth: 3, effortWeeks: 2,
    primaryUsers: ['Customer Support Lead'],
    stack: ['WhatsApp API', 'FastAPI', 'PostgreSQL', 'WeasyPrint'],
    dependsOn: ['P0.1'],
    blocks: ['P2'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    impactNote: 'Reduce 60-80% consultas de soporte (retención + confianza)',
    impactNote_en: 'Reduces 60-80% support queries (retention + trust)',
    problem: 'Los conductores LTO realizan pagos mensuales significativos sin visibilidad de su cuenta. No conocen su saldo, historial de pagos, ni fecha de vencimiento. Esto genera llamadas de soporte innecesarias y erosiona la confianza.',
    problem_en: 'LTO drivers make significant monthly payments without visibility into their account. They don\'t know their balance, payment history, or due date. This generates unnecessary support calls and erodes trust.',
    deliverables: ['WhatsApp bot: "Estado de cuenta" → saldo, últimos 5 pagos, próximo vencimiento', 'Estado de cuenta mensual PDF automático via WhatsApp', 'Reduce consultas de soporte 60-80%'],
    deliverables_en: ['WhatsApp bot: "Account statement" → balance, last 5 payments, next due date', 'Automatic monthly PDF statement via WhatsApp', 'Reduces support queries 60-80%'],
    architecture: 'WhatsApp Business API + FastAPI + PostgreSQL (P0.1) + WeasyPrint para generación de PDF.',
    architecture_en: 'WhatsApp Business API + FastAPI + PostgreSQL (P0.1) + WeasyPrint for PDF generation.',
    metrics: [
      { kpi: 'Consultas de soporte sobre estado de cuenta', before: '~50/mes (100% manual)', target: '<10/mes (-60-80%)' },
      { kpi: 'Satisfacción del conductor LTO', before: 'Baja (sin visibilidad)', target: 'Alta (autoservicio)' }
    ],
    benchmark: 'Shipday: Daily Payment tab per driver — full breakdown (deliveries, base pay, tips, adjustments, total). LAFA: weekly breakdown (lease payment, insurance deduction, maintenance credit, net amount). Payment transparency = driver retention.'
  },
  {
    id: 'P0.5c', name: 'Reporte de Incidentes', name_en: 'Incident Reporting', track: 'foundation', phase: 0,
    description: 'Formulario guiado WhatsApp: tipo, ubicación, fotos → tabla estructurada',
    description_en: 'Guided WhatsApp form: type, location, photos → structured table',
    startMonth: 2, endMonth: 3, effortWeeks: 2,
    primaryUsers: ['Fleet Ops Manager', 'Insurance Admin'],
    stack: ['WhatsApp API', 'FastAPI', 'PostgreSQL', 'AWS S3'],
    dependsOn: ['P0.1'],
    blocks: ['P0.5d'],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    impactNote: 'Habilitador — estructura datos para P0.5d y reclamos de seguro',
    impactNote_en: 'Enabler — structures data for P0.5d and insurance claims',
    problem: 'Accidentes, robos y fallas mecánicas se reportan via mensajes ad-hoc en grupos de WhatsApp. No hay registro estructurado, no hay tracking, no hay datos para reclamos de seguro.',
    problem_en: 'Accidents, thefts, and mechanical failures are reported via ad-hoc messages in WhatsApp groups. No structured records, no tracking, no data for insurance claims.',
    deliverables: ['Formulario estructurado WhatsApp: flujo guiado (tipo, ubicación, fotos, descripción)', 'Datos en tabla incidents en PostgreSQL', 'Dashboard en Metabase: incidentes abiertos, tiempo de resolución, costos', 'Auto-notificación a ops + contacto de seguro'],
    deliverables_en: ['Structured WhatsApp form: guided flow (type, location, photos, description)', 'Data in incidents table in PostgreSQL', 'Metabase dashboard: open incidents, resolution time, costs', 'Auto-notification to ops + insurance contact'],
    architecture: 'WhatsApp Business API + FastAPI + PostgreSQL (P0.1) + AWS S3 (fotos). Flujo guiado de reporte via bot conversacional.',
    architecture_en: 'WhatsApp Business API + FastAPI + PostgreSQL (P0.1) + AWS S3 (photos). Guided reporting flow via conversational bot.',
    metrics: [
      { kpi: 'Incidentes con datos estructurados', before: '0%', target: '100%' },
      { kpi: 'Tiempo promedio de resolución', before: 'Sin tracking', target: 'Medido y visible' }
    ],
    benchmark: 'Shipday: formularios de incidentes integrados al tracking en tiempo real. VEMO: protocolo QHSE con C2 de respuesta rápida y documentación fotográfica.',
    benchmark_en: 'Shipday: incident forms integrated with real-time tracking. VEMO: QHSE protocol with rapid-response C2 and photographic documentation.'
  },
  {
    id: 'P0.5d', name: 'Módulo de Seguros', name_en: 'Insurance Module', track: 'foundation', phase: 0,
    description: 'Tracking de pólizas, renovaciones y reclamos vinculado a vehículos',
    description_en: 'Policy, renewal, and claims tracking linked to vehicles',
    startMonth: 2, endMonth: 3, effortWeeks: 2,
    primaryUsers: ['Finance Lead', 'Fleet Ops Manager'],
    stack: ['FastAPI', 'PostgreSQL', 'Metabase', 'WhatsApp API'],
    dependsOn: ['P0.1', 'P0.5c'],
    blocks: [],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    impactNote: 'Habilitador — visibilidad sobre MXN $36-72M/año en primas',
    impactNote_en: 'Enabler — visibility over MXN $36-72M/year in premiums',
    problem: 'El costo de seguros crece linealmente con la flota — a escala completa, representa decenas de millones anuales. El tracking de pólizas, renovaciones y reclamos no está estructurado. Una renovación perdida = vehículo sin seguro en la calle.',
    problem_en: 'Insurance costs grow linearly with the fleet — at full scale, representing tens of millions annually. Policy, renewal, and claims tracking is unstructured. A missed renewal = uninsured vehicle on the street.',
    deliverables: ['Tablas: insurance_policies + claims vinculadas a vehículos e incidentes', 'Dashboard: pólizas por vencer en 30/60/90 días, reclamos activos, costo por vehículo', 'Alertas automáticas de renovación via WhatsApp', 'Vinculación con reporte de incidentes (P0.5c)'],
    deliverables_en: ['Tables: insurance_policies + claims linked to vehicles and incidents', 'Dashboard: policies expiring in 30/60/90 days, active claims, cost per vehicle', 'Automatic renewal alerts via WhatsApp', 'Link to incident reporting (P0.5c)'],
    architecture: 'FastAPI + PostgreSQL (P0.1) + Metabase + WhatsApp para alertas automáticas de renovación.',
    architecture_en: 'FastAPI + PostgreSQL (P0.1) + Metabase + WhatsApp for automatic renewal alerts.',
    metrics: [
      { kpi: 'Pólizas con tracking', before: '0%', target: '100%' },
      { kpi: 'Renovaciones perdidas', before: 'Riesgo alto', target: '0 (alertas proactivas)' }
    ],
    benchmark: 'VEMO: seguro incluido en renta mensual ($3,500-4,000 MXN/mes). Modelo de referencia para LAFA: bundle insurance con el lease.',
    benchmark_en: 'VEMO: insurance included in monthly rent ($3,500-4,000 MXN/month). Reference model for LAFA: bundle insurance with the lease.'
  },
  {
    id: 'P1', name: 'Onboarding AI', name_en: 'AI Onboarding', track: 'foundation', phase: 1,
    description: 'Clasificación de documentos con Vision AI + validación automática de reglas',
    description_en: 'Document classification with Vision AI + automatic rules validation',
    startMonth: 3, endMonth: 4, effortWeeks: 4,
    primaryUsers: ['Onboarding Coordinator'],
    stack: ['WhatsApp API', 'GPT-4o Vision', 'FastAPI', 'PostgreSQL', 'Metabase'],
    dependsOn: ['P0.1'],
    blocks: ['P2', 'P6'],
    impact: { 500: [45000, 75000], 1000: [90000, 150000], 2000: [180000, 300000] },
    problem: 'Cada conductor nuevo requiere que un coordinador recopile 5+ documentos por WhatsApp, los valide manualmente contra foto y base de datos, y registre el resultado. Con una flota pequeña, una persona lo resuelve. Al escalar, la rotación natural genera cientos de onboardings mensuales — físicamente imposible sin automatización.',
    problem_en: 'Each new driver requires a coordinator to collect 5+ documents via WhatsApp, manually validate them against photo and database, and record the result. With a small fleet, one person handles it. At scale, natural turnover generates hundreds of monthly onboardings — physically impossible without automation.',
    deliverables: ['Conductor envía documentos (INE, licencia, comprobante) via WhatsApp y recibe confirmación en <2 min', 'Sistema clasifica INE y Licencia automáticamente con >90% confianza — solo excepciones llegan al coordinador', 'Motor de reglas valida edad, vigencia de licencia y tipo DaE/LTO sin intervención humana', 'Panel en Metabase muestra pipeline completo: pendientes, aprobados, rechazados, tiempo promedio', 'Conductor recibe aprobación o rechazo en WhatsApp en <5 min tras envío completo'],
    deliverables_en: ['Driver sends documents (INE, license, proof of address) via WhatsApp and receives confirmation in <2 min', 'System classifies INE and License automatically with >90% confidence — only exceptions reach the coordinator', 'Rules engine validates age, license validity, and DaE/LTO type without human intervention', 'Metabase panel shows complete pipeline: pending, approved, rejected, average time', 'Driver receives approval or rejection on WhatsApp in <5 min after complete submission'],
    architecture: 'WhatsApp → Document Classification (GPT-4o Vision) → OCR + Data Extraction → Rules Engine → Application Dashboard (Metabase) → WhatsApp Notification.',
    architectureBreakdown: [
      { icon: '💬', label: 'Canal', label_en: 'Channel', detail: 'WhatsApp Business API (Twilio/Meta)', detail_en: 'WhatsApp Business API (Twilio/Meta)' },
      { icon: '🧠', label: 'El Cerebro', label_en: 'The Brain', detail: 'GPT-4o Vision + OCR (extracción y clasificación)', detail_en: 'GPT-4o Vision + OCR (extraction and classification)' },
      { icon: '⚙️', label: 'Motor', label_en: 'Engine', detail: 'FastAPI (reglas de negocio: edad, vigencia, tipo)', detail_en: 'FastAPI (business rules: age, validity, type)' },
      { icon: '📊', label: 'Visibilidad', label_en: 'Visibility', detail: 'Metabase (panel de control) + alertas automáticas', detail_en: 'Metabase (control panel) + automatic alerts' }
    ],
    metrics: [
      { kpi: 'Tiempo de onboarding', before: '>48 horas', target: '<4 horas' },
      { kpi: 'Documentos procesados sin intervención humana', before: '0%', target: '>70%' },
      { kpi: 'Costo por onboarding', before: 'Alto (proceso manual)', target: '>60% reducción' }
    ],
    benchmark: 'OCN: 90 min (incluye video remoto). LAFA V1: <4 horas. Meta V2: <90 min con video.',
    benchmark_en: 'OCN: 90 min (includes remote video). LAFA V1: <4 hours. Target V2: <90 min with video.'
  },
  {
    id: 'P4', name: 'Monitoreo de Baterías', name_en: 'Battery Monitoring', track: 'foundation', phase: 1,
    description: 'Telemática → TimescaleDB → curvas de degradación + detección de anomalías',
    description_en: 'Telematics → TimescaleDB → degradation curves + anomaly detection',
    startMonth: 3, endMonth: 4, effortWeeks: 4,
    primaryUsers: ['Fleet Ops Manager', 'Finance Lead'],
    stack: ['Geotab SDK', 'TimescaleDB', 'Python/scipy', 'scikit-learn', 'Metabase', 'Grafana', 'WhatsApp API'],
    dependsOn: ['P0.1'],
    blocks: ['P5', 'P7'],
    impact: { 500: [400000, 1000000], 1000: [800000, 2000000], 2000: [1600000, 4000000] },
    problem: 'La batería representa 40-50% del costo del EV. Sin monitoreo, LAFA no sabe si un vehículo se degrada más rápido de lo esperado. Al escalar, el valor total en baterías es de decenas de millones — activos críticos a proteger.',
    problem_en: 'The battery represents 40-50% of the EV\'s cost. Without monitoring, LAFA doesn\'t know if a vehicle is degrading faster than expected. At scale, total battery value is tens of millions — critical assets to protect.',
    deliverables: ['Integración telemática (Geotab/OBD-II/OEM API)', 'Pipeline de datos a TimescaleDB', 'Dashboard de salud de batería en Metabase: SOH heatmap, curvas de degradación, alertas', 'Modelo de curva de degradación por vehículo', 'Detección de anomalías (Isolation Forest)', 'Alertas proactivas al equipo de ops'],
    deliverables_en: ['Telematics integration (Geotab/OBD-II/OEM API)', 'Data pipeline to TimescaleDB', 'Battery health dashboard in Metabase: SOH heatmap, degradation curves, alerts', 'Per-vehicle degradation curve model', 'Anomaly detection (Isolation Forest)', 'Proactive alerts to ops team'],
    architecture: 'Vehicle Telematics → Data Pipeline (Kinesis/Kafka lite) → TimescaleDB → Battery Analytics Engine (SOH estimation, degradation curve fitting, anomaly detection) → Alert System (WhatsApp + Metabase).',
    metrics: [
      { kpi: 'Flota con monitoreo activo', before: '0%', target: '100%' },
      { kpi: 'SOH promedio a 12 meses', before: 'Sin dato', target: '>96%' },
      { kpi: 'Baterías con degradación anómala detectada <30 días', before: '0%', target: '100%' },
      { kpi: 'Downtime por problemas de batería', before: 'Sin tracking', target: '>50% reducción' }
    ],
    benchmark: 'VEMO: plataforma ZEE monitorea baterías con ML en 900+ EVs, predice degradación, optimiza carga. LAFA: 20% de las features entrega 80% del valor.',
    benchmark_en: 'VEMO: ZEE platform monitors batteries with ML across 900+ EVs, predicts degradation, optimizes charging. LAFA: 20% of features delivers 80% of value.'
  },
  {
    id: 'P3', name: 'Bot de Cobranza (WhatsApp)', name_en: 'Collections Bot (WhatsApp)', track: 'foundation', phase: 1,
    description: 'Escalamiento graduado automático + clasificación de intención con LLM',
    description_en: 'Automatic graduated escalation + intent classification with LLM',
    startMonth: 4, endMonth: 6, effortWeeks: 6,
    primaryUsers: ['Collections Specialist'],
    stack: ['WhatsApp API', 'LangChain', 'GPT-4o-mini', 'Conekta', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis'],
    dependsOn: ['P0.1'],
    blocks: ['P2', 'P7'],
    impact: { 500: [115000, 188000], 1000: [230000, 375000], 2000: [460000, 750000] },
    problem: 'Cobranza es el proceso más labor-intensivo. Con pagos semanales, hay 4 ciclos de cobranza por mes por conductor. Al escalar, los ciclos de cobranza semanales generan miles de interacciones mensuales que no escalan con personas.',
    problem_en: 'Collections is the most labor-intensive process. With weekly payments, there are 4 collection cycles per month per driver. At scale, weekly collection cycles generate thousands of monthly interactions that don\'t scale with people.',
    deliverables: ['Integración WhatsApp Business API + flujos automatizados', 'Escalamiento graduado: Día -2 → Día 0 → Día +3 → Día +7 → Día +14', 'Clasificación de intención con LLM (excusas vs emergencias reales)', 'Modelo de predicción de default v1 (regresión logística)', 'Dashboard de cobranza con contexto completo'],
    deliverables_en: ['WhatsApp Business API integration + automated flows', 'Graduated escalation: Day -2 → Day 0 → Day +3 → Day +7 → Day +14', 'Intent classification with LLM (excuses vs real emergencies)', 'Default prediction model v1 (logistic regression)', 'Collections dashboard with full context'],
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
    id: 'P5', name: 'Optimización de Carga (Depot)', name_en: 'Charging Optimization (Depot)', track: 'dae', phase: 1,
    description: 'Programación lineal para escalonar carga y evitar picos de demanda CFE',
    description_en: 'Linear programming to stagger charging and avoid CFE demand peaks',
    startMonth: 5, endMonth: 6, effortWeeks: 4,
    primaryUsers: ['Fleet Ops Manager', 'Finance Lead'],
    stack: ['OR-Tools', 'TimescaleDB', 'Grafana', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.4', 'P4'],
    blocks: ['P7'],
    impact: { 500: [250000, 800000], 1000: [500000, 1600000], 2000: [1000000, 3200000] },
    problem: 'El costo de electricidad crece linealmente con la flota. Optimizar cuándo y cómo se carga puede ahorrar 30-40%. Cargo por demanda de CFE hace crítico el manejo de carga simultánea — cada kW de pico evitado reduce costos fijos significativamente. Impacto incluye: ahorro en tarifa base (30-40%) + reducción de cargo por demanda CFE (>40%) + reducción de pérdida por carga ineficiente.',
    problem_en: 'Electricity cost grows linearly with fleet. Optimizing when and how vehicles charge can save 30-40%. CFE demand charges make simultaneous charging management critical — every avoided peak kW reduces fixed costs significantly. Impact includes: base rate savings (30-40%) + CFE demand charge reduction (>40%) + inefficient charging loss reduction.',
    deliverables: ['Integración de datos SOC (desde P4) + horarios de turnos (P0.4)', 'Algoritmo de optimización (programación lineal)', 'Gestión de carga: escalonamiento para no exceder X kW simultáneos', 'Peak shaving: detener carga si demanda total se acerca al límite contratado', 'Dashboard de costo de carga por vehículo, día, semana'],
    deliverables_en: ['SOC data integration (from P4) + shift schedules (P0.4)', 'Optimization algorithm (linear programming)', 'Charge management: staggering to not exceed X simultaneous kW', 'Peak shaving: stop charging if total demand approaches contracted limit', 'Charging cost dashboard per vehicle, day, week'],
    architecture: 'Vehicle SOC Data (P4) + Shift Schedule (P0.4) → Depot Optimization Engine (OR-Tools/PuLP, linear programming) → Load Management (stagger, prioritize, peak shave) → Ops Dashboard (Metabase + Grafana).',
    metrics: [
      { kpi: 'Carga en tarifa base (off-peak)', before: 'Bajo', target: '>70%' },
      { kpi: 'Costo promedio de carga/vehículo/semana', before: 'Sin optimizar', target: '>30% reducción' },
      { kpi: 'Cargo por demanda mensual', before: 'Sin gestión', target: '>40% reducción' }
    ],
    benchmark: 'VEMO: estaciones de carga propias con gestión inteligente de carga. Tesla Autobidder: optimización de carga a escala de flota con load management. LAFA: enfoque depot-first con OR-Tools.',
    benchmark_en: 'VEMO: own charging stations with intelligent charge management. Tesla Autobidder: fleet-scale charging optimization with load management. LAFA: depot-first approach with OR-Tools.'
  },
  {
    id: 'P6', name: 'Automatización de Documentos', name_en: 'Document Automation', track: 'foundation', phase: 1,
    description: 'Templates Jinja2 + auto-llenado + firma electrónica (Mifiel)',
    description_en: 'Jinja2 templates + auto-fill + electronic signature (Mifiel)',
    startMonth: 5, endMonth: 6, effortWeeks: 4,
    primaryUsers: ['Legal/Admin', 'Onboarding Coordinator'],
    stack: ['Jinja2', 'WeasyPrint', 'GPT-4o', 'Mifiel', 'AWS S3', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.1', 'P1'],
    blocks: [],
    impact: { 500: [12000, 18000], 1000: [24000, 36000], 2000: [48000, 72000] },
    problem: 'Cada nuevo contrato de arrendamiento (LTO) o empleo (DaE) requiere documentos legales personalizados. Con dos productos, la complejidad se duplica. Al escalar el onboarding, se requieren cientos de contratos mensuales.',
    problem_en: 'Each new lease (LTO) or employment (DaE) contract requires personalized legal documents. With two products, complexity doubles. At scale, hundreds of monthly contracts are needed.',
    deliverables: ['Templates Jinja2 para contratos LTO + DaE', 'Auto-llenado desde base de datos + generación PDF', 'Firma electrónica básica (Mifiel/ISign, NOM-151)'],
    deliverables_en: ['Jinja2 templates for LTO + DaE contracts', 'Auto-fill from database + PDF generation', 'Basic electronic signature (Mifiel/ISign, NOM-151)'],
    futureScope: 'V2: asistente LLM para reportes de siniestro via WhatsApp (se integra con P0.5c Incident Reporting)',
    futureScope_en: 'V2: LLM assistant for incident reports via WhatsApp (integrates with P0.5c Incident Reporting)',
    architecture: 'Template Engine (Jinja2) → LLM Layer (incident report generation, portfolio summaries) → Digital Signing (Mifiel/ISign) → Document Repository (AWS S3 + PostgreSQL metadata).',
    metrics: [
      { kpi: 'Tiempo de generación de contrato', before: '2 horas', target: '<10 minutos' },
      { kpi: 'Errores en contratos', before: 'Frecuentes', target: '>90% reducción' },
      { kpi: 'Contratos firmados digitalmente', before: '0%', target: '>90%' }
    ],
    benchmark: null
  },
  {
    id: 'P2', name: 'Credit Scoring AI', name_en: 'AI Credit Scoring', track: 'lto', phase: 2,
    description: 'XGBoost + Circulo de Crédito + Belvo → scoring con datos propietarios',
    description_en: 'XGBoost + Circulo de Crédito + Belvo → scoring with proprietary data',
    startMonth: 6, endMonth: 7, effortWeeks: 6,
    primaryUsers: ['Finance Lead', 'Underwriting'],
    stack: ['Circulo de Crédito', 'Belvo', 'MetaMap', 'XGBoost', 'MLflow', 'FastAPI', 'PostgreSQL'],
    dependsOn: ['P0.1', 'P0.5b', 'P1', 'P3'],
    blocks: ['P7'],
    impact: { 500: [64000, 128000], 1000: [128000, 255000], 2000: [255000, 510000] },
    problem: '60% de la población mexicana es "thin file". Para escalar LTO, LAFA necesita evaluar conductores sin buró tradicional. Competidores han demostrado que AI underwriting reduce default rates significativamente. Para este punto, LAFA tendrá meses de datos de pago reales (warm start).',
    problem_en: '60% of the Mexican population is "thin file." To scale LTO, LAFA needs to evaluate drivers without traditional credit bureau. Competitors have shown that AI underwriting significantly reduces default rates. By this point, LAFA will have months of real payment data (warm start).',
    deliverables: ['Integración Circulo de Crédito + Belvo (banking + SAT fiscal)', 'MetaMap para KYC completo (upgrade de P1)', 'Feature engineering + modelo XGBoost v1 con datos reales de LAFA', 'Dashboard de scoring + motor de decisión (Green/Yellow/Red)', 'Framework A/B para iterar el modelo'],
    deliverables_en: ['Circulo de Crédito + Belvo integration (banking + SAT fiscal)', 'MetaMap for complete KYC (upgrade from P1)', 'Feature engineering + XGBoost v1 model with real LAFA data', 'Scoring dashboard + decision engine (Green/Yellow/Red)', 'A/B framework for model iteration'],
    architecture: 'Post-Onboarding (P1) → Bureau Check (Circulo de Crédito) → Open Banking (Belvo) → LAFA Internal Data (payment history, telematics, collections) → Platform Data (Uber/DiDi) → XGBoost Scoring Engine → Decision Engine (Rules + ML).',
    metrics: [
      { kpi: 'Tasa de default (LTO)', before: '10-15% (sin scoring)', target: '<5% (6 meses), <3% (12 meses)' },
      { kpi: 'Tiempo de decisión crediticia', before: 'Manual', target: '<15 min' },
      { kpi: 'Model AUC', before: 'N/A', target: '>0.80 (warm start)' }
    ],
    benchmark: 'OCN: <3% default rate con AI underwriting sobre 25K+ clientes. VEMO: scoring integrado en plataforma ZEE con datos de 2K+ EVs. LAFA ventaja: warm start con 6+ meses de datos propietarios de operación real (pagos, telemática, cobranza) vs cold start de competidores.',
    benchmark_en: 'OCN: <3% default rate with AI underwriting over 25K+ customers. VEMO: scoring integrated in ZEE platform with 2K+ EV data. LAFA advantage: warm start with 6+ months of proprietary real operations data (payments, telematics, collections) vs competitors\' cold start.'
  },
  {
    id: 'P7', name: 'Dashboard Mejorado', name_en: 'Enhanced Dashboard', track: 'foundation', phase: 2,
    description: 'dbt + alertas avanzadas + P&L por vehículo + mapa de flota en tiempo real',
    description_en: 'dbt + advanced alerts + per-vehicle P&L + real-time fleet map',
    startMonth: 7, endMonth: 9, effortWeeks: 4,
    primaryUsers: ['CEO', 'Head of Product', 'Todos'],
    primaryUsers_en: ['CEO', 'Head of Product', 'Everyone'],
    stack: ['Metabase', 'dbt', 'PostgreSQL', 'TimescaleDB', 'FastAPI'],
    dependsOn: ['P0.2', 'P3', 'P4', 'P5'],
    blocks: [],
    impact: { 500: [0, 0], 1000: [0, 0], 2000: [0, 0] },
    problem: 'El dashboard básico (P0.2) ofrece 4 vistas estáticas operativas. Al alcanzar 500+ vehículos con múltiples líneas de negocio (DaE + LTO), el CEO y Head of Product necesitan: métricas financieras en tiempo real (P&L por vehículo, unit economics por cohorte), predicción de riesgos (ranking de default), alertas inteligentes, y reportes automatizados para inversionistas. Esto requiere una capa de transformación (dbt), agregaciones avanzadas, e infraestructura de alertas que P0.2 no puede soportar. Desarrollo en 4 semanas concentradas durante Mo 7-8. Mo 9 = iteración basada en feedback de stakeholders + estabilización.',
    problem_en: 'The basic dashboard (P0.2) offers 4 static operational views. Upon reaching 500+ vehicles with multiple business lines (DaE + LTO), the CEO and Head of Product need: real-time financial metrics (per-vehicle P&L, cohort unit economics), risk prediction (default ranking), smart alerts, and automated investor reports. This requires a transformation layer (dbt), advanced aggregations, and alerting infrastructure that P0.2 cannot support. Development in 4 focused weeks during Mo 7-8. Mo 9 = iteration based on stakeholder feedback + stabilization.',
    deliverables: ['Modelos dbt para métricas calculadas', 'Vistas financieras avanzadas: P&L por vehículo, cohortes, unit economics', 'Vista de riesgo: conductores rankeados por probabilidad de default', 'Sistema de alertas (Slack/WhatsApp para anomalías)', 'Reportes PDF semanales/mensuales automatizados para stakeholders', '8 reportes segmentados: Fleet Health, Driver Performance, Financiero, Mantenimiento, Carga, Cobranza, Seguros, Compliance (patrón Shipday: reports como cards con iconos + descripción)', 'Mapa de flota en tiempo real con overlay de KPIs: vehículos activos, cargando, en mantenimiento, alertas — integra datos de batería de P4 como layer del mapa (patrón Shipday: Map + Performance panel) [Prototipo funcional: fleetmap.html]'],
    deliverables_en: ['dbt models for computed metrics', 'Advanced financial views: per-vehicle P&L, cohorts, unit economics', 'Risk view: drivers ranked by default probability', 'Alert system (Slack/WhatsApp for anomalies)', 'Automated weekly/monthly PDF reports for stakeholders', '8 segmented reports: Fleet Health, Driver Performance, Financial, Maintenance, Charging, Collections, Insurance, Compliance (Shipday pattern: reports as cards with icons + description)', 'Real-time fleet map with KPI overlay: active, charging, in maintenance, alerts — integrates P4 battery data as map layer (Shipday pattern: Map + Performance panel) [Working prototype: fleetmap.html]'],
    architecture: 'Data Layer (PostgreSQL + TimescaleDB + S3) → Aggregation Layer (dbt transformations) → Visualization (Metabase Enhanced) → Alerting Layer (Slack/WhatsApp + automated PDF reports).',
    metrics: [
      { kpi: 'Métricas calculadas disponibles', before: '4 vistas operativas', target: '30+ métricas (operativas + financieras + riesgo)' },
      { kpi: 'Reportes automatizados', before: '0', target: '2/semana (semanal + mensual PDF)' },
      { kpi: 'Latencia de datos', before: 'T+1 día (manual)', target: '<5 minutos (near real-time)' }
    ],
    benchmark: 'Shipday: 9 tipos de reportes segmentados por stakeholder (Sales, Drivers, Performance, Heatmap, etc). OCN: dashboard ejecutivo con métricas de portfolio en tiempo real. LAFA P7: evolución de 4 vistas básicas a 8+ reportes segmentados.',
    benchmark_en: 'Shipday: 9 report types segmented by stakeholder (Sales, Drivers, Performance, Heatmap, etc). OCN: executive dashboard with real-time portfolio metrics. LAFA P7: evolution from 4 basic views to 8+ segmented reports.'
  },
  {
    id: 'P8', name: 'Knowledge Bot (RAG)', name_en: 'Knowledge Bot (RAG)', track: 'foundation', phase: 2,
    description: 'RAG con pgvector: bot Slack interno + bot WhatsApp FAQ para conductores',
    description_en: 'RAG with pgvector: internal Slack bot + WhatsApp FAQ bot for drivers',
    startMonth: 8, endMonth: 9, effortWeeks: 4,
    primaryUsers: ['Todos los equipos', 'Customer Support'],
    primaryUsers_en: ['All teams', 'Customer Support'],
    stack: ['LangChain', 'pgvector', 'OpenAI', 'Slack SDK', 'WhatsApp API'],
    dependsOn: ['P0.1'],
    blocks: [],
    impact: { 500: [15000, 60000], 1000: [30000, 120000], 2000: [60000, 240000] },
    problem: 'Al escalar la flota significativamente, el equipo crece proporcionalmente. El conocimiento operativo hoy vive en pocas personas. Sin documentación indexable, cada nuevo empleado tarda semanas en ser productivo.',
    problem_en: 'As the fleet scales significantly, the team grows proportionally. Operational knowledge currently lives in a few people. Without indexable documentation, each new employee takes weeks to become productive.',
    deliverables: ['Recopilación y estructuración de documentación', 'Pipeline RAG con LangChain + pgvector', 'Bot Slack para equipo interno', 'Bot WhatsApp FAQ para conductores (top 20 preguntas)'],
    deliverables_en: ['Documentation collection and structuring', 'RAG pipeline with LangChain + pgvector', 'Slack bot for internal team', 'WhatsApp FAQ bot for drivers (top 20 questions)'],
    architecture: 'Knowledge Base (manuals, policies, contracts, FAQs, vehicle specs) → RAG Pipeline (chunking + embeddings + pgvector + cosine similarity + reranking) → LLM Response (GPT-4o-mini with citations) → Interfaces (Slack + WhatsApp).',
    metrics: [
      { kpi: 'Consultas respondidas correctamente', before: 'N/A', target: '>85% (resueltas sin escalación humana)' },
      { kpi: 'Tiempo de respuesta', before: 'Manual', target: '<10 segundos' },
      { kpi: 'Tiempo de onboarding de empleado', before: '4 semanas', target: '<2 semanas' }
    ],
    benchmark: 'Slack AI: RAG sobre historial de conversaciones. Notion AI: búsqueda semántica sobre docs internos. LAFA: RAG sobre manuales, contratos, políticas + FAQ WhatsApp para conductores.',
    benchmark_en: 'Slack AI: RAG over conversation history. Notion AI: semantic search over internal docs. LAFA: RAG over manuals, contracts, policies + WhatsApp FAQ for drivers.'
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
    fleet: 300, title: 'Base Digital', title_en: 'Digital Foundation',
    techRequired: ['P0.1', 'P0.2', 'P0.3', 'P0.4', 'P0.5a', 'P0.5b', 'P0.5c', 'P0.5d'],
    vision: 'Una plataforma digital única: cada vehículo, conductor y peso rastreado en tiempo real.',
    vision_en: 'A single digital platform: every vehicle, driver, and peso tracked in real time.'
  },
  {
    fleet: 750, title: 'Escala Autónoma', title_en: 'Autonomous Scale',
    techRequired: ['P1', 'P4', 'P3', 'P5', 'P6'],
    vision: 'Onboarding, cobranza y carga optimizada. La operación escala sin fricción.',
    vision_en: 'Optimized onboarding, collections, and charging. Operations scale without friction.'
  },
  {
    fleet: 1500, title: 'Motor Financiero', title_en: 'Revenue Engine',
    techRequired: ['P2'],
    vision: 'Datos propietarios alimentan el scoring: cada lease aprobado con riesgo medido.',
    vision_en: 'Proprietary data feeds scoring: every approved lease with measured risk.'
  },
  {
    fleet: 2000, title: 'Stack Completo', title_en: 'Complete Stack',
    techRequired: ['P7', 'P8'],
    vision: 'Visibilidad financiera total y conocimiento operativo accesible para todo el equipo.',
    vision_en: 'Full financial visibility and operational knowledge accessible to the entire team.'
  }
]

}; // end window.ROADMAP_DATA
