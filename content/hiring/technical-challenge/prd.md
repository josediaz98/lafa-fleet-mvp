# PRD: Fleet Intelligence & Payroll MVP

> **Status:** Active — guía la implementación del challenge técnico
> **Autor:** Jose Diaz
> **Fuentes:** [brief.md](brief.md) · [assumptions-qa.md](assumptions-qa.md) · [data-generation-plan.md](data-generation-plan.md)
> **Entregables:** Live URL + repositorio con código

---

## 1. Contexto y Objetivo

### Qué es
Un MVP funcional que digitaliza dos procesos core de LAFA, actualmente operados en spreadsheets:

1. **Fleet unit assignment** — asignación de vehículos a conductores por turno
2. **Payroll calculation** — cálculo de nómina semanal basada en horas trabajadas + facturación DiDi

### Para quién
- **Admin (1):** visibilidad global, gestión de nómina, carga de datos
- **Supervisores (3):** operación diaria en su centro (Vallejo, Granada, Roma)

### Qué problema resuelve
LAFA opera ~150 vehículos eléctricos con ~300 conductores DaE. Hoy todo es manual: la asignación de vehículos se hace por WhatsApp, las horas se rastrean en hojas de cálculo, y la nómina se calcula a mano. Este MVP elimina esos procesos manuales y establece la base digital para escalar a 2,000 vehículos.

### Entregables
| # | Entregable | Descripción |
|---|-----------|-------------|
| 1 | **Live URL** | Prototipo funcional desplegado, con datos de prueba precargados |
| 2 | **Código / Arquitectura** | Repositorio accesible + diagrama de arquitectura |

---

## 2. Usuarios y RBAC

Tres roles. El conductor **no** es usuario del sistema — es un registro gestionado por Admin/Supervisor.

> **Ref:** [assumptions-qa.md #20-21](assumptions-qa.md#81-rbac-y-alcance-del-sistema)

| Rol | Quién | Permisos |
|-----|-------|----------|
| **Admin** | 1 persona | Full access. Crea supervisores, sube CSVs DiDi, ejecuta/re-ejecuta cierre de nómina, CRUD de conductores/vehículos/usuarios, ve datos de los 3 centros |
| **Supervisor** | 3 personas (1 por centro) | Check-in/check-out de conductores, asigna vehículos de su centro, ve nómina de su centro (read-only), lista conductores/vehículos de su centro |
| **Conductor** | ~300 personas | **NO tiene acceso al sistema.** Es un entity (registro) gestionado por Admin/Supervisor |

**Jerarquía:** Admin ⊃ Supervisor. El Admin puede realizar todas las acciones del Supervisor.

> **Ref:** [assumptions-qa.md #21](assumptions-qa.md#81-el-admin-puede-actuar-como-supervisor) — Brief: "Administrator: Full access"

---

## 3. Inventario de Pantallas

8 pantallas. Las 2 pantallas core del brief son **Gestión de Turnos** (fleet unit assignment) y **Nómina Semanal** (payroll calculation).

| # | Pantalla | Acceso Admin | Acceso Supervisor | Justificación |
|---|----------|-------------|-------------------|---------------|
| 1 | Login | Sí | Sí | Ruteo por rol a dashboard correspondiente |
| 2 | Dashboard | Global (3 centros) | Su centro | Overview operativo: turnos activos, alertas, KPIs |
| 3 | Gestión de Turnos | Global + override | Su centro | **= Fleet unit assignment** (core del brief) |
| 4 | Carga CSV DiDi | Sí | No | Input de facturación para cálculo de nómina |
| 5 | Nómina Semanal | Global + cierre | Su centro (read-only) | **= Payroll calculation** (core del brief) |
| 6 | Conductores | CRUD global | Lista su centro | Registro de conductores — desbloquea check-in |
| 7 | Vehículos | CRUD global | Pool su centro | Registro de flota — desbloquea asignación |
| 8 | Usuarios | CRUD (solo Admin) | No | Gestión de supervisores — desbloquea RBAC |

---

## 4. Specs por Pantalla

### 4.0 UX Patterns Globales

Patterns compartidos en todas las pantallas. Inspirados en Shipday dispatch UX, adaptados al contexto de herramienta interna LAFA.

| Pattern | Spec | Referencia de diseño (tools/) |
|---------|------|----------------------|
| **Empty states** | Cada pantalla vacía muestra: ilustración + texto contextual + CTA primario. Ej: "No hay turnos activos hoy" + botón `[+ Registrar check-in]` | `onboarding.js` — kanban-empty |
| **Table header** | Barra consistente: Search input (izquierda) + action buttons contextuales (derecha) | `dashboard.js` — header layout |
| **Tab filtering + count badges** | Tabs con conteo dinámico para filtrar por estado. Ej: `Activos (12)` · `Completados (8)` · `Pendientes revisión (1)` | `shared.css` — filter-pills |
| **Status badges** | Colores semi-transparentes por estado: verde (activo/completado), amarillo (pendiente), rojo (alerta/revisión), gris (inactivo) | `shared.js` — COLORS object |
| **Toast notifications** | Feedback de acciones: "Check-in registrado", "CSV cargado — 145 viajes", "Semana cerrada". Auto-dismiss 4s | `shared.css` — toast pattern |
| **Modals** | Formularios usan modal animado (slide-up). Confirmaciones destructivas usan overlay simple con 2 botones | `onboarding.js` — modal pattern |
| **Confirmation dialogs** | Acciones que requieren confirmación: Cerrar semana, Re-ejecutar cierre, Desactivar conductor, Desactivar usuario | — (pattern nuevo) |

**Navegación por rol:** El sidebar muestra solo las pantallas accesibles al rol (items no accesibles se ocultan, no se deshabilitan). Supervisor ve 5 items: Dashboard, Turnos, Nómina, Conductores, Vehículos. Admin ve las 7 pantallas (+ CSV DiDi, Usuarios).

---

### 4.1 Login

**Descripción:** Autenticación simple por email + contraseña. Al autenticarse, el sistema rutea al usuario según su rol:
- Admin → Dashboard global
- Supervisor → Dashboard de su centro

**Componentes UI:**
- Form: email, contraseña, botón "Ingresar"
- Error state: credenciales inválidas

**Validaciones:**
- Email debe existir en tabla `users`
- Contraseña debe coincidir (hashed)
- Cuenta debe estar activa

**Datos precargados (demo):**
| Email | Rol | Centro |
|-------|-----|--------|
| `admin@lafa.mx` | Admin | Global |
| `maria@lafa.mx` | Supervisor | Vallejo |
| `carlos@lafa.mx` | Supervisor | Granada |
| `ana@lafa.mx` | Supervisor | Roma |

---

### 4.2 Dashboard

**Descripción:** Vista resumen de la operación. Admin ve los 3 centros; Supervisor ve solo el suyo.

**Componentes UI:**
- **KPI cards** (4):
  - Turnos activos ahora (conductores en turno)
  - Vehículos disponibles / total
  - Conductores con turno abierto >12h (alerta)
  - Facturación acumulada de la semana en curso
- **Lista de turnos activos (compact cards):** Conductor, vehículo, check-in time, duración actual
- **Alertas:** Turnos sin check-out >12h, conductores cerca del umbral de $6K

**Filtros (Admin):** Dropdown por centro (Vallejo / Granada / Roma / Todos)

**Scope para Supervisor:** Todo se filtra automáticamente por `center_id` del supervisor autenticado.

---

### 4.3 Gestión de Turnos (Fleet Unit Assignment) — CORE

**Descripción:** El Supervisor (o Admin) gestiona la asignación de vehículos a conductores. Flujo principal: check-in (asignar vehículo + registrar inicio de turno) y check-out (registrar fin de turno + liberar vehículo).

> **Ref:** [assumptions-qa.md #1-6](assumptions-qa.md#1-turnos-y-horarios) — Turnos fijos, 2 por día en weekdays, 1 en weekends

**Layout:** 2 paneles lado a lado (inspirado en Shipday Dispatch kanban, adaptado a turnos internos).

**Scope por rol:** El Supervisor opera exclusivamente en su centro (dropdowns pre-filtrados por `center_id`). El Admin ve un **selector de centro** en la parte superior (similar al dropdown de §4.2) que filtra tanto el panel de turnos como el formulario de check-in.

**A. Panel izquierdo (60%) — "Turnos"**

Lista de cards agrupadas por tabs con count badges. El tab "Pendientes revisión" incluye turnos abiertos de cualquier fecha sin check-out (no solo del día actual).

| Tab | Contenido |
|-----|-----------|
| `Activos (n)` | Turnos en curso — cards con: conductor, vehículo (placa + modelo), hora check-in, duración running (timer). Cada card tiene botón `Cerrar turno` |
| `Completados hoy (n)` | Turnos cerrados — cards con: conductor, vehículo, check-in → check-out, duración total |
| `Pendientes revisión (n)` | Turnos abiertos >12h sin check-out — card con badge rojo de alerta |

Empty state por tab: "No hay turnos activos" + CTA `[+ Registrar check-in]`.

**B. Panel derecho (40%) — "Nuevo check-in"**

Formulario compacto siempre visible (no modal):
1. Dropdown conductor (solo de este centro, sin turno activo)
2. Dropdown vehículo (solo `disponible` de este centro)
3. Botón `Registrar check-in` → timestamp automático, vehículo cambia a `en_turno`, card aparece en panel izquierdo bajo tab "Activos"

**C. Acción: Check-out**

Botón `Cerrar turno` en la card del turno activo (panel izquierdo):
1. Click → timestamp automático
2. Vehículo cambia a `disponible`
3. Se calcula `hours_worked = check_out - check_in`
4. Card se mueve de tab "Activos" a "Completados hoy"

**Estados del turno:**

| Estado | Significado |
|--------|------------|
| `en_turno` | Conductor activo con vehículo asignado |
| `completado` | Check-out registrado, horas calculadas |
| `pendiente_revisión` | Turno abierto >12h sin check-out — alerta al supervisor |

**Turnos nocturnos:** Los turnos que cruzan medianoche se asignan al **día de check-in** (consistente con §5.3: la hora de inicio determina la semana).

**Validaciones:**
- Un conductor no puede tener 2 turnos activos simultáneos
- Un vehículo no puede estar asignado a 2 conductores simultáneos
- El supervisor solo ve conductores y vehículos de su centro

**Admin override:** El Admin puede realizar check-in/check-out en cualquier centro y cerrar turnos en `pendiente_revisión` de cualquier centro. No puede reasignar un vehículo `en_turno` sin primero cerrar el turno activo.

> **Ref:** [assumptions-qa.md #3-4](assumptions-qa.md#11-qué-constituye-un-turno) — Supervisor registra, turnos fijos
> **Ref:** [assumptions-qa.md #6](assumptions-qa.md#31-qué-son-las-horas-trabajadas--la-pregunta-crítica) — Horas = duración del turno

---

### 4.4 Carga CSV DiDi (Admin only)

**Descripción:** El Admin sube el CSV de DiDi con los viajes de la semana. El sistema parsea, valida, y almacena los viajes vinculados a cada conductor.

> **Ref:** [assumptions-qa.md #15-17](assumptions-qa.md#6-datos-de-didi-y-fuente-de-verdad) — CSV es único input, subida manual, por Admin

**Componentes UI — Flujo de 3 pasos** (progress indicator horizontal entre steps):

| Step | Nombre | Contenido |
|------|--------|-----------|
| **1. Upload** | Subir archivo | Drag & drop zone o file picker. Acepta `.csv`. Muestra nombre + tamaño del archivo seleccionado |
| **2. Preview + Validate** | Revisar datos | Preview table (primeras 10 filas + indicador "…y N filas más") + validation report con status por fila (verde/amarillo/rojo). Botón `Atrás` para re-subir |
| **3. Confirm** | Confirmar carga | Validation summary: "145 viajes válidos, 3 warnings, 0 errores". Botón `Confirmar carga` (habilitado solo si hay filas válidas) |

Progress bar entre steps usa el pattern existente en `shared.css`.

**Formato esperado del CSV:**

```
Driver ID,Date,Trip ID,Initial time,Final time,Cost,Tip,Initial coordinates,Final coordinates
```

> **Ref:** [brief.md](brief.md#input-data-didi-csv-format) — formato exacto

**Validaciones (parsing):**
1. Header debe coincidir con el formato esperado
2. `Driver ID` debe existir en tabla `drivers` (campo `didi_driver_id`)
3. `Date` formato DD/MM/YYYY
4. `Initial time` < `Final time` (excepto cruces de medianoche)
5. `Cost` debe ser numérico positivo (se stripea el `$`)
6. `Trip ID` debe ser único (no repetir viajes ya cargados)
7. Coordenadas deben estar en rango CDMX (~19.1-19.6, ~-99.4 a -98.9)

**Resultado de la validación:**

| Status | Acción |
|--------|--------|
| Todas las filas válidas | Botón "Confirmar" habilitado |
| Filas con warnings (e.g., fare anómala) | Confirmar habilitado con warnings listados |
| Filas con errores (Driver ID no mapeado) | Mostrar errores, permitir confirmar las filas válidas |
| Archivo vacío o formato incorrecto | Bloquear carga, mostrar error |

**AI Integration — Validación inteligente:**
- Detectar Driver IDs no mapeados y sugerir matches cercanos
- Flaggear anomalías: fare demasiado alta/baja para la distancia, viajes duplicados (mismo driver, misma hora)
- Resumen post-carga: "145 viajes cargados para 28 conductores. 3 warnings. 0 errores."

> **Ref:** [brief.md — AI Focus](brief.md#suggested-tech-stack) — "Agents or LLMs for DiDi data cleaning"

---

### 4.5 Nómina Semanal (Payroll) — CORE

**Descripción:** Vista de cálculo de nómina semanal. Admin ve global y puede ejecutar el cierre. Supervisor ve solo su centro, read-only.

**Componentes UI:**

**A. Tabs de semana** (en vez de dropdown):

| Tab | Descripción |
|-----|-------------|
| `Semana actual (borrador)` | Semana en curso — cálculos en vivo, se recalculan automáticamente hasta el cierre |
| `Cerradas` | Semanas cerradas — dropdown secundario para seleccionar cuál. Status `cerrado` o `superseded` |

**B. Tabla de nómina:**

| Columna | Descripción |
|---------|-------------|
| Conductor | Nombre + DiDi ID |
| Centro | Vallejo / Granada / Roma |
| Horas trabajadas | Suma de duración de turnos cerrados esa semana |
| Facturación DiDi | Suma de `Cost` de viajes esa semana (sin tips) |
| Meta cumplida | Sí / No (40h AND $6K) |
| Salario base | $2,500 o $0 |
| Bono productividad | $100 × floor((facturación - 6000) / 500) |
| Horas extra | $50 × min(horas - 40, 8) — solo si semana previa ≥40h |
| **Pago total** | Suma de componentes (o $1,000 si meta no cumplida) |
| Status | `borrador` · `cerrado` · `superseded` |

**C. Panel de resumen:**
- Total nómina de la semana (suma de pagos)
- Conductores que cumplieron meta vs. no cumplieron
- Distribución por componente (base / bonos / overtime / apoyo económico)

**D. Acciones (Admin only):**
- **"Cerrar semana"** — Congela los cálculos, cambia status a `cerrado`
- **"Re-ejecutar cierre"** — Re-calcula una semana cerrada (crea nueva versión, marca anterior como `superseded`)
- **"Exportar CSV"** — Descarga la tabla como CSV para sistema externo de nómina

> **Ref:** [assumptions-qa.md #22-25](assumptions-qa.md#9-cierre-semanal-domingo-8-pm) — Cierre semanal, re-ejecución, output

**AI Integration — Explicación de cálculos:**
- Al hacer click en un conductor, un panel lateral muestra explicación en lenguaje natural:
  > "Carlos Mendoza trabajó 42.5 horas y facturó $7,230 MXN esta semana. Cumple ambas metas. Base: $2,500. Bono: $100 × 2 = $200 (excedente de $1,230 sobre meta, 2 bloques completos de $500). Overtime: $50 × 2.5h = $125 (semana anterior: 41h, eligible). **Total: $2,825.**"
- Flags automáticos para edge cases:
  - "Andrea López facturó $5,999.50 — le faltaron $0.50 para la meta"
  - "Roberto Sánchez: primera semana, no eligible para overtime"
  - "Nuevo conductor con prorrateada: 3 de 5 días → umbral ajustado a 24h y $3,600"

---

### 4.6 Conductores

**Descripción:** CRUD de registros de conductores. Admin tiene acceso global; Supervisor ve lista de su centro.

**Componentes UI:**

**A. Tabla de conductores:**

| Columna | Descripción |
|---------|-------------|
| Nombre completo | Nombre + apellido |
| DiDi Driver ID | ID numérico de DiDi (para match con CSV) |
| Centro | Vallejo / Granada / Roma |
| Turno default | Diurno / Nocturno |
| Fecha de ingreso | Para cálculo de prorrateada en primera semana |
| Status | `activo` · `inactivo` |

**B. Panel lateral click-to-expand** (inspirado en Shipday Driver List + Daily Payment):

Al hacer click en una fila de conductor, se abre un panel lateral (slide-in desde la derecha) con 2 tabs:

| Tab | Contenido |
|-----|-----------|
| **Datos** | Info del conductor: nombre completo, DiDi Driver ID, centro asignado, turno default, fecha de ingreso, status. Admin puede editar inline; Supervisor ve read-only |
| **Nómina** | Mini-tabla con historial de pagos semanales (últimas 4 semanas): semana, horas, facturación, meta cumplida (sí/no), pago total. Link a la semana completa en pantalla 4.5 |

**C. Acciones:**
- **Admin:** Crear, editar, desactivar conductor (global)
- **Supervisor:** Ver lista de su centro (read-only)

**Validaciones:**
- `didi_driver_id` debe ser único
- Centro debe ser uno de los 3 existentes
- Conductor no se puede eliminar si tiene turnos abiertos

> **Ref:** [assumptions-qa.md #20](assumptions-qa.md#82-el-conductor-tiene-acceso-al-sistema) — Conductor es entity, no usuario

---

### 4.7 Vehículos

**Descripción:** CRUD de registro de vehículos. Admin tiene acceso global; Supervisor ve pool de su centro.

**Componentes UI:**

**A. Tabla de vehículos:**

| Columna | Descripción |
|---------|-------------|
| Placa | Identificador del vehículo |
| Modelo | OEM + modelo (Geely, JAC, GAC) |
| Centro | Vallejo / Granada / Roma |
| Status | `disponible` · `en_turno` · `cargando` · `mantenimiento` · `fuera_de_servicio` |

> **Ref:** [assumptions-qa.md #9](assumptions-qa.md#42-qué-estados-puede-tener-un-vehículo) — 5 estados de vehículo

**B. Acciones:**
- **Admin:** Crear, editar, cambiar status (global). Incluye transiciones a `fuera_de_servicio`
- **Supervisor:** Ver pool de su centro, cambiar status entre `disponible` ↔ `mantenimiento` ↔ `cargando` (estados operativos del día a día)
- `en_turno` es automático — controlado por check-in/check-out (§4.3)
- `fuera_de_servicio` requiere Admin (decisión administrativa, no operativa)

**Validaciones:**
- Placa debe ser única
- No se puede cambiar status a `disponible` si tiene turno activo asignado
- No se puede eliminar vehículo con turno activo

---

### 4.8 Usuarios (Admin only)

**Descripción:** Gestión de cuentas de usuario del sistema (Admin y Supervisores).

**Componentes UI:**

**A. Tabla de usuarios:**

| Columna | Descripción |
|---------|-------------|
| Nombre | Nombre del usuario |
| Email | Login credential |
| Rol | Admin / Supervisor |
| Centro asignado | (Solo para Supervisores) |
| Status | `activo` · `inactivo` |

**B. Acciones (Admin only):**
- Crear supervisor (asignar centro)
- Editar datos de usuario
- Desactivar cuenta

> **Ref:** [assumptions-qa.md #18](assumptions-qa.md#71-cuántos-conductores-maneja-un-supervisor) — 1 supervisor por centro
> **Ref:** Brief: "Administrator: Can create and assign Supervisor role"

**Validaciones:**
- Email debe ser único
- Solo puede existir 1 supervisor activo por centro
- No se puede desactivar al único Admin

---

## 5. Lógica de Negocio: Payroll

### 5.1 Fórmula completa

```python
def calculate_weekly_pay(driver, current_week, previous_week):
    hours = current_week.hours_worked        # Fuente: suma de turnos (check-in/out)
    revenue = current_week.total_billed      # Fuente: suma de Cost del CSV DiDi (sin tips)

    # Prorrateada para conductor nuevo (primera semana incompleta)
    if driver.is_first_week(current_week):
        days_worked = driver.working_days_in(current_week)
        hours_threshold = 40 * (days_worked / 5)
        revenue_threshold = 6000 * (days_worked / 5)
    else:
        hours_threshold = 40
        revenue_threshold = 6000

    # Check meta semanal — ambas condiciones son conjuntivas
    goal_met = (hours >= hours_threshold) and (revenue >= revenue_threshold)

    if not goal_met:
        return 1000  # Solo apoyo económico

    # Salario base
    pay = 2500

    # Bono de productividad: $100 por cada $500 arriba de la meta
    if revenue > revenue_threshold:
        extra_revenue = revenue - revenue_threshold
        bonus_units = int(extra_revenue // 500)  # floor, no redondeo
        pay += bonus_units * 100

    # Horas extra: solo si la semana previa tuvo ≥40h
    # Primera semana del conductor = no eligible (previous_week.hours defaults a 0)
    prev_hours = previous_week.hours_worked if previous_week else 0
    if prev_hours >= 40:
        overtime_hours = min(hours - 40, 8)  # cap a 8h — always 40h, not prorated
        if overtime_hours > 0:
            pay += overtime_hours * 50

    return pay
```

> **Ref:** [brief.md — pseudocódigo](brief.md#payroll-formula-pseudocode)
> **Ref:** [assumptions-qa.md #11](assumptions-qa.md#51-conductor-cumple-40h-pero-factura-5999--recibe-solo-1000) — Condiciones conjuntivas
> **Ref:** [assumptions-qa.md #12](assumptions-qa.md#54-las-propinas-se-incluyen-en-el-umbral-de-6000) — Tips excluidos
> **Ref:** [assumptions-qa.md #13](assumptions-qa.md#53-conductor-nuevo-entra-a-mitad-de-semana--se-prorratean-los-umbrales) — Prorrateada

### 5.2 Reglas de edge cases

| # | Edge Case | Comportamiento | Ref |
|---|-----------|---------------|-----|
| 1 | Horas = 40, Facturación = $5,999 | Meta NO cumplida → $1,000 | qa #11 |
| 2 | Horas = 39.5, Facturación = $8,000 | Meta NO cumplida → $1,000 | qa #11 |
| 3 | Facturación exacta = $6,000.00 | Meta cumplida (≥ no >) | brief |
| 4 | Primera semana del conductor | No eligible para overtime (prev_hours = 0) | qa #14* |
| 5 | Conductor nuevo a mitad de semana | Umbrales prorrateados (40h × days/5, $6K × days/5) | qa #13 |
| 6 | Overtime cap: 50h trabajadas | overtime = min(50-40, 8) = 8h × $50 = $400 | brief |
| 7 | Overtime: semana previa = 39h | No eligible aunque esta semana tenga 48h | brief |
| 8 | Turno sin check-out al cierre | Marcado `pendiente_revisión`, excluido del cálculo automático | qa #2.3 |

*\*Ref #14 de assumptions-qa corresponde a la sección sobre deducciones; la regla de primera semana/overtime está en #5.6 del documento.*

### 5.3 Definición de semana

- **Inicio:** Lunes 00:00:00 CDMX (`America/Mexico_City`)
- **Cierre:** Domingo 20:00:00 CDMX
- **Viajes que cruzan el corte:** Se asignan a la semana donde inició el viaje (`initial_time < domingo 20:00` → semana actual)
- **Ventana domingo 20:00 – lunes 00:00:** Viajes/turnos en esta ventana se asignan a la semana siguiente

> **Ref:** [assumptions-qa.md #22-24](assumptions-qa.md#9-cierre-semanal-domingo-8-pm)

### 5.4 Dos fuentes de datos

| Dato | Fuente | Cómo se obtiene |
|------|--------|-----------------|
| `hours_worked` | Sistema de turnos | Suma de duración de turnos cerrados (check-out - check-in) para ese conductor en la semana |
| `total_billed` | CSV de DiDi | Suma del campo `Cost` (sin `Tip`) de viajes cuyo `Driver ID` mapea al conductor y cuya fecha cae en la semana |

> **Ref:** [assumptions-qa.md #6-7](assumptions-qa.md#31-qué-son-las-horas-trabajadas--la-pregunta-crítica) — LA pregunta crítica resuelta

---

## 6. Integración AI

El AI actúa como **copilot del Admin** — no es una feature principal, es un multiplicador que hace el sistema más inteligente sin agregar complejidad para el usuario.

### 6.1 CSV Upload: Validación inteligente

| Capacidad | Descripción |
|-----------|-------------|
| Formato validation | Detectar y corregir inconsistencias en formato (fecha, moneda, separadores) |
| Driver ID matching | Si un Driver ID no mapea, sugerir matches cercanos ("¿Quisiste decir 114958?") |
| Anomaly detection | Flaggear tarifas atípicas para la distancia, viajes duplicados, gaps temporales sospechosos |
| Resumen post-carga | Narración de lo cargado: "145 viajes, 28 conductores, $27,430 MXN. 3 warnings." |

### 6.2 Payroll: Explicación en lenguaje natural

| Capacidad | Descripción |
|-----------|-------------|
| Desglose por conductor | Explicación step-by-step de cómo se calculó el pago de cada conductor |
| Edge case flags | Alertas cuando un conductor está cerca del umbral o en situación especial |
| Weekly summary | Narrativa del cierre: "22 de 30 conductores cumplieron meta. Nómina total: $68,450 MXN." |

### 6.3 Scope mínimo para el MVP

- AI **no** reemplaza ninguna lógica de negocio — solo explica y valida
- AI **no** toma decisiones autónomas — sugiere, el Admin confirma
- Si la integración AI falla, el sistema funciona igual (graceful degradation)
- AI Payroll explanation (§6.2) está disponible para **ambos roles** — el Supervisor ve la explicación de conductores de su centro. Solo las acciones de cierre/re-ejecución son Admin-only

> **Ref:** [brief.md — AI Focus](brief.md#suggested-tech-stack) — "Agents or LLMs for DiDi data cleaning, complex business rule validation"

---

## 7. Modelo de Datos

### 7.1 Tablas

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   centers    │────<│    users      │     │  vehicles    │
│─────────────│     │──────────────│     │─────────────│
│ id           │     │ id            │     │ id           │
│ name         │     │ name          │     │ plate        │
│ address      │     │ email         │     │ model        │
│ coordinates  │     │ password_hash │     │ oem          │
└─────────────┘     │ role          │     │ center_id ──→│
       │            │ center_id ──→ │     │ status       │
       │            │ status        │     └─────────────┘
       │            └──────────────┘            │
       │                                        │
       ▼                                        ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   drivers    │────<│   shifts      │────>│  vehicles    │
│─────────────│     │──────────────│     └─────────────┘
│ id           │     │ id            │
│ full_name    │     │ driver_id ──→ │
│ didi_driver_id│    │ vehicle_id ──→│
│ center_id ──→│     │ check_in      │
│ default_shift│     │ check_out     │
│ start_date   │     │ hours_worked  │
│ status       │     │ status        │
└─────────────┘     │ created_by ──→│ (user who registered)
       │            └──────────────┘
       │
       ▼
┌──────────────┐     ┌────────────────┐
│ csv_uploads   │     │ weekly_payroll  │
│──────────────│     │────────────────│
│ id            │     │ id              │
│ filename      │     │ driver_id ──→   │
│ uploaded_by ──→│(user)│ week_start      │
│ uploaded_at   │     │ week_end        │
│ record_count  │     │ hours_worked    │
│ status        │     │ total_billed    │
└──────┬───────┘     │ tips_total      │
       │             │ goal_met        │
       ▼             │ base_salary     │
┌──────────────┐     │ productivity_bonus│
│    trips      │     │ overtime_pay    │
│──────────────│     │ total_pay       │
│ id            │     │ status          │
│ driver_id ──→ │     │ version         │
│ didi_trip_id  │     │ ai_explanation  │
│ date          │     │ closed_by ──→   │ (Admin who closed)
│ initial_time  │     │ closed_at       │
│ final_time    │     └────────────────┘
│ cost          │
│ tip           │
│ initial_coords│
│ final_coords  │
│ upload_id ──→ │ (csv_uploads)
└──────────────┘
```

### 7.2 Descripción de tablas

| Tabla | Propósito | Demo Seed | 150 Vehículos | 2,000 Vehículos |
|-------|-----------|-----------|---------------|-----------------|
| `centers` | Centros operativos | 3 | 3 | 10–20 |
| `profiles` | Admin + Supervisores — cuentas del sistema | 4 | ~6–10 | ~25–45 |
| `drivers` | Conductores DaE — registros, no usuarios | 30 | ~300 | ~4,000 |
| `vehicles` | Flota de vehículos eléctricos | 12 | 150 | 2,000 |
| `shifts` | Turnos registrados (check-in/check-out) | 16 | ~1,800/sem | ~24,000/sem |
| `trips` | Viajes parseados del CSV de DiDi | 68 | ~10,800/sem | ~144,000/sem |
| `csv_uploads` | Registro de cada carga CSV | 0 | ~1/sem | ~1–3/sem |
| `weekly_payroll` | Cálculos de nómina por conductor por semana | 30 | ~300/sem | ~4,000/sem |

> **Ref:** [data-generation-plan.md](data-generation-plan.md) — Demo seed: 30 drivers, 12 vehículos. Estimaciones de producción en §7.7.

### 7.3 Relaciones clave

- `drivers.didi_driver_id` ↔ CSV `Driver ID` — vincula facturación con conductor
- `shifts.driver_id` + `shifts.check_in/check_out` → `weekly_payroll.hours_worked`
- `trips.driver_id` + `trips.cost` (donde `trips.date` está en la semana) → `weekly_payroll.total_billed`
- `weekly_payroll.version` — permite re-ejecución de cierre sin perder histórico

### 7.4 Schema SQL (Supabase PostgreSQL)

The complete DDL, RLS policies, and seed data are in [`supabase-schema.sql`](supabase-schema.sql). Copy-paste the entire file into the Supabase SQL Editor to set up the database.

**Key design decisions:**
- UUIDs as primary keys (Supabase convention, compatible with `auth.users.id`)
- `profiles` table linked to `auth.users` via FK — Supabase Auth handles authentication; `profiles` stores role + center assignment
- `drivers.didi_driver_id` has UNIQUE index for CSV matching
- `trips.didi_trip_id` has UNIQUE index to prevent duplicate imports
- `shifts` indexed on `(driver_id, check_in)` for payroll aggregation
- `trips` indexed on `(driver_id, date)` for weekly billing aggregation
- `weekly_payroll` has UNIQUE constraint on `(driver_id, week_start, version)` for idempotent re-execution

### 7.5 Supabase Setup

**Proyecto Supabase:**
1. Crear proyecto en [supabase.com](https://supabase.com) (free tier — ver nota de capacidad abajo)
2. Copiar `Project URL` y `anon public key` desde Settings → API
3. Configurar environment variables:

```bash
cp .env.example .env.local
# Edit .env.local:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key
```

> **Nota de capacidad:** El free tier (500 MB) soporta ~150 vehículos por ~1 año (~620K filas/año). Para 2,000 vehículos (~8.3M filas/año), se requiere Pro tier ($25/mo, 8 GB). Ver §7.7.

**Auth setup — 4 demo users:**

Pre-seed users via Supabase Dashboard (Authentication → Users → Add User) or via API:

| Email | Password | Role | Centro |
|-------|----------|------|--------|
| `admin@lafa.mx` | `admin123` | admin | Global |
| `maria@lafa.mx` | `super123` | supervisor | Vallejo |
| `carlos@lafa.mx` | `super123` | supervisor | Granada |
| `ana@lafa.mx` | `super123` | supervisor | Roma |

After creating auth users, run the seed SQL from `supabase-schema.sql` to populate the `profiles` table with the matching UUIDs.

**RLS (Row Level Security):**

Enabled on all tables. Two policy patterns:

| Tabla | Admin | Supervisor |
|-------|-------|------------|
| `centers` | Full access | SELECT only |
| `profiles` | Full access | Own profile only |
| `drivers` | Full access | SELECT where `center_id` matches |
| `vehicles` | Full access | SELECT + UPDATE where `center_id` matches |
| `shifts` | Full access | SELECT + INSERT where driver's `center_id` matches |
| `trips` | Full access | SELECT where driver's `center_id` matches |
| `csv_uploads` | Full access (INSERT + SELECT) | No access |
| `weekly_payroll` | Full access | SELECT where driver's `center_id` matches |

### 7.6 Arquitectura Backend

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React/Vite)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │LoginPage │ │ShiftsPage│ │CsvUpload │ │PayrollPg │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │
│       │             │            │             │          │
│  ┌────▼─────────────▼────────────▼─────────────▼──────┐  │
│  │              AppContext (React State)               │  │
│  │    Local cache — syncs with Supabase on mutations   │  │
│  └────────────────────┬───────────────────────────────┘  │
│                       │                                   │
│  ┌────────────────────▼───────────────────────────────┐  │
│  │           Supabase Client (supabase-js)            │  │
│  │  • supabase.auth.signInWithPassword()              │  │
│  │  • supabase.from('table').select/insert/update     │  │
│  └────────────────────┬───────────────────────────────┘  │
└───────────────────────┼───────────────────────────────────┘
                        │ HTTPS (PostgREST API)
┌───────────────────────▼───────────────────────────────────┐
│                    Supabase (Cloud)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Auth Service │  │  PostgREST   │  │  PostgreSQL    │  │
│  │  (JWT tokens) │  │  (REST API)  │  │  (8 tables)    │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬───────┘  │
│         │                 │                    │           │
│         │         ┌───────▼────────┐           │           │
│         └────────►│  RLS Policies  │◄──────────┘           │
│                   │ (per-request)  │                       │
│                   └────────────────┘                       │
└───────────────────────────────────────────────────────────┘
```

**Flujo de datos (ejemplo: Payroll):**
1. Admin sube CSV DiDi → frontend parsea y valida (client-side)
2. Filas válidas → `supabase.from('trips').insert(rows)`
3. Al consultar nómina → `supabase.from('trips').select()` + `supabase.from('shifts').select()` filtrados por semana
4. Cálculo de payroll ejecutado client-side (`lib/payroll.ts` — idéntico)
5. "Cerrar semana" → `supabase.from('weekly_payroll').insert(records)` con status `cerrado`

**Lo que NO pasa por el backend:**
- Cálculo de payroll (determinístico, client-side)
- Parsing de CSV (client-side)
- AI explanation generation (template-based, client-side)

> **Nota de escala:** Estos 3 items (payroll, CSV, AI) funcionan client-side a 150 vehículos. A 2,000 vehículos, los 3 migran a server-side (Edge Functions o pg functions). Ver §7.7.

---

### 7.7 Capacidad y Escala

LAFA opera ~150 vehículos hoy y apunta a 2,000 para fin de 2026 (13× crecimiento). Esta sección documenta las implicaciones de volumen en la arquitectura.

**Supuestos:** ~2 conductores/vehículo, 6 días operativos/semana, ~12 viajes DiDi/vehículo/día, 2 turnos/vehículo/día.

**Volúmenes estimados por escala:**

| Métrica | Demo Seed | 150 Vehículos | 2,000 Vehículos |
|---------|-----------|---------------|-----------------|
| Conductores | 30 | ~300 | ~4,000 |
| Viajes/semana | 68 | ~10,800 | ~144,000 |
| Turnos/semana | 16 | ~1,800 | ~24,000 |
| Registros payroll/semana | 30 | ~300 | ~4,000 |
| Tamaño CSV DiDi | ~5 KB | ~1–2 MB | ~15–20 MB |
| Filas anuales (todas las tablas) | — | ~620K | ~8.3M |
| Centros operativos | 3 | 3 | 10–20 |

> **Derivación:** `viajes/semana = vehículos × 12 viajes/día × 6 días`. `turnos/semana = vehículos × 2 turnos/día × 6 días`.

**Infraestructura por escala:**

| Aspecto | 150 Vehículos | 2,000 Vehículos |
|---------|---------------|-----------------|
| Supabase tier | Free (500 MB) — ~1 año | Pro ($25/mo, 8 GB) — ~2 años |
| CSV upload | Client-side parsing OK | Chunked upload o server-side parsing |
| Payroll compute | Client-side OK (~300 registros) | Server-side (Edge Function o pg function) |
| Dashboard queries | Sin paginación | Paginación + filtros server-side |
| Tablas con paginación | No necesario | `trips`, `shifts`, `weekly_payroll` |

**Limitaciones conocidas a 2K vehículos (migración requerida):**

1. **`fetchAllData()` en AppContext** — Carga todas las tablas al iniciar sesión. A 2K vehículos (~4K conductores, ~24K turnos/semana), esto sería ~500ms–2s. Solución: lazy loading por pantalla + paginación server-side.
2. **CSV parsing client-side** — Un CSV de 144K filas (~15–20 MB) puede causar lag en el navegador. Solución: streaming parser o Edge Function.
3. **Payroll compute client-side** — Calcular 4,000 registros de nómina con joins a turnos y viajes es O(n²) en el peor caso. Solución: pg function o Edge Function.
4. **Dashboard queries sin índices de fecha** — Las queries de KPI agregan sobre `shifts` y `trips` sin filtro de fecha eficiente. Los índices en §7.4 mitigan esto.
5. **RLS subquery performance** — Las policies de supervisor hacen `EXISTS (SELECT 1 FROM drivers WHERE center_id = ...)`. Los índices `idx_drivers_center` y `idx_vehicles_center` aseguran que estos subqueries usen index scan, no seq scan.
6. **Supabase 1K default row limit** — PostgREST retorna max 1,000 filas por default. Sin `.limit()` explícito, queries de `trips` y `shifts` se truncarían silenciosamente a ~150 vehículos. Mitigado con `.limit(10000)` en `supabase-queries.ts`.

---

## 8. Fuera de Scope

Explícitamente **NO** se construye en este MVP:

| Feature | Por qué no |
|---------|-----------|
| Deducciones IMSS/ISR/INFONAVIT | Se integra con sistema de nómina externo (Runa/Worky) en fase futura |
| Telematics / SOC en tiempo real | Requiere integración con OEM o dispositivo IoT — fuera del challenge |
| Multi-ciudad | LAFA opera solo en CDMX — campo `city` reservado pero sin lógica |
| App para conductor | El conductor no es usuario del sistema |
| API DiDi en tiempo real | El brief especifica CSV como input; API es fase futura |
| Overrides manuales de nómina | El Admin puede re-ejecutar cierre, pero no editar montos individuales |
| Reporte de incidentes vehiculares | Edge case de vehículo descompuesto se resuelve fuera del sistema en MVP |
| Scheduling automático | Los turnos se asignan manualmente por el supervisor, no por algoritmo |
| Multi-plataforma (Uber, etc.) | Solo DiDi — partnership exclusivo de LAFA |

> **Ref:** [assumptions-qa.md #14, #10.3, notas de implementación](assumptions-qa.md#notas-para-la-implementación)

---

## Datos de Prueba

El generator (`generate_didi_data.py`) produce 3 semanas de datos con 30 conductores y 22 edge cases deliberados. Ver [data-generation-plan.md](data-generation-plan.md) para el catálogo completo. El seed SQL en [`supabase-schema.sql`](supabase-schema.sql) contiene INSERTs equivalentes para poblar la base de datos directamente.

| Semana | Rango | Nota |
|--------|-------|------|
| Week 1 (Feb 2-8) | Primera semana — **no hay overtime posible** | Tests: sin `previous_week` |
| Week 2 (Feb 9-15) | Conductor nuevo entra miércoles | Tests: prorrateada, overtime eligibility |
| Week 3 (Feb 16-22) | Ciclo completo | Tests: todos los edge cases |

---

*Documento creado: Feb 17, 2026*
*Última actualización: Feb 17, 2026 — Migración a Supabase backend*
*Próximo paso: Configurar proyecto Supabase y ejecutar `supabase-schema.sql`*
