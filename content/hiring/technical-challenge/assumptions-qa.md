# Supuestos y Preguntas de Clarificación — Technical Challenge

> **Contexto:** El brief del challenge técnico (fleet unit assignment + payroll) contiene ~25 ambigüedades implícitas que, sin aclarar, llevan a implementaciones incorrectas. Este documento las surfacea, hace la pregunta, y propone una respuesta estimada basada en la entrevista con Levi, estándares de la industria fleet-as-a-service, y extrapolación del brief.
>
> **Formato:** Pregunta → Por qué importa → Supuesto estimado → Fuente
>
> **Referencia:** [brief.md](brief.md) · [Entrevista con Levi](../interviews/interview-levi-2026-02-06.md) · [AI Roadmap](../../strategy/ai-roadmap.md)

---

## Tabla Resumen de Supuestos

| # | Dominio | Supuesto | Confianza |
|---|---------|----------|-----------|
| 1 | Turnos | Weekdays: 2 turnos/día (diurno + nocturno). Weekends: turno único diurno | Alta |
| 2 | Turnos | Ventana de carga entre turnos (~2-4h, weekdays only — weekends sin turno nocturno) | Media |
| 3 | Turnos | Turnos fijos asignados por supervisor, no elegidos por conductor | Alta |
| 4 | Check-in | Supervisor registra check-in/check-out en el sistema (no el conductor) | Alta |
| 5 | Check-in | Check-in = entrega de llave + inspección visual + confirmación en app | Media |
| 6 | Horas | "Horas trabajadas" = duración del turno (check-in a check-out) | Alta |
| 7 | Horas | NO es la suma de tiempos de viaje del CSV de DiDi | Alta |
| 8 | Vehículos | Weekdays: 2 conductores/vehículo/día (diurno + nocturno). Weekends: 1 conductor/vehículo | Alta |
| 9 | Vehículos | Estatus: disponible, en turno, cargando, en mantenimiento | Media |
| 10 | Vehículos | SOC mínimo (~20%) requerido para asignación | Media |
| 11 | Nómina | Ambas condiciones (40h AND $6K) son conjuntivas — fallar una = $1,000 | Alta |
| 12 | Nómina | Propinas NO se incluyen en el umbral de $6,000 MXN | Media |
| 13 | Nómina | Conductor nuevo a mitad de semana = prorrateo proporcional | Baja |
| 14 | Nómina | No se modelan deducciones IMSS/ISR en el MVP | Alta |
| 15 | DiDi | El CSV de DiDi es el ÚNICO input de facturación | Alta |
| 16 | DiDi | El CSV se sube manualmente (no hay API en este stage) | Alta |
| 17 | DiDi | La subida es diaria o semanal, a cargo del supervisor | Media |
| 18 | Supervisor | 1 supervisor por centro (3 total): Vallejo, Granada, Roma + 1 Admin | Alta |
| 19 | Supervisor | El supervisor ve solo sus conductores/vehículos asignados | Alta |
| 20 | RBAC | El conductor NO tiene acceso al sistema | Alta |
| 21 | RBAC | Admin puede actuar como Supervisor (superconjunto de permisos) | Alta |
| 22 | Cierre | Zona horaria = CDMX (CST UTC-6 / CDT UTC-5) | Alta |
| 23 | Cierre | Semana = lunes 00:00 a domingo 20:00 | Media |
| 24 | Cierre | Viajes en curso a las 20:00 del domingo se asignan a la semana en curso | Media |
| 25 | Escala | MVP diseñado para 150 vehículos, arquitectura pensada para 2,000 | Alta |

---

## 1. Turnos y Horarios

### 1.1 ¿Qué constituye un "turno"?

**Pregunta:** ¿Un turno es una ventana horaria fija (e.g., 6 AM–4 PM) o es flexible según el conductor?

**Por qué importa:** La definición de turno determina cómo se calculan las "40 horas trabajadas" y cómo se modela la asignación de vehículos. Un turno fijo simplifica el scheduling; uno flexible requiere validaciones de overlap y disponibilidad en tiempo real.

**Supuesto estimado:** Turnos fijos definidos por el supervisor. En el modelo Driver-as-Employee, LAFA controla la operación — el conductor "solo se presenta y maneja" (Levi). Esto implica horarios predefinidos, no flexibilidad tipo gig.

**Fuente:** Entrevista con Levi ("el conductor solo tiene que presentarse y saber que al inicio de su turno va a haber un carro listo para manejar")

---

### 1.2 ¿Cuántos turnos por vehículo por día?

**Pregunta:** ¿Se opera un turno o dos turnos por vehículo? ¿Es posible un tercer turno parcial?

**Por qué importa:** Esto define la cardinalidad de la relación vehículo-conductor y la utilización de flota. Si hay 150 vehículos con 2 turnos, hay ~300 conductores activos. Esto impacta directamente el volumen de datos de nómina y la complejidad de asignación.

**Supuesto estimado:** **Weekdays:** 2 turnos por vehículo (diurno + nocturno). **Weekends (sáb-dom):** turno único diurno — no hay turno nocturno. Esto reduce la utilización de flota en fin de semana pero refleja la demanda real de ride-hailing (sábado ~85%, domingo ~70% del volumen weekday). Con 150 vehículos × 2 turnos weekday, esto sugiere ~250-300 conductores DaE.

**Fuente:** Benchmark VEMO (2.5 drivers/vehicle) · Estándar industria fleet-as-a-service · Decisión operativa LAFA

---

### 1.3 ¿Cuáles son los horarios de turno?

**Pregunta:** ¿Qué horas abarca cada turno? ¿Se respeta el máximo de jornada de la LFT?

**Por qué importa:** La Ley Federal del Trabajo en México establece: jornada diurna máx. 8h, mixta 7.5h, nocturna 7h. Para llegar a 40h/semana con turnos de 8h se necesitan exactamente 5 días. Turnos más largos requieren pago de horas extra o violan la LFT.

**Supuesto estimado:** Turno diurno ~6:00-16:00 (10h con 1-2h de descanso = 8h efectivas). Turno nocturno ~18:00-04:00 (10h con 2-3h de descanso = 7h efectivas). 5 días/semana = 40h diurno, 35h nocturno. Esto explica por qué el umbral es 40h — calza con jornada diurna de 5 días.

**Fuente:** LFT Art. 58-68 · Extrapolación del brief (40h = 5 días × 8h)

---

### 1.4 ¿Hay una ventana de carga obligatoria entre turnos?

**Pregunta:** ¿Se reserva tiempo entre turnos para cargar el vehículo? ¿Cuánto?

**Por qué importa:** Si el vehículo necesita 2-4h de carga entre turnos, hay una ventana donde no está disponible. Esto afecta la asignación: un vehículo que termina turno diurno a las 16:00 y necesita 2h de carga no está disponible para turno nocturno hasta las 18:00.

**Supuesto estimado:** **Weekdays:** Sí, 2-4h de carga entre turnos (diurno→nocturno y nocturno→diurno). LAFA paga la carga (~$300 MXN/semana por vehículo) y probablemente usa carga en depot centralizado. El vehículo status cambia a "cargando" al terminar un turno y vuelve a "disponible" cuando alcanza SOC suficiente. **Weekends:** Sin turno nocturno, la carga ocurre después del turno diurno (ventana nocturna completa disponible).

**Fuente:** Entrevista con Levi (LAFA paga carga) · [charging-economics.md](../../analysis/fleet/charging-economics.md)

---

## 2. Check-In / Check-Out del Conductor

### 2.1 ¿Quién registra el check-in/check-out en el sistema?

**Pregunta:** ¿El supervisor registra manualmente el check-in/out, o el conductor lo hace en una app propia?

**Por qué importa:** El brief dice que el Supervisor "registra el check-in/check-out del conductor". Si es responsabilidad exclusiva del supervisor, el conductor no necesita interfaz en el sistema. Esto simplifica el RBAC pero crea un cuello de botella operativo.

**Supuesto estimado:** El supervisor lo registra en el sistema. El conductor NO interactúa con la plataforma. En Stage 0 esto probablemente se hace con WhatsApp o presencialmente; el MVP digitaliza este flujo para el supervisor.

**Fuente:** Brief (Supervisor: "Registers driver check-in/check-out") · Entrevista (tech stage 0, todo en spreadsheets)

---

### 2.2 ¿Qué implica físicamente un check-in?

**Pregunta:** ¿El check-in es solo un registro digital o involucra pasos físicos (entrega de llave, inspección, etc.)?

**Por qué importa:** Esto define la complejidad del formulario de check-in. Si hay inspección vehicular, se necesitan campos adicionales (kilómetros, nivel de batería, daños visibles). Si solo es un timestamp, es un botón.

**Supuesto estimado:** Check-in mínimo para MVP: seleccionar conductor, seleccionar vehículo, timestamp automático. En la realidad operativa probablemente hay entrega de llave e inspección visual, pero para el prototype basta con el registro digital.

**Fuente:** Extrapolación del brief (MVP scope) · Estándar industria fleet (inspection at handoff)

---

### 2.3 ¿Qué pasa si un conductor no hace check-out?

**Pregunta:** Si un conductor termina su turno pero el supervisor no registra el check-out, ¿el sistema cierra el turno automáticamente?

**Por qué importa:** Sin check-out, las "horas trabajadas" quedan abiertas indefinidamente. Esto corrompe el cálculo de nómina. Se necesita una regla de cierre automático o una alerta al supervisor.

**Supuesto estimado:** El sistema alerta al supervisor si un turno lleva abierto más de 12h. No hay auto-cierre en el MVP — el supervisor debe cerrar manualmente. Un turno sin check-out se marca como "pendiente de revisión" y no se incluye en el cierre semanal hasta que se resuelva.

**Fuente:** Best practice operativa · Extrapolación (evitar datos corruptos en nómina)

---

## 3. Definición de "40 Horas Trabajadas"

### 3.1 ¿Qué son las "horas trabajadas"? — LA pregunta crítica

**Pregunta:** `current_week.hours_worked` en el pseudocódigo, ¿se refiere a (a) duración total de turnos (check-in a check-out), (b) tiempo online en plataforma DiDi, o (c) suma acumulada de tiempos de viaje del CSV (initial_time a final_time)?

**Por qué importa:** Esta es la ambigüedad más importante del brief. Cada definición produce números radicalmente distintos:

| Definición | Ejemplo para 1 día de 10h | Horas/semana (5 días) |
|-----------|--------------------------|----------------------|
| **(a) Duración de turno** | 10h (check-in a check-out) | 50h |
| **(b) Online en DiDi** | ~8h (excluyendo breaks) | 40h |
| **(c) Suma de viajes** | ~5-6h (solo tiempo con pasajero) | 25-30h |

Con definición (c), casi ningún conductor llegaría a 40h. Con definición (a), casi todos llegan. El resultado de nómina cambia dramáticamente.

**Supuesto estimado:** **(a) Duración del turno (check-in a check-out)**. Razones:
1. LAFA es modelo empleador — el conductor está a disposición de la empresa durante todo su turno, no solo cuando tiene viaje
2. La LFT define jornada como "tiempo a disposición del patrón" (Art. 58), no tiempo productivo
3. El brief separa "hours worked" (turno) de "total billed" (DiDi CSV) como dos condiciones independientes
4. Si fuera suma de viajes, el pseudocódigo usaría datos del CSV, pero `hours_worked` está separado de `total_billed`

**Fuente:** LFT Art. 58 · Lógica del pseudocódigo (variables separadas) · Modelo empleador DaE

---

### 3.2 Si las horas vienen del turno, ¿para qué se necesita el CSV de DiDi?

**Pregunta:** Si las horas se derivan del check-in/check-out, ¿el CSV de DiDi solo se usa para el `total_billed`?

**Por qué importa:** Clarifica el rol de cada fuente de datos. El CSV aporta facturación + metadata de viajes (coordenadas, propinas). Las horas vienen del sistema de check-in/check-out.

**Supuesto estimado:** Correcto. El CSV de DiDi es fuente de verdad para **facturación** (`total_billed` = suma de `Cost`). Las horas trabajadas vienen del **sistema de turnos** (check-in/check-out timestamps). Son dos fuentes de datos distintas que alimentan la fórmula de nómina.

**Fuente:** Estructura del pseudocódigo · Separación de concerns en el brief

---

## 4. Asignación de Vehículos y Disponibilidad

### 4.1 ¿Cómo asigna el supervisor un vehículo?

**Pregunta:** ¿La asignación es fija (conductor X siempre usa vehículo Y), rotativa, o el supervisor elige de un pool disponible?

**Por qué importa:** Asignación fija es trivial (lookup table). Pool disponible requiere lógica de filtrado por status + SOC + mantenimiento. Rotativa necesita un scheduler.

**Supuesto estimado:** Pool disponible. El supervisor selecciona de una lista de vehículos con status "disponible" al momento de hacer check-in. Para el MVP, filtrar por disponibilidad es suficiente. La asignación fija no escala cuando un vehículo entra a mantenimiento. **Weekdays:** 2 conductores distintos pueden usar el mismo vehículo (turno diurno + nocturno). **Weekends:** 1 conductor por vehículo (solo turno diurno).

- **Importante:** La asignación es **conductor→vehículo** (por turno), NO conductor→viaje. El supervisor asigna qué conductor usa qué vehículo en cada turno. Una vez en turno, los viajes individuales los asigna DiDi automáticamente dentro de su plataforma — LAFA no interviene en ese matching.

**Fuente:** Brief (Supervisor "assigns available vehicles per shift") — "available" implica pool, no fijo

---

### 4.2 ¿Qué estados puede tener un vehículo?

**Pregunta:** ¿Cuáles son los estados válidos del lifecycle de un vehículo?

**Por qué importa:** Los estados determinan cuándo un vehículo aparece en el pool de asignación y afectan la utilización de flota.

**Supuesto estimado:**

| Estado | Disponible para asignación | Descripción |
|--------|---------------------------|-------------|
| `disponible` | Sí | Listo para asignar, SOC suficiente |
| `en_turno` | No | Asignado a un conductor activo |
| `cargando` | No | En depot de carga |
| `mantenimiento` | No | En taller o inspección |
| `fuera_de_servicio` | No | Incidente, daño, baja temporal |

**Fuente:** Estándar industria fleet management · Extrapolación del brief

---

### 4.3 ¿Se requiere un SOC mínimo de batería para asignar un vehículo?

**Pregunta:** ¿Debería el sistema bloquear la asignación si la batería está por debajo de cierto nivel?

**Por qué importa:** Asignar un vehículo con 15% de SOC a un turno de 10h garantiza que el conductor no podrá completar su jornada. Esto afecta directamente su capacidad de cumplir las 40h y los $6K.

**Supuesto estimado:** Sí, pero para el MVP es un dato informativo, no un blocker. El sistema muestra el SOC estimado (si se tiene dato del cargador o del último reporte), pero no bloquea la asignación. En fase futura, con telematics integrado, se convierte en regla de negocio.

**Fuente:** [battery-degradation.md](../../analysis/fleet/battery-degradation.md) · Scope de MVP

---

## 5. Casos Borde de Nómina

### 5.1 ¿Conductor cumple 40h pero factura $5,999 — recibe solo $1,000?

**Pregunta:** Si falla UNA de las dos condiciones (horas ≥40 AND facturación ≥$6,000), ¿la consecuencia es $1,000 de apoyo económico?

**Por qué importa:** El pseudocódigo usa `and` — ambas condiciones deben cumplirse. Pero esto crea un caso duro: un conductor que trabajó 5 días completos pero facturó $1 menos que el umbral pierde $1,500+ de salario.

**Supuesto estimado:** Sí, el pseudocódigo es explícito: `goal_met = (hours >= 40) and (revenue >= 6000)`. Si cualquiera falla → $1,000. Para el MVP, implementar tal cual. Nota: en producción real probablemente habrá un margen de tolerancia (e.g., $5,900 se redondea), pero el brief no lo menciona.

**Fuente:** Brief (pseudocódigo explícito)

---

### 5.2 ¿Qué pasa si el vehículo se descompone a mitad de turno?

**Pregunta:** Si un vehículo tiene falla mecánica o queda sin batería y el conductor no puede completar su turno/semana, ¿cómo se maneja en nómina?

**Por qué importa:** El conductor no controló la falla. Si pierde horas o facturación por culpa de la empresa, castigarlo con $1,000 es injusto y probablemente ilegal bajo la LFT (el patrón debe garantizar condiciones de trabajo).

**Supuesto estimado:** Fuera de scope del MVP. Para el prototype, no se modela este edge case. En producción, debería haber un mecanismo de "horas acreditadas por causa ajena al conductor" que complementa sus horas registradas. Esto requiere un flujo de reporte de incidentes.

**Fuente:** LFT Art. 58 (tiempo a disposición del patrón) · Scope del challenge (MVP)

---

### 5.3 ¿Conductor nuevo entra a mitad de semana — se prorratean los umbrales?

**Pregunta:** Si un conductor comienza el miércoles, ¿el umbral de 40h y $6,000 se ajusta proporcionalmente?

**Por qué importa:** Sin prorrateo, todo conductor nuevo automáticamente recibe $1,000 su primera semana (es imposible hacer 40h en 3 días con turnos de 8h).

**Supuesto estimado:** Se prorratean las condiciones para la primera semana. Si el conductor trabajó 3 de 5 días hábiles: umbral de horas = 40 × (3/5) = 24h, umbral de facturación = $6,000 × (3/5) = $3,600. Para el MVP, se puede implementar con una fecha de inicio por conductor.

**Fuente:** Extrapolación lógica · Best practice nómina (primera semana incompleta)

---

### 5.4 ¿Las propinas se incluyen en el umbral de $6,000?

**Pregunta:** El CSV de DiDi tiene columna `Tip`. ¿Las propinas suman al `total_billed` para el umbral de $6,000?

**Por qué importa:** En la industria, las propinas suelen ser del conductor, no de la empresa. Si se incluyen en `total_billed`, el umbral es más fácil de alcanzar. Si no, solo cuenta `Cost`.

**Supuesto estimado:** NO se incluyen. El `total_billed` = suma de `Cost` (tarifa del viaje). Las propinas son del conductor. Esto es consistente con la práctica de DiDi donde la propina va directo al driver, no se reporta como facturación de la empresa.

**Fuente:** Práctica estándar plataformas de ride-hailing · CSV tiene `Cost` y `Tip` como columnas separadas

---

### 5.5 ¿Se modelan deducciones legales (IMSS, ISR, INFONAVIT)?

**Pregunta:** ¿La nómina del challenge incluye deducciones fiscales y de seguridad social?

**Por qué importa:** En México, el costo real para el empleador es ~35-40% encima del salario bruto (IMSS patronal, aguinaldo, vacaciones, prima vacacional, ISR). Esto es material para la unit economics pero complejo de implementar.

**Supuesto estimado:** NO para el MVP. El pseudocódigo calcula pago bruto. Las deducciones legales son responsabilidad de un sistema de nómina especializado (e.g., Runa, Worky) que se integra en fase posterior. Para el challenge, la salida es el pago bruto calculado.

**Fuente:** [AI Roadmap P0.5a](../../strategy/ai-roadmap.md) (Runa/Worky integration planned) · Scope del challenge

---

### 5.6 ¿Horas extra: qué pasa la primera semana de un conductor?

**Pregunta:** El overtime requiere que el conductor haya trabajado 40h+ la semana previa (`previous_week.hours_worked >= 40`). ¿Qué pasa en su primera semana?

**Por qué importa:** No existe `previous_week` para un conductor nuevo. Si no se maneja, el sistema puede arrojar un error o un resultado incorrecto.

**Supuesto estimado:** Primera semana = no eligible para overtime. `previous_week.hours_worked` defaults a 0 si no existe registro previo.

**Fuente:** Lógica del pseudocódigo (condición no se cumple si no hay datos)

---

## 6. Datos de DiDi y Fuente de Verdad

### 6.1 ¿El CSV de DiDi es el ÚNICO input de facturación?

**Pregunta:** ¿Solo DiDi o también Uber u otras plataformas?

**Por qué importa:** Si hay múltiples plataformas, se necesita un parser por cada formato de CSV y una lógica de merge. Si es solo DiDi, se simplifica enormemente.

**Supuesto estimado:** Solo DiDi para el MVP. LAFA tiene partnership exclusivo con DiDi (Premium). El brief solo menciona "DiDi CSV/API". Vemo trabaja con Uber, pero LAFA = DiDi.

- **Importante:** El CSV de DiDi es un **reporte batch retroactivo**, no un feed real-time. DiDi asigna viajes internamente a los conductores dentro de su plataforma — LAFA solo recibe el resultado post-facto cuando descarga/sube el CSV. El sistema de LAFA no participa en la asignación de viajes ni recibe datos en tiempo real de DiDi.

**Fuente:** Entrevista con Levi ("ya con un partnership con DiDi") · Brief ("DiDi CSV/API")

---

### 6.2 ¿Cómo se obtiene el CSV? ¿Con qué frecuencia?

**Pregunta:** ¿El CSV es una descarga manual del portal de DiDi? ¿Diaria, semanal?

**Por qué importa:** Si es semanal y llega el lunes, no se puede hacer el cierre automático del domingo a las 8 PM con datos completos. Si es diaria, hay datos parciales que se acumulan.

**Supuesto estimado:** Subida manual, frecuencia diaria o semanal. En Stage 0 todo es manual — alguien descarga el CSV del dashboard de DiDi y lo sube al sistema. Para el MVP, un upload de CSV por el supervisor es suficiente. La automatización vía API de DiDi es fase futura.

**Fuente:** Stage 0 (spreadsheets) · Brief sugiere CSV como input, API como alternativa futura

---

### 6.3 ¿Quién sube el CSV?

**Pregunta:** ¿El supervisor, el administrador, o un proceso automático?

**Por qué importa:** Define permisos de upload en el RBAC y el flujo operativo.

**Supuesto estimado:** El Administrador sube el CSV (dato global, no por supervisor). El CSV contiene viajes de todos los conductores con Driver ID. El sistema parsea y distribuye los datos por conductor. Los supervisores consultan los resultados, no suben datos.

**Fuente:** Extrapolación (CSV global con Driver ID) · RBAC del brief (Admin = full access)

---

### 6.4 ¿Cómo se vincula el Driver ID del CSV con los conductores del sistema?

**Pregunta:** El CSV tiene `Driver ID: 114958`. ¿Este ID viene de DiDi? ¿Se pre-registra en el sistema?

**Por qué importa:** Sin mapeo, no se puede atribuir facturación a conductores del sistema. Se necesita un campo de referencia cruzada.

**Supuesto estimado:** Cada conductor en el sistema tiene un campo `didi_driver_id` que se registra al onboarding. Al parsear el CSV, el sistema hace match por este ID. Si un Driver ID del CSV no tiene match → alerta de "conductor no registrado".

**Fuente:** Lógica de integración · Formato del CSV (Driver ID como clave)

---

## 7. Flujo del Supervisor

### 7.1 ¿Cuántos conductores maneja un supervisor?

**Pregunta:** ¿Cuál es el ratio supervisor:conductor?

**Por qué importa:** Define la carga de la UI del supervisor. Con 5 conductores, una tabla simple. Con 50, se necesita filtrado, búsqueda, y paginación.

**Supuesto estimado:** **1 supervisor por centro operativo (3 total):**

| Centro | Supervisor | Vehículos aprox. |
|--------|-----------|-----------------|
| Vallejo | Supervisor 1 | ~50 |
| Granada | Supervisor 2 | ~50 |
| Roma | Supervisor 3 | ~50 |

Con 150 vehículos × 2 turnos weekday = ~100 conductores por centro en total (~50 diurnos + ~50 nocturnos). Más 1 Admin con visibilidad global. Para el MVP, 3 supervisores + 1 admin = 4 usuarios del sistema.

**Fuente:** Decisión operativa LAFA (3 centros) · Entrevista con Levi

---

### 7.2 ¿El supervisor ve solo sus conductores o todos?

**Pregunta:** ¿Hay segregación de datos por supervisor?

**Por qué importa:** Esto es fundamental para el modelo de datos. Si hay segregación, cada supervisor tiene un "grupo" de conductores/vehículos. Si no, cualquier supervisor puede operar cualquier vehículo.

**Supuesto estimado:** Sí, segregación por centro operativo. Cada supervisor ve solo los conductores y vehículos de su centro (Vallejo, Granada, o Roma). Esto es más seguro, más limpio, y evita conflictos operativos (dos supervisores asignando el mismo vehículo). El Admin ve los 3 centros.

**Fuente:** Best practice fleet operations · Brief (Supervisor scope implica subset, no global) · Decisión operativa (1 supervisor/centro)

---

### 7.3 ¿Puede un supervisor modificar cálculos de nómina?

**Pregunta:** ¿El supervisor puede override el pago calculado (e.g., acreditar horas manuales)?

**Por qué importa:** Overrides manuales añaden complejidad al audit trail. Sin ellos, la nómina es puramente calculada y auditable.

**Supuesto estimado:** NO para el MVP. La nómina se calcula automáticamente sin overrides. El Administrador puede revisar y aprobar, pero no editar montos individuales. Cualquier ajuste manual se documenta fuera del sistema en esta fase.

**Fuente:** Challenge scope (MVP) · Audit trail requirement del brief

---

## 8. RBAC y Alcance del Sistema

### 8.1 ¿El Admin puede actuar como Supervisor?

**Pregunta:** ¿El rol Admin incluye todas las capacidades del Supervisor?

**Por qué importa:** Si es jerárquico (Admin ⊃ Supervisor), el Admin puede hacer check-ins, asignar vehículos, etc. Si son roles separados, se necesitan dos cuentas distintas.

**Supuesto estimado:** Sí, jerárquico. Admin tiene todas las capacidades del Supervisor más: crear supervisores, ver datos globales, gestionar nómina, subir CSVs, configurar sistema.

**Fuente:** Brief ("Administrator: Full access")

---

### 8.2 ¿El conductor tiene acceso al sistema?

**Pregunta:** ¿Hay un rol "Driver" en la plataforma?

**Por qué importa:** Si el conductor no tiene acceso, es solo un entity (registro) en el sistema, no un user. Esto simplifica significativamente el RBAC.

**Supuesto estimado:** NO. El conductor es un registro, no un usuario. No tiene login ni interfaz. Toda su información es gestionada por el Supervisor. Esto es consistente con el brief que solo define 2 roles (Admin, Supervisor) y con Stage 0 donde los conductores interactúan vía WhatsApp.

**Fuente:** Brief (solo 2 roles definidos) · Entrevista (conductores se comunican por WhatsApp)

---

### 8.3 ¿Un Supervisor puede crear otros Supervisores?

**Pregunta:** ¿O eso es exclusivo del Admin?

**Por qué importa:** Define la jerarquía de permisos.

**Supuesto estimado:** NO. Solo el Admin crea Supervisores. El brief es explícito: "Administrator: Can create and assign Supervisor role."

**Fuente:** Brief (tabla de RBAC)

---

## 9. Cierre Semanal (Domingo 8 PM)

### 9.1 ¿Qué zona horaria?

**Pregunta:** ¿El cierre a las 8 PM es hora CDMX?

**Por qué importa:** CDMX usa CST (UTC-6) en invierno y CDT (UTC-5) en verano. El cierre debe ser consistente independientemente del cambio de horario.

**Supuesto estimado:** CDMX local time (America/Mexico_City). Esto maneja automáticamente el cambio de horario estacional.

**Fuente:** LAFA opera exclusivamente en CDMX · Convención estándar

---

### 9.2 ¿Cuándo inicia la semana?

**Pregunta:** ¿La semana va de lunes 00:00 a domingo 20:00? ¿O de domingo 20:01 a domingo 20:00?

**Por qué importa:** Esto define el rango de fechas para filtrar viajes del CSV y turnos del sistema de check-in.

**Supuesto estimado:** Lunes 00:00:00 a domingo 20:00:00 (hora CDMX). El cierre a las 8 PM del domingo es el corte, pero la semana comienza el lunes a medianoche. Los viajes/turnos entre domingo 20:00 y lunes 00:00 se asignan a la semana siguiente.

**Fuente:** Convención laboral mexicana (semana inicia lunes) · Brief (cierre domingo 8 PM)

---

### 9.3 ¿Qué pasa con viajes en curso a las 8 PM del domingo?

**Pregunta:** Si un conductor tiene un viaje que inició a las 19:50 y termina a las 20:15, ¿se asigna a esta semana o a la siguiente?

**Por qué importa:** Edge case real con viajes que cruzan el corte.

**Supuesto estimado:** Si `initial_time < 20:00` del domingo, el viaje se incluye en la semana actual completo. La hora de inicio determina la semana. Es más simple y justo para el conductor.

**Fuente:** Convención contable (fecha de transacción = fecha de inicio)

---

### 9.4 ¿El cierre se puede re-ejecutar?

**Pregunta:** Si llegan datos tardíos del CSV después del cierre, ¿se puede recalcular la nómina de una semana cerrada?

**Por qué importa:** Los datos de DiDi pueden llegar con retraso. Sin re-ejecución, se pierden viajes que afectan la nómina del conductor.

**Supuesto estimado:** Sí, el Admin puede re-ejecutar el cierre de una semana. Esto genera una nueva versión del reporte y marca la anterior como "superseded". Solo el Admin tiene este permiso.

**Fuente:** Best practice payroll (correcciones post-cierre) · RBAC (Admin = full access)

---

### 9.5 ¿Cuál es el output del cierre?

**Pregunta:** ¿CSV descargable, vista en dashboard, o ambos?

**Por qué importa:** El brief dice "CSV or Dashboard" — elegir ambos es mejor pero más trabajo.

**Supuesto estimado:** Ambos. Dashboard como vista principal (tabla con conductor, horas, facturación, pago calculado, status meta). CSV descargable como export para integración con nómina externa. El dashboard es el producto; el CSV es la integración.

**Fuente:** Brief ("CSV or Dashboard") · Necesidad operativa (supervisores ven dashboard, contabilidad descarga CSV)

---

## 10. Modelo de Datos y Escalabilidad

### 10.1 ¿Qué volumen debe soportar el sistema?

**Pregunta:** ¿Cuántos registros por día/semana para el MVP y para producción?

**Por qué importa:** Define si SQLite basta o se necesita PostgreSQL, si se necesita paginación, qué tan serios son los índices.

**Supuesto estimado:**

| Métrica | MVP (150 vehículos) | Producción (2,000 vehículos) |
|---------|---------------------|------------------------------|
| Check-ins/día | ~300 | ~4,000 |
| Check-ins/semana | ~2,100 | ~28,000 |
| Viajes DiDi/día | ~3,000 (10 viajes/conductor) | ~40,000 |
| Viajes DiDi/semana | ~21,000 | ~280,000 |
| Cierres de nómina/semana | ~300 registros | ~4,000 registros |

Para el MVP, cualquier base de datos relacional funciona. Para producción, PostgreSQL con índices adecuados maneja 280K registros/semana sin problema.

**Fuente:** 150 vehículos × 2 turnos × 10 viajes/turno · Target 2,000 vehículos (entrevista)

---

### 10.2 ¿Cuántas semanas de histórico se deben retener?

**Pregunta:** ¿El sistema necesita acceso a histórico completo o solo las últimas N semanas?

**Por qué importa:** El cálculo de overtime requiere la semana anterior. Reportería probablemente necesita meses. Pero para el MVP, el horizonte puede ser más corto.

**Supuesto estimado:** Mínimo 4 semanas accesibles directamente (para overtime y trending). Histórico completo almacenado pero puede ser lazy-loaded. Para el MVP, no hay archival — todo queda en la tabla principal.

**Fuente:** Pseudocódigo (necesita `previous_week`) · MVP scope

---

### 10.3 ¿Se necesita soporte multi-ciudad?

**Pregunta:** ¿El sistema debe contemplar operaciones fuera de CDMX?

**Por qué importa:** Multi-ciudad afecta timezone, regulación local, y estructura de datos (tenant por ciudad vs. global).

**Supuesto estimado:** NO para el MVP. LAFA opera exclusivamente en CDMX. El modelo de datos puede incluir un campo `city` para futura extensión, pero no se implementa lógica multi-ciudad.

**Fuente:** Entrevista con Levi (operación en CDMX) · Scope del challenge

---

## Notas para la Implementación

### Supuestos que impactan la arquitectura

1. **Dos fuentes de datos para nómina**: turnos (check-in/out del sistema) + facturación (CSV de DiDi). Esto implica un modelo de datos con `shifts` y `trips` como tablas separadas que se agregan en `weekly_payroll`.

2. **El CSV es batch, no streaming**: se sube manualmente. Esto implica un flujo de upload → parse → validate → store, no un webhook o API real-time.

3. **El conductor no es usuario del sistema**: simplifica RBAC a 2 roles. El driver es un entity con datos, no un actor con sesión.

4. **Cierre semanal es un job, no un cron**: debe poder re-ejecutarse manualmente. Esto sugiere un botón "Cerrar semana" + lógica idempotente, no solo un cron job.

### Lo que el MVP NO necesita

- Integración real con API de DiDi (CSV manual es suficiente)
- Deducciones IMSS/ISR (nómina bruta)
- Telematics / SOC en tiempo real (dato informativo si existe)
- Multi-ciudad / multi-plataforma
- Flujo de conductor (no tiene acceso al sistema)
- Overrides manuales de nómina

---

*Documento creado: Feb 17, 2026*
*Fuentes: [Brief del challenge](brief.md) · [Entrevista con Levi](../interviews/interview-levi-2026-02-06.md) · [AI Roadmap](../../strategy/ai-roadmap.md) · [Business Model](../../thesis/04-business-model.md) · [Gig Driver Economics](../../analysis/market/gig-driver-economics.md)*
