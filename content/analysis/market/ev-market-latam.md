# LAFA: EV Market Context — Mexico & Latin America

**Last updated:** February 7, 2026
**Scope:** Mexico's EV market (LAFA's operating environment), Chinese OEM dominance and what it means for LAFA's OEM access, charging infrastructure gaps in Mexico, Mexican regulatory landscape, and brief LatAm context as expansion benchmark.

---

## 1. Mexico's EV Market

Mexico is Latin America's second-largest EV market and LAFA's only operating geography.

**Sales & penetration:**

| Year | Mexico BEV+PHEV Sales | Market Share | Source |
|------|----------------------|-------------|--------|
| 2024 | ~70,000 (EMA estimate) | ~1.6% BEV | AMIA / EMA |
| 2025 | **96,636** (+38% YoY) | ~2.5% BEV+PHEV | Asociacion de Electromovilidad (EMA) |

Note: AMIA official figures (34,607 for 2025) undercount significantly by excluding Tesla, BYD, and other brands not in their registry. EMA's broader count is the more accurate reference.

Mexico is also a major **EV production hub for export**: 206,870 EVs manufactured in 2024, with 95% exported to the U.S. This production base creates local supply chain capabilities (parts, technicians, tooling) that LAFA can eventually leverage.

**CDMX specifically:**
- Highest EV concentration in Mexico (density of charging infra, Hoy No Circula exemption, platform driver density)
- DiDi and Uber operate at scale — DiDi alone has 350,000+ drivers nationally, heavily concentrated in CDMX metro
- DiDi Premier launched October 2025 with 500 EVs and LAFA as strategic partner
- Climate (15-25C year-round) is near-optimal for LFP battery longevity *→ see [battery-degradation.md](../fleet/battery-degradation.md) §1*

**Price points driving adoption:**
- BYD Dolphin Mini: MXN $358,800 (~$19,000 USD)
- JAC e-JS1: MXN $400,000-500,000 (~$21,000-26,000 USD) — LAFA's primary OEM
- The cheapest EV now costs ~50% more than the cheapest ICE, down from >100% premium in 2023
- For fleet/ride-hailing operators, **TCO break-even is 1.5-3 years** due to 70-85% lower fuel costs per km

## 2. Chinese OEM Dominance — Why It Matters for LAFA

Chinese manufacturers control **~70% of Mexico's EV market** and are LAFA's OEM suppliers (Geely, JAC, GAC). Understanding China's LatAm strategy is essential to understanding LAFA's supply chain.

**BYD's regional position (competitor, not LAFA OEM):**
- ~40,000 units sold in Mexico (2024), ~30% EV market share
- 50 dealerships in Mexico, expanding
- Launched taxi program in Nuevo Leon (Nov 2025) — direct competitive threat *→ see [competitive-landscape.md](competitive-landscape.md) §1*

**JAC (LAFA OEM — LOW TARIFF RISK):**
- Assembled by Giant Motors Latinoamerica (GML — Giant Motors Latinoamerica) in Ciudad Sahagun, Hidalgo
- CKD (Completely Knocked Down — vehicle imported in parts for local assembly) process gives Mexican-origin classification
- Capacity: ~30,000/year, expanding to 60,000 with MXN $3B investment
- EV capacity: 7,000+/year, scalable to 12,000
- **This local assembly exempts JAC from the 50% tariff** *→ see [tariff-analysis.md](../fleet/tariff-analysis.md) §2*

**GAC (LAFA OEM — HIGH TARIFF RISK):**
- Imports directly from China — full 50% tariff applies
- AION ES confirmed in DiDi Premier fleet
- No known local assembly plans

**Geely (LAFA OEM — UNKNOWN RISK):**
- Confirmed LAFA partner, but assembly status, models, and fleet proportion are unknown
- **This is the single biggest intelligence gap** *→ see [tariff-analysis.md](../fleet/tariff-analysis.md) §2*

**Chinese OEM strategy globally:**
The Chinese automakers' approach in LatAm rests on four pillars: aggressive pricing ($7,000+ below comparable Western models), local manufacturing (BYD's $1B plant in Brazil, JAC in Mexico, at least 6 plants planned in Brazil by 2026), adapted distribution through local dealer partnerships, and market adaptation (flex-fuel PHEVs for Brazil). This strategy ensures continued supply availability for operators like LAFA, but creates tariff and geopolitical risk.

## 3. Charging Infrastructure in Mexico

Charging infrastructure is underdeveloped — and this gap is precisely what LAFA's future ecosystem vision (depot → public charging) aims to fill.

| Metric | Value |
|--------|-------|
| Total public stations | ~3,212 (2024) |
| Growth vs 2023 | +140% |
| Vehicles per public charger | ~41 (vs 2.6 global average) |
| Private/residential points | ~47,456 (92.5% of all charging) |
| Public rapid chargers (DC) | ~187 nationally |

**Key gaps:**
- 92.5% of charging is private (residential/corporate), not public — fleet operators with depot charging have a structural advantage
- Only 187 public DC fast chargers in the entire country
- Less than 2% of public chargers support the GB/T standard used by Chinese EVs dominating the market — a connector fragmentation problem
- Mexico's ratio of 41 vehicles per charger is 15x worse than the global average

**LAFA's opportunity:** Depot charging for a captive fleet sidesteps the public infrastructure gap entirely. At 2,000 vehicles, LAFA would operate one of Mexico's largest EV charging operations by volume, even if it's not public-facing. This creates real switching costs for drivers.

*→ For CFE tariff modeling, depot vs public costs, and demand charge analysis, see [charging-economics.md](../fleet/charging-economics.md) §1-§5.*

## 4. Mexican Regulatory Landscape

Mexico offers moderate EV incentives — enough to help unit economics but not transformative:

| Incentive | Detail | Impact for LAFA |
|-----------|--------|-----------------|
| **ISAN exemption** | No new vehicle acquisition tax on EVs | Reduces effective vehicle cost ~3-17% |
| **86% ISR deduction** | Immediate deduction of EV purchase (Plan Mexico 2025-2026) | Major — accelerates depreciation benefit |
| **30% tax credit** | For public charging infrastructure installation | Relevant for future public charging |
| **Tenencia exemption** | 5-year vehicle ownership tax exemption (varies by state) | Moderate savings per vehicle |
| **Hoy No Circula exemption** | No driving restrictions, including environmental contingencies | High for gig drivers — avoids ~15-20% income loss |
| **Refrendo** | Exemption **limited to first year only** (2026 policy change) | Eroding incentive — signal of policy fragility |

**Risk:** Mexican EV incentives are policy-dependent and already showing signs of erosion (refrendo limited to year 1). LAFA's financial model should stress-test scenarios where Hoy No Circula or tenencia exemptions are reduced.

**Electromovilidad strategy target:** Mexico's National Electromobility Strategy aims for 50% EV sales by 2030, but this is aspirational given current 2.5% penetration. More realistic projections suggest 5-10% by 2028.

*→ For driver-specific regulatory benefits, see [gig-driver-economics.md](gig-driver-economics.md) §3.*

## 5. LatAm Context (Benchmark for Future Expansion)

Latin America's EV market grew from ~35,000 units in 2022 to **400,000+ in 2025**, with BEV+PHEV penetration reaching ~8% regionally. Several markets have crossed the 5% threshold that historically marks the beginning of the S-curve of accelerated adoption.

**Key regional benchmarks:**

| Country | 2025 BEV+PHEV | Penetration | Relevance for LAFA |
|---------|---------------|-------------|---------------------|
| Brazil | 181,542 | ~9% | Largest market; BYD factory operational; potential expansion market |
| Mexico | 96,636 | ~2.5% | LAFA's current market; earlier in adoption curve |
| Colombia | ~16,000 (est.) | ~10% | 0% import tariff for EVs; high penetration; expansion candidate |
| Chile | 5,600 (2024) | ~10.6% (electrified total) | Mature market; 2,555 e-buses; expensive expansion |

**What drives the regional boom:** Not regulation — price. Chinese manufacturers collapsed the BEV-to-ICE price premium from >100% to 25-50%, making EVs economically rational before policy catches up. This is relevant for LAFA: the value proposition to drivers is financial (fuel savings), not ideological (green).

The regional gig fleet market is consolidating: Kovi was acquired by Moove (Jan 2025, combined $275M ARR, 36K vehicles). This creates global-scale competitors but also validates the model.

*→ For competitive benchmarks (VEMO, OCN, Kovi/Moove, Splend), see [competitive-landscape.md](competitive-landscape.md).*

---

## Implications for LAFA

- **Mexico is early in the S-curve (~2.5% penetration).** This means LAFA is building before the inflection point — higher risk but potential first-mover advantage if it survives to 5-8% penetration when adoption accelerates.
- **Charging infrastructure is LAFA's moat-in-waiting.** With only 187 public DC chargers nationally and a 41:1 vehicle-to-charger ratio, whoever controls charging controls the ecosystem. LAFA's depot charging model is a structural advantage today; public charging is the long-term moat.
- **Chinese OEM dependence is both strength and vulnerability.** Direct OEM access (JJ works with China) gives LAFA favorable pricing and supply, but concentrates risk in tariff policy and geopolitics. JAC's local assembly is the critical hedge.
- **Policy erosion is already happening.** The refrendo limitation to year 1 (2026) signals that EV incentives are not permanent. LAFA's unit economics should be viable without Hoy No Circula or tenencia — these are bonuses, not foundations.
- **LatAm expansion is plausible but not urgent.** Colombia (0% EV tariff, ~10% penetration) is the most attractive expansion market. Brazil is large but requires local manufacturing partnerships. Neither should distract from the CDMX scaling challenge (150 → 2,000 vehicles).

---

*Sales data from IEA, AMIA, EMA, BloombergNEF, and press sources. Projections are estimates. Tariff rates and incentives subject to policy changes. Updated February 7, 2026.*
