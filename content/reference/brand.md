# LAFA Brand Reference

## 1. Identity

| Field | Value |
|-------|-------|
| **Brand name** | LAFA |
| **Legal name** | Latin America Future Automobile Mexico INC, S.A.P.I. de C.V. |
| **Address** | Abraham González 51, Col. Juárez, Alcaldía Cuauhtémoc, CP 06600, CDMX |
| **Email** | hola@lafa-mx.com |
| **Phone** | +52 55 14843020 / +52 55 13002278 |
| **Hours** | L-V 8:00–17:00 |
| **Copyright** | LAFA © 2025 Todos los derechos reservados |
| **Privacy notice** | Updated August 10, 2025 |

---

## 2. Visual Identity

### Logo
- **Type**: Horizontal wordmark + icon lockup
- **SVG viewBox**: 124×22 (wide horizontal)
- **Wordmark color**: White (#FFFFFF)
- **Icon color**: Orange (#FF6200)
- **Icon elements**: Stylized car silhouette with motion lines; Chinese character-inspired element (possible 龙/dragon reference)
- **Construction**: Clip-path with 7 path elements for the icon

### Color Palette

| Role | Hex | Notes |
|------|-----|-------|
| **Primary / Dark** | #252B37 | Dark blue-grey, used for text and backgrounds |
| **Accent / Orange** | #FF5A00 | CSS value from site styles |
| **Accent / Orange (SVG)** | #FF6200 | SVG logo fill — slightly warmer; see [Observations](#7-observations--gaps) |
| **Background / Dark** | #1B1A23 | Near-black with warm undertone |
| **Text Primary** | #1B1A23 | Same as dark background |
| **Link** | #FF5A00 | Matches CSS accent |

### Typography
- **Font family**: Inter Tight (all uses — headings, body, UI)
- **Weights observed**: Regular, Medium, Bold (inferred from hierarchy)
- **Note**: The raw Framer export listed h1: 12px, h2: 12px, body: 48px — these values are likely inverted/incorrect from the extraction tool. Actual hierarchy follows standard patterns (large headings, smaller body).

### Spacing & Radius
- **Base unit**: 4px
- **Border radius**: 8px (consistent rounded corners, not pill-shaped)

---

## 3. Brand Voice

### Language & Register
- **Language**: 100% Spanish (Latin American)
- **Register**: Tú (informal, direct — "tus necesidades", "pude acceder")
- **No English version** exists on the site

### Tone Attributes
- **Accessible**: Simple language, no jargon, no technical EV terminology
- **Warm**: Personal stories, direct address, enabling tone
- **Aspirational but grounded**: "futuro sostenible" paired with concrete savings talk
- **Enabler framing**: LAFA positions itself as the bridge, not the hero — the driver is the protagonist

### Key Messaging Pillars
1. **Access** — "hacemos posible que más conductores accedan a vehículos eléctricos"
2. **Simplicity** — "de manera simple, accesible y con respaldo"
3. **Savings** — "ahorro más cada semana", "ya no gasto en gasolina"
4. **Flexibility** — "soluciones de movilidad eléctrica que se adaptan a tus necesidades"

### Voice Do's and Don'ts (inferred)

| Do | Don't |
|----|-------|
| Use "tú" — speak directly to the driver | Use "usted" or formal corporate tone |
| Frame LAFA as enabler ("hacemos posible") | Position LAFA as the hero of the story |
| Lead with driver benefits (savings, stability) | Lead with vehicle specs or tech features |
| Use simple, everyday Spanish | Use EV jargon (kWh, SOH, LFP) |
| Show real stories and names | Use abstract claims without proof |

---

## 4. Messaging

### Mission Statement
> En LAFA hacemos posible que más conductores accedan a vehículos eléctricos, conectando financiamiento, oportunidades e infraestructura para un futuro sostenible.

### Value Propositions by Product

**Renta (Lease-to-Own)**
- "Renta un vehículo" — ownership path framing
- Target: Drivers who want to build toward owning an EV
- Key benefit: Affordable weekly payments, low operating cost

**Conduce (Driver-as-Employee)**
- "Colabora con LAFA" — partnership framing
- Target: Drivers seeking stable employment + vehicle access
- Key benefit: Maintenance and insurance included, just drive

### Testimonial Themes

| Driver | Segment | Theme | Key Quote |
|--------|---------|-------|-----------|
| **Luis Herrera** | DiDi driver, budget-conscious | Savings without sacrifice | "Sin comprometer mis gastos mensuales" |
| **Ana López** | Student + driver | Flexibility + peace of mind | "Solo me preocupo por cumplir mis rutas" |
| **Carlos Sánchez** | Multi-platform driver | Revenue optimization | "Mis ingresos son más estables" |

Each testimonial represents a distinct segment: the cost-optimizer, the part-timer, and the income-maximizer.

---

## 5. Information Architecture

### Sitemap (12 URLs)

| Path | Purpose | Funnel stage |
|------|---------|--------------|
| `/` | Homepage — brand intro, product overview, testimonials | Awareness |
| `/renta` | Lease-to-Own product page | Consideration |
| `/conductores` | Driver-as-Employee product page | Consideration |
| `/general` | General intake form | Conversion |
| `/didi-bpo-agent` | DiDi BPO agent-specific landing | Conversion (partner) |
| `/form-v2/home` | V2 application funnel entry | Conversion |
| `/form-v2/confirmacion` | V2 confirmation page | Post-conversion |
| `/form-v2/espera` | V2 waitlist/pending page | Post-conversion |
| `/confirmacion` | V1 confirmation (generic) | Post-conversion |
| `/confirmacion-dae` | V1 confirmation (DAE-specific) | Post-conversion |
| `/privacidad` | Privacy notice | Legal |
| `/page` | Unknown — possibly orphaned | — |

### Funnel Structure
- **V1 funnel**: `/general` → `/confirmacion` or `/confirmacion-dae`
- **V2 funnel**: `/form-v2/home` → `/form-v2/confirmacion` or `/form-v2/espera`
- **Partner funnel**: `/didi-bpo-agent` (dedicated DiDi BPO agent flow — separate from consumer funnels)
- V1 and V2 coexist — likely A/B testing or phased migration

---

## 6. Platform & Tech
- **Website builder**: Framer (JS-rendered, limited scraping/SEO visibility)
- **Favicon format**: .avif (modern, compressed)
- **Image hosting**: framerusercontent.com CDN
- **Domain**: lafa.com.mx

---

## 7. Observations & Gaps

### Orange Discrepancy
- CSS styles use **#FF5A00** — a slightly cooler, redder orange
- SVG logo uses **#FF6200** — a slightly warmer, more yellow-shifted orange
- Difference is subtle (ΔE ≈ 2–3) but worth clarifying which is canonical

### Missing Elements
- No visible social media links on website
- No English version of the site
- Copyright reads "2025" — not updated for 2026
- `/page` route exists in sitemap but purpose is unknown (possibly orphaned or template artifact)

### Framer Limitations
- JS-rendered content means poor SEO crawlability
- WebFetch/scraping tools return scaffolding, not rendered content
- Font size values from extraction are unreliable (h1: 12px is clearly wrong)
