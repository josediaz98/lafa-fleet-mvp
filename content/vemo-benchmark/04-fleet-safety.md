# Fleet Safety: Emergency Protocols, C2 Operations & Insurance

> How Vemo operationalizes EV fleet safety — emergency response, monitoring, QHSE structure, and insurance alignment.

## Source
VEMO Talks #4 webinar. Speakers: Marcos Blasi (Environmental Projects Engineer, VEMO), Matias Galuzio (Business Operations Manager, VEMO), Daniela Cepeda (Director of Public Affairs, AXA Mexico). Reference sources cited: US Fire Protection Agency training manual; German EV incident response guide (2021).

---

## 1. The 3-Step Emergency Protocol

### Step 1: Identify
- **Assess risk level**: High risk (fire, incapacitating smoke) → evacuate immediately, call authorities. Low risk (smell, unusual noise, malfunction) → proceed with protocol
- **Identify vehicle make/model** → determines fuel type and response approach
- **Emergency scenarios**: Collision with structural damage; irritating odor (eyes/nose/throat/skin = possible battery damage); smoke/noise/leaks (sparking or bubbling sound = battery irregularity)

### Step 2: Immobilize
- Stop in a safe, flat, open location away from people, objects, and traffic
- Put vehicle in Park, engage parking brake
- Block wheels with chocks (critical on any incline)

### Step 3: Disable
- Turn off engine/motor
- Remove ignition key, move it **at least 5 meters** from vehicle (prevents proximity key re-ignition)
- **Disconnect the 12V auxiliary battery** (if safe to do so) — this de-energizes the high-voltage system AND disables airbags
- Three methods to disconnect 12V battery:
  1. Circuit breaker switch (under driver/passenger seat)
  2. Exposed cable section with label (cut with insulated tool)
  3. Traditional terminal disconnection

> **[LAFA]** These three steps should be core driver training content. The 12V disconnect method is OEM-specific — document the exact method for each Geely/JAC/GAC model.

---

## 2. Battery Fire Response

### The Combustion Triangle
- **Heat**: Overcharging, excess power, impact damage → generates in battery cells
- **Oxygen**: Ambient air + chemical decomposition within damaged cells (batteries generate their own oxygen)
- **Fuel**: Plastics, polymers, electrolyte hydrocarbons in battery casing

### Suppression Rules

| Fire Source | Extinguisher |
|-------------|-------------|
| Non-battery (conventional) | CO2 or dry powder |
| Smoking (any source) | CO2 or dry powder |
| **Battery fire** | **Large quantities of water only** |

- **Do NOT use conventional extinguishers on battery fires** — water is the only effective agent because it removes heat (batteries generate their own oxygen, so you can't smother them)
- **Thermal runaway**: Fire within cells cascades — more heat → more cells compromised → positive feedback loop
- **Always use full PPE + autonomous breathing equipment** — battery fires produce toxic gases
- **Inform emergency services** with: vehicle type (EV vs. hybrid vs. ICE), battery chemistry, fire location

---

## 3. Post-Incident Handling

### Towing
- **EVs cannot be towed by dragging** — no neutral position; wheel movement can damage motor or trigger regenerative braking → restart fire
- **Must use flatbed/horizontal platform** — wheels must not rotate
- **Post-incident storage**: Minimum **15 meters** from any object or occupied space — fire can reignite from residual battery energy

### Passenger Rescue
- Vehicle must be fully stabilized before extraction
- **Do not place jacks/supports** where they could puncture battery or contact high-voltage conductors
- High-voltage cables and batteries are NOT in standard rescue/egress routes
- Many EVs have **high-resistance steel pillars** — require specialized cutting tools

### Special Situations
- **Charging station fire**: Treat as electrical fire; disconnect charger from vehicle or de-energize charger; move nearby vehicles
- **Vehicle rollover**: EVs are designed for rollovers — no electrocution risk while high-voltage conductors remain insulated; help passengers exit; do NOT perform the 3-step protocol

---

## 4. EV-Specific First Aid

| Injury | Cause | Response |
|--------|-------|----------|
| Burns | Fire, battery chemicals | Remove clothing, wash with water 20+ min, call emergency |
| Eye contact | Battery gases/chemicals | Flush eyes with water 20+ min, call emergency |
| Electrocution | High-voltage conductors (up to 800V DC) | Use insulating material to separate victim, CPR if needed |
| Inhalation | Battery smoke/gases | Move to ventilated area, administer oxygen if possible |
| Ingestion | Battery fluids | Do NOT induce vomiting, drink large amounts of water |

---

## 5. Vemo's Safety Operations

Matias Galuzio revealed Vemo's operational safety infrastructure:

- **Fleet model**: DaaS fleet running mostly BYD vehicles on DiDi, 2 shifts (constant operation)
- **Four operational areas**: Fleet ops, charging hubs, in-house maintenance workshops, charging infrastructure installation

### Monitoring & Response
- **GPS fleet tracking**: Real-time location, route monitoring, danger zone alerts, speeding detection
- **C2 Monitoring Center**: Real-time communication with drivers; intervenes on unsafe behavior
- **Panic buttons** in all vehicles — driver safety + passenger service quality
- **Norwegian fire blankets**: Space-industry technology; smothers fire, lowers battery temperature, contains toxic smoke. Staff trained by professional firefighters

### Driver Standards
- **~80% approval rate** in training program (safety + service quality focused)
- **Zero-tolerance alcohol policy**: Breathalyzer every shift before departure; failure = immediate suspension
- **PPE mandatory** across all operations — zero tolerance

### QHSE Team
- **Joan Castellano** (QHSE Lead) — ex-Schlumberger, managed largest Mexico base (Villahermosa)
- Field engineers conducting audits
- Monitoring team at C2 center
- Process documentation manager
- Safety policy signed by CEO
- **Alejandro Tinoco** (Training Manager) — 20 years at ADEO, runs "Universidad VEMO"

> **[LAFA]** Vemo's safety stack (C2 center, GPS, panic buttons, fire blankets, QHSE org) represents significant operational maturity. Building basic C2 monitoring + daily alcohol testing should be Track A foundation priorities. Fire blankets are particularly relevant as LAFA scales charging hubs.

---

## 6. Insurance & Regulatory Context (AXA Mexico)

- **AXA's "shared value" model**: Better fleet safety → fewer incidents → fewer claims → aligned insurer + operator interests
- **Mexico's General Mobility and Road Safety Law**: National framework for minimum safety standards across all 32 states
- **"Safe Systems" approach (WHO)**: Assumes humans will make errors → system design must prevent fatalities regardless
- **AXA climate commitments**: Own fleet transitioning from ICE → hybrid → EV; "AXA Climat" unit for climate risk; Paris Agreement alignment
- **Health context**: ~25,000 annual deaths in Mexico from respiratory diseases linked to environmental quality
- **Coalition "Movilidad Segura"**: ~100 civil society organizations across 32 states

> **[LAFA]** AXA's alignment between insurance and EV fleet safety is a partnership angle. LAFA's fleet data (incident rates, driver behavior, battery health) could support preferential insurance rates.

---

## Action Items

### Immediate (Track A Foundation)
- [ ] Obtain Emergency Response Guides for all three OEM models (Geely, JAC, GAC)
- [ ] Document the specific 12V battery disconnect method per model
- [ ] Implement daily alcohol/substance testing at shift start
- [ ] Develop 3-step emergency protocol training for all drivers
- [ ] Source and evaluate fire suppression blankets (Norwegian or equivalent)

### Short-term (Month 2-4)
- [ ] Build basic C2 monitoring — GPS tracking + real-time driver communication
- [ ] Install panic buttons in fleet vehicles
- [ ] Create emergency action plans for each hub/depot
- [ ] Establish PPE requirements and zero-tolerance enforcement

### Strategic (Month 6+)
- [ ] Hire or designate QHSE lead with fleet safety experience
- [ ] Explore insurance partnership (AXA or similar) leveraging fleet data for preferential rates
- [ ] Develop "Universidad LAFA" training program mirroring Vemo's model
- [ ] Build structured driver approval/certification process (target >80% pass rate)

---

## Key Technical Rules (Reference Card)

- **NEVER** disassemble a battery pack or cut high-voltage conductors — always treat as fully energized
- High-voltage conductors carry up to **800V DC** — orange insulation is the universal identifier
- Battery fires: **water only**, in large quantities
- Post-incident EVs: **flatbed only** (no drag towing), store **15+ meters** from anything
- The **12V auxiliary battery** energizes the high-voltage system — disconnecting it de-energizes everything
