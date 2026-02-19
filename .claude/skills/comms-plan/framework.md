# Communication Delivery Strategy Framework

## 1. The Tactical Layer

A brilliant narrative delivered through the wrong medium, in the wrong setting, at the wrong moment can fall flat just as easily as a poorly structured one. Tactical choices — format, channel, mode, and timing — are strategic decisions disguised as logistical ones.

When you choose to present your strategy as a slide deck in a large meeting versus a written one-pager over email, you are choosing:
- How much control you retain over the narrative
- How deeply the audience engages with details
- Whether they formulate objections before discussing with you
- Whether you can read the room in real time

**The pipeline:** `/story-arc` builds *what* you say. `/stakeholder-map` determines *who* hears it and with what engagement level. This skill — `/comms-plan` — determines *how, when, and where* you deliver it.

---

## 2. Five Format Types

A format is the medium through which your story is physically delivered.

### Format Profiles

| Format | Best For | Tradeoffs |
|--------|----------|-----------|
| **Presentation** (Slides) | Combining visual + narrative, controlling pacing, guiding through a linear argument | Can oversimplify; favors presenter framing over audience analysis |
| **Written** (Memos, one-pagers, PRFAQs) | Deep analysis, async consumption, durable artifacts, forcing clear thinking | Gives up real-time narrative control; audience may skip or skim |
| **Video** (Pre-recorded) | Narrative control + async accessibility; broad reach when live delivery is impractical | One-directional; no real-time Q&A or discussion |
| **Conversation** (Verbal, nothing documented) | Early-stage ideas, sensitive topics, rapid decisions, reading the room | No durable artifact; nothing for absent people or future reference |
| **Design/Diagram** (Miro, Figma, LucidChart) | Systems, workflows, user journeys, architectural decisions, structural relationships | Requires visual literacy; weak on communicating the *why* behind decisions |

### Format Tradeoff Dimensions

| Dimension | One End | Other End |
|-----------|---------|-----------|
| **Depth vs. Accessibility** | Written (enables depth) | Presentation (enables accessibility) |
| **Storyteller Control vs. Audience Autonomy** | Presentation, Video (more control) | Written, Diagram (more autonomy) |
| **Synchronous vs. Asynchronous** | Conversation, Presentation (synchronous) | Written, Video, Diagram (asynchronous) |

### Format Selection Questions

1. Does my audience need to **analyze details** or **grasp a high-level narrative**? → Details: Written/Diagram. Narrative: Presentation.
2. Will this be consumed **live** or **asynchronously**? → Async: Written/Video. Live: Presentation/Conversation.
3. Do I need a **durable artifact** that outlives the meeting? → Yes: Written/Diagram. No: Conversation is fine.

### Multiple Formats for One Story

You often need multiple formats for different audiences or phases:
- **Primary format** for the core story (e.g., written document for detailed analysis)
- **Derivative formats** for specific contexts (e.g., presentation for the live meeting, diagram for the technical discussion)

### Format Anti-Patterns

| Anti-Pattern | What Goes Wrong | Fix |
|-------------|-----------------|-----|
| **Default to slides** | Using presentations when written analysis would serve better — hiding behind slide design instead of thinking clearly | Ask: "Does this audience need my narration, or would they get more value reading this themselves?" |
| **Conversation for important decisions** | No artifact, no record, no reference for absent stakeholders | Document the outcome even if the discussion was verbal |
| **Written for emotional content** | Customer pain and vision lose impact when read vs. presented | Deliver emotional content live; use written for evidence and analysis |

---

## 3. Five Channel Types

If format is the container, channel is the stage. The channel determines the social context — who's in the room, how they interact, what dynamics shape the conversation.

### Channel Profiles

| Channel | Good For | Poor Fit |
|---------|----------|----------|
| **Large Meetings** (All-hands, reviews, steering committees) | High-level storytelling, broad reach, formal announcements, shared experience | Decisions, nuanced discussion — group dynamics make dissent risky |
| **Small Meetings** (3-8 people, working sessions) | Decisions, alignment, working through tradeoffs — enough intimacy for real discussion | Large groups, simple updates — overkill for information sharing |
| **1:1s** | Honest first reactions, sensitive feedback, pre-selling, relationship building | Day-to-day updates, broad information sharing |
| **Email/Slack** | Day-to-day updates, status sharing, async distribution, written records | Decisions (no real-time alignment), first-time important communications (messages get lost) |
| **Workshops** (Design sprints, brainstorming, inceptions) | Co-creation, building alignment on ambiguous topics, low-trust situations | Leadership approval (leaders don't want to brainstorm), simple information sharing |

### Channel Mechanism

| Factor | How It Varies |
|--------|--------------|
| **Group size** | Large meetings (many) → 1:1s (two) |
| **Formality** | Large meetings (formal) → Conversation (informal) |
| **Synchronicity** | Meetings (synchronous) → Email (asynchronous) |
| **Directional flow** | Large meetings (one-directional) → Workshops (multi-directional) |

### Channel Anti-Patterns

| Anti-Pattern | What Goes Wrong | Fix |
|-------------|-----------------|-----|
| **Decision by email** | Asynchronous debate spirals; no one commits | Move decisions to small meetings; use email for pre-read |
| **First exposure in a large meeting** | Group dynamics amplify skepticism; leaders pile on objections | Pre-sell in 1:1s; use the large meeting for ratification only |
| **Workshop for leadership approval** | Leaders feel their time is wasted; they want to evaluate, not brainstorm | Present to leadership; workshop with teams |

---

## 4. Decision Matrices

These matrices map the intersection of **audience type** and **communication goal** to recommended formats and channels.

### Format × Goal × Audience Matrix

| Goal | Leadership | Teams | Dependent Stakeholders | Company |
|------|-----------|-------|----------------------|---------|
| **Inform** | Presentation | Written | Written + Design/Diagram | Presentation + Video |
| **Decide** | Written + Conversation | Written + Conversation + Design/Diagram | Presentation + Conversation + Design/Diagram | N/A |
| **Approve** | Presentation + Design/Diagram | Written | Presentation + Design/Diagram | N/A |
| **Review / Feedback** | Written | Written | Written | Presentation + Video |

**Key patterns:** Written format appears most frequently — it's the foundational PM format. Leadership decision-making pairs written analysis with conversation. Company-wide communication uses presentation or video for scale. Dependent Stakeholders frequently need diagrams to see how work fits into systems they own.

### Channel × Goal × Audience Matrix

| Goal | Leadership | Teams | Dependent Stakeholders | Company |
|------|-----------|-------|----------------------|---------|
| **Inform** | Established cadences | Established cadences | Email/Slack | Email/Slack |
| **Decide** | Small meeting | Workshop | Small meeting + Workshop | N/A |
| **Approve** | 1:1 pre-sell → Large meeting to ratify | 1:1 pre-sell → Large meeting to ratify | 1:1 pre-sell | N/A |
| **Review / Feedback** | Small meeting or Email/Slack | Small meeting or Email/Slack | Email/Slack | N/A |

**Key patterns:** The Approve row is most actionable — it recommends a two-step process: pre-sell in 1:1s, then ratify in the large meeting. The Inform row emphasizes using established cadences rather than creating new meetings. The Decide row distinguishes leadership (small meeting) from teams (workshop).

### Cross-Referencing Both Matrices

For maximum effectiveness, consult both simultaneously. Example: Leadership + Approve →
- Format matrix: Presentation + Design/Diagram
- Channel matrix: 1:1 pre-sell → Large meeting
- **Combined:** Prepare a presentation with supporting diagrams, pre-sell in 1:1s, then present formally for ratification.

---

## 5. Five Proactive Modes

Proactive storytelling encompasses five planned delivery modes. All use the same story structure — what changes is channel, format, depth, and audience participation.

| Mode | Description | Control Level | Best For |
|------|-----------|-------------|----------|
| **Pitch** | Compact, elevator-pitch version of your story. Short, clear, main points only. | Maximum | Quick decisions, initial introductions, generating interest for deeper engagement |
| **Pre-Sell** | Individual conversations with stakeholders before a formal presentation. | High (individual) | Aligning multiple people on a significant decision; the stakes of a misaligned meeting are high |
| **Inform** | Lightweight updates — no ask, no decision, just keeping people in the loop. | Passive | Execution phases; stakeholders need to know work is on track |
| **Report** | Backward-looking — sharing what was delivered and what impact it had. | Shared | Post-launch results; building trust through follow-through |
| **Workshop** | Collaborative — building the story WITH the audience, not presenting TO them. | Collaborative | Discovery/planning; story is still taking shape; input strengthens it |

### Lifecycle-to-Mode Mapping

| Initiative Phase | Situation | Recommended Mode |
|-----------------|-----------|-----------------|
| Discovery | Low alignment, exploring the problem | Workshop |
| Planning | Need approval to proceed | Pre-Sell → Pitch |
| Execution | On track, keeping stakeholders informed | Inform |
| Execution | Need a mid-course decision | Pitch + Pre-Sell |
| Post-launch | Sharing results and impact | Report |

### Mode Anti-Patterns

| Anti-Pattern | What Goes Wrong | Fix |
|-------------|-----------------|-----|
| **Pitching when you should workshop** | Presenting a formed opinion when the audience needs to co-create | If alignment is low or the story is still forming, workshop first |
| **Informing when you need a decision** | Burying a decision inside a status update | Separate informational updates from decision-requiring communications |
| **Reporting only successes** | Polished highlight reels erode credibility over time | Honest reports that acknowledge what didn't work build more trust |

### The Pre-Sell as Most Versatile Tool

Pre-selling appears across multiple frameworks because it addresses multiple needs simultaneously:
- **Strategic:** Builds alignment before the high-stakes meeting
- **Quality:** Provides early feedback to refine the story
- **Political:** Establishes supporters in the room
- **Psychological:** Reduces the presenter's anxiety

The pre-sell level per stakeholder is determined by `/stakeholder-map` (co-creation, feedback, advice, or pre-read). Here in comms-plan, we plan the *delivery execution* — when, where, and with what format.

---

## 6. Reactive Storytelling

PMs frequently face situations where they must tell their story without preparation. Three types of reactive situations, each with a different response strategy.

### Three Reactive Situations

| Situation | What Happens | Response Strategy |
|-----------|-------------|-------------------|
| **Q&A Known** | Someone asks a question you know the answer to | Answer directly → Bridge to your talking points → Connect to your story |
| **Q&A Unknown** | Someone asks a question you don't know the answer to | Share what you DO know (talking points) → Acknowledge the specific question → Commit to following up with a timeline |
| **Surprise Pitch** | You're asked to share your work with no preparation | Fall back on your elevator pitch → Cover key points at high level → Offer to follow up with documentation |

### Five Skills for Reactive Improvement

1. **Prepare** — Build your story structure and talking points as a permanent mental model. Always be ready to advocate for your product and team.

2. **Build your own Q&A** — Compile likely questions with concise answers. Five universal questions to always have ready:
   - How does this impact company/org goals?
   - How did you validate the opportunity?
   - What other options did you evaluate?
   - Why do we need to do this now?
   - How does this impact other work?

3. **Practice the redirect** — Answer the specific question asked, then add context that reconnects to your talking points. Not evasion — genuine bridging.

4. **Eye contact + brevity** — Direct eye contact and short answers signal confidence. Long, wandering answers signal uncertainty.

5. **"Let me get back to you"** — Professional, honest. Share talking points, acknowledge the gap, commit to a specific follow-up timeline. Then actually follow through.

### The Story Kit

Maintain a living "story kit" for each major initiative:

| Component | What It Contains | Update Frequency |
|-----------|-----------------|-----------------|
| Elevator pitch | 30-second PRAA summary | Every major milestone |
| Talking points | 3-5 key arguments | Monthly |
| Q&A bank | 5-10 questions + concise answers | Before any meeting where your work might come up |
| Format-channel plan | Audience-specific delivery strategy | Each initiative phase |

---

## 7. Confidence Building

Confidence is not a personality trait — it's a byproduct of thorough preparation. The Prepare-Practice-Feedback loop provides a structured path.

### The Loop

**Prepare:**
- Know your story outline by writing it out (writing forces clarity)
- Define 3+ key talking points with supporting evidence
- Build a personal Q&A — anticipate questions and prepare confident answers

**Practice:**
- Memorize your *structure*, not your *words* (scripted delivery sounds artificial)
- Record yourself on Zoom and watch it back — take notes on what to adjust
- Practice with trusted teammates or people outside the story context

**Feedback:**
- Self-assessment is unreliable — you can't simultaneously deliver and objectively evaluate
- Ask trusted colleagues for specific feedback: "Was this clear? Was this convincing? Did the format work?"
- Create psychological safety for the feedback-giver — welcome honest critique, not just validation

### Building a Room of Supporters

From improv comedy: performance gets better when you trust the people on stage have your back. Pre-selling creates this dynamic. If you're nervous about presenting to a particular audience, pre-sell to the people who make you most nervous. When key decision-makers are already on your side, you present to allies, not judges.

**The dual benefit:** Pre-selling creates better *outcomes* (strategic) AND a better *experience* for the presenter (psychological).

---

## 8. Company Culture as Context

Every tactical recommendation is filtered through organizational norms. Culture acts as a **constraint function** on tactical choices.

### Culture Archetypes

| Culture Type | Format Norm | Channel Norm | How to Navigate |
|-------------|------------|-------------|----------------|
| **Meeting-heavy** (e.g., GoDaddy era) | Flexible formats | Decisions happen in meetings; people expect inclusion | Use meetings for formal storytelling; supplement with written pre-reads |
| **Written-first** (e.g., PandaDoc, Amazon) | Written memos mandatory | Meetings become discussion of pre-read documents | Develop strong writing skills; story must work on the page |
| **Transitional** (e.g., BILL moving to written) | Mixed — established norm + emerging norm | Uncertainty about expectations | Follow established norm for formal communications; experiment with new norm informally |
| **Async-heavy** (remote-first) | Written + Video | Slack/email primary; meetings reserved for decisions | Master async storytelling; use video for emotional/vision content |

### Culture Navigation Strategy

1. **Diagnose first:** Ask your manager about preferences. Observe what successful PMs do. Note mandates or strong norms.
2. **Conform initially:** Start by matching the culture. Build credibility within existing norms.
3. **Deviate strategically:** Once credible, push boundaries when the story's stakes justify the friction.

### Culture Anti-Patterns

| Anti-Pattern | What Goes Wrong | Fix |
|-------------|-----------------|-----|
| **Fighting the culture** | Using written memos in a meeting culture — or vice versa — without earning the right | Conform first; deviate when credibility is established |
| **Ignoring subcultures** | Engineering prefers written docs but sales prefers presentations — using one format for both | Adapt format to the audience's subculture, not just the company norm |
| **Confusing format preference with quality** | "We're a slides company" doesn't mean slides are always the best format | Use the cultural format as the primary medium; supplement with better-suited formats |

---

## 9. The Inception Framework (Workshop Mode)

When the proactive mode is Workshop, the Inception is the most structured playbook for converting a story into a shared execution plan.

### Nine Stages

| # | Stage | Purpose | Duration | Key Output |
|---|-------|---------|----------|------------|
| 1 | **Sponsors Overview** | Tell the story to all participants; align on WHY | 1-2 hours | Shared understanding of problem, result, and ask |
| 2 | **Sliders** | Prioritize success parameters and tradeoff decisions | 30-60 min | Ranked priorities (time vs. experience vs. budget vs. scope) |
| 3 | **Scoping** | Define in-scope and out-of-scope for this timeframe | 1-2 hours | Explicit scope boundaries |
| 4 | **Anchors & Engines** | Identify success factors (engines) and failure risks (anchors) + mitigations | 1-2 hours | Risk register with mitigation plans |
| 5 | **Epics** | Break into functional groups; write epics each team will execute | 2-4 hours | Cross-functional epic list |
| 6 | **Stories** | Break epics into stories | 2-4 hours | Story-level backlog |
| 7 | **Milestones** | Plot milestones over time; align across teams | 1-2 hours | Program-level timeline |
| 8 | **Sponsors Readout** | Share outcomes with sponsors and stakeholders | 1 hour | Executive summary of the plan |
| 9 | **Next Steps** | Define and assign next steps | 30 min | Accountable action items |

### When to Use Inception vs. Lighter Alternatives

| Signal | Use Full Inception (1-5 days) | Use Lighter Alternative |
|--------|------------------------------|------------------------|
| Team size | 8+ people across functions | <8 people |
| Alignment level | Low — team has little shared context | High — team already understands the initiative |
| Complexity | Multiple workstreams, dependencies | Single workstream |
| Stakes | Major initiative, significant investment | Incremental improvement |

---

## 10. Quick Reference

### The Complete Delivery Planning Process

```
DIAGNOSE CULTURE ──→ SELECT FORMAT ──→ SELECT CHANNEL ──→ CHOOSE MODE ──→ SEQUENCE
(Company norms)     (5 types)        (5 types)          (5 proactive)    (Timeline)
```

### Format Quick-Select

| If the audience needs to... | Use... |
|----------------------------|--------|
| Analyze details | Written |
| Grasp a narrative | Presentation |
| Consume asynchronously | Written or Video |
| See system relationships | Design/Diagram |
| Decide quickly | Conversation |

### Channel Quick-Select

| If the goal is to... | Use... |
|---------------------|--------|
| Inform broadly | Established cadences, Email/Slack |
| Make a decision | Small meeting (leadership), Workshop (teams) |
| Get approval | 1:1 pre-sell → Large meeting to ratify |
| Get feedback | Small meeting or Email/Slack |

### Proactive Mode Quick-Select

| If you're in... | Use... |
|-----------------|--------|
| Discovery phase | Workshop |
| Planning phase (need approval) | Pre-Sell → Pitch |
| Execution phase (on track) | Inform |
| Post-launch | Report |

### Reactive Preparation Checklist

- [ ] Elevator pitch memorized (structure, not script)
- [ ] 3-5 talking points ready
- [ ] 5-10 Q&A answers prepared
- [ ] Comfortable saying "Let me get back to you"
- [ ] Practiced the redirect technique
