# LAFA: Investment Thesis

Evaluation of the **AI Product Engineer (Internal Tools)** role at LAFA (Latin America Future Automobile) -- an early-stage Mexican startup leasing Chinese EVs to gig drivers in Mexico City.

**Status:** First interview with Levi Garcia (Head of Product) completed Feb 6, 2026. Second interview with JJ (CEO) pending.

**Framing:** This folder is organized as a **VC investment thesis** -- the same mental framework an investor would use to evaluate whether to deploy capital. In Jose's case, the investment is his career.

---

## Investment Thesis

The core evaluation, structured in 8 chapters:

| # | File | Question It Answers |
|---|------|---------------------|
| 01 | [The Problem](content/thesis/01-problem.md) | What problem does LAFA solve, and why hasn't it been solved before? |
| 02 | [Market](content/thesis/02-market.md) | How big is the opportunity? TAM / SAM / SOM |
| 03 | [Solution](content/thesis/03-solution.md) | What does LAFA build? Two products: DaE + LTO |
| 04 | [Business Model](content/thesis/04-business-model.md) | How does it make money, and can it make enough? Unit economics |
| 05 | [Traction](content/thesis/05-traction.md) | Is there evidence of product-market fit? 150 vehicles, DiDi, milestones |
| 06 | [Competition](content/thesis/06-competition.md) | Who else is solving this, and why would LAFA win? |
| 07 | [Team](content/thesis/07-team.md) | Can this team build a $100M company? |
| 08 | [Risks](content/thesis/08-risks.md) | What has to go right? Deal-breakers vs manageable risks |

---

## Supporting Analysis

Deep-dives with detailed evidence backing the thesis. See [content/analysis/README.md](content/analysis/README.md) for full navigation.

### analysis/fleet/ -- The vehicle as a physical asset
- [Tariff Analysis](content/analysis/fleet/tariff-analysis.md) -- 50% tariff by OEM (JAC/GAC/Geely), CKD cost, unit economics scenarios
- [Charging Economics](content/analysis/fleet/charging-economics.md) -- CFE rates, Level 2 vs DC, depot charging, CMS comparison, OCPP, charging standards
- [Battery Degradation](content/analysis/fleet/battery-degradation.md) -- LFP in CDMX climate, SOH projections, analytics platforms (ACCURE/TWAICE/AVILOO), OEM data access
- [Fleet Technology](content/analysis/fleet/fleet-technology.md) -- Telematics hardware, fleet management software, emerging tech (Ravin AI, V2G, digital twins)
- [Route Optimization](content/analysis/fleet/route-optimization.md) -- HERE vs Google Routes API, OR-Tools/Vroom, SoC-aware EV dispatch
- [Predictive Maintenance](content/analysis/fleet/predictive-maintenance.md) -- EV vs ICE savings, Stratio/Uptake/Pitstop, cost breakdown, OEM parts, technician cert

### analysis/fintech/ -- The financial layer
- [Credit Scoring](content/analysis/fintech/credit-scoring.md) -- MetaMap, Circulo de Credito, Belvo, Palenca/Bankuish/Truora, payment rails, warm-start strategy
- [Repossession & Collections](content/analysis/fintech/repossession-collections.md) -- Financial leasing, GPS/kill switch, escalation tree, default economics, lease accounting, cybersecurity
- [Insurance & Risk](content/analysis/fintech/insurance-risk.md) -- EV insurance premiums, Mexico insurers, BDEO claims tech, CMT crash detection, Ravin AI

### analysis/market/ -- External context
- [Competitive Landscape](content/analysis/market/competitive-landscape.md) -- VEMO ($500M+), OCN ($100M+), BYD, DiDi, Kovi/Moove, Splend, playbook + platform integrations
- [EV Market LatAm](content/analysis/market/ev-market-latam.md) -- Mexico EV market, Chinese OEMs, charging infrastructure, regulation, LatAm benchmarks
- [Gig Driver Economics](content/analysis/market/gig-driver-economics.md) -- Market size (658K workers), EV vs ICE economics, regulatory incentives
- [Biz Model Research](content/analysis/market/biz-model-research.md) -- DaE and LTO in LatAm, full landscape, regulation by country, global benchmarks

---

## Team

Individual profiles of the LAFA team:
- [JJ (CEO)](content/team/jj.md) -- Jianan Jiang
- [Levi (Head of Product)](content/team/levi.md) -- Levi Garcia
- [Daniel Briones (Sales & CX Dir.)](content/team/daniel-briones.md)
- [Diego Gonzales (Sales Sup.)](content/team/diego-gonzales.md)
- [Marsha Escudero (Ops Dir.)](content/team/marsha-escudero.md)
- [David Ulloa](content/team/david-ulloa.md)

---

## Strategy

Jose's strategic contribution -- what he would build. See [content/strategy/README.md](content/strategy/README.md) for how the files connect.
- [AI Roadmap](content/strategy/ai-roadmap.md) -- 12-month roadmap: Phase 0 (DB, dashboard, maintenance, dispatch) + 8 AI projects. 42 weeks, MXN $3.6-9.1M/year
- [Product Ecosystem](content/strategy/product-ecosystem.md) -- Full map: 5 user types, 64 products/touchpoints (44 in roadmap, 20 gaps), 3 horizons
- [Data Infrastructure](content/strategy/data-infrastructure.md) -- 3-phase analytics stack (Metabase to Kafka to Looker), cost scaling $300-$8K/mo, ML use cases by ROI
- [Tech Stack Scaling](content/strategy/tech-stack-scaling.md) -- Build vs buy matrix, recommended stacks at 500/2K/10K vehicles, data network effects, technology flywheel

---

## Hiring

Hiring process. See [content/hiring/README.md](content/hiring/README.md) for timeline, job description, and Jose's CV.
- [Interview with Levi](content/hiring/interviews/interview-levi-2026-02-06.md) -- Full transcript, Feb 6, 2026
- [Interview Levi Feedback](content/hiring/interviews/interview-levi-feedback.md) -- Post-interview feedback and lessons
- [JJ Interview Prep](content/hiring/interviews/jj-interview-prep.md) -- 14 questions + roadmap summary + talking points

---

## Vemo Benchmark

Competitive intelligence on VEMO -- LAFA's most direct competitor. See [content/vemo-benchmark/README.md](content/vemo-benchmark/README.md) for source index and quick comparison.
- [Company Profile](content/vemo-benchmark/01-company-profile.md) -- Consolidated profile: 4 verticals, scale, OEMs, capital ($150M+), operations, scorecard
- [Impulso Financing](content/vemo-benchmark/02-impulso-financing.md) -- LTO benchmark: non-traditional credit, ecosystem bundling, driver economics
- [Charging Infrastructure](content/vemo-benchmark/03-charging-infrastructure.md) -- 500 to 1,000 chargers, standards (NACS/CCS1/GB/T), BMW/BYD/Siemens partnerships
- [Fleet Safety](content/vemo-benchmark/04-fleet-safety.md) -- Emergency protocols, battery fire response, C2 ops, QHSE, AXA insurance
- [Battery Lifecycle](content/vemo-benchmark/05-battery-lifecycle.md) -- SOH, degradation, lifecycle emissions, second-life (Batex model)
- [Founder Frameworks](content/vemo-benchmark/06-founder-frameworks.md) -- Roberto Rocha's strategic mental models: vertical integration, step-function growth, trust transfer
- [Source Transcript](content/vemo-benchmark/07-source-transcript.md) -- Vemo Talks #1 transcript (energy transition panel, Spanish)

---

## Reference

Brand assets:
- [LAFA Brand](content/reference/brand.md) -- Visual identity, messaging, site architecture

---

## Data Ownership (MECE)

Each data point lives in exactly one file:

| Topic | Owner | Others reference via |
|-------|-------|----------------------|
| Problem statement + Why Now | content/thesis/01-problem | -- |
| TAM/SAM/SOM + market sizing | content/thesis/02-market | gig-driver-economics, biz-model-research feed data |
| Product description (DaE + LTO) | content/thesis/03-solution | -- |
| Integrated unit economics (P&L) | content/thesis/04-business-model | tariff-analysis, charging-economics, repossession own numbers |
| Traction, milestones, OEMs, ops | content/thesis/05-traction | -- |
| Competitive analysis + moats | content/thesis/06-competition | competitive-landscape owns detail |
| Team assessment + founder-market fit | content/thesis/07-team | team/ owns individual profiles |
| Risk matrix + deal-breakers | content/thesis/08-risks | -- |
| Charging economics (CFE, depot, CMS, OCPP) | content/analysis/fleet/charging-economics | -- |
| OEM profiles + tariff modeling | content/analysis/fleet/tariff-analysis | -- |
| Battery degradation + analytics platforms | content/analysis/fleet/battery-degradation | -- |
| Fleet technology (telematics, FMS, emerging) | content/analysis/fleet/fleet-technology | -- |
| Route optimization + EV dispatch | content/analysis/fleet/route-optimization | -- |
| Predictive maintenance + EV servicing | content/analysis/fleet/predictive-maintenance | -- |
| Credit scoring + alt platforms + payment rails | content/analysis/fintech/credit-scoring | -- |
| Repossession + collections + lease accounting + cybersecurity | content/analysis/fintech/repossession-collections | -- |
| Insurance + risk + claims tech | content/analysis/fintech/insurance-risk | -- |
| Competitor deep-dives + platform integrations | content/analysis/market/competitive-landscape | -- |
| EV market data + regulatory | content/analysis/market/ev-market-latam | -- |
| Gig driver market + economics | content/analysis/market/gig-driver-economics | -- |
| LatAm biz model landscape | content/analysis/market/biz-model-research | -- |
| AI roadmap (12 projects) | content/strategy/ai-roadmap | -- |
| Product ecosystem (5 users, 64 items) | content/strategy/product-ecosystem | -- |
| Data infrastructure (3-phase stack, ML priorities) | content/strategy/data-infrastructure | -- |
| Tech stack scaling (build vs buy, flywheel) | content/strategy/tech-stack-scaling | -- |

---

*Last updated: February 7, 2026*
