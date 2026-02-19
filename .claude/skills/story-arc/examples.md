# Story Arc: Real-World Case Studies

Examples demonstrating the PRAA persuasive story framework in practice. Each case study illustrates specific concepts with real companies and PM scenarios.

---

## BILL Design System — Strategy Archetype with Dual-Track PRAA

### Concept Illustrated: How dual-track Problem/Result creates a story that serves both customer and business

**Context:** BILL (formerly Bill.com) had grown through acquisitions, resulting in multiple products with inconsistent UI patterns. The design system team needed to make the case for investment in a unified design language.

**Archetype:** Strategy — aligning people around a new direction for the product experience.

**Main character:** A small business accountant named Sarah who uses three BILL products daily.

### PRAA Breakdown

| Component | Customer Track | Business Track |
|-----------|---------------|----------------|
| **Problem** | Sarah switches between BILL products and each one looks, feels, and navigates differently. She wastes 15 minutes/day relearning patterns. Buttons are in different places. Terminology changes between products. She feels like she's using three different companies. | Each product team reinvents UI components from scratch. Design reviews reveal the same problems repeatedly. Engineering spends ~20% of sprint capacity building components that already exist in other products. New features ship 30% slower due to design debt. |
| **Result** | Sarah moves between BILL products seamlessly. Common actions feel familiar regardless of which product she's in. Her cognitive load drops because she only needs to learn patterns once. | A shared component library reduces design-to-ship time by 40%. Cross-product features become feasible because they can be built once. Design quality becomes consistent, improving NPS across the portfolio. |

**Action:** Three-phase approach: (1) Audit existing components across all products, (2) Build shared library with the 20 most-used components, (3) Migrate products incrementally starting with the highest-traffic screens.

**Ask:** Dedicated design system team — 2 designers + 2 engineers for 12 months, with each product team committing 10% capacity to migration.

### Why This Story Worked

The dual-track structure prevented the most common design system pitch failure: framing it as a developer-only efficiency play. By leading with Sarah's experience, the story passed Gate 1 (customer interest) in a way that a purely internal-efficiency argument would not. The business track provided the ROI that satisfied Gate 3 (feasibility through clear resource math).

---

## PandaDoc OKR Process — Process Archetype with Context Timing

### Concept Illustrated: How the Context Matrix shapes story framing and how Process stories make internal pain visceral

**Context:** PandaDoc was scaling rapidly but teams were misaligned on priorities. The PM leading the initiative needed to convince leadership to adopt an OKR framework — a process change that would affect every team.

**Archetype:** Process — changing the way people set and track goals.

**Main character:** A team lead named Alex who manages a cross-functional pod.

### Context Assessment

| Dimension | State | Story Implication |
|-----------|-------|-------------------|
| Business Success | Exceeding budget (strong growth) | Leadership open to structural improvements |
| Lifecycle | Scaling stage | Organization feeling growing pains — perfect for process stories |
| Market | Moderate competition | Not under immediate threat — space for internal investment |
| Financial | Healthy | Can absorb the cost of process change (workshops, training) |
| Team Trust | Medium | Some skepticism about "another process" — need to build credibility |

### PRAA Breakdown

**Problem (Customer):** Alex runs a weekly standup where his 8-person pod reports progress. But each person defines "progress" differently. The designer measures screens completed. The engineer measures PRs merged. The analyst measures dashboards shipped. Nobody can tell Alex whether they're collectively on track for the quarterly goal — because there is no shared definition of success.

**Problem (Business):** Three teams independently built features that overlapped, wasting an estimated $200K in engineering time last quarter. Leadership reviews produce no actionable decisions because there's no shared framework for evaluating whether a team is on track.

**Result (Customer):** Alex's pod has three measurable objectives for the quarter. In standup, every update connects to a key result. When priorities conflict, the OKR hierarchy resolves the debate without escalation.

**Result (Business):** Leadership reviews become decision-making sessions. Each team presents progress against shared key results. Overlapping work is caught during quarterly planning, not after shipping.

**Action:** Pilot OKR process with 3 volunteer teams for one quarter. Provide coaching and templates. Evaluate adoption and impact before company-wide rollout.

**Ask:** Cross-functional commitment to the pilot: 3 team leads volunteer, plus 2 hours/week of the VP Product's time for coaching during the pilot quarter.

### Why This Story Worked

The medium-trust environment dictated the story's calibration. A sweeping "let's OKR the entire company" pitch would have failed. Instead, the story proposed a low-risk pilot (matching the context), used Alex's specific standup scenario to make the problem tangible (Emotional + Tangible pillars), and connected to the $200K overlap waste to make it believable (Believable pillar). The phased approach matched the team trust dimension.

---

## GoDaddy Partners Experience — Strategy Archetype with High-Fidelity Evidence

### Concept Illustrated: How evidence fidelity should match story stakes, and how PRAA maps to all three validation gates

**Context:** GoDaddy's web professional partners (designers, developers, agencies) used fragmented tools. The PM team proposed a unified partners platform — a major strategic bet requiring significant investment.

**Archetype:** Strategy — aligning around a new product direction for channel partners.

**Main character:** Jamie, a freelance web designer who manages 30 client websites through GoDaddy.

### Validation Gate Mapping

| Gate | Evidence Used | How PRAA Addressed It |
|------|-------------|----------------------|
| **Gate 1: Interest** | Partner churn data + partner satisfaction survey showing 40% cite "tool fragmentation" as top frustration | Problem section: Jamie's daily workflow switching between 5 separate dashboards |
| **Gate 2: Alignment** | Connected to GoDaddy's strategic priority of growing partner-sourced revenue from 20% to 35% | Result section: Unified hub increases partner retention → more client referrals → partner revenue growth |
| **Gate 3: Feasibility** | High-fidelity vision video produced with design + video teams, showing the complete unified experience | Action section: Phased build starting with the 3 most-used partner tools |

### Evidence Fidelity Decision

This story warranted *high* fidelity evidence because:
- The investment ask was large (dedicated team for 18+ months)
- Multiple leadership stakeholders needed to align
- The partner channel was a new strategic priority with no prior unified investment

The team invested weeks in producing a vision video, MaxDiff study on partner feature priorities, and detailed competitive analysis of partner platforms from Wix and Squarespace.

**Contrast:** For an earlier, lower-stakes story about improving the onboarding flow, the same PM used a single low-fidelity slide (< 30 minutes to create) showing a before/after/competitor comparison. Same PRAA structure, different evidence investment.

---

## Shopify Fulfillment Network — Budget Archetype with ROI-First Framing

### Concept Illustrated: How Budget stories lead with the business track and use financial models as the primary evidence type

**Context:** A logistics PM at Shopify needed to pitch consolidating three third-party fulfillment vendors into one preferred partner, saving costs but requiring a migration investment.

**Archetype:** Budget — aligning around a change in spending.

**Main character:** Operations Manager Priya, who manages vendor relationships.

### PRAA Breakdown

**Problem (Customer/Internal):** Priya spends 12 hours/week managing three separate vendor dashboards, reconciling shipping costs across different rate structures, and resolving discrepancies between vendor invoices and actual shipments. When a merchant reports a missing package, she checks three systems before finding it.

**Problem (Business):** The three-vendor setup costs $2.4M/year. Volume discounts are diluted across vendors — each sees Shopify as a medium-volume client rather than a large one. Vendor management overhead is equivalent to 1.5 FTEs.

**Result (Customer/Internal):** Priya works with one vendor, one dashboard, one rate card. Package tracking is a single lookup. Invoice reconciliation is automated.

**Result (Business):** Consolidated volume with one preferred vendor yields 18% rate reduction = $430K/year savings. Vendor management FTE reduction = $180K/year. Total annual savings: $610K against a one-time migration cost of $200K. Payback period: 4 months.

**Action:** 6-week migration: (1) Negotiate preferred vendor contract, (2) Build integration, (3) Migrate merchants in cohorts of 1,000.

**Ask:** $200K migration budget + 1 engineer for 6 weeks + merchant communications support from marketing.

### Why This Story Worked

Budget stories live and die on financial clarity. The story led with specific dollar amounts at every stage — current cost, savings breakdown, payback period, migration cost. But it avoided the "pure spreadsheet" anti-pattern by keeping Priya's 12-hour weekly pain front and center. The human cost made the financial case emotionally resonant.

---

## Notion AI Adoption — Adoption Archetype Connecting Usage to Business Metrics

### Concept Illustrated: How Adoption stories must correlate usage metrics with business outcomes, not just report engagement

**Context:** After launching AI features, Notion's PM team needed to justify continued investment by showing that AI adoption was driving the metrics leadership cared about — not just that people were using it.

**Archetype:** Adoption — getting users to actively use AI features.

**Main character:** Carlos, a product team lead who manages his team's documentation in Notion.

### PRAA Breakdown

**Problem (Customer):** Carlos's team creates 40+ documents per week — meeting notes, specs, retrospectives. Writing these takes 6-8 hours/week of collective team time. Team members copy-paste templates and manually fill in sections, often inconsistently.

**Problem (Business):** AI feature awareness is at 60% but weekly active usage is only 12%. Users try it once and don't return. Without sustained adoption, the AI investment ($XM in model costs) can't be justified at renewal time — churning enterprise accounts cite "we don't use the AI features" as a reason to downgrade.

**Result (Customer):** Carlos's team uses AI-assisted drafting for 80% of documents. Meeting notes are auto-generated from recordings. Spec templates auto-populate based on linked tickets. Document creation time drops from 6-8 hours to 2-3 hours/week.

**Result (Business):** AI weekly active usage reaches 35% (from 12%). Enterprise accounts with high AI adoption show 23% higher retention than those without. AI becomes a retention driver, not a cost center.

**Action:** Three-prong adoption strategy: (1) Contextual prompts that suggest AI assistance at the moment of creation, (2) Team-level AI usage dashboards that show time saved, (3) Template marketplace with AI-enhanced templates for common workflows.

**Ask:** Dedicated adoption squad (1 PM, 1 designer, 2 engineers) for one quarter, plus data science support to validate the retention correlation.

### Why This Story Worked

The critical move was the correlation analysis connecting AI adoption to retention. Without it, the story would have been "people use it more" — a vanity metric. By correlating usage → retention → revenue impact, the business track became compelling. The 12% → 35% adoption goal was calibrated (not "100% adoption") to feel achievable, strengthening the Believable pillar.

---

## Anti-Pattern: The Feature Pitch That Skipped Problem

### Concept Illustrated: What happens when you jump to Action without establishing Problem and Result

**Context:** A PM at a mid-stage SaaS company wanted to build a Slack integration for their project management tool. They created a detailed spec and presented it to leadership.

### What Went Wrong

The PM's presentation:
1. "Here's what our Slack integration would do" (features, screenshots, architecture)
2. "Here's the timeline" (6 weeks, 2 engineers)
3. "Can we build it?"

**Missing:** Why customers need it, what business outcome it drives, and how it connects to strategy.

### The PRAA Diagnostic

| PRAA Component | Present? | What Was Missing |
|----------------|----------|-----------------|
| Problem | No | No customer pain, no business gap |
| Result | No | No desired outcome, no strategic connection |
| Action | Yes (over-developed) | 3 pages of specs and architecture |
| Ask | Partial | "Can we build it?" — but no resource specificity |

### What Leadership Heard

"The PM wants to build something cool." Leadership couldn't evaluate whether to say yes because they had no basis for judging *why*. The PM had skipped directly to feasibility (Gate 3) without addressing interest (Gate 1) or alignment (Gate 2).

### The Fix

Restructured as PRAA:
- **Problem:** 40% of support tickets cite "I didn't see the notification in time." Project updates live in the tool but team members live in Slack. Average response time to project updates is 18 hours.
- **Result:** Response time drops to < 2 hours. Support tickets related to missed notifications drop by 60%. Customer activation improves because Slack becomes a distribution channel for product value.
- **Action:** Same spec, but now it has a *purpose*.
- **Ask:** 2 engineers for 6 weeks, with a pilot rollout to 50 enterprise accounts.

---

## Pattern Summary

| Case Study | Archetype | Key Lesson |
|-----------|-----------|-----------|
| BILL Design System | Strategy | Dual-track PRAA prevents framing a company-wide investment as a developer-only play |
| PandaDoc OKR | Process | Context Matrix shapes story calibration — pilot in medium-trust, scale in high-trust |
| GoDaddy Partners | Strategy | Evidence fidelity must match investment size — high stakes = high fidelity |
| Shopify Fulfillment | Budget | Lead with specific dollars but keep the human cost visible for emotional resonance |
| Notion AI Adoption | Adoption | Correlate usage to business metrics — adoption without business impact is a vanity metric |
| The Feature Pitch (anti-pattern) | N/A | Skipping Problem and Result produces an unanchored Action that leadership can't evaluate |
