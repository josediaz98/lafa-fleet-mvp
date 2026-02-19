# Empowering Product Spec Examples

Real-world case studies demonstrating the 11-section framework in practice. Each example shows the contrast between empowering, too-prescriptive, and too-high-level approaches.

---

## Case Study 1: Notejoy Offline Support

> **Source:** Sachin Rekhi, Founder & CEO of Notejoy (formerly LinkedIn)
> A comprehensive example covering all 11 sections.

### 1. Opportunity

**Too High-Level:**
> "We're solving offline support because people sometimes have issues accessing the internet when they want to capture notes."

*Problem:* Team doesn't know why the feature is prioritized → can't make trade-offs.

**Too Prescriptive:**
> "Our offline scenarios we're solving for are cafes and airplanes."

*Problem:* Discourages team from identifying other relevant scenarios.

**Empowering:**

| Lens | How Offline Support Advances It |
|------|--------------------------------|
| **Strategy** | Drives upsells as premium feature (monetization); Advances sub-value prop "capture at speed of thought" |
| **Customer** | #1 requested feature in FSOR; Top cancellation reason |

**How this empowers:**
- Designer knows to design a compelling upsell experience (not just offline UX)
- Engineering knows speed improvement is worth investment (even when online)

### 2. Target Audience

**Too High-Level:**
> "An end user of Notejoy"

**Empowering:**
> "Power users who use Notejoy for personal productivity (as opposed to collaboration)"

**How this empowers:**

| Distinction | Design Decision |
|-------------|-----------------|
| Power vs. casual | Design for customizability (power users want to tailor settings) |
| Productivity vs. collaboration | Support offline starring (productivity), not offline commenting (collaboration) |

### 3. Customer Insights — Intermittent Connectivity

**Insight:** Many users wanting offline support aren't "fully offline" (airplane) but "intermittently offline" (spotty home WiFi).

| Test | Result |
|------|--------|
| Counterintuitive? | Yes — team assumed fully offline was the only scenario |
| Material? | Yes — intermittent sync requires completely different architecture |

This single insight changed the entire technical approach. Without it in the spec, engineering would have built for the wrong use case.

### 4. Competitive Insights

**Direct competitors researched:**
- Evernote: cumbersome, unintuitive manual sync
- Google Docs: baseline comparison

**Indirect inspiration researched:**
- Pocket: instant sync, background sync even when app closed
- Trello: preloads starred boards, makes everything faster both online and offline

**Differentiation identified:** Evernote failed at seamless experience → major opportunity for Notejoy to differentiate on sync quality.

**Research avenue used (Avenue 2 — Reviews):** Evernote forums had many complaints about cumbersome sync → Notejoy PM identified opportunity for seamless offline.

### 5. Success Metrics

**Typical (non-empowering):** Full list of every metric offline might move.

**Empowering:**

| Category | Metrics |
|----------|---------|
| Prioritized | D7 retention, Weekly new bookings |
| Deprioritized | Feature usage (weekly users of offline feature) |
| Guardrail | NPS |

**How this empowers:**

| Insight | Design Decision |
|---------|-----------------|
| Weekly new bookings = priority | Create compelling upsell experience; keep offline notification banner (intrusive for free users but drives upsells) |
| Feature usage = deprioritized | Don't worry about feature discoverability |
| NPS = guardrail | Ensure offline doesn't negatively impact overall experience |

### 6. Scope

**Too Prescriptive:**
> "Allow users to create new notes offline. Each new note should be immediately searchable, and immediately reference-able by other notes. Additionally, each note should say in the top-right whether it is already synced to the central server or not."

*Problem:* PM locking down micro-decisions → reduces team contribution.

**Empowering (phased):**

| Phase | Functionality |
|-------|---------------|
| **Now** | View notes offline, Edit notes offline |
| **Later** | Support offline on iOS and Android (in addition to desktop) |

### 7-8. Experience & Implementation Details

Design team owned the Experience section. PM provided goals; designer provided wireframes and micro-decisions, increasing their sense of ownership and creative contribution.

### 9. Launch Plan

Phased rollout to manage risk — not released to full audience at once.

### 10. Investigative Metrics

| Category | Question | Metric |
|----------|----------|--------|
| **Usage** | How often do users go offline? | Status changes from online to offline (frequency + duration) |
| **Functionality** | What do users want to do offline that they can't? | Attempts to view password-protected notes offline |
| **UX** | Is auto-sync frequent enough? | How often users press "Sync now" button (gauges if auto-sync frequency is sufficient) |

### 11. FAQ

**Question:** Which browsers will offline support work in?
**Decision:** Chrome, Safari, Firefox, Edge only.
**Rationale:** Internet Explorer and Opera don't fully support required browser technologies.

---

## Case Study 2: LinkedIn Sales Navigator News Feed Redesign

> **Source:** Sachin Rekhi, former Head of Product at LinkedIn

### 1. Opportunity

**Typical detail:** "We are doing a homepage news feed redesign."

**Empowering detail:** Redesign prioritized to:
1. Deepen sub-value prop of building great relationships (strategy lens)
2. Improve WAUs (business lens)

**How this empowers:** Design team considers relationship-building stories, not just high-click-rate stories. Without knowing the strategic lens, designers would default to optimizing for engagement metrics.

### 2. Target Audience

**Typical:** "All Sales Navigator users"

**Empowering:** "Primarily for account executives, but should also serve account managers too"

**Why this matters:** Sales Navigator traditionally served only account executives. Stating that the audience expands to account managers was a deliberate signal.

**Result:** Design decision to include insights on non-saved leads (an account manager need) → better AM experience. Without this specificity, the team would have continued building only for AEs.

### 3. Customer Insights — Filter Motivation

**User request:** Filter to adjust what appears on homepage.

**Insight discovered:** Users wanted a filter partly because each news feed block was large → few items per page → lots of scrolling. The filter would let them scroll less.

| Test | Result |
|------|--------|
| Counterintuitive? | Yes — team thought filters were only about relevance |
| Material? | Yes — revealed a separate problem: need to condense news feed item size |

This insight led to two parallel workstreams: adding filters AND redesigning item density.

### 5. Success Metrics

| Category | Metrics |
|----------|---------|
| Prioritized | Total actions taken from feed (inmails, likes, saves) |
| Deprioritized | Total newsfeed views |
| Guardrail | "Who viewed my profile" page views |

**How this empowers:**

| Insight | Decision |
|---------|----------|
| Actions > views | Dynamically change each item's action bar based on desired action; Score relevancy by actions, not revisits |
| Guardrail on profile views | Protect major engagement driver from degradation |

### 6. Scope

| Phase | Functionality |
|-------|---------------|
| **v1** | Filter by story type |
| **Later** | Filter by subject |

### 8. Implementation Details

| PM Decided | Engineering Decided |
|------------|---------------------|
| What factors affect items shown | Algorithm to weight each factor |
| Events triggering refresh | Optimization details |
| Refresh frequency | — |

**Why PM owned refresh frequency:** Directly affects user experience (how stale the feed feels). Algorithm weighting does not — it's an implementation detail.

### 9. Launch Plan

| Phase | Description |
|-------|-------------|
| 1. A/B Test | 25%/75% split to measure metric improvement |
| 2. Admin Training | Brief company admins on changes (unique need based on past complaints about surprise UI changes) |
| 3. 100% Launch | Release to everyone |

### 11. FAQ — Filters Debate

**Debate:** Should the news feed have filters? Some argued filters = complicated UX; others said filters = better UX.

**Decision:** Include filters.

**Without FAQ:** Ongoing questions require re-explaining conversations and how the executive team approved.

**With FAQ:** Point to documented rationale; limit repetition. Saved dozens of hours of repeated meetings.

---

## Case Study 3: TripAdvisor Mobile Navigation Redesign

> **Source:** Ravi Mehta, former Chief Product Officer at Tinder (previously at TripAdvisor)

### 1. Opportunity — The Lens Matters

| If prioritized for... | Navigation would focus on... |
|----------------------|------------------------------|
| Revenue (business lens) | Shopping categories (flights, hotels) |
| Trip planning (strategy lens) | Functional tasks (Search, My Trips) |

**Actual priority:** Strategy lens — best trip planning app for pre-travel and in-destination use.

**Result:** Navigation built around functional tasks, not shopping. Without stating the lens, the team could have reasonably gone either direction — and would have built a fundamentally different product.

### 7. Experience — Wireframes vs. Text

**Text-only problem:** "Excel throughout the travel lifecycle" could mean:
- Easy booking platform for tours
- Lots of reviews to help decisions
- Comprehensive trip planning tools

Each interpretation leads to different designs. Text alone is ambiguous.

**Solution:** Annotated low-fidelity wireframes → team directly aligned on feel of UX. Design owned micro-decisions as fidelity increased. The wireframes eliminated ambiguity that pages of text couldn't resolve.

### 9. Launch Plan — Regional Rollout

**Risk mitigated:** Release to Latin America first → catch major design flaws → fix before releasing to rest of world.

This approach limited blast radius while still getting real-world feedback. Latin America was chosen because it had sufficient traffic for meaningful data but lower business risk if issues emerged.

---

## Key Quotes

> "Great PMs direct their product, not manage it. They empower their team to make decisions, instead of dictating each decision."
> — Fareed Mosavat, former Director of Product at Slack, former Technical Director at Pixar

> "A designer who is given exact details on what to implement will likely implement exactly what you said, no more, no less."
> — Ravi Mehta, former Chief Product Officer at Tinder

> "Having design be the sole writer and illustrator for Experience helps creates a greater feeling of ownership, leading to more input from them."
> — Sachin Rekhi, Founder & CEO of Notejoy

> "As we advance as product leaders, our instincts drive us towards more specificity, more prescriptiveness, but the opposite is what you need to do."
> — Fareed Mosavat

---

## Anti-Patterns and Failure Modes

### Anti-Pattern 1: The "Puppet Master" Spec
**Symptom:** Every edge case documented. Exact user flows dictated. Designer implements exactly what PM wrote — nothing more, nothing less.
**Root cause:** PM conflates thoroughness with value. Being prescriptive feels productive but actively disempowers the team.
**Fix:** Move detail from Implementation to Context. More "why" context, less "how" prescription.

### Anti-Pattern 2: The "Absentee" Spec
**Symptom:** One-page list of requirements. No context on why. Rarely updated. Team schedules constant clarification meetings.
**Root cause:** PM assumes the team shares their mental model. They don't.
**Fix:** Invest in the 5 Context sections. The time "saved" by writing a thin spec is repaid 3x in ad hoc meetings.

### Anti-Pattern 3: The Unprioritized Metrics List
**Symptom:** Success Metrics section lists every metric the feature might move. No categorization.
**Root cause:** PM afraid to commit to priorities, or hasn't thought through trade-offs.
**Fix:** Force-rank into Prioritized / Deprioritized / Guardrail. If you can't deprioritize anything, you haven't made real choices.

### Anti-Pattern 4: General Audience Statement
**Symptom:** Target Audience says "our users" or "all customers."
**Root cause:** PM hasn't narrowed scope or is trying to serve everyone.
**Fix:** Name the specific sub-audience. If the feature truly serves everyone, explain which segment's needs shaped the implementation choices.

### Anti-Pattern 5: PM-Owned Experience Section
**Symptom:** PM writes detailed Experience section with specific UI layouts. Designer becomes a pixel-pusher.
**Root cause:** PM has strong design instincts and doesn't trust the designer, or hasn't established ownership norms.
**Fix:** PM states design goals only. Designer owns wireframes and micro-decisions. Ownership creates investment.

### Anti-Pattern 6: No FAQ Section
**Symptom:** Stakeholders repeatedly ask the same questions. PM spends hours in meetings re-explaining decisions.
**Root cause:** Decisions made in meetings aren't documented.
**Fix:** After every contentious decision, add it to the FAQ immediately. The 5 minutes spent documenting saves hours of repeated defense.

### Anti-Pattern 7: No Investigative Metrics
**Symptom:** Feature launches. Team wants to iterate but has no data. Engineering says adding instrumentation retroactively is expensive.
**Root cause:** PM didn't think about post-launch decisions during spec phase.
**Fix:** For each feature area, ask "What question will I want to answer in 3 months?" and instrument accordingly.
