# Eric (Gusto, Lattice, Dropbox): Collected Insights
> GM of New Lines of Business at Dropbox | Former PM Leader at Lattice & Gusto

## Sources

| Title | Type | Date | Link |
|-------|------|------|------|
| Product Foundations W4 - Live Course | Course Session | Jan 17 | Internal |

**Additional Speaker:** Course Instructor (Former Zynga PM - Anon)

---

## Executive Summary

Eric's career spans three distinct product challenges: launching complex regulated products at Gusto (health insurance), executing a company-wide AI pivot at Lattice, and now building entirely new business lines at Dropbox. His experience reveals a central tension in product management: **the systematic approaches we're taught to validate ideas often fail spectacularly, yet building without any validation is reckless.**

His resolution to this paradox is nuanced: testing can identify *problems worth solving* but cannot reliably predict *whether a specific solution will work*. The only true validation comes from building and shipping. However, this doesn't mean abandoning research—it means being honest about what research can and cannot tell you, and structuring teams and investments to fail fast when the inevitable surprises occur.

The practical implications reshape how he approaches product work: small teams with senior leadership for unvalidated ideas, explicit investment thresholds that mirror startup funding rounds, and a bias toward shipping imperfect products quickly over perfecting untested designs. His most counterintuitive insight is that **having too many people on a new project is just as damaging as having too few**—excess headcount creates pressure to make premature decisions and bogs teams down in coordination overhead.

For career progression, Eric draws a clear line: before director level, execution quality matters more than outcomes. After director level, only results matter—luck and skill become indistinguishable.

---

## 1. The Validation Paradox

### The Core Problem

Testing and validation—the activities PMs are told will de-risk their work—often fail to predict real-world outcomes. Eric presents two case studies where careful testing led to catastrophically wrong conclusions:

**Case 1: Gusto Health Insurance (Human vs. Computer)**

Gusto hired a licensed health insurance broker to test their purchase flow. They wrote scripts, created Google Sheets mockups, and walked customers through the process manually. The approach worked brilliantly—90% conversion when the broker recommended a single plan.

They built the exact same flow in software: same recommendation algorithm, same information, same design. Conversion collapsed to near zero.

> "The reality was that even though the information we were presenting was the same, a computer presenting it is super untrustworthy because people are so used to all these SaaS companies lying through their teeth about customization and personalization. Whereas when you're talking to a human on the phone or on Zoom who tells you 'I looked at your business, and this is what I recommend'—that is trustworthy."

The fix was counterintuitive: show three options but recommend one. Customers needed the *illusion of choice* to trust the software recommendation. Nearly everyone chose the recommended option anyway.

**Case 2: Zynga Slots Game (Australia vs. US)**

Zynga wanted to estimate lifetime value for a new slots game before US launch. They launched in Australia first—English-speaking, culturally similar, same app store mechanics.

Australian LTV was through the roof. They set US ad spend high based on this data and lost over $1 million in the first week.

> "There's a Wikipedia page about how much Australians gamble. None of us knew this at the time."

### Why Testing Fails

Two fundamental issues make testing unreliable:

1. **You aren't always sure you learned what you thought you learned** - The variables you're measuring may not be the variables that matter
2. **It's nearly impossible to distinguish good tests from bad tests** - Small details (human vs. computer, Australian vs. American gambling culture) can invalidate everything

### The Expert Paradox (Bell Curve Meme)

Eric references the bell curve meme where beginners and experts think alike, while mid-career people overthink:

| Career Stage | Approach |
|--------------|----------|
| **Early career** | "I'm gonna go build some stuff" |
| **Mid career** | "I'm gonna do the analysis, figure out the TAM, do the testing, validate, do UXR, do all the stuff before we build" |
| **Late career** | "You basically only get the real learnings when you build. Until you've built a thing and people give you money for it, you haven't really validated anything" |

> "Many of you will work with UXR teams that will come back with these beautifully polished decks that make it seem like they've talked to a gazillion customers. They know exactly what you need. The insights are perfect. And it's just all gonna be wrong. And it's not them. It's just the way the world works."

---

## 2. Building vs. Testing Philosophy

### Eric's Position: Build First

> "Only way is to do something. It's the only way, man. It's the only way."

His evolution: Five or ten years ago, he would have advocated for user research, validation studies, UXR, pricing surveys with Likert scales. Now he doesn't believe in any of it.

### The Instructor's Moderated Position

Testing *can* reliably identify whether a problem exists:

> "Something that user research could do an excellent job of helping you understand is whether your thing is actually a problem today. Now it doesn't tell you whether people will use it. It doesn't tell you if you built the right product, but you can figure out if there is pain in a certain area."

This prevents catastrophic errors (building something nobody wants) while accepting that solution-level validation will likely be wrong.

### When Your Data Conflicts With Your Mental Model

> "If you have a really good mental model of the customer in your head, anytime your data starts conflicting with your mental model of your customer, you should be very wary."

In the instructor's experience, **7 out of 10 times** conflicting data indicates a problem with the data, not with your understanding.

> "Don't be afraid to make decisions based on your intuition that are validated with data. Don't just follow the data wherever it leads. That is not the job of a product manager. Your job is to exercise good judgment that is backed by data, but it's not to just do whatever the data says."

### Iterative vs. One-Shot Decisions

Most validation decisions are iterative, not single experiments:

> "If you see six times in a row that people don't want something, unlikely that the seventh time is really the time that works. Be careful about extrapolating one experiment or one test to projecting the future."

### Don't Be Clever (Except Where You Must)

> "I've learned as a PM not to be clever. Anytime I think I'm being really smart is usually the time when I'm dumbest."

**Look at market analogs:** Do any other health insurance brokers only present one option? No. There's probably a good reason.

> "If you're going to be clever, be clever on the things that you need to differentiate in the market. We didn't have to be clever on the shopping experience. We needed it to work. The thing that was clever was that we were offering this all-in-one platform."

**Rebrand/Redesign Trap:** Collectively, everyone else has spent tens of millions optimizing conversion. Thinking you'll get it right on the first try never works.

---

## 3. MVP Scoping & The 80% Trap

### The Compounding Problem

Health insurance has countless variables: eligibility rules, start dates, waiting periods, deductions based on age/state. Gusto's MVP approach: pick the most common option (80%+) for each variable.

> "We chose the 80% for each of the 10 [variables]. The problem is you do well for the first thing—I cover 80%. And the second thing, you cover 80%. But it's not the same 80% as the first thing. So it's 80% of 80%. You do that 10 times: 80% × 80% × 80% × 80%... and you end up with a pretty small number."

**Result:** Of ~20 customers they were handling manually, they could only support about 2 with the MVP.

### The Median Customer Doesn't Exist

> "The median customer doesn't exist. You average all of the dimensions—their age, their industry—but the person who meets all of those is a tiny fraction of your customers."

### Time Cost of Perfectionism

The Gusto team spent excessive time perfecting details, design, storytelling, and visuals for the purchase flow that ultimately failed.

> "We probably could have put that actual purchase flow—the one that failed—in market six weeks sooner if we had been willing to just be a bit more uncomfortable with it. And we would have learned, and we could have iterated, and we could have polished a gem instead of polishing a turd, which is what we had."

---

## 4. Company Pivots & Category Creation

### Lattice Context

Lattice sold aspirational HR software: engagement, performance reviews, talent management. When interest rates were zero (2020-2023), companies had unlimited budgets for anything that kept employees happy.

**The 2023 Shift:**
- Interest rates rose
- Tech layoffs began (net seat contraction vs. expansion)
- CFOs pushed consolidation: "We're already paying for Workday. We can just pay them $2,000/year instead of $250,000"

> "I was convinced that this suite of talent solutions was dead in the water. We would be treading water in the low 9 figures of revenue forever. Maybe get profitable, maybe get eaten up by a PE firm."

### Two Strategic Options

| Option | Description |
|--------|-------------|
| **Category Creation** | Become an AI company—leverage LLMs for unstructured data, tap into coaching market |
| **Platform Play** | Become the core HR platform—"Don't consolidate to Workday, consolidate to Lattice" |

---

## 5. AI as Product Strategy

### Phase 1: Understanding the Technology

> "When GPT stuff came out three years ago, nobody knew how to do any of that. I had to send people to go do online AI classes just to understand how this stuff works."

### Phase 2: Start With Text Summarization

LLMs are good at text summarization. Find every place you show text in the app and summarize it:
- Engagement survey results → identify themes
- Peer feedback during performance reviews → group into themes

> "These features got adopted much faster than many other things we had built and honestly spent way, way more time on."

**Critical:** Build engagement mechanisms to measure actual usage (not just page views):
- Do they visit the screen with themes?
- Do they put those themes in the performance review?

### Phase 3: New Use Cases

Lattice launched an AI agent/assistant:
- Connect to HR content
- Answer questions based on company policies
- No more asking HR about career frameworks, leave policy, etc.

> "Adoption of that was really, really, really good too... Daily engagement of Lattice significantly higher than it was when I started because we created things that add value day to day."

### Investment Evolution

| Stage | EPD Investment |
|-------|----------------|
| Initial pitch to board | 5% (debate about whether to do AI at all) |
| When Eric left | 20% |
| Likely now | Higher |

**Note:** Even Jack Altman (Lattice founder, Sam Altman's brother) had debates about whether AI investment was worth it in early days.

---

## 6. Investment & Greenlight Processes

### Dropbox Context

Dropbox generates $2B+ ARR from file sync/sharing. Market cap flat for 10 years. Past bets (photos, chat, collaborative workspace) all lost to competitors. Eric now runs all new forward-facing projects.

### Startup-Style Investment Thresholds

Map internal investment to startup funding rounds:

> "What is the angel, the seed, the series A, the series B, the series C for the 'startups' in the company? And what are the metrics they need to hit?"

Get CFO buy-in on total budget allocation with deployment rules:
- Not all capital deployed on day one
- Thresholds determine when to deploy more
- If milestone not hit → retro or kill

### Translating Product Goals to Business Outcomes

> "The more senior I get, the more I have to translate between product and customer goals and business outcomes. Am I accountable to a VP of product who wants a great product, or a CFO who may not care at all about the product, or the board who really doesn't care about the product?"

---

## 7. Team Sizing & Organizational Structure

### The Danger of Too Many People

> "It is just as bad to have too many people working on a new project or a new idea as it is to have not enough."

**What happens with excess headcount:**
- Time consumed by sprint planning and ticket writing
- Pressure to make premature decisions to "keep the pipeline busy"
- No idea what you should be doing or why
- "Have to keep the train moving"

**Gusto Health Insurance Example:**
> "Our founders really wanted to do health insurance really fast. We just put a whole team on it. The problem is if you're a PM and you've got a whole team, but you haven't done the research ahead of time, it's really hard to keep people busy on useful things."

**Lattice AI Example:**
> "Just started with one engineer. One engineer and one PM. Just find everything in the product you can summarize and go build a screen to summarize it. Track on the back end who actually engages with it and call them."

**Scaling principle:** Increase staffing based on validated work, not anticipated work.

### General Manager Model (Early Stage)

For unvalidated businesses, use a single-threaded leader:
- One "throat to choke" for overall business
- Responsible for every function
- Often product background
- May be "shitty manager for engineers"—provide separate coaching

**Amazon:** Single-threaded leader
**Apple:** DRI (Directly Responsible Individual)

### Functional Leader Model (Scaled Stage)

Once a business hits scale, shift to functional leaders:
- VP of Product, VP of Engineering, etc.
- Most senior people lead functions, not businesses

**Trade-off:** No single throat to choke for individual business lines.

### The Three Phases

| Phase | Leadership Model | Focus |
|-------|------------------|-------|
| Seed/Growth | General Manager | Proving business viability |
| Scale | Functional Leaders | Building excellent teams |
| Mature | Functional Leaders | Operational excellence |

---

## 8. PM Career Progression & Accountability

### The Director Line

There's an explicit dividing line at director level:

| Level | What Matters |
|-------|--------------|
| **Pre-Director** | Execution quality, team dynamics, product mechanics |
| **Director+** | Results only |

> "If you're not yet a director, I don't really care if the thing worked because it's not your responsibility... Did you do all the things you were asked? Did you execute well? Does the team like working with you? Did you run good product?"

### At Senior Levels, Only Results Matter

> "At senior levels, all I care about are results. If I'm hiring you as a VP of product, deliver or you don't. I know that sounds really cold-hearted."

### The Luck vs. Skill Problem

> "Once you get sufficiently senior, the only thing that matters is did it work. Were you lucky or were you good? I'm not sure. I guess we'll find out on the next go around."

There is genuinely no way to distinguish luck from skill at the highest levels. The only validation is repeated success.

### Evaluating PM Quality (When Results Aren't Clear)

Questions Eric asks:

1. **Given the information we knew at the time, was it a good bet?**
2. **Did we approach it in a way that makes logical, rational sense?**
3. **If I walk through the product flows myself, does it solve the stated hypothesis?**

> "A lot of times you'll be surprised. Go through products and the product—there's a bunch of cool ideas that team got to through consensus—doesn't meet any rational hypothesis."

---

## Action Items

### For Individual Contributors

- [ ] **Stop perfecting untested designs** - Ship 6 weeks earlier in imperfect state
- [ ] **Build engagement mechanisms** into any new feature to measure actual usage
- [ ] **Look at market analogs** before being clever with solutions
- [ ] **Focus on problems, not solutions** when doing upfront research

### For Product Leaders

- [ ] **Right-size teams** to match validation level—one PM + one engineer for unproven ideas
- [ ] **Create explicit investment thresholds** that mirror startup funding rounds
- [ ] **Use GM model** for new business lines, functional model for scaled ones
- [ ] **Get CFO buy-in** on budget allocation rules before starting new initiatives

### For Career Development

- [ ] **Pre-director:** Focus on execution quality, team relationships, product mechanics
- [ ] **Post-director:** Accept that only results matter; luck and skill are indistinguishable
- [ ] **Build customer mental models** that let you recognize when data is wrong

---

## Critical Gaps & Limitations

1. **Survivorship bias** - We only hear from Eric because his bets worked out. Failed PMs with identical approaches aren't teaching courses.

2. **Company context matters** - Gusto, Lattice, and Dropbox are all well-funded tech companies. Advice may not transfer to bootstrapped startups or non-tech industries.

3. **The "just build" philosophy assumes resources** - Small teams still need salaries. Not everyone can afford to build and learn.

4. **No framework for when to abandon** - How many failed iterations before killing a project? Thresholds mentioned but not detailed.

5. **Tension between "don't be clever" and "differentiate"** - The line between necessary differentiation and unnecessary cleverness is never clearly defined.

---

## Key Quotes Index

| Topic | Quote |
|-------|-------|
| Testing limits | "Until you've built a thing and people give you money for it, you haven't really validated anything" |
| Trust gap | "A computer presenting it is super untrustworthy because people are so used to SaaS companies lying" |
| Cleverness trap | "Anytime I think I'm being really smart is usually the time when I'm dumbest" |
| Team sizing | "It is just as bad to have too many people working on a new project as it is to have not enough" |
| Median fallacy | "The median customer doesn't exist" |
| Career accountability | "At senior levels, all I care about are results. Deliver or you don't" |
| Data vs. intuition | "Don't just follow the data wherever it leads. That is not the job of a product manager" |
| Iteration speed | "We could have polished a gem instead of polishing a turd" |
