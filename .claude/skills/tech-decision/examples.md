# Technical Decision Case Studies

Real-world examples of technical decisions organized by type. Each case shows the decision context, analysis framework applied, and outcome. Use these as reference when building your own TDR.

---

## Build vs Buy

### Dropbox Cloud Infrastructure — BUILD

**Context:** Dropbox needed to decide whether to continue using third-party cloud storage or build proprietary infrastructure for their exabyte-scale storage needs.

**Analysis:**
- **Strategic Value:** HIGH — Data storage IS the core business. Every byte stored and synced is directly tied to the product's value proposition
- **Available Resources:** HIGH — Deep infrastructure expertise is a core competency
- **Cost:** High vendor costs at their scale, but also high build costs
- **Vendor Reliability:** Good (AWS), but dependency risk at their volume

**Decision:** BUILD — Starting 2013, Dropbox built exabyte-scale proprietary storage infrastructure.

**Why:** Storage is a Differentiator, not an MMR. Their competitive advantage depends on doing this better than anyone else. The cost of vendor dependency at exabyte scale would have been astronomical.

**Lesson:** When the capability IS the product, build it — regardless of how good the vendor alternative is.

---

### H&R Block Cloud Infrastructure — BUY

**Context:** H&R Block considered whether to build or buy cloud infrastructure for their tax preparation platform.

**Analysis:**
- **Strategic Value:** LOW — Tax filing is the core business, not infrastructure
- **Available Resources:** LOW — Team is dedicated to expanding tax-related use cases, not infrastructure
- **Cost:** Vendor cost is significant but manageable
- **Vendor Reliability:** HIGH — Established cloud providers with proven track records

**Decision:** BUY — Use cloud vendor infrastructure despite the cost.

**Why:** Cloud infrastructure is an MMR for H&R Block. The engineering team's time is infinitely better spent improving tax filing features than managing servers.

**Lesson:** Same capability (cloud infrastructure), different strategic context → opposite decision. The scorecard works.

---

### Wise Identity Verification — BUY

**Context:** Wise (formerly TransferWise) needed identity verification for regulatory compliance in their money transfer product.

**Analysis:**
- **Strategic Value:** LOW — Identity verification is needed to operate, but it's not how Wise makes money or differentiates
- **Available Resources:** Better spent on core value props (price, speed, convenience, security)
- **Vendor Reliability:** Multiple established providers exist (Jumio, ID.me, etc.)

**Decision:** BUY — Replaced manual in-person verification with a digital vendor solution.

**Why:** Identity verification is an MMR. Building it in-house would divert resources from the four customer principles (price, speed, convenience, security) without improving any of them.

**Bonus Impact:** Switching to digital verification eliminated the highest-friction step in onboarding, increasing conversion across all acquisition channels.

---

### Facebook Ad Targeting — BUILD

**Context:** Facebook needed to decide how to build their ad targeting system — the mechanism that determines which ads are shown to which users.

**Analysis:**
- **Strategic Value:** HIGHEST — Ad targeting is the core of the revenue model. The entire business depends on showing relevant ads
- **Available Resources:** HIGH — World-class ML engineering team
- **Vendor Reliability:** No vendor could provide the quality needed for their scale and data

**Decision:** BUILD — Massive ongoing investment in proprietary ad targeting algorithms.

**Why:** This is the ultimate Differentiator. Buying ad targeting for Facebook would be like Dropbox buying storage — you'd be outsourcing the thing that makes you money.

---

## Architecture

### Facebook Mobile Pivot (2011-2012)

**Context:** Facebook's mobile apps were built in HTML5 — fine for web pages, terrible for native app experiences. Apps were buggy, slow, and crash-prone. Mobile usage was exploding, and competitors (Instagram, Snapchat) were building mobile-first.

**Decision Trigger:** Existential risk — users were migrating to mobile and Facebook's experience was unacceptable.

**Analysis:**
- **Portfolio Classification:** Scale Work that became Risk Work — delayed so long it threatened the business
- **Goldilocks Assessment:** TOO LATE — Should have invested earlier

**Decision:** Complete company pivot to mobile-first. Zuckerberg's rule: if an employee presented a new product without showing the mobile version first, the meeting was ended.

**Outcome:** Closed the experience gap. Had they delayed further, mobile-first competitors would have captured their users permanently.

**Lesson:** Scale work that seems deferrable can become existential if delayed too long. The indicators were visible (buggy HTML5 apps) but competing priorities obscured the urgency.

---

### Spotify Mobile Streaming (2014-2015)

**Context:** Spotify faced Apple and Google entering the streaming market. Product strategy was mobile-first. Challenge: streaming music over spotty cellular connections.

**Analysis:**
- **Strategy Stack:** Mission (artists live off their art) → Company Strategy (listen across all devices) → Product Strategy (best mobile experience) → Technical Strategy (encoding, buffering, caching for mobile)
- **Innovation Spectrum:** Innovative but strategically justified — mobile streaming quality IS competitive differentiation

**Decision:** Heavy investment in encoding, buffering, and caching infrastructure for resilient mobile streaming.

**Outcome:** Durable competitive moat. Competitors required users to download songs in advance; Spotify eliminated that friction entirely. The technical investment didn't just serve the current product roadmap — it reshaped what was competitively possible.

**Lesson:** This is "what else is possible?" in action. The technical strategy created a capability that product strategy alone couldn't have imagined.

---

### Canvas vs Blackboard

**Context:** Blackboard dominated the Learning Management System (LMS) market for 20 years. Canvas entered with faster iteration and focus on features faculty and students actually used.

**Decision:** Canvas chose speed and iteration over comprehensive feature sets.

**Outcome:** Canvas overtook a 20-year incumbent. Blackboard acknowledged their cloud-based response "took longer than we anticipated."

**Lesson:** Speed of iteration beats quality of iteration. Canvas had more deployment cycles, more feedback loops, and more data points about what actually mattered to users.

---

### Hailo vs Uber

**Context:** Hailo had early advantages in ride-hailing (relationships with cab drivers). Decided to pause growth for an 18-month platform re-architecture.

**Decision:** Prioritize architectural purity over market speed.

**Outcome:** During the 18-month rebuild, Uber moved faster and scrappier. After six years, Hailo was acquired and killed.

**Lesson:** Architecture purity is worthless if you lose the market. Speed is a strategic advantage — you can refactor later if you win. You can't refactor at all if you're dead.

---

## Scale Work

### Credit Karma Page Load Experiment

**Context:** Credit Karma's team wanted to prioritize mobile web performance improvements but couldn't make the business case. Page load time's impact on revenue was unclear.

**Analysis:**
- **Threshold challenge:** No agreed threshold for page load time
- **Translation gap:** Couldn't connect "faster pages" to business metrics

**Experiment:** Intentionally slowed mobile page load time by 2 seconds using a "wait" call. Measured impact on logins and revenue.

**Result:** Demonstrated that page load time had substantial impact on logins and revenue. A 2-second improvement would yield roughly equivalent gains.

**Outcome:** Simultaneously set a new threshold for page load time AND connected it to North Star metrics. The initiative was prioritized immediately.

**Lesson:** When you can't make the business case for scale work, design a small experiment that demonstrates impact. Minimal cost, credible data, actionable result. This is Sense Check Math at its finest.

---

### Skyscanner Deployment Transformation

**Context:** Skyscanner deployed code 2 times per quarter — massive, risky releases.

**Decision:** Invest systematically in deployment infrastructure over 5 years.

**Outcome:** Went from 2 deployments per quarter to 3,000+ per day. Original goal was 10,000 per day.

**Lesson:** Elite delivery performance is achievable but requires sustained investment. Deploy 200× more frequently, recover 2,000× faster, with lower change failure rates.

---

### Twitter Fail Whale

**Context:** Twitter's early architecture couldn't handle growing traffic, resulting in frequent outages symbolized by the iconic "Fail Whale" error image.

**Analysis:**
- **Goldilocks Assessment:** TOO LATE — Scale work was chronically deferred in favor of feature development
- **Portfolio:** Should have been classified as Risk Work (operational risk) much earlier

**Outcome:** The Fail Whale became an iconic symbol of infrastructure failure. Retired in 2013, coinciding with Twitter finally investing in scaling.

**Lesson:** Deferred scale work doesn't stay invisible — it becomes your brand. When your infrastructure failures have a mascot, you've waited too long.

---

## Risk Work

### Equifax Breach (2017)

**Context:** A widely known vulnerability existed in Equifax's systems. A patch was available and documented. Equifax failed to apply it in time.

**Analysis:**
- **Risk Type:** Security — Binary outcome
- **Likelihood:** The vulnerability was known and documented
- **Impact:** 147 million people's personally identifying data stolen

**Decision Failure:** Equifax deprioritized the patch. This wasn't a technical failure — it was a prioritization failure.

**Outcome:** Catastrophic brand damage, regulatory penalties, executive departures. The patch was known, the fix was available. The failure was purely one of risk work deprioritization.

**Lesson:** For Binary risk outcomes, the calculation is simple: if the downside is unaffordable, mitigate immediately — regardless of probability. Equifax had the information and the fix. They just didn't prioritize it.

---

### One Medical Data Security

**Context:** One Medical, a membership-based healthcare company, depends on customer trust as a core element of its strategy. A data breach would directly undermine their positioning.

**Analysis:**
- **Risk Type:** Security + Regulatory (HIPAA) — Binary outcome
- **Strategy Connection:** Data security isn't just an IT concern — it IS the strategy. Trust-based positioning means a breach attacks the value proposition directly

**Decision:** Data storage security treated as a strategic imperative, not just technical hygiene.

**Lesson:** When your competitive advantage is trust, security risk work is indistinguishable from product work. The portfolio classification matters — this isn't "tech debt," it's business-critical investment.

---

### Wise Vendor Risk

**Context:** Wise had a single US vendor dependency for a critical part of their transfer pipeline.

**Analysis:**
- **Risk Type:** Operational — Sliding Scale
- **Sense Check Math:** Calculated transaction volume flowing through the single vendor. If the vendor went down, X% of US transactions would fail, affecting Y revenue per hour

**Decision:** Diversified vendor dependency after quantifying the risk in business terms.

**Lesson:** Use Sense Check Math to translate vendor dependency risk into language that gets prioritized. "Single point of failure" is vague. "$X per hour of downtime" gets on the roadmap.

---

## AI Deployment

### Credit Karma Propensity-to-Buy

**Context:** Credit Karma needed to improve ad targeting — showing users financial products they were likely to apply for.

**Analysis (7-Step Framework):**
1. **User problem:** Users see irrelevant financial product ads
2. **Baseline:** Rule-based targeting (demographics, credit score ranges)
3. **AI unlock:** ML models can identify subtle behavioral patterns that predict application likelihood
4. **Metrics:** Response rate (recall-biased — better to show a relevant ad that's ignored than miss a match)
5. **Hallucination risk:** Low — the output is a score, not generated text
6. **Cost:** Moderate inference costs offset by dramatically higher ad revenue
7. **Iteration:** Continuously refined with new user behavior data

**Outcome:** Double-digit response rate improvement. ML-driven targeting significantly outperformed rule-based approach.

**Lesson:** AI excels when you have abundant behavioral data and the output is a prediction/score rather than generated text. Low hallucination risk + high data volume = strong AI use case.

---

### Atlassian Product Qualified Lead (PQL) Scoring

**Context:** Atlassian needed to identify which free-tier users were most likely to convert to paid plans, to focus sales team effort efficiently.

**Analysis:**
- **Optimization Hierarchy position:** Level 2-3 — Started with simple correlation analysis, evolved to ML
- **Baseline:** Random outreach to free users
- **AI unlock:** Behavioral signals (feature usage patterns, team size, integration activity) predict conversion probability

**Outcome:** 12-21% of revenue spent on customer acquisition vs. industry median of 50-100%. Sales team focused effort on highest-probability leads instead of spray-and-pray.

**Lesson:** AI for lead scoring is one of the highest-ROI applications because the baseline (random/manual) is so inefficient. Even simple models dramatically improve targeting.

---

### TripAdvisor SEO Content Generation

**Context:** TripAdvisor wanted to generate SEO pages for niche search terms discovered in user reviews (e.g., "charming hotels in Boston").

**Analysis:**
- **AI unlock:** ML-derived niche terms from review text → programmatic page generation
- **Innovation Spectrum:** Moderately innovative — novel application of NLP to content strategy
- **Content loop impact:** Alleviated the content volume constraint in their content acquisition loop

**Outcome:** Major new content SEO strategy enabled by NLP. Opened a new acquisition loop that manual content creation couldn't have achieved at scale.

**Lesson:** AI can enable entirely new growth loops, not just optimize existing ones. The highest-impact AI deployments often create new capabilities rather than incrementing existing metrics.

---

## Guiding Principles

### Wise: Price, Speed, Convenience, Security

**Context:** Wise needed a framework that would align decisions across hundreds of engineers making dozens of daily choices.

**Principles established:** Four customer principles derived from the value proposition:
1. **Price** — Move money cheaply
2. **Speed** — Move money quickly
3. **Convenience** — Move money easily
4. **Security** — Move money safely

**Application:** "Every engineering team should be able to stand up in front of the entire company and explain how their work impacts one of these factors."

**Principle Conflict Example:** When migrating to cloud, cost (price) and reliability (convenience) came into tension. Cloud would improve uptime but increase customer costs. Resolution: chose convenience, messaging the cost increase as investment in better service — viable because the increase didn't exceed customer willingness to pay.

**Lesson:** Customer principles enable and constrain simultaneously. They tell teams what matters (enabling investment in speed improvements) and what doesn't matter right now (deprioritizing cryptocurrency features that don't serve the four principles).

---

### Facebook Motto Evolution

**Context:** Facebook's development principles evolved through three stages as the company matured:

| Stage | Motto | Context |
|-------|-------|---------|
| Startup | "Move Fast and Break Things" | Grabbing market share, speed > stability |
| Growth | "Move Fast and Break Things, But Not Privacy" | Scale created new risks around user data |
| Maturity | "Move Fast on Stable Infrastructure" | Billions of users — breaking things for everyone is unacceptable |

**Lesson:** Principles SHOULD change as context changes. What works for a startup is dangerous at scale. The trigger for changing a principle isn't that the old one was wrong — it's that the company's situation has fundamentally shifted. Four triggers for changing a principle: product portfolio expansion, customer behavior shift, company maturity, financial reality.

---

### Amazon S3 Language Selection

**Context:** Amazon's S3 team chose between a more capable programming language and a more widely known one for building their object storage service.

**Analysis:**
- **Development principle applied:** Responsible Maintenance — choose technologies that are viable, scalable, and sustainable
- **Trade-off:** Short-term capability (more complex operations possible) vs long-term maintainability (wider pool of developers can maintain it)

**Decision:** Chose the more widely known language.

**Why:** Long-term maintainability by a wide population of developers trumped short-term capability. The service would need to be maintained for years by rotating teams.

**Lesson:** Responsible Maintenance as a principle means choosing boring, well-supported technologies over exciting, powerful ones — unless the exciting technology is a Differentiator for your strategy.

---

## Anti-Patterns

### Homejoy — "Fastest Growing Company"

**Context:** Paul Graham called Homejoy "the fastest growing company" he'd ever funded. They raised $38M.

**Outcome:** Shut down 18 months after their massive funding round.

**Root cause:** Retention failure. Explosive top-line growth masked a leaky bucket — users weren't coming back. All investment went to acquisition (product work) with no investment in retention (scale/risk work).

**Lesson:** Portfolio imbalance kills. Growth without retention is a leaky bucket — eventually the bucket runs dry. The Technical Strategy Portfolio framework would have flagged this: 100% product work, 0% scale work maintaining user experience quality.

---

### Engineer Build Bias

**Pattern:** Engineers systematically prefer building over buying, even when buying is clearly the strategic choice.

**Root cause:** Building is what engineers are trained to do and rewarded for. Buying feels like admitting defeat. The identity of "builder" conflicts with the strategic choice to "use someone else's solution."

**The quote that captures it:**
> "After 20 years of trying to build everything, I realized that I should have advocated buying way more often. I could have gotten so much more done with the same amount of time."

**Lesson:** The Build vs Buy Scorecard exists to override this bias with structured analysis. When the scorecard says "buy," trust the scorecard — not the instinct.

---

### Google Wave — Technology Without Need

**Context:** Google Wave was a technically impressive real-time collaboration platform. It showcased novel technology (Operational Transform for real-time editing) but struggled to articulate what user problem it solved.

**Analysis:**
- **7-Step AI Framework parallel:** Skipped Step 1 (define the user problem) and Step 2 (establish baseline)
- **Strategy Stack:** No clear connection between the technology and company strategy or user need

**Outcome:** Launched to fanfare, shut down quickly. Users couldn't figure out what to use it for.

**Lesson:** Technical novelty without a user problem is a demo, not a product. This applies equally to AI deployment — "we have this cool model" is not a product strategy.
