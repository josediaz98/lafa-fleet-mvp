# [Feature Name]

> [One-line description] | [Date] | [Author]

**Team members:** [Names of team members]

## Status
- **Stage:** [Draft / In Review / Approved]
- **Last Updated:** [Date]

---

## CONTEXT

### 1. Opportunity

[What problem are you solving?]

[Which strategic lens does this feature advance and why? Choose from: Strategy, Vision, Customer, Business. Explain how this priority affects design and engineering trade-offs.]

| Lens | How This Feature Advances It |
|------|------------------------------|
| [Strategy / Vision / Customer / Business] | [Explanation of why this is prioritized through this lens] |

[What happens if we don't solve this? What is the cost of inaction?]

### 2. Target Audience

[Who is the specific sub-audience for THIS feature? Not the general product audience — the particular segment whose needs shaped this spec.]

[How do they differ from your overall audience or other segments? What distinguishes their needs in ways that affect implementation?]

| Distinction | How It Affects Implementation |
|-------------|-------------------------------|
| [Key attribute of target sub-audience] | [Design or engineering decision it drives] |

### 3. Customer Insights

[What are the most important insights from user research? Summarize key themes — do not just link to raw recordings.]

[What user quotes support these themes?]

**Key Insights:**

| Insight | Counterintuitive? | Material? | Impact on Implementation |
|---------|-------------------|-----------|--------------------------|
| [Insight from research] | [Yes/No — how it differs from default assumption] | [Yes/No — how it changes the problem or solution] | [What this means for design/engineering] |

### 4. Competitive Insights

[How do direct competitors solve this problem?]

[How do indirect alternatives (different category, same job-to-be-done) approach it?]

[Where have competitors failed? What are the differentiation opportunities?]

[Any inspiration from cutting-edge companies in other industries?]

**Research conducted:**
- Marketing & help articles: [What you learned]
- Reviews (App Store, G2, forums): [Pain points identified]
- Direct product use: [Hands-on findings]

### 5. Success Metrics

| Category | Metric | Target |
|----------|--------|--------|
| **Prioritized** | [Narrow subset to optimize for] | [Target value] |
| **Deprioritized** | [Metrics you explicitly don't care about affecting] | — |
| **Guardrail** | [Metrics that must NOT worsen] | [Threshold] |

---

## IMPLEMENTATION

### 6. Scope

[Bullet-point functional requirements — what the feature needs to do, not how it should work. Use lightweight format, not full user stories.]

**Now (v1):**
- [Core functionality 1]
- [Core functionality 2]
- [Core functionality 3]

**Next (v2):**
- [Follow-on functionality]

**Later:**
- [Future functionality — included so engineering can plan architecture]

### 7. Experience

[Design goals and key interaction principles — what the experience should feel like, not pixel-level details.]

[Ideally, the design team owns this section. PM provides goals; designer provides wireframes and micro-decisions.]

[Include annotated low-fidelity wireframes when possible — text descriptions alone can be interpreted differently.]

### 8. Implementation Details

[Only technical details that significantly alter the user experience. Leave algorithm and architecture choices to engineering.]

[Call out specific constraints if they exist: API limits, compliance requirements, latency targets, platform limitations.]

### 9. Launch Plan

[Roll-out strategy: A/B test, beta, soft launch, or phased regional rollout?]

| Phase | Description | Users | Duration |
|-------|-------------|-------|----------|
| [Phase 1] | [What happens] | [Approximate user count] | [Approximate duration] |
| [Phase 2] | [What happens] | [Approximate user count] | [Approximate duration] |
| [Phase 3] | [What happens] | [Approximate user count] | [Approximate duration] |

[Risk mitigation approach for each phase.]

### 10. Investigative Metrics

[Metrics to instrument as part of this feature for future decision-making. Each metric should answer a specific future question.]

| Category | Question | Metric to Instrument |
|----------|----------|---------------------|
| **Usage** | [How often is this feature used?] | [Specific metric] |
| **Functionality** | [What do users want to do that they can't?] | [Specific metric] |
| **UX** | [Where can we improve the experience?] | [Specific metric] |

---

## FAQ

[Document major decisions made during spec development. For each contentious decision, record the rationale so stakeholders can self-serve rather than scheduling meetings.]

| Question | Decision | Rationale |
|----------|----------|-----------|
| [Question stakeholders keep asking] | [What was decided] | [Why this was the right call] |

---

## Appendix

[Supporting data, wireframes, research links, related specs]
