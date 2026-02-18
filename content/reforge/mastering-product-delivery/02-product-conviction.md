# Product Conviction: Collected Insights
> Reforge - Mastering Product Delivery | Module 02

## Source

| Title | Type | Contributors |
|-------|------|--------------|
| Mastering Product Delivery: Product Conviction | Course Module | Matt Greenberg (Reforge CTO), Andy Johns, with references to Phil Tetlock, Clay Christensen, Stanley McChrystal, Everett Rogers, Enrico Fermi |

---

## Executive Summary

Product conviction is the foundational discipline that separates companies with consistent product success from those with long dry spells between wins. The core insight is counterintuitive: **going slow at the conviction stage enables going fast during execution**. Many organizations over-rely on "product sense"—the intuitive judgment of experienced leaders—which creates three problems: it's ambiguous and hard to teach, it doesn't scale as organizations grow, and even visionary founders can be wrong.

The conviction-building process consists of four interlocking elements: **customer value conviction** (validating you're solving a real problem for real users), **business impact conviction** (estimating revenue through lo-fi modeling), **effort required conviction** (identifying technical risks and constraints), and **product-engineering alignment** (ensuring both leaders independently support the initiative). This framework transforms fuzzy "product sense" into a structured, scalable process that creates organizational alignment.

The most powerful techniques in this framework are the **takeaway conversation** and the **lo-fi model**. The takeaway conversation forces honesty from potential customers by asking for real commitment (money, time) after they express interest—separating genuine demand from polite agreement. The lo-fi model breaks revenue estimation into smaller components using Fermi decomposition, producing more accurate forecasts while revealing the key assumptions that determine success or failure.

Building conviction typically requires 2-3 weeks of focused work before committing to 6-12 months of development. This investment is asymmetric: the downside is small (delayed start), while the upside is enormous (avoiding months of wasted effort on products that flop). The process also creates a critical artifact: documented hypotheses and assumptions that serve as benchmarks throughout development, enabling teams to understand *why* results differ from expectations rather than just observing that they do.

---

## 1. The Conviction Imperative

### Why Product Sense Alone Fails

Many organizations rely on a few key decision-makers with strong "product sense" when making big decisions about pursuing new ideas. This approach has fundamental limitations:

**The Scalability Problem**
- Product sense is ambiguous, making it difficult to understand and transfer
- It cannot scale as startups grow from a few people to hundreds
- Decentralizing decision-making requires something more teachable than intuition

**The Dependency Problem**
- The more you rely on product sense, the less you develop other abilities (communication, alignment-building)
- The more product sense you have, the less you feel the need to validate before building
- Teams struggle to achieve visionary goals without significant translation from the leader

**The Fallibility Problem**
> "Even product-led visionary founders can be wrong."

This is why great companies develop processes for building conviction around new product ideas—regardless of whether the idea came from product sense, customer interviews, usage data, or any other source.

### The Core Team Model

Building conviction requires a partnership between product and engineering leaders:

| Team | Members | Role |
|------|---------|------|
| **Core Team** | Product Leader + Engineering Leader | Drive conviction and alignment |
| **Core Team Members** | ICs reporting to Core Team | Brought in during development |
| **Dependency Team** | Design, Data, Marketing, Legal | Cross-functional support |
| **Exec Team** | Founders, C-suite, VPs | Support and guidance |

The process starts when a product leader engages an engineering partner. Winning an ally in this first conversation helps create a core team that can shape rough strategy into refined, executable vision.

### The Four Elements of Product Conviction

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCT CONVICTION                        │
├─────────────────┬─────────────────┬─────────────────────────┤
│ Customer Value  │ Business Impact │ Effort Required         │
│ (Product Lead)  │ (Product Lead)  │ (Engineering Lead)      │
├─────────────────┴─────────────────┴─────────────────────────┤
│              Product + Engineering Alignment                 │
└─────────────────────────────────────────────────────────────┘
```

**Best practice**: Both product and engineering leaders should understand all four elements deeply, even though responsibilities differ. Engineering leaders need to understand customer value and business opportunity. Product leaders need to understand technical risks and challenges.

### The Goldilocks Problem

> "When it comes to product conviction, more work isn't always better."

There's a spectrum from "product sense alone" to "full validation." The goal is an 80/20 answer that ensures quality decisions with imperfect information.

**Too little conviction**: Companies eager to build think 2-3 weeks of validation is excessive. But compared to the 6-12 months they're about to commit, it's well worth the investment.

**Too much conviction**: Running large-scale market research, developing detailed financial models, and aggregating expert insights creates overinvestment when there are still many unknowns.

> "Great teams know that they have to go slow to go fast. The best thing you can do to make products ship faster is know when to slow down and make sure you get all the right information." — Matt Greenberg

---

## 2. Defining the Customer

### The Ideal Customer Profile

Customer value conviction requires three components—like three legs of a stool:
1. An ideal customer profile
2. A valuable problem to solve
3. A user-validated solution

### Common Pitfalls in Customer Definition

**Pitfall 1: Same Customer Assumption**
- Assuming the new product is for the exact same core user you had before
- This optimizes for what your customer base looked like in the past
- *Example*: Apple continued releasing similar iPhones without adapting to emerging markets, leading to declining sales until they introduced lower-price phones

**Pitfall 2: "Everyone" as Customer**
- Trying to please multiple target users at once ("My product is for everyone!")
- A product designed for everyone ends up serving no one well
- *Example*: Chevy Volt tried to optimize for everyone with a hybrid approach, serving nobody well. Tesla started by selling a high-end sports car to ~2,500 customers, focusing on exceptional functionality for a niche

### The Three Attribute Types

| Type | Definition | Examples |
|------|------------|----------|
| **Demographic** | Observable characteristics | Age, Gender, Geography, Income, Education, Family size |
| **Psychographic** | Beliefs and values | Investment philosophy, openness to automation, preference for local experiences |
| **Position** | Role within organization/relationship | Industry, company size, title, budget authority, role in family |

### Case Examples

**Wealthfront Tax Loss Harvesting:**
- *Psychographic*: Belief in automation, long-term buy-and-hold investing, financially savvy but prefers delegation
- *Demographic*: Net worth <$1M, ages 25-35, Silicon Valley
- *Position*: Individual investors, some with shared household decisions

**Airbnb Experiences:**
- *Psychographic*: Believes in "off the beaten path" over tourist traps, globalized worldview
- *Demographic*: ~$50K income, coastal Millennials, college graduates
- *Position*: Single, with large mobile peer network that travels often

### Iterative Refinement

Product leaders should approach defining the ideal customer profile as an iterative process that evolves based on insights from early user research. The goal: identify 2-3 key attributes that specifically describe the user who will get the most value from the product—and is therefore most likely to adopt first.

---

## 3. Problem Definition & Validation

### The Four Problem Areas (CCFA Framework)

Every customer problem exists within one or more of these macro areas:

| Problem Area | Question | Example |
|--------------|----------|---------|
| **Cost** | Are current solutions prohibitively expensive? | High-end financial planning only available to wealthy |
| **Convenience** | Are current solutions easy to use? | Tax filing takes too long |
| **Functionality** | Do alternatives have necessary features? | Missing expense tracking for small business |
| **Access** | Are current solutions easy to access/adopt? | Local experiences not available through normal channels |

**Key insight**: These areas typically exist in a ranked order in the customer's mind. The goal is to document your assumption and test it to discover the true rank order.

*Example*: Tesla early adopters cared more about access to superior technology than price. Model 3 adopters care more about cost and less about functionality.

### Problem Severity Scale

| Level | Description | Implication |
|-------|-------------|-------------|
| **Vegetable** | Low intent to solve, low willingness to pay | Avoid building |
| **Vitamin** | Moderate desire to solve, moderate willingness to pay | Risky—could flop |
| **Painkiller** | Desperate to find solution, high willingness to pay | Best opportunity |

> "The most common mistake Product Leaders make is assuming all problems are painkiller problems. The truth is that most problems are low-grade, unworthy of a multi-month effort."

**Validation criteria for painkiller status**: Evidence that users have tried to solve the problem in multiple ways in the past. The more extreme their past efforts, the greater confidence it's a painkiller.

### Case Studies in Problem Definition

**Credit Karma Tax (Misunderstanding)**
- Assumed users' main problem was cost (wanting a truly free solution)
- Actual problem was convenience and functionality (which TurboTax already addressed)
- Result: Failed to win market despite being free

**Wealthfront 529 Plan (Misjudging Severity)**
- Thought they were solving significant pain with streamlined, automated experience
- Users were satisfied with existing solutions—didn't see it as worth trying something new
- Learned: 529 plans are the *last* financial product well-to-do households consider

**Quibi (False Problem Identification)**
- Identified trend toward shorter-form, mobile-first video
- Built short versions of traditional TV shows
- Missed that young consumers prefer user-generated, meme-oriented content over traditional sitcoms
- Form factor didn't matter—substance did

---

## 4. User Research Methods

### Who to Talk To

Start with your ideal customer profile hypothesis, then find users matching that profile in three groups:

| Group | Why | How to Find |
|-------|-----|-------------|
| **Existing Power Users** | Most engaged, likely early adopters, give candid feedback | Look at engagement metrics (frequency significantly above average) |
| **Power Users of Alternatives** | Fresh perspective, not biased toward your product | For new market creation: similar offerings in adjacent spaces. For low-end disruption: incumbent users |
| **Non-Customers (Matching Profile)** | Uninitiated perspective, less likely to give favorable responses | Match demographic/psychographic profile to your power users |

*Example*: Airbnb could have talked to users who stayed at hostels despite affording hotels—indicative of someone seeking "local experience" rather than just cost savings.

### The Long-Form Interview

An effective customer interview contains questions in these categories:

| Category | Purpose | Example Questions |
|----------|---------|-------------------|
| **Problem Introduction** | Orient user to general problem (not specific area) | "We're exploring the tax filing space—tell me about your experience" |
| **Customer Introduction** | Gather demographics, understand psychographic foundation | "When I say taxes, what comes to mind? What are your closest-held beliefs?" |
| **Problem Deep Dive** | Explore tools, services, software they've tried | "Where does filing taxes sit in your hierarchy of financial problems?" |
| **Problem Severity** | Determine vegetable/vitamin/painkiller status | Observe body language, tone, count alternatives they've tried |
| **Ownership & Decision-Making** | Identify owner vs decision-maker | "Who makes the final decision? If there's disagreement, how is it resolved?" |
| **Solution Discovery** | Let user describe ideal solution (don't lead) | "What would the ideal solution look like to you?" |
| **Price Discovery** | Understand mental model for payment | "How much would you pay? What other products do you pay similar amounts for?" |
| **Closing** | Capture anything missed | "Anything else you'd like to share?" |

**Critical mistake to avoid**:
> "The most common mistake in customer conversations is leading the witness by writing questions that align with your prior point of view. By doing so, you haven't validated anything new." — Andy Johns

### The Five Payment Modalities

| Modality | Best For |
|----------|----------|
| Transactional | One-time purchases, B2B |
| Monthly Subscription | Ongoing SaaS |
| Yearly Subscription | Committed users, reduced churn |
| Freemium | Volume-first, upgrade later |
| Free | Ad-supported, data-driven |

### The Takeaway Conversation

**The Problem with Soft Commitments**
> "It's easy for the customer to tell you 'Yeah, sure, sure. Go build that thing,' because they don't want to offend you. It's easier for them to give an appeasing answer and then you walk away with false signals." — Andy Johns

> "People are good at hearing what they want in user interviews. They are eager to hear that users want their solution. The truth is everybody wants everything until they have to pay for it, so wanting it isn't really that meaningful." — Matt Greenberg

**The Sell-Design-Build Method**

Traditional pathway: Design → Build → Sell
Better pathway: **Sell → Design → Build**

The takeaway conversation "sells" the concept before building:

| Step | Action | Purpose |
|------|--------|---------|
| 1. **Introduce Solution** | Verbally describe solution (1-2 min script) | Set clear expectations |
| 2. **Ask Soft Commitment** | "Would you want to use this product?" (yes/no) | Baseline interest |
| 3. **Introduce Takeaway** | Ask for real commitment (credit card, down payment, wire transfer) | Force genuine decision |
| 4. **Ask Firm Commitment** | Tabulate yes/no responses | Measure true demand |
| 5. **Drill Down** | For soft-yes → no conversions, ask "why?" persistently | Extract truth |

**Takeaway Examples by Business Model:**
- *Transactional/B2B*: One-time payment
- *Subscription*: Payment information or personal information
- *Wealthfront example*: Asked qualified users to wire $100,000 in the same week

**Critical rule**: A "soft yes" is a "no."
> "Anyone that's worked in sales knows that a hesitant 'yes' is actually a 'no'. Make sure to categorize any hesitant 'yes' responses as a 'no' response."

**How to drill down**:
> "If you haven't lost a few customers by the end of the takeaway exercise, because you made them uncomfortable with your persistence in understanding why they are reluctant to make a firm commitment after making a soft commitment, then you are not doing this portion of the process correctly. The truth is discovered uncomfortably." — Andy Johns

**Interpreting Feedback**:
- *Incompatible with idea*: Wrong customer profile—refine who you're targeting
- *Missing features/functionality*: Solution doesn't yet solve painkiller problem—continue research

### Sample Size Requirements

| Conversation Type | Minimum | Recommended |
|-------------------|---------|-------------|
| Long-form Interview | 10 | 10-30 |
| Takeaway Conversation | 10 | Several dozen |
| Prototype Testing | 10 | 10-30 |

Takeaway conversations are shorter (~10 minutes), enabling higher volume in less time.

---

## 5. Prototyping for Conviction

### The Three Prototype Types

| Type | Purpose | When to Use |
|------|---------|-------------|
| **Conceptual** | Test overall product idea and customer understanding | Early conviction stage (focus here first) |
| **Functional** | Test specific feature interactions | After concept validation |
| **Delightful** | Test emotional response | Refinement stage |

### Building Low-Fidelity Prototypes

At the conviction stage, use the lowest fidelity possible:
- Pencil sketches of key user flows
- Low-fidelity wireframes
- Walkthroughs with fake data
- Photos of sketches on mobile device
- Mock devices with simulated functionality

> "It's really difficult to have a successful kick-off meeting for a new product without having something tangible that shows your team the vision for the product you want to build." — Andy Johns

### Testing for Understanding vs. Delight

**Understanding**: User can concisely describe what you're building and its basic value.

**Moment of Delight**: Reaction to the product's unique value proposition—indication it solves a particularly painful problem.

> "There's a big difference between users who say, 'Ah I see, this is a productivity product' and those who express delight, like: 'Wow, when can I start using this!?' If you're not seeing the latter, you might not have figured out what the most important customer pain point and opportunity for delight are." — Andy Johns

**If no delight**: Go back to the drawing board. Otherwise, you'll spend months building a dud.

### Designing for Delight by Problem Area

| Differentiation | How to Prototype Delight |
|-----------------|-------------------------|
| **Cost** | End with fake payment page showing actual cost numbers |
| **Convenience** | Show automation in few clicks vs. analog alternative taking days/weeks |
| **Functionality** | Use fake data or mock experience showing unique capability |
| **Access** | Show how users get value not otherwise accessible to them |

*Wealthfront Example*: Differentiated on functionality and access (custom retirement plans previously requiring expensive financial planners). Built wireframes with hardcoded data simulating believable financial plans, plus "sliders" for real-time customization.

### Prototype Conversation Structure

1. Place prototype in front of user—no extended explanation
2. Ask them to review it
3. Ask them to describe what the product is at a high level
4. Give light instructions to guide them to experience the moment of delight (based on what they're trying to accomplish, not specific actions)
5. Look for signs of delight:
   - Expressions of being impressed, amazed, happy, enthusiastic
   - Emphasis on certain areas that stand out
   - Desire to explore more functionality than offered
   - Follow-up questions and desire to learn more

> "If users understand what you're building, and express zero emotion or enthusiasm for it, that should be a leading indicator that you might be proposing a solution to a low-grade problem." — Andy Johns

---

## 6. Business Impact Modeling

### Why Intuitive Estimates Fail

Product leaders often use intuition: "This product could generate $100M a year for us!"

**Three problems with this approach:**

1. **Humans are bad at complex estimation**
   > "One flap of a sea gull's wings would be enough to alter the course of the weather forever." — Edward Lorenz (butterfly effect)
   > "Small things in a complex system may have no effect or a massive one, and it is virtually impossible to know which will turn out to be the case." — General Stanley McChrystal

2. **No helpful reference points**
   If the product generates $60M instead of $100M, what happened? Without subcomponents, everyone has different opinions on what broke down.

3. **Leads to organizational skepticism**
   Executives might think it's conservative while others think it's exaggeration—creating implicit misalignment.

### The Lo-Fi Model Framework

> "A good lo-fi model is like Goldilocks. It's detailed enough to be clear and actionable, but not too detailed to create false precision." — Matt Greenberg

**Five Steps:**

| Step | Purpose |
|------|---------|
| 1. Define the Narrative | What story are you trying to tell? What must be true? |
| 2. Determine Time Horizon | How long until adoption and retention stabilize? |
| 3. Lay Out Model Structure | Break revenue into subcomponents |
| 4. Make High-Quality Estimates | Use Fermi decomposition (anchor + adjust) |
| 5. Sense-Check the Outcome | Range outputs, identify critical assumptions |

### Step 1: Define the Narrative

The narrative determines the model's purpose. Example questions:

- *Credit Karma Auto Insurance*: "What do I have to believe to be true for auto insurance to generate 10% of revenue growth in 3 years?"
- *Credit Karma Tax*: "What do I have to believe about acquisition and engagement for Tax to make sense as an investment?"
- *Facebook PYMK*: "What do I have to believe to increase engagement tier from 25% of users?"
- *Reforge Pricing Change*: "What do I have to believe for us to significantly increase growth without negatively impacting revenue?"

### Step 2: Determine Time Horizon

**Formula**: Time to Adoption Stabilization + Time to Retention Stabilization

**Adoption follows an S-curve** (Everett Rogers):
- Starts slow (Innovators, Early Adopters)
- Accelerates (Early Majority, Late Majority)
- Plateaus (Laggards)

More familiar products: 6 months to 1 year
New/innovative products: 2-3 years or longer

**Retention follows logarithmic decline**:
- Starts with all users
- Drops rapidly at first
- Plateaus at stable retention value

If you measure too early, you'll undervalue adoption and overvalue retention.

> "A common mistake when modeling for 2-3 year impact is forgetting the rest of the business changes, too. You need to think about what the business is going to look like in the future." — Matt Greenberg

**Default recommendation**: 2-3 year time horizon for most product innovations.

### Step 3: Model Structure

**Top Level**: Revenue Impact (expected annual revenue in time horizon)

**Split by User Type**:
- Revenue from New Users
- Revenue from Existing Users

**New User Revenue Formula**:
```
New Users Acquired × Retention Rate × Average Monetization per User
```

**Average Monetization Components**:
| Type | Formula |
|------|---------|
| **Direct (Subscription)** | Monthly price × 12 |
| **Direct (Transactional)** | Average order × Orders per year |
| **Direct (Ad-based)** | Impressions per year × Revenue per impression |
| **Indirect** | Cross-sell rate × Additional spend rate |

**Existing User Revenue Formula**:
```
Existing User Base (in time horizon) × Adoption Rate × Monetization Delta
```

**Cannibalization Factor**:
```
Existing Users × Cannibalization Rate × Lost Monetization per User
```

Cannibalization can be subtle—competing for time, attention, or money (premium dashboard space, email channel priority, etc.).

### Step 4: Fermi Decomposition

Named after physicist Enrico Fermi, who asked questions like "How many piano tuners are there in Chicago?"

**Two-step process:**

1. **Anchor** on external known data point
2. **Adjust** based on internal view of specific metric

*Example (estimating Chicago population)*:
- Anchor: NYC is ~9 million
- Adjust: Chicago is smaller, maybe a little less than half
- Estimate: ~4 million (actual: 2.7M—still much closer than random guess)

*Example (estimating retention)*:
- Anchor: Current product retention is 45%
- Adjust: New product is like early-stage existing product (before optimization)
- Estimate: ~33%

**Best practice**: Be conservative. If conservative estimates still show outsized impact, that's good. If optimism is required for success, that's a risk.

### Step 5: Sense-Check the Outcome

**Range your output**:
- Baseline case (your estimates)
- Pessimistic case (realistic low-end on least confident terms)
- Optimistic case (realistic high-end)

**Identify critical assumptions**:
- Which metrics disproportionately affect impact?
- These become the priorities in your delivery plan

*Amazon Personal Styling Example*: Recognized scaling personal stylists would be a major constraint. Large user base + high adoption = impossible to staff. Insight: Need tooling for 1:20 ratio instead of 1:10.

**Communicate the model as narrative**:
> "We can get to a revenue contribution of $100M in three years, and it's based on acquiring new users who we cross-sell our existing product to at a pretty high rate."

This helps teams understand what features matter and what investments (like marketing) are needed.

---

## 7. Estimating Effort & Feasibility

### The Engineering Leader's Role

Engineering leaders hold valuable information on risks and challenges critical to informed decisions. Once they understand the opportunity, their job is to lead trade-off discussions that help flesh out key challenges.

This is a high-level overview to influence go/no-go decisions—detailed scoping comes in the delivery plan phase.

### Three Types of Incompatibilities

**1. User Experience Incompatibilities**

Aspects of required UX that aren't currently well-supported.

*Example (Slack)*:
- Slack is **exact** (all 10 messages must go through) but not fully **real-time** (1-second delay is acceptable)
- Video game FIFA is **real-time** (cursor must move immediately) but not **exact** (9 of 10 button presses is OK)
- When Slack added real-time voice/video, they had technical incompatibility from the new UX requirements

**2. Infrastructure & Architecture Incompatibilities**

Requirements for new platforms, back-end architecture, or data.

*Example (Credit Karma Tax)*:
- Before Tax, every user needed connection to TransUnion Credit Database
- Tax product doesn't require credit database connection
- Decision needed: Allow accounts without database connection (changing existing product)? Or require Tax users to be connected (rejecting potential users)?

**3. Regulatory & Security Incompatibilities**

Requirements that don't exist today.

*Examples*:
- Launching in EU requires GDPR compliance you haven't needed
- Storing credit cards or SSNs requires new security layers

**Best practice**: For regulatory/security changes, bring in informed third party (in-house or consultant) to scope the work.

### Three Types of Constraints

**1. Timing Constraints**

Major sequencing dependencies with company roadmap.

*Example*: Company plans to migrate iOS app from Objective C to Swift this summer. Do you:
- Write only in Swift (can only launch when other teams finish)?
- Write in both languages (throw away Objective C work later)?

Engineering leaders must know the macro technical roadmap and highlight sequencing dependencies.

**2. Third-Party Integration Constraints**

Requirements to incorporate external functionality.

*Examples*:
- SMS integration (Twilio) may require RFP process before building
- Banking partner integration could create new regulatory requirements or change requirements over time

Third parties save time over building yourself but create complexity and unknowns.

**3. Specialty Resource Constraints**

Need for scarce internal expertise.

*Example*: ML component with only a few ML engineers introduces additional planning complexity.

---

## 8. Building Product-Engineering Alignment

### The Three-Step Alignment Process

| Step | Owner | Purpose |
|------|-------|---------|
| 1. Explain the Opportunity | Product Leader | Synthesize insights, get engineering on board |
| 2. Identify Risks & Challenges | Engineering Leader | Flag incompatibilities and constraints |
| 3. Align on Recommendation | Both | Independent recommendations on how to proceed |

**Critical**: Go through this live to prevent misinterpretations. Document key takeaways for later reference.

### Step 1: Product Leader Explains Opportunity

The role is to **influence**, not dictate. Walk through:

**Tactical Questions** (from conviction template):
- What problem are we solving?
- What solution are we building?
- Who is the user? Who is the buyer (especially B2B)?
- What evidence do we have?
- What does optimistic outcome look like? Pessimistic?

**Strategic Context Questions**:
- What is the unique moment of delight?
- Why are we the best company to build this?
- Why is now the right time?
- Have we tried building similar products before?
- How would this strengthen our existing product?
- How does this benefit our competitive position?
- What future opportunities would this create?

### Step 2: Engineering Leader Identifies Risks

Walk through:
- User experience incompatibilities
- Infrastructure/architecture incompatibilities
- Regulatory/security incompatibilities
- Timing constraints
- Third-party integration constraints
- Specialty resource constraints

**Subjective Discussion Questions**:
- What is the opportunity cost?
- What are the hardest and longest poles?
- What technical debt will be created?
- What past problems may be relevant?
- What are the biggest risks?
- What needs to be true for this to be a good opportunity?
- What conditions would make this a bad idea?

### Step 3: Independent Recommendations

Both leaders should develop recommendations independently, then compare:

| Recommendation | Meaning |
|----------------|---------|
| **Support** | Fully on board |
| **Conditionally Support** | On board if conditions are met (prerequisites, additional validation, stakeholder buy-in, timing) |
| **Conditionally Oppose** | Has reservations but willing to go forward if heard out ("disagree and commit") |
| **Actively Oppose** | Strong objections; will escalate if not addressed |

**Ideal outcome**: Aligned recommendations from both leaders.

**If misaligned**: Much better to understand this upfront and incorporate into planning than to let it go unnoticed.

> "The best way to screw up a project at this stage is to be in opposition at the start. That opposition compounds and dooms the project." — Matt Greenberg

---

## Action Items

### Immediate (Before Starting Any New Product)

- [ ] Document hypotheses for user profile, problem, and solution before any research
- [ ] Define ideal customer with 2-3 key attributes (demographic, psychographic, position)
- [ ] Identify problem areas (CCFA) and hypothesize rank order
- [ ] Classify problem severity (vegetable/vitamin/painkiller)

### Short-Term (User Research Phase)

- [ ] Identify power users to interview: existing, competitive, non-customers
- [ ] Conduct 10-30 long-form interviews using structured categories
- [ ] Run takeaway conversations—ask for real commitment, not soft yes
- [ ] Build low-fidelity conceptual prototype
- [ ] Test prototype with 10-30 users, looking for understanding AND delight

### Strategic (Business Case Phase)

- [ ] Build lo-fi model with defined narrative and 2-3 year time horizon
- [ ] Use Fermi decomposition: anchor on known data, adjust for specifics
- [ ] Sense-check with pessimistic and optimistic scenarios
- [ ] Identify 2-3 critical assumptions that disproportionately affect impact
- [ ] Document incompatibilities (UX, infrastructure, regulatory)
- [ ] Document constraints (timing, third-party, specialty resources)
- [ ] Ensure product and engineering leaders develop independent recommendations

---

## Critical Gaps & Limitations

### What This Framework Doesn't Cover

1. **Growth work and feature work**: Framework focuses on big bet innovations; sustaining innovations should use shorter cycles and experimentation
2. **Detailed delivery planning**: Covered in Module 03 (Dynamic Delivery Plans)
3. **Execution and adaptation**: Covered in Module 04
4. **Launch strategy**: Covered in Module 05
5. **Precise pricing**: Takeaway conversations provide range; experimentation calibrates exact price

### Assumptions to Test

- "Go slow to go fast" assumes time spent on conviction is actually shorter than time wasted on failed products
- Takeaway conversation effectiveness depends on ability to ask for meaningful commitment (harder for some products)
- Lo-fi model accuracy depends on quality of anchor data available

### When This Framework May Not Apply

- Very early-stage startups with no existing users or data to anchor on
- Incremental optimizations where pattern recognition from past work is sufficient
- Regulated industries where certain research methods may be restricted

---

## Key Quotes Index

| Quote | Attribution | Context |
|-------|-------------|---------|
| "Great teams know that they have to go slow to go fast. The best thing you can do to make products ship faster is know when to slow down and make sure you get all the right information." | Matt Greenberg | Core philosophy |
| "Product leaders often have an idea about what to build and just go build it, without first thinking about who they're building it for." | Andy Johns | Common pitfall |
| "You should ask yourself how your solution is 10X better than what's already out there. If you don't have a good answer for it, you're probably working on a sustaining innovation." | Matt Greenberg | Solution differentiation |
| "The most common mistake in customer conversations is leading the witness by writing questions that align with your prior point of view." | Andy Johns | Interview technique |
| "People are good at hearing what they want in user interviews. They are eager to hear that users want their solution. The truth is everybody wants everything until they have to pay for it." | Matt Greenberg | Takeaway rationale |
| "It's easy for the customer to tell you 'Yeah, sure, sure. Go build that thing,' because they don't want to offend you." | Andy Johns | Soft yes problem |
| "You basically want to find people saying: 'I'll pay you for this right now, it's that big a problem for me, can I pre-sign up?'" | Matt Greenberg | Takeaway goal |
| "A soft yes is a no." | Andy Johns | Takeaway interpretation |
| "If you haven't lost a few customers by the end of the takeaway exercise, because you made them uncomfortable with your persistence... you are not doing this portion of the process correctly. The truth is discovered uncomfortably." | Andy Johns | Drilling down |
| "It's really difficult to have a successful kick-off meeting for a new product without having something tangible that shows your team the vision." | Andy Johns | Prototype importance |
| "There's a big difference between users who say, 'Ah I see, this is a productivity product' and those who express delight, like: 'Wow, when can I start using this!?'" | Andy Johns | Understanding vs. delight |
| "If users understand what you're building, and express zero emotion or enthusiasm for it, that should be a leading indicator that you might be proposing a solution to a low-grade problem." | Andy Johns | No delight = problem |
| "A good lo-fi model is like Goldilocks. It's detailed enough to be clear and actionable, but not too detailed to create false precision." | Matt Greenberg | Lo-fi model philosophy |
| "A common mistake when modeling for 2-3 year impact is forgetting the rest of the business changes, too." | Matt Greenberg | Time horizon modeling |
| "The best way to screw up a project at this stage is to be in opposition at the start. That opposition compounds and dooms the project." | Matt Greenberg | Alignment importance |

---

## Appendix: Blue Apron Case Study

Throughout the module, Blue Apron is used as a running example for launching a two-sided platform connecting users and chefs.

### Customer Profile
- Millennial families, $120K household income
- Believe in healthy home-cooked meals
- Open to delegating home tasks to professionals
- Households with kids over age 10 showed strongest interest

### Problem Definition
- Problem areas: Convenience and Access ranked highest, followed by Cost
- Pain points: Meal prep takes too much time, cleaning is a mess, variety is limited
- Severity: Significantly increased due to pandemic, especially for time-constrained households (e.g., new parents)

### Solution
- Two-sided platform connecting users and chefs
- Blue Apron provides ingredients; chefs prepare meals weekly
- Essential features: Bundled meals + cooking service, customized ingredients/recipes, payment functionality
- Innovation type: New market creation

### Takeaway Results
- 50 users interviewed
- 15 said no immediately
- 35 said yes to soft commitment
- 25 were strong yes after takeaway
- 10 were soft yes (converted to no)
- Signal: Solution in right direction, needs refinement

### Lo-Fi Model Structure
```
Revenue = (Total Users × $/User × Retention) - Cannibalization

Where:
- Total Users = New Users + (Existing Users × Adoption Rate)
- $/User = $/Week × Weeks/Year
- Cannibalization = Adopted Users × $/Year × Cannibalization Rate
```

### Prototype Learnings
- Strong understanding of how service works (booking chefs, choosing recipes, selecting meals)
- Open question: Where cooking happens (preference for chef's kitchen due to COVID concerns)
- Moment of delight: Feeling of having meals for entire family for full week without worrying about groceries or cooking

### Engineering Assessment
- UX: Need messaging feature between users/chefs, interface for location/availability matching
- Infrastructure: New architecture for chef data (different from users), algorithm for supply/demand management
