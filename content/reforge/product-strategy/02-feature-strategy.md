# Feature Strategy: Collected Insights
> Reforge Program | Evaluating, Enhancing, and Developing Features

## Sources

| Source | Type | Creators |
|--------|------|----------|
| Reforge: Feature Strategy Module | Course Module | Casey Winters (CPO Eventbrite), Fareed Mosavat (EIR Reforge) |

---

## Executive Summary

Feature Strategy is the first of four product strategy levers (alongside Growth, PMF Expansion, and Scaling). It focuses on enhancing the existing value proposition by adding incremental value or extending value to marginal users. The critical insight: products are bundles of features, and great products can hide poor features while struggling products can hide great features.

Product leaders make two key shifts in feature responsibility: from managing individual features to overseeing entire bundles, and from launching features to guiding their success over time. The common mistake is conflating feature strategy with product strategy—leading to failure to evaluate individual feature performance and overestimating new features while underestimating existing ones.

The TARS framework (Target, Adopted, Retained, Satisfied) provides a systematic approach to evaluating features. Unlike product-level KPIs (acquisition, retention, monetization), features require feature-level metrics because their contribution to product KPIs is often indirect. The goal is Feature Product Fit: when features meaningfully contribute to a product's ability to create or capture value.

---

## 1. Feature vs. Product Distinction

### Definitions

| Term | Definition | Example |
|------|------------|---------|
| **Feature** | Discrete pieces of product value that contribute to a product's core use case | Slack emoji reactions, Uber GPS tracking |
| **Product** | Bundle of features that work together to address a specific use case | Slack (messaging for knowledge workers), Uber X (A to B transportation) |

### The Blurry Line

The same functionality can be a feature or product depending on context:

| Functionality | As Feature | As Product |
|---------------|------------|------------|
| Video calls | Slack video calls (contributes to messaging) | Skype (video is the core use case) |
| Messaging | Zoom chat (supports video conferences) | WhatsApp (messaging is the core use case) |

### Product Market Fit Treadmill

The minimum threshold for PMF isn't constant—it increases over time due to rising customer expectations.

```
Peak Customer Value (green line - ceiling with diminishing returns)
        ↑
        |     ████████████████  ← Product Value (aim here)
        |   ██████████████████
        | ████████████████████
        ├─────────────────────── PMF Threshold (rising over time)
        |
        └────────────────────────→ Time
```

**Implication:** After initial PMF, features must be continually enhanced and added to stay ahead of expectations.

### Three Ways to Enhance Feature Bundles

1. **Add new features** — Uber scheduling rides for later
2. **Enhance existing features** — Uber adding driver profiles, anonymized phone numbers
3. **Kill underperforming features** — Uber removing surge pricing multiplier

---

## 2. Feature Product Fit

### Definition

> Feature Product Fit is when features meaningfully contribute to a product's ability to create or capture value.

### Value Creation & Capture Mechanisms

Features contribute to product value through three channels:

#### Acquisition
| Example | Mechanism |
|---------|-----------|
| Robinhood free stock referrals | Viral acquisition through incentives |
| Airtable sharing | Free tier growth through collaboration |
| Quora upvotes | SEO signal for content ranking |

#### Retention
| Example | Mechanism |
|---------|-----------|
| HubSpot email tracking | Adds value + notifications draw users back |
| Netflix Skip Intro / Autoplay | Increases engagement, reduces friction |

#### Monetization
| Example | Mechanism |
|---------|-----------|
| Spotify offline downloads | Premium-only feature drives conversions |
| Eventbrite team management | Premium tier feature drives upgrades |

### The Net Effect Principle

Feature Product Fit isn't about a feature's single metric—it's about net effect on overall product value.

A feature could increase monetization but decrease retention. If net effect is negative → no Feature Product Fit.

> "As a product leader, you no longer focus on one or two features, but rather have oversight over a bundle of several features."
> — Fareed Mosavat

---

## 3. Qualitative Feature Mapping

Before measuring features quantitatively, define them qualitatively across three dimensions:

### 3.1 Target Population

#### Target Description
Qualitative description of target segment. Define by:
- Product use case
- User demographic
- Level of product engagement
- Level of product experience
- Customer type

#### User Segmentation

| Segment | Definition | Strategy |
|---------|------------|----------|
| **Core users** | Feature specifically designed for them | Primary focus |
| **Adjacent users** | Get some value, but not designed for them | Expansion opportunity |
| **Non-adjacent users** | Don't use, wasn't designed for them | Ignore |

**Best practice:** Start with narrowest logical segment (core users). Expand to adjacent only after core metrics are strong.

#### Target Size
Percentage of active product users in target segment.

**Examples:**
- Eventbrite embedded checkout: ~10% of active users
- Slack shared channels: ~15% of active users

### 3.2 User Value

#### User Problem Description
What user problem does this feature solve?

| Feature | User Problem |
|---------|--------------|
| Eventbrite embedded checkout | Creators want to sell tickets directly on their websites |
| Slack shared channels | Communicating with external stakeholders |

#### Problem Frequency
How often target users experience the problem.

**Discovery method:** Ask users:
- What problem does the feature solve for you?
- When was the last time you experienced that problem?
- The time before that?

**Pattern types:**
- **Regular cadence:** Daily, weekly, monthly
- **Set-and-forget:** Once configured, remains active (Eventbrite embedded checkout)

#### Problem Severity
How important the problem is to target users.

**Assessment flow:**
```
Is there an easy workaround?
├── Yes → Low severity
└── No → Does it prevent experiencing core product value?
         ├── Yes → High severity
         └── No → Low-moderate severity
```

**Examples:**

| Severity | Example | Reason |
|----------|---------|--------|
| Low | Splitwise native payments | Links to PayPal/Venmo as workaround |
| Low | Spotify web playlist saves | Mobile app workaround exists |
| High | Tinder swiping | Core to experiencing product value |
| High | DocuSign signatures | Core value proposition |

### 3.3 Business Value

#### Business Impact
How does the feature add value to the business?

**Offensive features:** Proactively drive product KPIs
- Drive acquisition, retention, or monetization
- Add net value after cannibalization effects

**Defensive features:** Maintain product KPIs
- Required for product to function (admin features, Uber cancel button)
- Minimum Market Requirements (MMRs) — basic features every customer expects

> "You should build a feature, launch it, and then see how it drives your business' overall metrics like monetization, retention, and acquisition. If your feature doesn't improve these metrics, then it should be at least helping maintain your product KPIs."
> — Casey Winters

#### Strategic Importance
T-shirt size evaluation of importance to product direction.

**Higher strategic importance:**
- Features for larger target segments
- Features addressing more severe problems
- Features directly contributing to value proposition
- Features that enable sequencing toward product vision

**Sequencing Example: Slack**
```
Single Channel Guest → Shared Channels → Slack Connect
(invite external     (collaborate with   (multi-party
 guest to one         external companies)  collaboration
 channel)                                  ecosystem)
```

---

## 4. TARS Framework: Feature Adoption

### Definition

> Adoption is the percentage of target users who start using the feature (use it at least once).

**Formula:**
```
Feature Adoption = Active Adopted Users / Active Target Users
```

### Why Start with Adoption?

Adoption is a proxy for how effectively your feature is:
- **Surfaced** to the right users
- **Communicated** in terms of value proposition

If users don't see or understand → can't improve retention or satisfaction.

### Adoption Events

Define what "adopted" means for each feature:

| Feature | Adoption Event |
|---------|----------------|
| Eventbrite embedded checkout | Creator added checkout to their website |
| Slack shared channels | User messaged in a shared channel for first time |

### Limitations of Adoption Alone

> "Adoption is important but not sufficient. It helps show if a feature launch was successful, but not always whether or not the feature created sustained value for users."
> — Fareed Mosavat

**Three limitations:**
1. Adopting ≠ liking or getting value
2. More adoption isn't always the goal (some features aren't for everyone)
3. Adoption can be artificially inflated by marketing/CTAs

### Evaluation Benchmarks

Set expectations based on problem severity:

| Problem Severity | Target Adoption |
|------------------|-----------------|
| High | ~80% |
| Medium | ~50-60% |
| Low | ~30-40% |

### Low Adoption: Three Causes

#### 1. Undersurfaced
Feature not prominently displayed or too difficult to access.

**Sub-causes and solutions:**

| Issue | Solution | Example |
|-------|----------|---------|
| **Awareness** | Marketing, in-app notifications | Notion feature announcements |
| **Discoverability** | Move to prominent location, tutorials | Slack redesign surfacing Drafts |
| **Friction** | Simplify setup, educate on benefits, better onboarding | Slack shared channel admin flow |

#### 2. Overscoped Target
Target segment defined too broadly.

**Solution:** Narrow to core users most likely to get value. If still low adoption → redesign, replace, or kill.

**Example:** Instacart lists only make sense for users who've ordered from a retailer multiple times.

#### 3. Intentionally Scarce
Value diminishes as more users adopt (common in social products).

**Examples:**
- Snapchat hidden features (generate word-of-mouth)
- Spotify Top Fans notifications (by definition, limited to power users)

**Optimization:** Understand value-vs-accessibility curve; find adoption rate that maximizes value.

### High Adoption: One Consideration

**Underscoped target** — target defined too narrowly.

**Action:** Expand target to adjacent users → lower adoption rate → work to improve it.

> "Good product leaders are always looking for how they can expand their feature's value."

---

## 5. TARS Framework: Feature Retention

### Definition

> Feature Retention is the share of adopted users who continue to use the feature.

**What it indicates:** How well your feature solves the problem for users.

> "Retention is one of the key measures of the quality of a feature. Do people who adopt it use it again? That is the best sign that it solves the user problem."
> — Fareed Mosavat

### Exception: One-Time Features

Some features aren't designed for repeated use:
- Initial user setup (HubSpot CRM data import)
- Onboarding walkthroughs (Hey email)

→ Skip retention measurement, go straight to satisfaction.

### Four Steps to Measure & Improve

#### Step 1: Determine Natural Use Frequency

How often user experiences the problem the feature solves.

**Examples:**
- Instacart lists → Weekly (grocery cadence)
- Slack shared channels → Weekly

> "Especially as you build more features, their problem frequency becomes less likely to be as prominent as the overall product frequency."
> — Casey Winters

#### Step 2: Measure Retention Curve

Plot % of adopted users active at each frequency interval.

```
100% ┤
     │█
     │██
     │███
 60% │████████████████████ ← Steady state
     │
     └────────────────────────→ Frequency Intervals
        1  2  3  4  5  6  7  8
```

**Key insight:** Curves have logarithmic decline from adoption to steady state. The decline period = **Activation** (habit building).

#### Step 3: Analyze Results

**Universal retention problem sign:** Curve never stabilizes (no users build sustainable habit).

**Benchmarks by strategic importance:**

| Strategic Importance | Target Retention |
|---------------------|------------------|
| High | 50%+ |
| Medium | 25-35% |
| Low | 10-20% |

#### Step 4: Define Retention Strategy

**Five causes of low retention:**

##### 1. Buggy Features
Feature promises value but fails to deliver.

**Signals:** Customer service tickets, unexpected behavior data trends.

**Action:** Collect reasons users stop using from support tickets, interviews.

##### 2. Novelty Features
Value has naturally diminishing returns.

**Three purposes novelty features serve:**
- Short-term virality boost (Snapchat Harry Potter lens)
- User resurrection (Tinder Swipe Night)
- Activation tool (UberKITTENS, Uber Ice Cream)

**Solution:** Either connect to broader product value OR build pipeline of novelty features to "ride the wave."

##### 3. Cannibalized Features
One feature succeeds at expense of another.

**Example:** Zoom video quality improvements → decreased Zoom phone usage.

**Action:** Differentiate features enough to minimize cannibalization OR kill lower strategic importance feature.

**Case study:** Pinterest killed likes because likes and repins cannibalized each other.

##### 4. Dud Features
Don't solve intended problem. Large drop-offs at both adoption AND retention.

**Three reasons to kill:**
- **Obsolete:** Problem used to be important, isn't anymore
- **Redundant:** Problem already solved by something else in bundle
- **Incompatible:** Works for other products, not yours

**Incompatibility examples (copied features that failed):**
- Quora Boards (copied Pinterest)
- Facebook Marketplace Deals (copied Groupon)
- Salesforce Chatter (copied Twitter feed)

##### 5. Loss Aversion Trap

> "A lot of product leaders suffer from loss aversion when it comes to killing features."

**Reality check:**
- Maintaining features is NOT free
- Fixing underperforming features often more expensive than creating new ones
- Sunk costs are irrelevant to future decisions

**Feature Removal Strategy:**
- Work with communications/marketing to explain decisions
- Offer alternatives or substitutes
- When uncertain → A/B test the removal

**A/B test for killing should measure:**
- Significant complaints from users?
- Behavior changes indicating less value?
- Business metric changes?

---

## 6. TARS Framework: Feature Satisfaction

### The Hidden Detractor Problem

> A Hidden Detractor is a feature that has good adoption and retention numbers, but is a frustrating experience.

**Examples:**
- Slack Threads (used, but hard to navigate)
- Craigslist search (used, but poor quality results)
- Workday PTO requests (tedious, but only option)

**Risk:** Hidden Detractors leave you susceptible to disruption by someone who smooths the friction.

### Why NPS and Sean Ellis Test Don't Work for Features

| Method | Problem |
|--------|---------|
| NPS ("Would you recommend?") | People don't recommend features independent of products |
| Sean Ellis ("How disappointed?") | Feature could be important AND not work well |

### Customer Effort Score (CES) Adaptation

Standard CES: "How easy/difficult was it to complete the task?"

**Adapted for features:** "How easy was it to solve [problem] using [feature]?"

**Scale:**
1. Much more difficult than expected
2. More difficult than expected
3. As expected
4. Easier than expected
5. Much easier than expected

**Satisfied:** Score 3 or higher.

**Example:** "How easy was it to collaborate with your team members using the commenting feature?"

### Measurement Considerations

1. Focus on retained users (isolate satisfaction from retention)
2. Collect in-product when possible (near experience)
3. Use sample population to estimate overall satisfaction

### Hidden Detractor Action

Investigate immediately → determine how to improve, change, or replace.

### High Satisfaction Features: Two Strategies

#### 1. Capture More Value

**Monetization approaches:**
- Transactional basis (Twitch Bits — platform takes cut)
- Package in subscription tier (Eventbrite team management)

**Strengthen product KPIs:**
- Acquisition through virality (Snapchat lenses)
- Retention through engagement
- Social environment (Venmo payment feed → virality)

**Caveat:** Don't monetize if it negatively impacts satisfaction or product KPIs.

#### 2. Expand Target Audience

**Especially relevant for Niche Features:** Good scores, but small target segment.

**Example:** Reddit subreddit customization (only moderators have access).

**Keep niche features only if:**
- Target population is strategically valuable
- Adds significant value to product as a whole (not just target users)
- Not unnecessarily difficult/costly to maintain

**Case study:** Slack discontinued interactive screen sharing. Power users loved it, but didn't add significant value to overall product and was costly to maintain.

---

## 7. Feature Bundle Evaluation

### S/T Score

> Satisfaction-to-Target Score: What percentage of target audience is satisfied with the feature?

**Formula:**
```
S/T Score = Satisfied Users / Target Users
```

**Example calculation:**
- Target: 80% of active users
- Adopted: 50% of target = 40% total
- Retained: 70% of adopted = 28% total
- Satisfied: 90% of retained = 25% total
- **S/T Score:** 25% / 80% = **31%**

**Slack Shared Channels example:**
- Target: 20%
- Adopted: 90% of target = 18%
- Retained: 85% of adopted = 15%
- Satisfied: 98% of retained = 15%
- **S/T Score:** 15% / 20% = **75%**

### Feature Matrix

Plot S/T Score (Y-axis) vs. Strategic Importance (X-axis):

```
High S/T │  Overperforming  │    Core
         │                  │
─────────┼──────────────────┼──────────
         │                  │
Low S/T  │    Project       │  Liability
         │                  │
         └──────────────────┴──────────
              Low              High
           Strategic Importance
```

### Quadrant Strategies

| Quadrant | Definition | Priority | Strategy |
|----------|------------|----------|----------|
| **Liability** | High importance, low S/T | HIGHEST | Iterate heavily to improve |
| **Project** | Low importance, low S/T | Medium | Decide: invest or kill |
| **Core** | High importance, high S/T | Maintain + Expand | Maximize value capture, expand audience |
| **Overperforming** | Low importance, high S/T | Monetize | Capture more value |

> "Liability features require a lot of iteration and feedback to move up the gap in key feature metrics. Many might not even get there, but those that do often become the largest impact features and drive a product's growth over time."
> — Casey Winters

> "The question is no longer, should I kill this feature? Rather, now that I've killed this feature, what does it allow me to invest in that I wouldn't otherwise be able to invest in?"
> — Fareed Mosavat

---

## 8. Developing New Features

### The New Manager Death Spiral

Product leaders should NOT own new feature development. That's for PMs.

**Three problems when leaders own features:**
1. **Stolen learning opportunity** — deprives team of growth
2. **Trapped in weeds** — can't focus on overall strategy
3. **Holding secrets** — insights not shared with team

### Product Leader's Three Roles

1. **Pressure test the insight**
2. **Assess prioritization**
3. **Sense check the launch plan**

### 8.1 Pressure Testing Insights

> "Often the best features come from a mix of customer feedback and data, which turns into talking to some customers to understand the problems they're facing."
> — Casey Winters

#### Three Insight Sources

| Source | What It Answers | Example |
|--------|-----------------|---------|
| **Strategic** | If solved, how impactful for business? | Slack Connect from executive vision |
| **User** | What problem exists and why? | Eventbrite multi-event emails from user requests |
| **Data** | How many people does it affect? | Behavioral trends, growth models |

**Best features validate all three.** Start with one, fill in the others.

**Mapping to Feature Map:**
- Data insights → Target Population
- User insights → User Value
- Strategic insights → Business Value

#### Four Common Mistakes

##### 1. Vocal Minority
Drawing conclusions from small non-representative segment (usually power users).

**Avoid:** Segment feedback sources, project out how many people have the problem.

##### 2. Unqualified Users
Drawing conclusions from users outside your target.

**Example:** Loom personal users have worst retention, but if strategy targets professional users, this is misleading.

**Avoid:** Know which segments are prioritized; don't chase problems for non-target users.

##### 3. Solutions Rather Than Problems
Focusing on user-suggested solutions instead of underlying problems.

> "If I had asked people what they wanted, they would have said faster horses."
> — Henry Ford

**Avoid:** When you hear a solution, trace back:
- What would that solve for you?
- How would it solve it?
- Why would that be impactful?

##### 4. Overanalysis
Introducing complexity that adds confusion rather than value.

**Avoid:** Invest in good data, educate team on simple analysis skills.

### 8.2 Prioritizing High-Impact Features

#### Four Prioritization Principles

##### 1. Solve Multiple Problems with Single Feature

**Questions to ask:**
- What other opportunities relate to this problem?
- What's the root cause? What other problems share it?
- Can this be solved with other feature ideas?

**Example:** Pinterest "save a pin" — saves content for later AND improves recommendation engine.

##### 2. Broadly Applicable > Segment-Specific

**Formula:** Upside = Impact × Reach

**Questions:**
- What other segments have similar problems?
- What's the root cause and what other problems does it create?

**Example:** Instacart pickup — helps users shop faster AND generates retailer traffic.

##### 3. Recurring Value > One-Time Value

One-time: Referral incentive, onboarding improvement, one-time benefit.

Recurring: Strengthens habits, higher satisfaction, longer retention.

**Questions:**
- How will this add value over users' lifetime?
- How many times do we expect users to interact with it?
- How will it improve our growth strategy?

**Examples:** Instagram Stories (recurring engagement), Trello public boards (ongoing SEO + acquisition).

##### 4. Create Value > Capture Value

Value capture is a lagging indicator of value creation.

You cannot sustainably capture more value than you create.

**Questions:**
- How will this help the end user?
- How will benefit-to-cost ratio change for users?
- Has user seen consistent value increases over time?

### 8.3 Launch Methods

#### Choosing Based on Ambiguity

| Confidence Level | Ambiguity | Release Method |
|------------------|-----------|----------------|
| "Not confident" | High | Experimental |
| Medium | Medium | MVF (Minimum Viable Feature) |
| "Very confident" | Low | Phased |

#### Experimental Release

For high ambiguity. Validate assumptions with actual user behavior.

**Variations:**
- Alpha/dogfooding (internal users)
- Beta/piloting (select external users)
- User testing (controlled sessions with prototypes)

**Example:** Twitter Threads tested through prototype app with journalists.

#### MVF Release

For medium ambiguity. Fully functioning but minimal embellishment.

**Four ways to minimize:**
1. **Platforms** — Build for one device/browser only
2. **Integrations** — Hard-code data, standalone initially
3. **Resources** — Reduce design fidelity, limit functionality
4. **QA** — Lighter-weight process like peer review

> "At Eventbrite, we'd use the common analogy of a skateboard. You first want to build the skateboard, which will teach you how to build a better scooter."
> — Casey Winters

**Example:** Eventbrite "follow creator" — Android only, no integrations, minimal design/engineering, minimum QA.

#### Phased Release

For low ambiguity. Ship distinct pieces of value as soon as ready.

**Example:** Eventbrite team management launched in phases.

### 8.4 Feature Pre-Mortem

Series of questions to stress-test launch plan.

#### Feature Information Questions
1. How does this feature add value to product bundle?
2. What target segments are primary focus?
3. How much confidence in feature success?
4. How will feature be launched?

#### Outcome Questions
5. What key metrics indicate success?
6. What possible outcomes are plausible?
7. What would each outcome teach about performance?
8. What would next step be after each outcome?

> "Teams will sometimes redefine success after launch. You can't go back and change the goals after launch."
> — Casey Winters

---

## Action Items

### For Feature Evaluation

**Individual Features:**
- [ ] Define qualitative feature map (target, user value, business value)
- [ ] Measure adoption against problem severity benchmarks
- [ ] Plot retention curve and identify steady state
- [ ] Survey satisfaction using adapted CES methodology
- [ ] Calculate S/T score for each feature

**Feature Bundle:**
- [ ] Stack rank features by strategic importance
- [ ] Plot feature matrix (S/T vs. strategic importance)
- [ ] Prioritize liability features for improvement
- [ ] Identify project features to kill or invest
- [ ] Push core/overperforming features to capture more value

### For New Feature Development

**Insight Validation:**
- [ ] Identify source of insight (strategic, user, data)
- [ ] Validate other two insight sources
- [ ] Check for vocal minority, unqualified users, solution-focus, overanalysis

**Prioritization:**
- [ ] Look for single features solving multiple problems
- [ ] Prefer broadly applicable over segment-specific
- [ ] Prefer recurring value over one-time
- [ ] Prefer value creation over value capture

**Launch:**
- [ ] Assess ambiguity level → choose release method
- [ ] Run pre-mortem with all 8 questions
- [ ] Define success metrics BEFORE launch

---

## Key Frameworks Summary

| Framework | Purpose | Key Components |
|-----------|---------|----------------|
| Feature Product Fit | Goal of feature strategy | Net positive contribution to acquisition, retention, or monetization |
| Feature Map | Qualitative definition | Target Population, User Value, Business Value |
| TARS | Feature evaluation | Target → Adopted → Retained → Satisfied |
| S/T Score | Bundle-level metric | Satisfied Users / Target Users |
| Feature Matrix | Portfolio view | 4 quadrants: Core, Liability, Overperforming, Project |
| Release Methods | Launch strategy | Experimental, MVF, Phased based on ambiguity |
| Pre-Mortem | Launch planning | 8 questions on feature info and outcomes |

---

## Critical Gaps & Limitations

**Not Covered in This Module:**
- How to build experimentation infrastructure
- Statistical methods for feature experiments
- Team structure for feature development
- Cross-functional collaboration (design, engineering, marketing)
- Technical debt from feature accumulation

**Assumptions:**
- Product has achieved initial PMF
- Data infrastructure exists to measure adoption/retention
- Ability to survey users for satisfaction
- Product team structure with PMs reporting to product leaders

---

## Appendix: Key Examples by Company

| Company | Feature | Lesson |
|---------|---------|--------|
| Slack | Shared Channels → Connect | Sequencing toward strategic vision |
| Slack | Threads | Hidden Detractor example |
| Slack | Interactive screen sharing | Niche feature killed (costly, low overall value) |
| Pinterest | Likes | Killed due to cannibalization with repins |
| Pinterest | Save a Pin | Solves multiple problems (save + recommendations) |
| Eventbrite | Embedded checkout | High strategic importance, multiple value streams |
| Eventbrite | Follow creator | MVF release example |
| Uber | Surge pricing multiplier | Killed and replaced with new approach |
| Uber | UberKITTENS | Novelty feature for activation |
| Tinder | Swiping | High severity core feature |
| Tinder | Swipe Night | Novelty feature for resurrection |
| Snapchat | Hidden features | Intentionally scarce for word-of-mouth |
| Quora | Boards | Incompatible copied feature |
| Twitter | Threads | Experimental release via prototype app |
