---
name: tech-decision
description: Create a Technical Decision Record (TDR) that justifies architecture, build-vs-buy, infrastructure, scale, risk, or AI deployment decisions. Connects technical choices to business strategy using structured frameworks.
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
argument-hint: "[decision-topic]"
---

# Tech Decision — Technical Decision Record Writer

Generate a Technical Decision Record (TDR) — an Architecture Decision Record enhanced with strategic frameworks that connect technical choices to business outcomes.

## Core Principle

**Every technical decision is a business decision.** Technical choices don't exist in isolation — they sit within a Strategy Stack that connects Mission → Company Strategy → Product Strategy → Technical Strategy → Roadmap → Goals. A TDR makes this connection explicit.

## When to Use

- Choosing between architectural approaches (monolith vs microservices, API design, data model)
- Evaluating build vs buy decisions (make-or-buy, vendor selection)
- Justifying scale work (infrastructure investment, refactoring, performance)
- Prioritizing risk work (security, compliance, operational reliability)
- Making AI deployment decisions (model selection, RAG vs fine-tuning, build vs prompt)
- Establishing or changing guiding principles (development standards, customer principles)

## Supporting Files

| File | Purpose |
|------|---------|
| `framework.md` | 13 curated decision frameworks — Strategy Stack, Portfolio, Build vs Buy, Scale Work, Risk, AI Deployment, Guiding Principles, and more |
| `template.md` | Copy-paste-ready TDR template with strategy alignment, business impact translation, and tradeoff sections |
| `examples.md` | 15+ real-world case studies organized by decision type — build vs buy, architecture, scale, risk, AI, principles, and anti-patterns |

## Process

### Step 1: Gather Context

If an argument is provided, use it as the decision topic. Otherwise, ask the user:

1. **What technical decision needs to be made?**
2. **What are the options being considered?** (at least 2)
3. **What's the business context?** (company stage, team size, financial constraints)
4. **What's the timeline pressure?** (is this urgent or can we take time to evaluate?)

If working within the LAFA project, read relevant files from `content/` to gather context automatically.

### Step 2: Classify the Decision

Identify the decision type. This determines which frameworks to apply:

| Decision Type | Primary Frameworks | Key Question |
|---------------|-------------------|--------------|
| **Architecture** | 3-Tier Architecture, Innovation Spectrum, Scope-Time-Resource | "What system structure best serves our strategy?" |
| **Build vs Buy** | 4-Factor Scorecard, Differentiators vs MMRs | "Should we own this capability or purchase it?" |
| **Scale Work** | Goldilocks Decision, Impact Matrix, Threshold-Setting | "When and how much should we invest in infrastructure?" |
| **Risk Work** | Sliding Scale vs Binary, Likelihood × Impact | "How do we protect against this threat?" |
| **AI Deployment** | 7-Step Deployment Framework, Optimization Hierarchy | "How should we leverage AI for this problem?" |
| **Guiding Principles** | Vector Math of Teams, Customer/Development Principles | "What standards should govern our decisions?" |

Read `framework.md` for the detailed frameworks relevant to the decision type.

### Step 3: Map to Strategy Stack

Connect the decision to the organization's strategic hierarchy:

1. **Company Strategy** — How does this decision connect to the company's overall plan?
2. **Product Strategy** — What product goal does this enable? ("What should we build, and why?")
3. **Technical Strategy** — What does this make possible? ("What else is possible?" — this is the unique value of strategic technical leadership)

### Step 4: Classify in Portfolio

Determine if this is **Product Work**, **Scale Work**, or **Risk Work**:

- **Product Work** — Adds new value: new features, new value props, new markets
- **Scale Work** — Preserves value at growth: infrastructure, tooling, performance, refactoring
- **Risk Work** — Protects value: security, compliance, operational reliability

Justify the classification. Note: the same work can span categories (e.g., a migration that is both scale and risk).

### Step 5: Analyze with Type-Specific Frameworks

Apply the relevant frameworks from `framework.md`:

**For Build vs Buy decisions:**
- Score each option on the 4-Factor Scorecard (Strategic Value, Resources, Cost, Vendor Reliability)
- Classify the capability as Differentiator or MMR
- Consider the Innovation Spectrum position

**For Scale Work decisions:**
- Apply the Goldilocks Decision (too early / just right / too late)
- Map impact using the Impact Matrix (Direct/Indirect × Quantitative/Qualitative)
- Set thresholds using product data, customer data, and competitor data

**For Risk decisions:**
- Classify as Sliding Scale or Binary outcome
- For sliding scale: calculate Risk = Likelihood × Impact
- For binary: identify the unaffordable outcome → must mitigate regardless

**For AI Deployment decisions:**
- Walk through the 7-Step Deployment Framework
- Position on the Performance Optimization Hierarchy
- Apply minimum effective intervention principle

**For Architecture decisions:**
- Evaluate through the 3-Tier Architecture lens (where does constraint flow?)
- Position on the Innovation Spectrum (commodity ↔ highly innovative)
- Pressure-test with Scope-Time-Resource triad

**For Guiding Principles decisions:**
- Derive customer principles from the value proposition
- Evaluate against the three attributes (Foundational, Dynamic, Pervasive)
- Consider when to break vs change a principle

### Step 6: Translate to Business Outcomes

Use the Translation Framework to connect the technical decision to business metrics:

1. **Technical change** — What changes in the system?
2. **Intermediate effects** — What does the change enable?
3. **Business outcome** — How does it affect the North Star metric?
4. **Sense Check Math** — Rough but useful quantitative estimate

Read `examples.md` for examples of how real companies translated technical decisions.

### Step 7: Document Tradeoffs

For each alternative considered:
- Describe the option clearly
- List pros and cons
- Apply framework-specific analysis (scorecard, risk assessment, etc.)
- Explain why it was or wasn't chosen

### Step 8: Apply Guiding Principles Check

Verify alignment with existing principles:
- **Customer principles** — Does this serve what customers value most?
- **Development principles** — Does this align with how the organization builds software?
- If breaking a principle, justify with one of two valid reasons: (1) the principle doesn't serve its purpose here, or (2) two principles conflict

### Step 9: Write the TDR

Read `template.md` and produce the Technical Decision Record. Include all sections with sufficient detail for the decision to be understood, reviewed, and revisited.

## Output

A complete Technical Decision Record in markdown format, saved to the user's preferred location. The document should:

- Be self-contained (readable without external context)
- Connect the technical decision to business strategy
- Show the analysis framework used
- Document alternatives with structured comparison
- Include rough quantitative estimates where possible
- Set a review date for revisiting the decision

## Quality Checklist

- [ ] Decision connects to Strategy Stack (company → product → technical)
- [ ] Portfolio classification is justified (product / scale / risk work)
- [ ] At least 2 alternatives analyzed with framework-specific scoring
- [ ] Business impact translated with sense check math
- [ ] Tradeoffs explicitly documented
- [ ] Guiding principles check completed
- [ ] Review date set
