# 05 — Traction and Operations

**VC Question:** "Is there evidence of product-market fit, or is this still a hypothesis?"

---

## Traction Scorecard

| Indicator | Value | Verdict |
|-----------|-------|---------|
| Vehicles operating | ~150 | Early but real — this is not a PowerPoint |
| Growth target | 2,000 by end of 2026 (13x) | Ambitious; depends on capital |
| Months in operation (DaE) | ~12-15 | Enough to validate the operating model |
| Months in operation (LTO) | ~2 (since Dec 2025) | Too early to assess PMF |
| DiDi Partnership | "Strategic ally" (Oct 2025) | Real validation — named alongside VEMO and OCN |
| Waitlist | Not published | Disadvantage vs OCN (100K+ waitlist) |
| Revenue/GMV | Not disclosed | Estimable: ~MXN $1.5-3.6M/month (150 veh x $10-24K) |
| Funding | Not disclosed | Likely pre-seed or seed |

**What 150 vehicles prove:**
1. LAFA can acquire vehicles from 3 Chinese OEMs and put them on the road
2. The DaE model works operationally — drivers generate revenue
3. DiDi validates the proposition (named as an ally at the official launch)
4. The operation sustains itself without tech (spreadsheets) — which is both proof of demand and a ceiling on scale

**What 150 vehicles do NOT prove:**
- That the model is profitable per vehicle (unit economics are breakeven at best)
- That LTO works (only 2 months of operation)
- That LAFA can scale 13x in 12 months with 3 tech people
- That the capital exists to purchase 1,850 additional vehicles

---

## Key Milestones

| Date | Milestone |
|------|-----------|
| ~2024 | LAFA founded by JJ (Jianan Jiang) |
| Oct 2025 | DiDi Premier launch — LAFA named "strategic ally" |
| Dec 2025 | Lease-to-Own (LTO) launched |
| Feb 2026 | ~150 vehicles operating in CDMX |
| End 2026 (target) | 2,000 vehicles (13x growth) |

---

## OEM Partners

| OEM | Tariff Risk | Key Fact |
|-----|------------|----------|
| JAC | LOW | Assembled in Mexico (CKD, Hidalgo) — exempt from the 50% tariff |
| GAC | HIGH | Imported from China — 50% tariff applies |
| Geely | UNKNOWN | Confirmed partner; assembly and models TBD — **critical gap** |

**BYD** is NOT a LAFA partner (confirmed by Levi, Feb 2026). It is a competitor. *-> See [06-competition.md](06-competition.md).*

*-> For detailed OEM analysis, tariff modeling, and CKD costs, see [tariff-analysis.md](../analysis/fleet/tariff-analysis.md).*

### Intelligence Gap: Geely

Geely is a confirmed partner (Levi, Feb 2026) but these critical questions remain unanswered:

1. **Which Geely models** are in the fleet? (Geometry C? Emgrand EV?)
2. **Assembly origin:** CKD in Mexico, or full import from China?
3. **Battery chemistry:** LFP or NMC?
4. **Fleet proportion:** What percentage of the 150 (and the planned 2,000) are Geely?

**Impact:** If Geely is fully imported without local assembly, each vehicle costs MXN $87,000-116,000 more than a JAC. If Geely represents >30% of the planned 2,000, this adds MXN $52M-70M in unplanned cost.

*-> Questions covered in [jj-interview-prep.md](../hiring/jj-interview-prep.md) Q1-Q2.*

---

## Technology Status: "Everything is Spreadsheets"

Confirmed by Levi Garcia: LAFA has no **database, dashboard, or automation.** All driver, vehicle, payment, maintenance, and charging information lives in spreadsheets. This is manageable at 150 vehicles but breaks at scale.

*-> For the Track A foundation roadmap (DB, dashboard, maintenance, incidents, insurance), see [ai-roadmap.md](../strategy/ai-roadmap.md).*

---

## Operations

### Charging
- **DaE:** LAFA pays — ~$300 MXN/week per vehicle (~75-80% cheaper than gasoline at $1,200-1,500/week)
- **LTO:** Driver pays for their own charging
- Own charging infrastructure is a future goal ("eventually" per Levi). No LAFA stations on PlugShare, OpenChargeMap, or Google Maps
- Currently: depot charging (Level 2, overnight) for the DaE fleet

*-> See [charging-economics.md](../analysis/fleet/charging-economics.md) for CFE cost modeling and depot optimization.*

### Maintenance
- LAFA maintains all vehicles (DaE and LTO)
- No tracking system beyond spreadsheets

### Customer Acquisition
- **DiDi Premier** as the primary channel (LAFA named "strategic ally" in Oct 2025)
- **Word of mouth** across driver networks (confirmed by Levi, Feb 2026)
- No public waitlist data (contrast: OCN claims 100,000+)

### DiDi Partnership
- LAFA named **"strategic ally"** in DiDi Premier (October 2025, CDMX)
- DiDi Premier: 500 EVs, 100% electric premium service
- Partner list: OEMs (GAC, JAC, SEV) + Fleet partners (VEMO, OCN, **LAFA**, FAZT)
- Being named alongside VEMO ($500M+) and OCN ($100M+) is significant validation for a pre-seed company
- Verified by 6+ press sources (Expansion.mx, Noticias NEO, Fast Company MX, Mexico Business News, Electrive, Energia Hoy)

---

## Ecosystem Vision

Per Levi Garcia (Feb 2026), LAFA plans to expand into a vertically integrated ecosystem:
- **Charging centers** (owned/operated, not just depot)
- **Specialized maintenance** for Chinese EV models
- **Tire distribution** ("tires for these models") — a supply chain niche for Chinese EVs in Mexico
- **Additional OEM partnerships** — "eventually other partnerships with other Chinese brands will be evaluated" beyond Geely, JAC, and GAC

---

## Funding

- No profile on Crunchbase, PitchBook, or AngelList
- No disclosed funding rounds
- No accelerator participation
- Likely pre-seed or seed, possibly self-funded or angel-backed
- The 2,000-vehicle target implies significant capital requirements (~MXN $800M in assets)

### Digital Footprint
Minimal by design (stealth mode). Zero social media presence, zero press coverage beyond DiDi Premier mentions, no Google Maps reviews for charging stations, no public job postings. Website: SPA on Framer with limited SEO.

---

*Data confirmed by Levi Garcia (interview Feb 6, 2026), DiDi partnership verified by 6+ press sources (Oct 2025). Revenue estimates based on fleet size x billing range.*
