# LAFA Project Instructions

## What This Is
Research and strategy folder for Jose Diaz's evaluation of the **AI Product Engineer (Internal Tools)** role at LAFA (Latin America Future Automobile). Organized as a VC investment thesis. Now also includes a web app (replica of LAFA's site + internal tools prototypes).

## File Structure
```
/Lafa/
├── README.md                              ← Executive summary + VC thesis navigation
├── CLAUDE.md                              ← This file
├── content/                               ← All research & strategy content
│   ├── thesis/                            ← VC investment thesis (8 chapters)
│   │   ├── 01-problem.md                  ← Problem + Why Now (3 converging forces)
│   │   ├── 02-market.md                   ← TAM/SAM/SOM + market timing
│   │   ├── 03-solution.md                 ← Two products: DaE + LTO + flywheel
│   │   ├── 04-business-model.md           ← Unit economics + path to profitability
│   │   ├── 05-traction.md                 ← PMF evidence: fleet, DiDi, milestones, OEMs
│   │   ├── 06-competition.md              ← Landscape + moats + threats
│   │   ├── 07-team.md                     ← Team assessment + founder-market fit
│   │   └── 08-risks.md                    ← Deal-breakers + verification
│   ├── analysis/                          ← Deep-dive evidence (detail behind thesis/)
│   │   ├── README.md                      ← Navigation index for all analysis files
│   │   ├── fleet/
│   │   │   ├── tariff-analysis.md         ← 50% tariff by OEM, CKD, unit economics
│   │   │   ├── charging-economics.md      ← CFE rates, depot charging, CMS, OCPP, standards
│   │   │   ├── battery-degradation.md     ← LFP in CDMX, SOH, analytics platforms, OEM data
│   │   │   ├── fleet-technology.md        ← Telematics + FMS + emerging tech (merged)
│   │   │   ├── route-optimization.md      ← HERE vs Google, OR-Tools/Vroom, SoC-aware dispatch
│   │   │   └── predictive-maintenance.md  ← EV vs ICE savings, Stratio, OEM parts, ASE cert
│   │   ├── fintech/
│   │   │   ├── credit-scoring.md          ← MetaMap, Circulo, Belvo, Palenca/Bankuish/Truora
│   │   │   ├── repossession-collections.md ← Leasing, GPS/kill switch, accounting, cybersecurity
│   │   │   └── insurance-risk.md          ← EV premiums, Mexico insurers, BDEO, CMT, Ravin AI
│   │   └── market/
│   │       ├── competitive-landscape.md   ← VEMO, OCN, BYD, DiDi + platform integrations (merged)
│   │       ├── ev-market-latam.md         ← Mexico EV market, Chinese OEMs, regulation
│   │       ├── gig-driver-economics.md    ← 658K workers, EV vs ICE economics
│   │       └── biz-model-research.md      ← DaE/LTO landscape, regulation by country
│   ├── team/                              ← Individual team profiles (6 people)
│   ├── strategy/                          ← Jose's strategic contribution
│   │   ├── README.md                      ← Navigation + how files connect
│   │   ├── ai-roadmap.md                  ← 12-month roadmap (Phase 0 + 8 AI projects)
│   │   ├── product-ecosystem.md           ← 5 user types, 64 items, 3 horizons
│   │   ├── data-infrastructure.md         ← 3-phase analytics stack, cost scaling, ML priorities
│   │   └── tech-stack-scaling.md          ← Build vs buy matrix, stacks at 500/2K/10K, flywheel
│   ├── vemo-benchmark/                    ← Vemo competitive intel (7 topic files + README)
│   │   ├── README.md                      ← Source index + navigation + quick comparison
│   │   ├── 01-company-profile.md          ← Consolidated profile: model, scale, OEMs, capital
│   │   ├── 02-impulso-financing.md        ← LTO benchmark: credit, bundling, driver economics
│   │   ├── 03-charging-infrastructure.md  ← Charging: standards, partnerships, revenue model
│   │   ├── 04-fleet-safety.md             ← Emergency protocols, C2 ops, QHSE, insurance
│   │   ├── 05-battery-lifecycle.md        ← SOH, degradation, second-life, circular economy
│   │   ├── 06-founder-frameworks.md       ← Rocha's strategic mental models
│   │   └── 07-source-transcript.md        ← Vemo Talks #1 transcript (energy transition)
│   ├── hiring/                            ← Hiring process (README + 3 files)
│   │   ├── README.md                      ← Timeline, job description, Jose's CV (merged)
│   │   ├── interview-levi-2026-02-06.md   ← Full interview transcript
│   │   ├── interview-levi-feedback.md     ← Post-interview feedback
│   │   └── jj-interview-prep.md           ← CEO interview prep
│   └── reference/                         ← Brand assets
├── tools/                                 ← Internal tools app (HTML + JS + CSS)
│   ├── shared.css                         ← Shared styles
│   ├── shared.js                          ← Shared data, sidebar, utilities
│   ├── dashboard.html / dashboard.js      ← Fleet operations dashboard
│   ├── battery.html / battery.js          ← Battery health monitor
│   ├── collections.html / collections.js  ← WhatsApp collections bot
│   ├── onboarding.html / onboarding.js    ← Driver onboarding pipeline
│   ├── roadmap.html / roadmap.js          ← AI roadmap interactive
│   └── roadmap-data.js                    ← Roadmap project data
├── images/                                ← Image assets
└── index.html                             ← Marketing landing page
```

## Conventions

- **All content files are in English.** Interview transcripts may contain Spanish quotes.
- **MECE data ownership:** Each data point lives in exactly one file. Other files cross-reference via relative links. See the Data Ownership table in README.md.
- **Cross-references:** Key files have navigation headers (blockquotes) linking to related files. When adding new content, place it in the owner file and add cross-reference links from related files.
- **content/thesis/ is the summary layer.** It references content/analysis/ for detail. Never duplicate data — link instead.
- **content/analysis/ is the evidence layer.** Each file supports specific thesis chapters (see content/analysis/README.md for the mapping).
- **content/strategy/ is Jose's contribution.** These files represent what he would build at LAFA. See content/strategy/README.md for how the 4 files connect.

## Key Facts

- **OEMs:** Geely, JAC, GAC (NOT BYD)
- **Fleet:** ~150 vehicles, target 2,000 by end of 2026
- **Products:** Driver-as-Employee (DaE) + Lease-to-Own (LTO, launched Dec 2025)
- **Tech status:** Stage 0 — everything is spreadsheets
- **Platform partner:** DiDi (Premier launched Oct 2025)
- **Hiring:** Jose would report to Levi Garcia (Head of Product). Next interview: JJ (CEO)
