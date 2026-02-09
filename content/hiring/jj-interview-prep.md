# JJ Interview Prep

**Interview with:** Jianan Jiang (JJ), Founder & CEO, LAFA
**Context:** Second interview. First interview with Levi Garcia (Head of Product) completed Feb 6, 2026.

---

## Lessons from the Levi Interview (Apply with JJ)

### Pitch structure — invert the order
With Levi, the pitch was chronological (Pacifico -> Singularity -> FAVO -> JOKR -> Yape -> AI -> NUMA). Levi had to wait too long to get to AI. His reaction was: *"Product Management that looks great... but yeah, let's keep going"* — he wanted to get to the point.

**With JJ, open like this:**
1. **Minute 0-2:** "I built NUMA from scratch with AI — let me give you a quick demo" (show you're a builder)
2. **Minute 2-4:** "At Yape I shipped AI to production: 300K conversations/month, 12% error vs 30% human" (scale + metrics)
3. **Minute 4-6:** "At InRetail I rebuilt tech from scratch with a small team, migrated the data lake, built internal tools" (connect directly to LAFA's challenge)
4. **Only if asked:** full career story (FAVO, growth, CX at Yape)

### Mistakes to avoid
- **Don't be modest about NUMA.** If JJ mentions a competitor, reframe: *"That solves X; I'm solving Y, which is the intelligence layer"*
- **Connect explicitly** your experience to LAFA: *"What I did at InRetail — going from spreadsheets to a platform with a small team — is exactly what LAFA needs. Except now I have AI as a force multiplier."*
- **Go deeper on technical decisions**, don't just list tools. Example: *"We chose Databricks over a direct API because we needed to process 300K conversations in batch, not in real-time."*
- **Ask strategic questions** that show product thinking (see questions section below)

---

## What We Already Know (from Levi)

**Core Business:**
- Fleet: ~150 vehicles, target 2,000 by end of 2026 (13x growth)
- OEMs: Geely, JAC, GAC (NOT BYD — BYD is competitor only)
- Two products: Driver-as-Employee + Lease-to-Own (LTO launched Dec 2025)
- DaE: min $6K MXN/week billing, LAFA employs driver with full benefits
- LTO: up to $40K MXN/month, driver builds equity over 4-year lease
- Mission: "effective and eco-friendly mobility"

**Operations:**
- Tech state: "everything is spreadsheets" — no DB, no dashboard, no automation
- LAFA pays for charging (DaE): ~$300 MXN/week per vehicle (vs $1,200-1,500 gasoline)
- DiDi Premier partnership confirmed (Oct 2025, "strategic ally")

**Ecosystem Vision (Levi):**
- Charging centers (owned/operated, not just depot)
- Specialized maintenance for Chinese EV models
- Tire distribution for Chinese EV models
- Exploring more Chinese OEM partnerships beyond current 3

**Team & Organization:**
- JJ works directly with China on OEM partnerships (not based in CDMX)
- Jose would report directly to Levi (Head of Product)
- 3-person tech team planned; Jose = first technical product hire
- JJ and Levi both from Stori Card — shared trust network and talent pipeline

**Tariff Situation (from research):**
- JAC: LOW risk — assembled in Hidalgo (CKD), exempt from 50% tariff
- GAC: HIGH risk — imported from China, full 50% tariff since Jan 2026
- Geely: UNKNOWN — biggest intelligence gap, critical question for JJ

## What We Need to Confirm with JJ

JJ's unique knowledge: OEM strategy, capital/funding, fleet composition, long-term vision, and operational decisions that Levi deferred to him.

---

## Critical Questions (Must Ask)

**1. "What's the fleet breakdown — how many Geely vs. JAC vs. GAC? And what's the OEM strategy given the 50% tariff?"**
- Why: JAC is exempt (Hidalgo CKD assembly). GAC faces full 50% tariff. Geely is unknown. The fleet mix determines real tariff exposure. If growth plan leans on GAC/Geely imports, vehicle costs could increase 25-50%.
- Signal: Shows you've done your homework on tariffs and OEM-specific risk.

**2. "Does Geely have local assembly in Mexico, or is it fully imported?"**
- Why: Single biggest intelligence gap. JAC CKD assembly saves MXN $87K-116K per vehicle vs importing. If Geely lacks this, and Geely is a large share of fleet, the 2,000-vehicle target becomes much more capital-intensive.

**3. "What's the funding situation? Is there committed capital for the 2,000-vehicle target?"**
- Why: 2,000 vehicles x ~$400K = MXN $800M in assets. Contribution margin is tight (-$600 to +$2,000/vehicle/month). VEMO has $500M+, OCN $100M+. Capital structure directly determines what's buildable.

**4. "What does charging look like today for the 150 vehicles? Depot Level 2, public network, or mixed?"**
- Why: At $300/week/vehicle, charging is MXN $180K/month today and $2.4M/month at 2,000. Smart depot charging optimization (P5, Track B of my roadmap) could save 30-40% = MXN $720K-960K/month. But the solution depends on current infrastructure.

**5. "How much time do you spend in Mexico vs. China/US? Who runs day-to-day ops in CDMX?"**
- Why: 13x scaling needs daily operational decisions. With JJ in China/US and Levi on product, there may be an ops leadership gap — or someone we haven't met.

**6. "Which product is priority for the next 6 months — DaE or LTO? Or equal?"**
- Why: Determines tech roadmap focus. DaE needs shift dispatch + centralized charging. LTO needs payment tracking + credit scoring + collections. My roadmap covers both, but sequencing changes based on priority.

---

## Important Questions (Should Ask)

**7. "What's the actual contribution margin per vehicle today? Our estimate is -$600 to +$2,000/month."**
- Why: Validates unit economics. If real margins are negative, scaling to 2,000 loses more money. If positive, it changes capital strategy.

**8. "How do you manage credit risk today for LTO? Bureau check, scoring, or manual?"**
- Why: If fully manual, credit scoring (P2, Track C — Month 7-9 in my roadmap) gets warm-started with 5-6 months of payment data. If there's some process, we build on it.

**9. "What's the relationship with OCN Holdings? Is LAFA part of the same group?"**
- Why: OCN Holdings (McLean, VA) appears in some contexts near LAFA. If connected, LAFA may have access to OCN's tech, data, or capital — which changes the roadmap entirely.

**10. "What does the ecosystem vision look like in 2-3 years? Levi mentioned charging centers, maintenance, tires — how do you see the build vs. partner decision?"**
- Why: Shows you're thinking long-term. Also reveals JJ's capital allocation priorities — is ecosystem expansion funded, or aspirational?

---

## Nice-to-Have Questions (If Time Permits)

**11. "What's the current revenue split between DaE and LTO? Which is growing faster?"**
- Why: Indicates which product is working and where to invest tech resources first.

**12. "Have you had defaults in LTO? How many? How do you handle recovery today?"**
- Why: Real default data shapes the collections bot (P3, Month 5-7) and credit scoring (P2, Month 7-9). OCN benchmark is single-digit defaults — if LAFA's are higher, scoring becomes more urgent.

**13. "What's the actual maintenance cost per vehicle per month?"**
- Why: Our estimate is MXN $500-1,000. Real data shifts unit economics. Also validates whether maintenance tracking (P0.3, Track A) should be higher priority.

**14. "Do you have exclusive OEM contracts, or buy on the open market? Any volume discount tiers?"**
- Why: Volume discounts (10-20%) are a key margin lever. Exclusive terms could mean priority allocation during tariff disruption.

---

## Roadmap Summary (To Share with JJ)

If JJ asks "what would you do in the first few months?" or if there's an opening to show work, here's the executive summary. The full detail is in `strategy/ai-roadmap.md`.

**Thesis:** Infrastructure first, AI second. You can't build scoring without data. Track A foundation enables everything else.

```
TRACK A — FOUNDATION & CROSS-PRODUCT (Mo 1-14)
  P0.1  PostgreSQL database (migrate from spreadsheets)          3-4 wks
  P0.2  Metabase dashboard (transparency for stakeholders)       1-2 wks
  P0.3  Maintenance tracking (protect 150->2,000 assets)         2 wks
  P0.5c Incident reporting (structured data)                     2 wks
  P0.5d Insurance module (MXN $36-72M untracked)                 2 wks
  P1    AI onboarding lite (WhatsApp + GPT-4o Vision OCR)        4 wks
  P4    Battery monitoring (SOH + anomaly detection)             4 wks
  P3    WhatsApp collections bot (automated debt recovery)       6 wks
  P6    Document automation (LTO + DaE contracts)                4 wks
  P7    Enhanced dashboard (dbt, per-vehicle P&L, cohorts)       4 wks
  P8    RAG knowledge bot (internal team + drivers)              4 wks

TRACK B — DRIVER-AS-EMPLOYEE (Mo 1-7)
  P0.4  WhatsApp shift dispatch (DaE operations)                 1-2 wks
  P0.5a HR/Payroll integration (Runa/Worky)                      2-3 wks
  P5    Charging optimization (depot, peak shaving)              4 wks

TRACK C — LEASE-TO-OWN (Mo 2-9)
  P0.5b LTO account statement (self-service)                     1-2 wks
  P2    AI Credit Scoring (warm start w/ 6 months of data)       6 wks

TOTAL: ~50 weeks across 16 projects, est. MXN $3.6-9.1M/year
```

**Key messages for JJ:**
- Track A foundation in 8 weeks = get off spreadsheets before scaling. Without this, 2,000 vehicles is ungovernable.
- Credit scoring in Mo 7-9, not Mo 1 — because by then we have 6 months of real payment data (warm start vs cold start). OCN started cold; we don't have to.
- Charging optimization alone can save MXN $720K-960K/month at 2,000 vehicles.
- Battery monitoring protects MXN $60-80M in assets (batteries = 40-50% of EV value).
- Consolidated stack: PostgreSQL + FastAPI + WhatsApp Business API + OpenAI — no fragmentation.

---

## Talking Points to Demonstrate Value

**If tech roadmap comes up (LEAD WITH THIS):** "I built a 14-month roadmap organized in 3 tracks based on what Levi told me. Track A is the foundation: PostgreSQL database, Metabase dashboard, maintenance tracking, plus cross-product AI tools. Track B is DaE-specific: shift dispatch, HR/payroll, charging optimization. Track C is LTO-specific: account statements, credit scoring. 16 projects total, ~50 weeks of execution, estimated MXN $3.6-9.1M/year in impact."

**If charging costs come up:** "Today you're spending MXN $180K/month on charging for 150 vehicles. At 2,000 that's $2.4M/month. In my roadmap, Project 5 (Track B) optimizes depot charging with linear programming — staggering charging during CFE base-rate hours and doing peak shaving. That can save 30-40%, which is MXN $720K-960K per month. And it depends on the Track A foundation and battery monitoring, which come first."

**If tariffs come up:** "JAC is the only OEM exempt from the tariff — the Hidalgo CKD assembly saves MXN $87K-116K per vehicle vs importing. The roadmap doesn't assume the tariff problem gets solved — what it does is maximize margin on what LAFA controls: operational costs, defaults, utilization."

**If battery/vehicles come up:** "CDMX is near-optimal for LFP: 15-25C year-round, 88-92% SOH after 4 years of intensive use. Project 4 in the roadmap puts monitoring on every vehicle starting month 2 — Isolation Forest for anomaly detection, degradation curves per vehicle. At 2,000 vehicles that protects MXN $60-80M in assets."

**If competition comes up:** "VEMO has the ZEE platform with ML for battery health, charging optimization, driver behavior — that's the benchmark. OCN has AI underwriting with single-digit defaults. My roadmap takes the best of both: Project 4 is a ZEE 80/20, Project 2 is credit scoring with a warm start because by month 6 we already have 5 months of real payment data. We don't need to replicate everything — just what moves the metrics."

**If NUMA comes up:** "NUMA shows I can go from zero to deployed product. But what's most relevant for LAFA is the mindset: I compared 4 tools in parallel, chose the best one, pushed to GitHub, iterated with Claude Code. That same speed + judgment is what I'd apply here — and Track A of the roadmap is exactly that: going from spreadsheets to an operating system in 8 weeks."

**If asks "why LAFA?":** "Three reasons: (1) The 0-to-1 stage is where I can have the most impact — I rebuilt InRetail from scratch with a small team, now I'd do it with AI as a force multiplier. (2) The technical challenge is exactly my profile: internal tools + AI + team of 3. (3) The mission has real substance — drivers save 75-80% on fuel, CDMX is ideal for LFP, and the ecosystem vision (charging, maintenance, tires) has vertical logic."

**If asks about the team/culture:** "The Stori network catches my attention — JJ and Levi both come from there, and that fintech experience serving the underbanked in Mexico is directly applicable to what LAFA does with gig drivers. I come from Yape, which is the same thesis in Peru. There's a clear pattern."

---

## Conversation Mental Map

```
JJ asks about you
  |-> Open with AI (NUMA demo + Yape 300K conversations/month)
       |-> Connect to LAFA: "InRetail = same challenge. Spreadsheets to
           platform with small team. Now with AI as a force multiplier."
            |-> If he digs into tech: "I built a 12-month roadmap with
                3 tracks, 16 projects. Want me to walk you through it?"
            |-> If he digs into product: prioritization decisions
                (why Track A first, why credit scoring in Mo 7-9)

JJ talks about the business
  |-> OEMs and tariffs (Q1, Q2) -> "JAC exempt, Geely = biggest gap"
  |-> Capital and runway (Q3) -> "MXN $800M in assets, tight margins"
  |-> DaE vs LTO priorities (Q6) -> "My roadmap covers both, but
      sequencing changes based on priority"
  |-> Unit economics (Q7) -> "Our estimate: -$600 to +$2K/month.
      Smart charging can add $720K-960K/month in savings"

JJ talks about the vision
  |-> Ecosystem -> "Levi mentioned charging, maintenance, tires.
      Vertical logic makes sense — build vs partner?" (Q10)
  |-> China and partnerships (Q5, Q14) -> Show you know about CKD,
      the value of local assembly, and the Geely gap
  |-> Connect: "My roadmap builds the systems to scale that —
      P0 is foundation, P4-P5 protect assets and reduce costs,
      P2 enables LTO at scale"

JJ evaluates cultural fit
  |-> Startups (FAVO early employee, JOKR $500M, Yape 10M users)
  |-> Resilience (3 rounds of layoffs at InRetail, I stayed)
  |-> Autonomy (NUMA from zero, LAFA roadmap in one week)
  |-> Stori network: "I identify with the fintech-for-underbanked thesis"
```

---

*Updated post-interview with Levi and post-research audit (Feb 6, 2026). Integrates feedback on pitch structure, mistakes to avoid, corrected research data, 12-month roadmap, and tactical adjustments for JJ.*

**Cross-references:**
- `strategy/ai-roadmap.md` — Full roadmap (3 tracks, 16 projects, architecture, stack, metrics)
- `thesis/` — VC investment thesis (01-problem through 08-risks)
- `analysis/fleet/charging-economics.md`, `analysis/fleet/tariff-analysis.md`, `analysis/fleet/battery-degradation.md` — Vehicle acquisition, operation, lifecycle
- `analysis/fintech/credit-scoring.md`, `analysis/fintech/repossession-collections.md` — Underwriting and default recovery
- `analysis/market/competitive-landscape.md` — VEMO, OCN, BYD, threats, playbook
