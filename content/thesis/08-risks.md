# 08 — Risks and Open Questions

**VC Question:** "What has to go right for this to work? What kills the deal?"

---

## Deal-Breakers vs. Manageable Risks

The difference between a risk that kills the thesis and one that can be managed:

### Deal-Breakers (if confirmed, the thesis doesn't work)

| # | Risk | Break condition | Current status |
|---|------|----------------|----------------|
| 1 | **Insufficient capital** | No committed capital to go from 150 to 2,000 vehicles. No debt facility or planned equity raise. | UNKNOWN — ask JJ |
| 2 | **Structurally negative unit economics** | Negative contribution margin even with all 4 levers (JAC, smart charging, >90% utilization, <5% defaults). | UNLIKELY but not verified — we estimate -$1.5K to +$1.8K/veh/month |
| 3 | **Geely is 100% imported and >50% of the fleet** | If Geely has no local assembly and dominates the fleet mix, per-vehicle cost increases by MXN $87-116K. At 1,000 Geely vehicles = MXN $87-116M in additional cost. | UNKNOWN — ask JJ |
| 4 | **BYD launches national fleet-as-a-service** | BYD with local factory, 50+ dealerships, and taxi program already in NL. If they offer DaE+LTO at national scale, they disintermediate LAFA. | POSSIBLE in 2-3 years — monitor |

### High Risks (manageable with execution)

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 5 | **13x growth target** | HIGH | 150 to 2,000 in 12 months with 3 tech people. Requires capital + flawless operational execution. If it stays at 500, the business works but the scale thesis weakens. |
| 6 | **Tech readiness** | HIGH | "Everything is spreadsheets" — no DB, no dashboard. Track A foundation of the roadmap solves it in 8 weeks, but the executor (Jose) would be the sole technical person. |
| 7 | **Remote CEO** | MEDIUM | JJ in China/US, not CDMX. Coordination risk during critical scaling. Mitigable if Levi goes full-time and if there is operational leadership in CDMX. |
| 8 | **GAC tariff exposure** | MEDIUM-HIGH | GAC imports from China — 50% tariff applies in full. Impact depends on fleet mix. |

### Medium-Low Risks (contextual)

| # | Risk | Severity | Note |
|---|------|----------|------|
| 9 | **Charging infrastructure** | MEDIUM | Depot charging exists for 150 vehicles. Future public infra is aspirational. |
| 10 | **Regulatory dependency** | MEDIUM | EV incentives (Hoy No Circula (driving restriction), tenencia (vehicle ownership tax), ISAN (new vehicle tax)) are policy-dependent. Already eroding: refrendo (annual registration renewal) limited to first year in 2026. |
| 11 | **Gig economy regulation** | MEDIUM | Platform labor reform (June 2025) could change cost structures. 1.26M workers registered for IMSS (social security). |
| 12 | **Repossession complexity** | LOW-MEDIUM | Financial lease structure is robust. GPS + weekly payments enable early detection. Non-judicial recovery: MXN $5,750-15,100 per case. |
| 13 | **Battery degradation** | LOW | CDMX climate ideal for LFP: 88-92% SOH after 4 years of intensive use. Not an issue for the financial model. |
| 14 | **JAC tariff exposure** | LOW | Assembly in Hidalgo exempts them from the 50%. |
| 15 | **DiDi partnership legitimacy** | LOW | Verified by 6+ press sources. Confirmed by Levi. |

---

## What Must Be True (Critical Assumptions)

For LAFA to reach 2,000 profitable vehicles in 2026, these 4 assumptions must hold:

1. **The capital exists.** ~MXN $800M in assets for 2,000 vehicles. Requires debt facility + equity raise. Without capital, everything is theory.

2. **The fleet mix favors JAC.** If >60% of the fleet is JAC (tariff-exempt), the unit economics work. If the majority is imported GAC/Geely, each vehicle costs MXN $87-116K more and the margin turns negative.

3. **LTO works.** DaE is operationally proven but hard to scale (LAFA needs to control everything). LTO is the path to real scale, but has only 2 months of operation and higher credit risk. If LTO defaults exceed 10-15%, the model breaks.

4. **LAFA builds tech before the spreadsheets collapse.** At 500+ vehicles, manual operations break down. The AI Product Engineer (Jose) has to deliver the Track A foundation in 8 weeks — with no backup technical team.

---

## Open Questions for JJ

Consolidation of all unanswered questions from the research, prioritized for the CEO interview:

| # | Question | Why it matters | Reference |
|---|----------|---------------|-----------|
| 1 | Fleet breakdown Geely vs JAC vs GAC? | Determines actual tariff exposure | [05-traction](05-traction.md) |
| 2 | Geely: local assembly or import? | MXN $87-116K difference per vehicle | [tariff-analysis](../analysis/fleet/tariff-analysis.md) |
| 3 | Committed capital for 2,000 vehicles? | MXN $800M in assets; VEMO has $500M+, OCN $100M+ | [04-business-model](04-business-model.md) |
| 4 | Current charging: depot L2, public network, mixed? | Determines optimization scope ($720K-960K/month potential savings) | [charging-economics](../analysis/fleet/charging-economics.md) |
| 5 | Time in Mexico vs China/US? | 13x scaling requires daily operational decisions | [07-team](07-team.md) |
| 6 | Priority: DaE or LTO for the next 6 months? | Determines tech roadmap sequence | [ai-roadmap](../strategy/ai-roadmap.md) |
| 7 | Actual contribution margin per vehicle? | We estimate -$600 to +$2,000/month | [04-business-model](04-business-model.md) |
| 8 | How do they manage LTO credit risk today? | Bureau, scoring, or manual? | [credit-scoring](../analysis/fintech/credit-scoring.md) |
| 9 | Relationship with OCN Holdings? | If connected, LAFA could access OCN's tech/data/capital | [06-competition](06-competition.md) |
| 10 | Ecosystem vision 2-3 years: build vs partner? | Reveals capital allocation priorities | [05-traction](05-traction.md) |

*→ Full detail of JJ prep in [jj-interview-prep.md](../hiring/jj-interview-prep.md).*

---

## Corporate Structure (Speculative)

**Legal entity:** Latin America Future Automobile Mexico INC, S.A.P.I. de C.V. The S.A.P.I. de C.V. structure is standard for VC-backed startups in Mexico, enabling drag-along/tag-along clauses and flexible governance for investors.

**Address:** Abraham Gonzalez 51, Colonia Juarez, Alcaldia Cuauhtemoc, C.P. 06600, CDMX.

The mention of "affiliates, subsidiaries, or group companies" in LAFA's privacy notice suggests a group structure — likely a U.S. parent entity (LAFA Inc) with the Mexican operating company. Possible affiliation with OCN Holdings (McLean, VA), though unconfirmed.

---

## Verification Status

| Data Point | Source | Verification |
|------------|--------|-------------|
| ~150 vehicles operating | Levi Garcia (interview) | Confirmed |
| 2,000 vehicle target 2026 | Levi Garcia (interview) | Confirmed |
| OEMs: Geely, JAC, GAC | Levi Garcia (interview) | Confirmed |
| BYD is NOT a partner | Levi Garcia (interview) | Confirmed |
| Two products (DaE + LTO) | Levi Garcia (interview) | Confirmed |
| LTO launched Dec 2025 | Levi Garcia (interview) | Confirmed |
| Charging cost ~$300/week | Levi Garcia (interview) | Confirmed |
| "Everything is spreadsheets" | Levi Garcia (interview) | Confirmed |
| Team: 3 tech people planned | Levi Garcia (interview) | Confirmed |
| Jose reports to Levi | Levi Garcia (interview) | Confirmed |
| DiDi Premier partnership | 6+ press sources (Oct 2025) | Verified |
| JJ background (Capital One, Stori, MTMT) | LinkedIn, SEC filings | Verified |
| Levi background (Stori, Clip) | LinkedIn, interview | Verified |
| Funding status | No public sources found | Unverified (likely pre-seed/seed) |
| Charging infrastructure | Not found on PlugShare/Google Maps | Unverified (aspirational) |
| Geely tariff exposure | Not analyzed | Research gap |
| Fleet breakdown by OEM | Not disclosed | Unknown |
| Revenue / contribution margin | Not disclosed | Estimated only |
| ~658K platform workers (2025 reform) | Official reform data, platform disclosures | Verified |
| Mexico TAM ~USD $1.0-4.2B | Estimated (revised: top-down + bottom-up) | Estimated |
| <3% credit-eligible for auto loans | Industry data | Unverified (cited in multiple sources) |
| 1.26M IMSS-registered gig workers | Reform data | Verified |

---

*Risk assessment based on consolidated research + data confirmed by Levi Garcia (Feb 6, 2026). Deal-breaker classification is the evaluator's opinion.*
