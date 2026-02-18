# PMF Expansion Strategy: Collected Insights
> Reforge Program | Product Leaders crossing from Senior PM to Director/VP

## Sources

| Source | Type | Creators |
|--------|------|----------|
| Reforge: PMF Expansion Strategy | Course Module | Casey Winters (CPO Eventbrite), Fareed Mosavat (EIR Reforge) |
| Contributors | Expert Input | Ravi Mehta (former CPO Tinder), Brandon Chu (VP Product Shopify) |

---

## Executive Summary

Product-market fit expansion is the third type of product work—adding new value propositions rather than enhancing existing ones (Feature Strategy) or maximizing their distribution (Growth Strategy). The fundamental insight is that saturation is inevitable for successful products, and waiting until it hits is too late.

Saturation manifests in three forms: market saturation (remaining market not worth pursuing), product saturation (diminishing returns on improvements), and PMF degradation (competition or changing preferences eroding fit). Feature and growth strategies have natural ceilings; PMF expansion is how you move those ceilings rather than just push against them.

The critical distinction from initial PMF: expansion should leverage existing product-market fit as a "head start" rather than building from nothing. This requires evaluating opportunities through two lenses—shared capabilities (why are we better equipped than anyone else?) and market attractiveness (is this market worth entering?). The stronger both dimensions, the higher probability of success.

Three expansion categories exist: Adapted use cases (same problem, new market via geographic, tech, or unbundling), Complementary use cases (new problems that reinforce existing products via horizontal, vertical, or platform expansion), and New use cases (new problems that don't reinforce existing products via strategic sequence, diversification, or first-and-best-customer). Each carries progressively higher risk and investment but potentially larger upside.

---

## 1. Understanding Saturation

### Saturation Defined

**Saturation** is a barrier to continued expansion of a product based on its current product-market fit.

> "Saturation is a side effect of success. It's important to recognize saturation as every successful company will get there."
> — Fareed Mosavat, former Director of Product at Slack

### Three Types of Saturation

| Type | Definition | Indicator |
|------|------------|-----------|
| **Market Saturation** | Remaining uncaptured market doesn't make sense to pursue | Cost to acquire > value captured |
| **Product Saturation** | Product fully optimized; improvements yield diminishing returns | Incremental features don't move metrics |
| **PMF Degradation** | Decline in existing fit due to competition or changing preferences | Market share loss, retention decline |

### Market Saturation Mechanics

As markets become saturated, two things happen:

1. **Competition intensifies** — Remaining users are served by competitors; acquiring from competition is harder and more expensive than acquiring unserved users
2. **Willingness to pay decreases** — Early adopters (highest WTP) already captured; remaining segments have lower WTP

**Result:** Costs go up, value captured goes down.

**Facebook example:** ~60% of global internet users are Facebook MAU. Limited growth in existing markets forces expansion into new products.

### Product Saturation Mechanics

Product becomes fully optimized for its use case; opportunities for meaningful improvement dry up.

**Shazam example:** Initial use case (identify songs) launched across platforms (Apple Watch, Mac OS) but hasn't evolved substantially in terms of new use cases. Growth within existing use case became difficult.

**SparkPost example (avoiding saturation):** On-premise email provider used by top senders. On-premise wasn't easy for smaller developers. To avoid product saturation, launched email cloud infrastructure as a service—enabling a new use case before the existing one hit ceiling.

### PMF Degradation Mechanics

**Two causes:**

**1. Red Queen Effect**
> Any competitive situation where you need to innovate just to stay in the same place.
> — William Barnett, Stanford

Competitors continually innovate and try to out-compete; standing still means falling behind.

**Uber vs Lyft example:** Neither can win by sticking with original PMF because the other is innovating. Both experience PMF degradation from the competition.

**Slack vs HipChat example:**
| Dimension | Slack | HipChat |
|-----------|-------|---------|
| Target | All knowledge workers | Engineers/technical |
| Quality | High technical & product | Technical issues |
| Focus | Community-based | Work-focused only |
| Outcome | Won | Saturated |

Slack aggressively evolved PMF; HipChat did not.

**2. Over-optimizing for Power Users**

Two manifestations:
- **Feature creep** — Power users are most vocal, so teams overbuild for them. Product complexity alienates casual/potential users.
- **Price creep** — New features for power users increase prices, creating friction for new users who get acquired by lower-cost competitors.

**Adobe Photoshop example:** Features catered to power users added complexity for others, creating opportunity for Canva and Figma.

**Segment example (solution):** Launched startup package—pared-down version at lower price to counter price creep for smaller customers.

### Lagging Indicators of Saturation

By the time you detect these, saturation has already happened:

1. **Volume metrics flat or declining** — Users or market share
2. **Stagnation in key metrics** — Acquisition, retention, monetization improvements stall
3. **Diminishing returns** — More effort for same or less results
4. **Stagnant TAM** — Only relevant for companies with huge share (Facebook, Google)

> "You should be building new markets and products to make sure that growth doesn't flatline or decline, because product/market fit expansion often requires time to ramp up to be meaningful growth driver at the aggregate level."
> — Casey Winters, CPO Eventbrite

---

## 2. The Grubhub Case Study

### Initial Use Case

| Element | Description |
|---------|-------------|
| Problem | Pick up food from favorite restaurants quickly |
| Persona | Young professionals in cities |
| Why | Access many food options conveniently |
| Alternative | Call restaurant, order by phone |
| Natural Frequency | Weekly |

### Saturation Encountered

After IPO, Grubhub had ~2% of delivery market (growing 20% YoY) with one product: takeout. Despite growth, they were saturated:

1. **Market saturation** — High penetration with restaurants already doing own delivery; ceiling reached
2. **Product saturation** — Takeout product improved but additional features didn't substantially improve value creation/capture
3. **PMF degradation** — Competitors offering similar services, expanding quickly

### Resolution: Delivery Use Case

Launched delivery option (restaurants make own deliveries) to address all three:

1. **Expanded market** — Added restaurants without own delivery (supply) + users looking for delivery (demand)
2. **Strengthened network effects** — More restaurants + choice between delivery/takeout; delivery pool reinforced takeout
3. **Offset PMF degradation** — More competitive with delivery-focused peers; takeout competency as differentiator

**Key insight:** By building delivery use case, Grubhub expanded PMF and avoided saturation *early*—before it became critical.

### Counter-example: Webex

Webex was dominant in enterprise video conferencing but:
- **Market saturation** — Enterprise focus was slower-growing than SMB/consumer
- **Product saturation** — Heavy investment in enterprise features without capturing more value
- **PMF degradation** — Zoom emerged with more user-friendly experience

Result: Decreased market share. Failed to stay ahead of saturation.

---

## 3. PMF Expansion vs. Other Product Work

### The Strategic Positioning

| Strategy | Purpose | Effect |
|----------|---------|--------|
| Feature Strategy | Enhance existing value prop | Expand addressable market (move right) |
| Growth Strategy | Maximize existing value prop | Increase market share (move up) |
| PMF Expansion | Add new value props | Move the saturation ceiling |

Feature and growth create incremental improvements within existing constraints. PMF expansion creates step-function improvement by moving the constraints themselves.

### PMF Expansion vs. Initial PMF

| Dimension | Initial PMF | PMF Expansion |
|-----------|-------------|---------------|
| Starting point | Nothing | Existing PMF |
| Approach | Create from scratch | Leverage existing as shortcut |
| Risk | Highest | Lower (when done right) |
| Investment | Variable | Higher than feature/growth |

> "The better a product market fit expansion opportunity can leverage our existing product market fit, the better the shortcut to the new product market fit ceiling will be."

**Uber example:** Initial PMF in ride-hailing (San Francisco). Later PMF expansion: UberX, Uber Eats, UberPool. Each expansion built off existing PMF rather than starting from scratch. UberPool from nothing would have been far more difficult if not impossible.

---

## 4. Three Categories of PMF Expansion

### Taxonomy Overview

| Category | Definition | Risk Level |
|----------|------------|------------|
| **Adapted Use Case** | Same problem, new market | Lowest |
| **Complementary Use Case** | New problem that reinforces existing products | Medium |
| **New Use Case** | New problem, doesn't reinforce existing | Highest |

### Adapted Use Case Expansion

Adapts existing product to increase effectiveness or make accessible to new market. Same problem, similar persona.

**Three types:**
1. **Geographic Expansion** — Launch to new geographic market
2. **Tech Adaptation** — Same problem/persona with technology change
3. **Unbundling** — Split use case into separate company/product/app

> "Adapted use case expansions can be some of the easiest ways to drive step changes in the usage of a product. Frequently, a product is very close to unlocking a new audience if it just takes a little bit of time to understand what is preventing that audience from being successful already."
> — Casey Winters

### Complementary Use Case Expansion

New use case that reinforces defensibility of overall business.

**Three types:**
1. **Horizontal Expansion** — Launch complementary use case as new product
2. **Vertical Expansion** — Add complementary use case within existing product
3. **Platform Expansion** — Add platform that leverages/monetizes existing network

### New Use Case Expansion

New use case that doesn't necessarily reinforce existing products.

**Three types:**
1. **Strategic Sequence** — Positions company for future complementary relationship
2. **Diversification** — Multiple bets across different use cases
3. **First and Best Customer** — Commercialize internal tools

---

## 5. Evaluating PMF Expansion Opportunities

### Two-Stage Evaluation Process

**Stage 1: Macro Evaluation** — Strategic sense-check at leadership level

**Stage 2: Micro Evaluation** — Detailed analysis of shared capabilities and market attractiveness

### Macro Evaluation: Five Questions

From "Profit from the Core" (Zook & Allen, Bain):

| Question | Why It Matters |
|----------|----------------|
| 1. How much does this strengthen, protect, and reinforce the core? | Assesses defensibility impact |
| 2. What are the chances of becoming a leader in the new segment? | Category leadership = value creation/capture |
| 3. Could this have defensive benefit against competitors? | Especially important near saturation/degradation |
| 4. Does this position us for stronger future adjacent moves? | Strategic sequencing potential |
| 5. Can we be certain of executing well? | Great opportunity with poor execution = no value |

**Eventbrite Online Events example:**

1. **Reinforce core?** — Allowed new event creators to access tools; gave existing creators new event type; gave consumers more choice
2. **Leadership potential?** — Large creator/user network + few competitors = likely leadership
3. **Defensive benefit?** — Prevents churn of creators seeking online solutions during COVID
4. **Future moves?** — Unlocks tools for improving online event experience
5. **Execution?** — Leverages existing creator/consumer capabilities; new skill needed: online event experience management

### Micro Evaluation: Shared Capabilities

> "Why are we better equipped to do this than anybody else?"
> — Fareed Mosavat

**Three categories of shared capabilities:**

#### 1. Functional Capabilities

| Type | Definition | High Sharing Example | Low Sharing Example |
|------|------------|---------------------|---------------------|
| **Technology** | Tech built for current product usable in new | Uber → Uber Eats (GPS, payments, ordering) | Uber → car sales (vs. Carvana) |
| **Distribution** | Growth capabilities transferable | HubSpot marketing → sales (same loops) | HubSpot → social network (new loop types) |
| **Operations** | Org structure/processes transferable | Roman vitamins → state expansion (licensing playbook) | Roman → international (different licensing) |

#### 2. Domain-Specific Capabilities

| Type | Definition | High Sharing Example | Low Sharing Example |
|------|------------|---------------------|---------------------|
| **Intellectual Property** | Proprietary content/insights | Disney → Disney+ (existing programming) | Roku → streaming service (no content) |
| **Industry Knowledge** | Expertise in given industry | Stripe payments → Atlas, billing, terminal | Credit Karma → incorporation products |
| **Hard Assets** | Physical infrastructure | Clutter storage CA → retail inventory CA | Clutter storage CA → East Coast (new facilities) |

#### 3. Defensibility Capabilities

| Type | Definition | Example |
|------|------------|---------|
| **Network Effects** | Value improves with more users | Facebook → Marketplace (instant liquidity) |
| **Brand** | Emotion that improves acquisition/retention/monetization | Mint → credit products (trust already built) |
| **Scale** | Distribution drives efficient acquisition/retention | Spotify → podcasting (user overlap) |
| **Embedding** | Adoption creates switching costs | HubSpot CRM → sales tools (deeper integration) |

**Brand warning:**
> "Product leaders should consider if they have permission from their users to launch this new product. That is, does the brand of your existing offering fulfill the needs of users for your new opportunity?"
> — Ravi Mehta, former CPO Tinder

### Micro Evaluation: Market Attractiveness

**Three dimensions:**

| Dimension | Less Attractive | More Attractive |
|-----------|-----------------|-----------------|
| **Market Size** | Much smaller than existing | Much bigger than existing |
| **Growth Potential** | Much slower than existing | Much faster than existing |
| **Competitive Density** | Consolidated (few own majority) | Open (few competitors, none strong) |

**Competitive density scale:**
1. **Open** — Few competitors, none particularly strong (best)
2. **Fragmented** — Many competitors, each owns small piece
3. **Consolidated** — Few competitors own majority (worst, unless confident in disruption)

### The PMF Expansion Opportunity Map

Plot opportunities on 2x2:
- **Y-axis:** Market Attractiveness (Low → High)
- **X-axis:** Shared Capabilities (Low → High)

| Quadrant | Recommendation |
|----------|----------------|
| High attractiveness, High capabilities | **Best opportunities** — Pursue |
| High attractiveness, Low capabilities | **Improve capabilities** — Build, partner, or acquire |
| Low attractiveness, High capabilities | **Redefine market** — Blue Ocean strategy |
| Low attractiveness, Low capabilities | **Avoid** — Better opportunities elsewhere |

### Improving Shared Capabilities

**Three approaches:**

| Approach | When It Makes Sense | When It Doesn't |
|----------|---------------------|-----------------|
| **Build** | Quick development; non-scalable approach possible; critical to strategy | Time constraint; too costly; low success probability |
| **Partner** | Mutual benefit; can learn from partner; prohibitive build time | Partner has poor reputation; is significant competitor; reduces market attractiveness |
| **Acquire** | Target has strong capabilities; need short time span; acqui-hire potential | Cost makes opportunity unattractive; tech integration is complicated |

**Netflix example (Build):** Built streaming tech while operating DVD business—achieved better capabilities than competitors.

**Microsoft/OpenAI example (Partner):** Collaborated on hardware/software platform within Azure for AI knowledge transfer.

**Spotify example (Acquire):** Acquired Anchor (podcast creation) and Gimlet (podcast content) to gain capabilities for podcast expansion.

### Redefining Market Attractiveness

From "Blue Ocean Strategy" (Kim & Mauborgne):

> "Instead of focusing on beating the competition, you focus on making the competition irrelevant by creating a leap in value for the buyer and your company, thereby opening up new and uncontested market space."

**LinkedIn Sales Navigator example:** Appeared to enter competitive CRM industry. Actually created new category—complemented Salesforce rather than competing. Became instant leader in unique sales tool market.

---

## 6. Launching and Executing PMF Expansion

### Three Common Mistakes

**1. Mistiming the Expansion**

| Too Late | Too Early |
|----------|-----------|
| Over-optimizing feature/growth work | Launching products without strong capabilities |
| Overconfidence in current PMF | Unable to compete in new markets |
| Not recognizing growth limitations | Spreading resources too thin |

**Balance:** Readiness to expand vs. risk of saturation.

**2. Pouring on Too Many Resources**

Belief that more people = better results. Reality:
- Too many chefs in the kitchen
- Decisions slow due to alignment needs
- Kills ability to iterate fast

PMF expansion requires speed and iteration, not headcount.

**3. Jumping Ahead to Growth**

Rushing into growth strategy before new expansion reaches PMF.

> "You can accelerate the steps, but you can't skip any."

**Three indicators of PMF reached:**
1. **Stable retention** — Curve stabilizes at healthy level (not declining toward zero)
2. **Meaningful usage** — Retained users engage meaningfully (not just light/casual)
3. **Top line organic growth** — People finding enough value to tell others

### Development Approaches

| Approach | Advantages | Disadvantages | When to Use |
|----------|------------|---------------|-------------|
| **Build** | Full ownership; control over development | Takes time; moderately high cost | Strong shared capabilities; competitive landscape won't shift |
| **Partner** | Learn/build capability; lower cost | Revenue/profit sharing reduces upside | Mutual value potential; learning opportunity |
| **Buy** | Fastest to market; acquire talent/capabilities | Very costly; integration underestimated | Need capabilities fast; acqui-hire value |

**Build examples:** Zillow Offers (leveraged data/real estate knowledge), Dropbox Paper (leveraged distribution + file storage adjacency)

**Partner examples:** Google Events (with Eventbrite/Ticketmaster), Walmart Marketplace (with Shopify)

**Acquire examples:** Salesforce/Tableau (BI capabilities), Pinterest/VisualGraph (image recognition)

### Launch Approaches

Determine approach based on **degree of ambiguity**:

| Ambiguity Level | Approach | Description |
|-----------------|----------|-------------|
| High | **Experiment** | List assumptions; validate with users; quick/scrappy |
| Medium | **MVP** | Smallest product to test hypothesis; ship to learn |
| Low | **Phased Development** | Clear vision; build incrementally |

**Experiment approach:**

> "Experiments are basically the same for product or feature, except that a product will have a bundle of features. An experiment of a bundle is much harder to understand. When it's a feature experiment, it's easy to isolate variables to understand what is working and not working. A product experiment may have 10 different components that could be working or not working."
> — Casey Winters

**Uber Eats example:** Launched as experiment with hypothesis that users valued speed. Initial product: ~10 minute delivery, limited restaurant/menu options. Found users cared more about variety and quality. Pivoted accordingly.

**MVP approach:**

> "An MVP is all about delivering value to users by building the smallest product you can to test a hypothesis. You ship to learn, which influences future product development."
> — Casey Winters

**Three risk reduction tactics:**
1. Narrow the market (Nextdoor, Grubhub: one neighborhood)
2. Minimize platforms (Instagram: iOS only initially)
3. Do things that don't scale (Uber Eats: pre-bought meals in cars)

**Phased approach:**

> "Have a clear vision to execute towards, but be prepared to be surprised. Surprises create opportunities you wouldn't otherwise see and create new sequencing opportunities down the line."
> — Casey Winters

---

## 7. Adapted Use Case Deep Dive

### Geographic Expansion

**When it makes sense:** User needs in new geography are similar but not exactly the same—requires some product work for adoption.

**Highest likelihood of success:** Existing product already proven with PMF in existing market (not a guarantee but strong signal).

> "Language localization usually isn't enough to grow in a new international market. At Slack, we discovered that each region had different expectations and customer needs—different communication modes, expectations of data privacy, or even pricing and payment methods—that we needed to address before we saw meaningful success."
> — Fareed Mosavat

**Two common mistakes:**
1. Thinking language translation is enough
2. Trying to leverage same growth approach as core market

**Adaptation dimensions:**

| Dimension | Considerations |
|-----------|----------------|
| **Language** | Localization to local languages |
| **User Needs** | Minimum market requirements (features users expect) |
| **Reach** | Distribution channels, discovery preferences |
| **Regulation** | Government requirements, technical limitations |

**Pinterest Germany example:**
- Language translation to German
- Customized topic recommendations for local tastes
- Deprioritized Facebook login (not popular in Germany)
- German URLs and backlinks for SEO loop

**Slack EU example:** Localization wasn't sufficient. Large enterprises required European data residency before adoption.

**Airbnb China example:**
- Enabled search for international destinations before domestic
- Rewrote website to HTTP-only so Baidu could index for SEO

**Tinder approach:** Make product available globally, attract users, then adapt based on success signals—don't over-invest upfront.

**Common overestimated capabilities:**
1. **Distribution** — Needs to adapt to regional norms (new channels, sales reps, strategies)
2. **Network effects** — Often local, don't transfer across regions

### Tech Adaptation

**When it makes sense:** Existing/potential alternative could disrupt your product using new technology.

**Chegg example:** Textbook rental → e-textbook rental. Had foresight to understand books would be digitally offered; disrupted own business before competitors could.

**Netflix example:** DVD by mail → Streaming. Saw streaming as way to bypass Blockbuster and disrupt own model. Functionally separated businesses to focus on new capabilities.

### Unbundling

**When it makes sense:** Splitting use case into separate company/product/app allows more effective competition.

**Three types of complexity reduction:**

| Type | Result | Example |
|------|--------|---------|
| **Organizational** | Separate company | PayPal spin-off from eBay |
| **Product** | Separate product | Foursquare → Swarm |
| **Application** | Separate app | Facebook → Messenger |

> "Is a portfolio better than a single product? In order for this to be true, the use cases for the two products need to be distinct and appeal to largely mutually exclusive sets of users."
> — Ravi Mehta

### Disruption Theory Context

From Clayton Christensen:

**Two premises:**
1. User needs evolve (demanding more)
2. Technology improves (cheaper, better, wider distribution)

**Disruption pattern:**
1. Startups target small/niche markets (negligible to incumbents)
2. As they scale, build advantages
3. Shift to new use case comes with new capabilities
4. Incumbents can't replicate effectively

**Result:** Product saturation, market saturation, and PMF degradation for incumbents.

**The Innovator's Dilemma:** Successful organizations focus on most profitable customers, avoiding disruptive opportunities that appear less attractive. Best companies overlook these.

**Solution:** Reorganize incentives for continual disruption. Some companies dedicate teams to trying to disrupt their own products.

---

## 8. Complementary Use Case Deep Dive

### Horizontal Expansion

Launch complementary use case as **new product** to existing market.

**Two types:**

**1. Customer Cross-Sell**
Sell more use cases to same user/customer.

| Example | Expansion |
|---------|-----------|
| Shopify | Core → Fulfillment (shipping/returns management) |
| Twilio | SMS → WhatsApp API, programmable chat, live video |
| Uber | Ride-hailing → Car rental for drivers (grow supply) |

**Goal:** 1 + 1 > 2. Combination creates more value than sum of parts.

**2. Departmental Cross-Sell**
Sell more use cases to different users in same organization.

| Example | Expansion |
|---------|-----------|
| ServiceNow | IT ops → HR, Customer Service |
| LinkedIn | Professional network → Recruiter tools → Sales tools → Marketing tools |

**Two misconceptions (opposite ends):**
1. Assuming relationship with one department guarantees cross-sell to another
2. Trying to get completely new persona when leveraging existing relationship is better

### Vertical Expansion

Add complementary use case **within existing product**.

**Two types:**

**1. Category Expansion**
Add similar use cases to existing product (especially marketplaces).

| Example | Expansion |
|---------|-----------|
| Instacart | Grocery → Pharmacy, electronics, prepared meals |
| Thumbtack | Handymen → Massage, house cleaning, other on-demand |

**Key insight:** Entry category should be high frequency. Instacart used groceries (most frequent) to build habit, then expanded to lower-frequency categories for monetization.

**Finding opportunities:**
- Search queries on your platform with zero results
- Adjacent high-volume Google queries

**Two mistakes:**
1. Not selling category expansion to existing users
2. Launching without understanding hidden complexity in new category

**2. Moving Up or Down Market**

| Direction | Definition | Example |
|-----------|------------|---------|
| **Up Market** | Smaller pool of larger, more valuable customers | Slack → Slack Enterprise (security/admin for large companies) |
| **Down Market** | Larger pool of smaller, less valuable customers | Uber Black → UberX → UberPool |

**Critical:** Adapt product to actual needs AND modify growth model for target audience. Same growth model often doesn't work for both segments.

### Platform Expansion

Add platform that leverages, reinforces, or monetizes existing network.

**Three types:**

**1. Developer Platform**
Links developers to end users. Developers build niche/adjacent use cases.

| Example | Value Created |
|---------|---------------|
| Shopify | Third-party apps for Shopify merchants |
| Salesforce | CRM extensions and integrations |

**Value creation:**
- Cross-side network effects (add developers to network)
- Mid/long-tail use cases without internal build cost
- Additional monetization channel

**Requirements before launching:**
- High variability of use cases (mid/long-tail you'd never build)
- Developer demand (big enough customer audience)
- Existing ecosystem of complementary products
- BD/partnership capability to grow developer base

**Five mistakes:**
1. "Build it and they will come" (gauge demand first)
2. Not incentivizing quality applications
3. No rating system for transparency
4. Poor documentation/API support
5. Poor app discovery for users

**2. Marketplace Platform**
Launch marketplace connecting supply to demand from existing user base.

**Two reasons:**

| Reason | Example |
|--------|---------|
| **Reinforce existing use case** | Epic Games Store (own gamer relationship, serve more use cases, acquire more gamers) |
| **Monetize network** | Facebook Marketplace (monetize users with low direct WTP) |

**Requirements:**
- Significant scale (large enough audience to attract supply)
- Additional utility to existing users
- Willingness to pay from audience

**3. Ad Network Platform**
Find advertisers interested in reaching your users.

**Two models:**

| Model | Mechanism | Example |
|-------|-----------|---------|
| **Social Media** | Large user base + targeting data | Facebook, Twitter, Snapchat |
| **E-commerce/Marketplace** | Supply pays to reach demand | Instacart (CPG brands), Etsy (creators) |

**Requirements:**
- Significant user volume
- Active, engaged users
- One side willing to pay to reach other side

---

## 9. New Use Case Deep Dive

### Why Higher Risk

New non-complementary use cases are riskier because:

1. **Less leverage** — Not building around existing PMF, just leveraging shared capability
2. **Less value synergy** — Doesn't add complementary value (no 1 + 1 = 3)
3. **More difficult execution** — More unknowns (markets, products, capabilities)

**When to use:** Significant PMF degradation. If existing PMF is degraded, no good foundation to leverage for adjacent opportunities. New use case expansion is riskiest/most expensive, so pursue only when other options aren't viable.

### Strategic Sequence

New product positions company for future complementary relationship.

**Square/Cash App example:**
- Square: Financial services for merchants
- Cash App: Consumer banking (transfer, save, invest)

Initially no reinforcement. Over time, linked:
- Sellers pay employee salaries via Cash App
- Boost loyalty: Cash App discounts at Square sellers
- Sellers market to prospective customers via Cash App

**Requirements:**
1. Clear picture of standalone value creation/capture
2. Product vision for how products link over time

### Diversification

Multiple bets across different use cases. Some fail, successful ones create significant upside.

**GE example:** Aviation, finance, healthcare, power—shared capabilities: common operating system, initiatives (globalization, Six Sigma), leadership development, values.

**Google Moonshots example:** Autonomous vehicles, cybersecurity, alternative energy—leveraging world-class AI capabilities.

> "Many companies get comfortable doing what they have always done, making only incremental changes. This incrementalism leads to irrelevance over time, especially in technology where change tends to be revolutionary, not evolutionary... We will not shy away from the high-risk, high-reward projects."
> — Alphabet 2019 Annual Report

**Requirements:**
- World-class capabilities in target markets
- Nascent, non-competitive markets
- Portfolio perspective (risk/reward allocation)
- High failure tolerance, outlier outcome potential
- Significant capital and long-term perspective
- Team autonomy

**Two risks:**
1. Diversification spreads business, reduces focus
2. Time horizon to value can be very long

### First and Best Customer

Build internal tool that solves internal problem, then commercialize.

> Coined by Ben Thompson (Stratechery)

| Example | Internal Use | External Product |
|---------|--------------|------------------|
| Amazon AWS | Solve internal tech infrastructure | Cloud services |
| Epic Games Unreal | Build Unreal game | Unreal Engine for games/movies |

**Requirements:**
1. Internal product/tool that could solve external market problems
2. Defined target market (often different from existing users)
3. Capabilities to commercialize

**Risk:** Teams over-index on internal tools believing they can be commercialized, when they should focus on core use cases.

**Mitigation:** Don't build internal tools with commercialization intent. Instead, consider commercialization only for existing great internal tools.

---

## Action Items

### For Saturation Assessment

- [ ] Identify which saturation type threatens your product (market, product, PMF degradation)
- [ ] Monitor lagging indicators (volume, metric stagnation, diminishing returns)
- [ ] Map competitive landscape for Red Queen dynamics
- [ ] Audit power user dependency in roadmap

### For Opportunity Evaluation

**Macro:**
- [ ] Answer five strategic questions for each opportunity
- [ ] Ensure leadership alignment before deep analysis

**Micro:**
- [ ] Score shared capabilities across all three categories
- [ ] Assess market attractiveness on all three dimensions
- [ ] Plot opportunities on PMF Expansion Map
- [ ] For low-capability/high-attractiveness: evaluate build/partner/acquire
- [ ] For low-attractiveness/high-capability: explore market redefinition

### For Execution

- [ ] Calibrate timing (not too early, not too late)
- [ ] Staff lean for speed and iteration
- [ ] Match launch approach to ambiguity level
- [ ] Define PMF indicators before jumping to growth
- [ ] Choose build/partner/buy based on capability gaps

---

## Key Frameworks Summary

| Framework | Purpose | Key Insight |
|-----------|---------|-------------|
| Three Saturations | Diagnose growth ceiling | Market, Product, PMF Degradation require different responses |
| PMF Expansion Categories | Classify opportunities | Adapted, Complementary, New—increasing risk/reward |
| Macro Evaluation | Strategic sense-check | Five questions from "Profit from the Core" |
| Shared Capabilities Assessment | Quantify "head start" | Functional, Domain-specific, Defensibility |
| Market Attractiveness | Assess opportunity value | Size, Growth, Competitive Density |
| PMF Expansion Map | Prioritize opportunities | 2x2 of capabilities vs. attractiveness |
| Launch Approaches | Match method to uncertainty | Experiment, MVP, Phased based on ambiguity |
| Disruption Theory | Anticipate competitive threats | User needs + technology improvement = disruption risk |

---

## Critical Gaps & Limitations

**Not Covered in This Module:**
- Portfolio management across multiple expansion efforts
- Resource allocation between expansion and core
- Organizational structure for expansion teams
- Detailed metrics for tracking expansion progress
- When to kill a failing expansion
- International expansion playbooks by region

**Assumptions:**
- Initial PMF already achieved
- Resources available for expansion investment
- Leadership alignment on expansion priority
- Sufficient data to evaluate shared capabilities

---

## Appendix: Key Examples by Strategy

| Strategy | Company | Expansion |
|----------|---------|-----------|
| **Geographic** | Slack | US → EU (data residency) |
| **Geographic** | Pinterest | US → Germany (localization + content) |
| **Geographic** | Airbnb | US → China (search + SEO adaptation) |
| **Tech Adaptation** | Netflix | DVD → Streaming |
| **Tech Adaptation** | Chegg | Physical → E-textbooks |
| **Unbundling** | Facebook | Core app → Messenger |
| **Unbundling** | PayPal | eBay → Standalone company |
| **Horizontal (Customer)** | Shopify | Core → Fulfillment |
| **Horizontal (Customer)** | Twilio | SMS → WhatsApp, chat, video |
| **Horizontal (Dept)** | LinkedIn | Network → Recruiter → Sales → Marketing |
| **Vertical (Category)** | Instacart | Grocery → Pharmacy, electronics |
| **Vertical (Up/Down)** | Uber | Black → X → Pool |
| **Platform (Developer)** | Salesforce | CRM → App ecosystem |
| **Platform (Marketplace)** | Epic Games | Games → Epic Games Store |
| **Platform (Ad Network)** | Instacart | Marketplace → CPG advertising |
| **Strategic Sequence** | Square | Merchants → Cash App (consumers) |
| **Diversification** | Google | Search → Moonshots (Waymo, etc.) |
| **First & Best Customer** | Amazon | Internal infra → AWS |
