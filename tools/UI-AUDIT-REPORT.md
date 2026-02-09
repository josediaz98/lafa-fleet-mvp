# LAFA UI Audit Report

**Fecha:** 8 Feb 2026
**Superficies auditadas:** index.html + 5 tool pages
**Referencia visual:** Linear, Vercel Dashboard

---

## Resumen Ejecutivo

La app tiene una base visual fuerte: dark theme coherente, palette limitada, tipografia unica. Los problemas son de **consistencia entre paginas**, no de calidad individual. El 80% de los issues se resuelven estandarizando ~6 tokens que hoy varian sin razon.

| Categoria | Issues | Severidad promedio |
|-----------|--------|--------------------|
| Component | 7 | 🔴🟠 |
| Color | 4 | 🟠🟡 |
| Spacing | 3 | 🟠 |
| Typography | 2 | 🟡 |
| Animation | 2 | 🟡 |
| Accessibility | 3 | 🔴🟠 |

---

## Issues

### Components

**UI-COMP-01** 🔴 Inconsistencia mayor
**KPI Cards: estructura diferente en cada pagina**

| Pagina | Label spacing | Valor margin | Tiene trend badge | Tiene card-hover |
|--------|--------------|-------------|-------------------|-----------------|
| dashboard | mb-3 (entre label y valor) | ninguno | Si (+8 esta sem) | Si |
| battery | ninguno | mt-2 | No | No |
| onboarding | ninguno | mt-2 (via flex) | Si (sparkline) | No |

- Dashboard KPI cards usan `card-hover`, las otras 2 paginas no
- Dashboard tiene layout `label + trend` en una fila, luego valor. Battery tiene solo label, luego valor con `mt-2`. Onboarding usa flex con gap-3
- Las 3 paginas deberian usar la misma estructura interna

**Patron afectado:** 12 KPI cards en total (4+4+4)

---

**UI-COMP-02** 🔴 Inconsistencia mayor
**Modales: 3 implementaciones con estilos divergentes**

| Propiedad | dashboard | roadmap | onboarding |
|-----------|-----------|---------|------------|
| Tipo | simple (hidden) | simple (hidden) | animated (open/closing) |
| Border | `border-white/10` | `border-white/[0.08]` | `rgba(255,255,255,0.08)` en CSS |
| Max-width | `max-w-3xl` (768px) | `max-w-4xl` (896px) | `max-w-720px` (CSS) |
| Padding interno | ninguno (el content pone p-6) | `p-8` | `p-5` |
| Border-radius | `rounded-2xl` | `rounded-2xl` | `16px` (CSS) = rounded-2xl |
| Background | `bg-[#1E1D28]` | `bg-[#1E1D28]` | `#1B1A23` (CSS) |

**Issues:**
- Border opacity: `/10` vs `/[0.08]` vs `0.08` — mismo intent, 3 formas de escribirlo
- Background: dashboard/roadmap usan `#1E1D28`, onboarding usa `#1B1A23` (el body bg). **El modal de onboarding se confunde con el fondo**
- Max-width: 768 vs 896 vs 720 — deberia haber 1-2 tamaños definidos
- Padding: p-6 vs p-8 vs p-5 — sin razon para 3 valores

---

**UI-COMP-03** 🟠 Inconsistencia visible
**Inputs/Selects: fondo divergente entre dashboard/battery y onboarding**

| Pagina | Input bg | Input padding |
|--------|---------|---------------|
| dashboard | `bg-white/5` | `py-2` |
| battery | `bg-white/5` | `py-2` |
| onboarding | `bg-lafa-card` | `py-2.5` |

- Onboarding search usa `bg-lafa-card` (#252B37 solido) mientras dashboard/battery usan `bg-white/5` (rgba). El resultado visual es similar pero inconsistente en el codigo
- Onboarding tiene `py-2.5`, los otros `py-2`

---

**UI-COMP-04** 🟠 Inconsistencia visible
**Section headers: mb-3 vs mb-4 segun la pagina**

| Pagina | Uso |
|--------|-----|
| dashboard | Siempre `mb-4` |
| battery | Mayoria `mb-4`, info cards `mb-3` |
| collections | `mb-3` mayoria, escalamiento `mb-4` |
| onboarding | `mb-3` mayoria, timeline `mb-4` |
| roadmap | `mb-4` mayoria, `mb-2` en detail modal |

**Recomendacion:** Estandarizar a `mb-3` para card headers, `mb-4` para section headers.

---

**UI-COMP-05** 🟡 Polish
**Card hover: solo en dashboard KPIs**

Dashboard KPI cards tienen `card-hover` (translateY + shadow). Battery y onboarding KPI cards no. Todas las chart cards en todas las paginas tampoco tienen hover. Solo es consistente si se quiere que dashboard KPIs se sientan "clickeables" — pero no lo son.

**Recomendacion:** Remover `card-hover` de KPI cards (no son clickeables) o agregarlo a todas.

---

**UI-COMP-06** 🟡 Polish
**Overlay de modal: notif panel diverge**

| Modal | Overlay |
|-------|---------|
| dashboard/roadmap | `bg-black/60` inline en HTML |
| onboarding | `rgba(0,0,0,0.6)` + blur(6px) en CSS |
| notification panel | Sin overlay (cierra con outside click) |

Onboarding agrega `backdrop-filter: blur(6px)` que los otros no tienen. Notar que `bg-black/60` (Tailwind) = `rgba(0,0,0,0.6)` (CSS) = misma opacidad, pero el blur es diferencial.

---

**UI-COMP-07** 🟢 Nitpick
**Tabla row hover: con y sin transition**

- dashboard.js: `hover:bg-white/[0.03] cursor-pointer transition-colors`
- battery.js: `hover:bg-white/[0.03] cursor-pointer` (sin transition)

---

### Color

**UI-COLOR-01** 🟠 Inconsistencia visible
**Hard-coded hex colors en lugar de tokens Tailwind**

18+ instancias de hex colors directos en HTML/JS que deberian usar clases Tailwind:

| Color | Token equivalente | Donde |
|-------|------------------|-------|
| `#FF5A00` | `lafa-orange` | 9 archivos (pagination btns, confidence fill, focus borders, timeline) |
| `#1E1D28` | Nuevo token necesario | dashboard modal, roadmap modal, shared.js notif panel, battery tooltip |
| `#0B141A` | Nuevo token (WA dark) | collections chat, shared.css |
| `#1F2C33` | Nuevo token (WA header) | collections chat header/footer |
| `#16151E` | Nuevo token (sidebar) | shared.js sidebar bg |

**Impacto:** Si se cambia el naranja de marca, hay que buscar en 9 archivos. Deberia ser 1 cambio en `tailwind.init.js`.

---

**UI-COLOR-02** 🟠 Inconsistencia visible
**gray-600 usado inconsistentemente como tercer nivel de gris**

El sistema usa: `text-gray-500` (labels), `text-gray-400` (descriptions), `text-gray-300` (secondary text), `text-white` (primary).

Pero `text-gray-600` aparece en 3 lugares como un "super-muted" que no encaja:
- shared.js:519 (notif time)
- onboarding.js:190 (kanban card date)
- onboarding.js:383 (OCR "Extrayendo campos")

**Recomendacion:** Usar `text-gray-500` como piso. gray-600 es demasiado oscuro sobre dark bg.

---

**UI-COLOR-03** 🟡 Polish
**Border opacity: 3 formas de escribir lo mismo**

| Valor | Significado | Donde |
|-------|------------|-------|
| `border-white/5` | 5% = 0.05 | ~50 instancias (estandar) |
| `border-white/10` | 10% = 0.10 | dashboard modal, roadmap toggles |
| `border-white/[0.08]` | 8% = 0.08 | roadmap modal |
| `rgba(255,255,255,0.06)` | 6% | shared.css glass-nav, shared.js COLORS.border |
| `rgba(255,255,255,0.08)` | 8% | shared.css modal-content |

Son 4 opacidades distintas (5%, 6%, 8%, 10%) para bordes sutiles. Deberian ser 2: `white/5` (default) y `white/10` (emphasis).

---

**UI-COLOR-04** 🟡 Polish
**Landing page define tokens en CSS variables que tools/ no usa**

index.html define `--orange-500`, `--surface-card`, `--border-subtle`, `--space-4`, etc. Ninguno de estos se usa en tools/. El landing tiene un sistema de CSS variables y tools/ tiene Tailwind config. Son 2 sistemas paralelos.

No es un bug pero es deuda: si el landing crece, diverge.

---

### Spacing

**UI-SPACE-01** 🟠 Inconsistencia visible
**Content padding: p-6 consistente excepto roadmap modal**

Todas las paginas usan `p-6` para el content area. Pero el roadmap detail modal usa `p-8` interno. Dashboard modal pone `p-6` dentro del content div. Onboarding modal usa `p-5`.

**Valor actual:** p-5 / p-6 / p-8 en modales
**Valor esperado:** p-6 en todos (consistente con el content area)

---

**UI-SPACE-02** 🟠 Inconsistencia visible
**KPI card internal spacing: mt-2 vs mb-3 vs gap-3**

- Dashboard: label row con `mb-3`, valor sin margin
- Battery: label sin margin, valor con `mt-2`
- Onboarding: label sin margin, valor container con `mt-2` + flex `gap-3`

Resultado visual similar, pero la estructura DOM es distinta. Si se cambia el spacing, hay que cambiar 3 patrones distintos.

---

**UI-SPACE-03** 🟡 Polish
**Kanban columns: p-4 vs p-5 estandar**

Kanban columns en onboarding usan `p-4`. Todo el resto de cards usan `p-5`. Podria ser intencional (kanban cards son mas compactos) pero no hay otra pagina para validar el patron.

---

### Typography

**UI-TYPE-01** 🟡 Polish
**Section titles: h3 vs h4 sin regla clara**

| Nivel | Uso |
|-------|-----|
| `h3 text-lg font-bold` | Solo roadmap (Hitos, Timeline) |
| `h3 text-sm font-semibold` | Chart titles en dashboard, battery, onboarding |
| `h4 text-sm font-semibold` | Card sub-headers en collections, battery detail |

`h3` y `h4` se usan con el mismo estilo visual (`text-sm font-semibold text-gray-300`). La semantica HTML diverge de la jerarquia visual.

---

**UI-TYPE-02** 🟡 Polish
**Page title: text-xl font-bold en header, pero roadmap sections usan text-lg font-bold**

El `createPageHeader()` genera un `text-xl font-bold` para el titulo de pagina. Dentro de roadmap, los section titles son `text-lg font-bold text-white` — cercano al page title. En las otras paginas, las sections usan `text-sm font-semibold`. Roadmap se siente un nivel mas "pesado" que las demas.

---

### Animation

**UI-ANIM-01** 🟡 Polish
**Transition durations: 6 valores distintos sin jerarquia**

| Duration | Uso | Count |
|----------|-----|-------|
| 0.15s | Kanban card hover, heatmap cell, doc thumbnails | ~5 |
| 0.2s | card-hover, nav links, buttons, filter pills | ~10 |
| 0.25s | Modal backdrop/content | 4 |
| 0.3s | Sidebar, slide-panel, progress-fill, mobile menu | ~6 |
| 0.35s | Toast enter/exit | 2 |
| 0.5s | Section fade, completion banner, gantt bar, timeline fill | ~5 |

**Propuesta de tokens:**
- `--duration-fast: 150ms` — micro hovers (cells, small cards)
- `--duration-base: 200ms` — buttons, pills, links
- `--duration-modal: 250ms` — modales, panels
- `--duration-slow: 400ms` — fades, reveals

---

**UI-ANIM-02** 🟢 Nitpick
**card-hover usa translateY(-2px), landing card usa translateY(-4px)**

shared.css `.card-hover`: `-2px` lift
index.html `.card`: `-4px` lift + shadow `0 20px 40px`
index.html `.card-hover`: `-4px` lift + shadow `0 20px 40px`

La landing tiene mas drama en hover que los tools.

---

### Accessibility

**UI-A11Y-01** 🔴 Inconsistencia mayor
**Focus states removidos en selects**

Todos los `<select>` tienen `focus:outline-none` sin un reemplazo visual:
- dashboard.html: 3 selects
- battery.html: 3 selects

Los inputs de busqueda tienen `focus:border-[#FF5A00]/50` (OK), pero los selects no tienen ningun indicador de focus. Un usuario con keyboard no sabe cual select esta activo.

**Fix:** Agregar `focus:border-[#FF5A00]/50` o `focus:ring-1 focus:ring-lafa-orange/50` a todos los selects.

---

**UI-A11Y-02** 🟠 Inconsistencia visible
**Contraste de text-gray-500 sobre bg-lafa-card**

`text-gray-500` = `#6B7280` sobre `#252B37`:
- Contrast ratio: **3.1:1** (falla WCAG AA para texto normal, pasa para texto grande)

Usado en: KPI labels, table headers, timestamps, metadata. Estos son `text-xs` (12px) que requiere AA (4.5:1).

**Fix:** Subir a `text-gray-400` (#9CA3AF) = **5.2:1** (pasa AA). O mantener gray-500 solo para elementos decorativos.

---

**UI-A11Y-03** 🟠 Inconsistencia visible
**Botones sin texto accesible**

- Sidebar toggle: solo icono de menu, sin `aria-label` (tools/shared.js)
- Notification bell: sin `aria-label` (tools/shared.js)
- Modal close buttons: solo icono X, sin `aria-label`

Landing page SI tiene `aria-label="Abrir menu"` en su hamburger.

---

## Design Tokens Propuestos

### Spacing Scale (base 4px)

```
--space-1:  4px    (gap-1)
--space-2:  8px    (gap-2, py-2)
--space-3:  12px   (gap-3, p-3)
--space-4:  16px   (gap-4, p-4)
--space-5:  20px   (gap-5, p-5)   ← card padding estandar
--space-6:  24px   (gap-6, p-6)   ← page content padding
```

### Color Tokens (faltan)

```js
// Agregar a tailwind.init.js
colors: {
  lafa: {
    // ... existentes ...
    'modal':     '#1E1D28',    // modal/tooltip/notif panel bg
    'sidebar':   '#16151E',    // sidebar bg
    'wa-dark':   '#0B141A',    // WhatsApp chat bg
    'wa-header': '#1F2C33',    // WhatsApp header/footer
    'wa-input':  '#2A3942',    // WhatsApp input bg
  }
}
```

### Border Tokens

```
border-default:  white/5    (0.05)
border-emphasis:  white/10   (0.10)
```

Eliminar: white/[0.06], white/[0.08], rgba(255,255,255,0.08)

### Transition Tokens

```
duration-fast:  150ms   (micro-interactions)
duration-base:  200ms   (buttons, links)
duration-modal: 250ms   (modals, overlays)
duration-slow:  400ms   (reveals, fades)
```

### Typography Scale (actual)

```
kpi-label:    text-xs  text-gray-500  uppercase tracking-wider  font-normal
kpi-value:    text-3xl font-bold      text-white
section-h:    text-sm  font-semibold  text-gray-300
card-body:    text-sm  text-gray-400
caption:      text-xs  text-gray-500
```

---

## Top 10 Quick Fixes (mayor impacto, menor esfuerzo)

| # | Fix | Archivos | Esfuerzo |
|---|-----|----------|----------|
| 1 | Agregar `focus:border-lafa-orange/50` a todos los selects | dashboard, battery | 5 min |
| 2 | Unificar modal border a `border-white/10` | roadmap.html, shared.css | 5 min |
| 3 | Unificar modal bg a `#1E1D28` | shared.css (.modal-content) | 2 min |
| 4 | Remover `card-hover` de dashboard KPI cards (no clickeables) | dashboard.html | 2 min |
| 5 | Agregar `transition-colors` a battery table rows | battery.js | 1 min |
| 6 | Cambiar KPI label gray-500 a gray-400 en todo (contraste) | 3 HTML files, ~12 spans | 10 min |
| 7 | Estandarizar section header spacing a mb-3 | collections, onboarding | 5 min |
| 8 | Agregar color tokens faltantes a tailwind.init.js | tailwind.init.js | 3 min |
| 9 | Reemplazar `bg-[#FF5A00]` con `bg-lafa-orange` en JS | dashboard.js, onboarding.js | 5 min |
| 10 | Agregar aria-labels a sidebar toggle, bell, modal close | shared.js | 5 min |

**Tiempo total estimado: ~45 min**
