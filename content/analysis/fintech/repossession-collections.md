# LAFA: Repossession & Collections

**Last updated:** February 6, 2026
**Scope:** Arrendamiento financiero legal structure, GPS/kill switch mechanics, recovery timeline, default economics, industry benchmarks.

---

## 1. Legal Structure

**Arrendamiento financiero** (financial lease) is optimal for LAFA:
- LAFA retains **legal title** throughout the lease
- Upon default, recovery is "return of own property" — not seizure of debtor's property
- Faster and cheaper than judicial foreclosure
- Clear framework compliant with CONDUSEF (Comision Nacional para la Proteccion y Defensa de los Usuarios de Servicios Financieros — Mexico's financial consumer protection agency that regulates collections practices, prohibits harassment, and can sanction abusive recovery tactics)

**SOFOM ENR** (Sociedad Financiera de Objeto Multiple, Entidad No Regulada) is the standard legal vehicle for fintech lending/leasing in Mexico. LAFA's privacy policy already mentions SIC queries, suggesting authorization is in process.

## 2. GPS & Kill Switch

- **GPS tracking:** Legal with informed consent. LAFA's privacy notice covers "geolocalizacion del vehiculo."
- **Remote immobilization:** Not explicitly prohibited. Industry standard for fleet leasing (PassTime, Ituran, CalAmp widely used).
- **Requirements:** Contract disclosure, driver consent, never activate while in motion, 24-72h written notice after default.
- **Risk:** CONDUSEF cautions against unsafe practices. Robust documentation essential.

## 3. Recovery Timeline & Cost

| Day | Action | Cost |
|-----|--------|------|
| 0-7 | First missed payment → automated WhatsApp reminder | ~MXN $0 |
| 7-14 | Second missed → direct phone call | ~MXN $50-100 |
| 14-21 | Third missed → formal demand letter | ~MXN $500-1,500 |
| 21-30 | Fourth missed → restructuring offer or final notice | ~MXN $200-500 |
| 30-45 | Vehicle recovery via GPS + recovery team | MXN $3,000-8,000 |
| 45-60 | Refurbishment and redeployment | MXN $2,000-5,000 |
| **Total non-judicial** | | **MXN $5,750-15,100 (~USD $290-755)** |

If judicial action needed: MXN $35,000-80,000 + 3-6 months.

## 4. Default Economics

**Worst-case cost of one default:**
| Item | Cost |
|------|------|
| Lost revenue (2 months) | MXN $24,000 |
| Recovery costs | MXN $10,000 |
| Refurbishment | MXN $5,000 |
| Lost utilization (~30 days idle) | MXN $12,000 |
| **Total** | **MXN $51,000 (~USD $2,550)** |

At 5% default rate on 100 vehicles: MXN $255,000/year = MXN $213/vehicle/month — manageable if priced into lease rates.

## 5. Industry Default Benchmarks

| Metric | Industry Range | Best-in-Class |
|--------|---------------|---------------|
| Default rate (monthly) | 5-15% | <5% (see [competitive-landscape.md](../market/competitive-landscape.md) §1: OCN) |
| Vehicle utilization | 70-85% (early) / 85-95% (mature) | 95%+ (Splend at maturity) |
| Break-even per vehicle | 18-36 months | 18 months (optimistic) |
| Driver retention (annual) | 60-80% | 80%+ with lease-to-own |

---

---

## 6. Escalation Decision Tree

When a driver enters delinquency, LAFA should follow a graduated process that minimizes cost and maximizes recovery:

```
PAYMENT OVERDUE
    │
    ├─ Day 1-7: Automated reminder (WhatsApp)
    │   └─ Pays? → YES → End. Log in history.
    │             → NO → Escalate to Day 7-14
    │
    ├─ Day 7-14: Direct phone call + restructuring offer
    │   └─ Accepts restructuring? → YES → New payment plan (max 2 restructurings per driver)
    │                              → NO → Escalate to Day 14-21
    │
    ├─ Day 14-21: Formal demand letter (CONDUSEF-compliant)
    │   ├─ Product type?
    │   │   ├─ DaE: Suspend shift assignments. Driver without income = immediate pressure.
    │   │   └─ LTO: Notification of possible vehicle recovery. 7-day deadline.
    │   └─ Pays? → YES → Reactivate. Flag in profile (higher risk).
    │             → NO → Escalate to Day 21-30
    │
    ├─ Day 21-30: Critical decision
    │   ├─ DaE: Terminate employment contract + recover vehicle (LAFA is the owner)
    │   └─ LTO: Activate GPS + schedule recovery with team
    │       └─ Driver cooperates? → YES → Voluntary surrender (cost: MXN $2,000-3,000)
    │                               → NO → Team recovery via GPS (cost: MXN $5,000-8,000)
    │
    └─ Day 30+: Post-recovery
        ├─ Refurbishment (MXN $2,000-5,000)
        ├─ Reassign vehicle to next driver on waitlist
        └─ If outstanding debt >MXN $30,000: evaluate judicial action (MXN $35,000-80,000 + 3-6 months)
            └─ Only if amount justifies cost. For debts <MXN $30,000: write-off and blacklist.
```

## 7. Implications for LAFA

- **The arrendamiento financiero (financial lease) is the right structure.** LAFA retains legal title to the vehicle throughout the contract. Recovery is "return of own property," not seizure -- faster, cheaper, no court proceedings required.
- **Weekly payments are the early warning system.** With monthly payments, a default is detected at 30 days. With weekly payments (aligned to gig cash flow), it is detected at 7 days. This reduces the risk window by 4x and allows intervention before debt accumulates.
- **The real cost of a default is MXN $51,000 -- budget MXN $213/vehicle/month.** At a 5% default rate on 2,000 vehicles: 100 defaults/year x MXN $51,000 = MXN $5.1M/year = MXN $213/vehicle/month. This cost MUST be included in the lease rate.
- **DaE has a natural recovery advantage.** The DaE driver depends on LAFA for shifts and income. Suspending shifts = immediate economic pressure without confrontation. It is the cheapest and most effective enforcement mechanism.
- **Limit to 2 restructurings per driver.** More than 2 indicates a chronic non-payment pattern. The third delinquency should trigger direct recovery, not further negotiation.
- **Never activate the kill switch while the vehicle is in motion.** Beyond being dangerous, CONDUSEF (financial consumer protection) and PROFECO (consumer protection agency) can impose sanctions. Protocol: only immobilize a parked vehicle, with 24-72 hours of prior written notice.
- **Evaluate whether judicial action is worthwhile on a case-by-case basis.** At MXN $35,000-80,000 + 3-6 months, it only makes sense if the outstanding debt exceeds MXN $30,000 AND the driver has recoverable assets. For smaller debts: write-off, blacklist, and focus resources on prevention.

---

---

## 8. Lease Accounting Compliance

| Standard | Jurisdiction | Key Requirement |
|---------|-------------|-----------------|
| **NIF D-5 "Arrendamientos"** | Mexico (effective January 2022) | Lessees must recognize right-of-use assets and lease liabilities on balance sheet. Closely aligned with IFRS 16. |
| **IFRS 16** | International | Same balance sheet recognition requirement. Relevant for international investors. |
| **ASC 842** | US GAAP | Similar treatment. Relevant if LAFA seeks US-based investors requiring GAAP reporting. |

Use LeaseQuery ($5K-50K/year) at 500+ active leases for compliance automation.

---

## 9. Billing Platforms

| Scale | Platform | Cost | Notes |
|-------|---------|------|-------|
| 0-2,000 vehicles | **Stripe Billing** + **Conekta** | 0.5% per recurring charge + standard processing | Stripe for subscription management; Conekta for OXXO cash and SPEI bank transfers |
| 2,000-5,000 | Custom billing logic | Engineering cost | Lease-specific workflows: payment sweeps from ride-hailing wallets, graduated arrears enforcement, weekly variable deductions |
| 5,000+ | **Zuora** | $50K-150K+/year | Multi-entity, complex billing orchestration |

Build custom logic for lease-specific workflows that standard billing platforms cannot model -- payment sweeps from ride-hailing wallets, graduated arrears enforcement, and weekly variable deductions.

---

## 10. Financing Structure

**VEMO's financing structure provides the blueprint:**
- **Total raised:** $500M+ ($350M equity from Vision Ridge Partners, Riverstone Holdings; $150M+ debt from Orion Infrastructure Capital, BEEL, PROMECAP, Covalto, Kapital)
- **BEEL's MXN $500M 12-year infrastructure facility** for public EV charging was the first of its kind in LatAm
- **Structure:** SPV holds vehicle assets, lease receivables serve as collateral for debt facilities (same structure as Moove)
- **Pattern:** Blending local Mexican lenders with international infrastructure investors is the viable financing path

**ABS reporting** requires:
- Loan-level data (vehicle ID, driver ID, payment history, SoH)
- Portfolio performance metrics (delinquency rates at 30/60/90 days, default rates, recovery rates)
- Servicer reports

Building this reporting capability from day one accelerates access to capital markets.

---

## 11. Cybersecurity: Immobilization & Data Privacy

### Remote Immobilization Safeguards
Remote immobilization is simultaneously the most valuable and most dangerous feature in a lease-to-own fleet. Required safeguards:
- **AES-256 encrypted commands**
- **Speed-aware restrictions:** Never immobilize while moving
- **Multi-factor authorization:** Human approval plus system verification required
- **Complete audit trails** for every command
- **Role-based access** with principle of least privilege

### Mexico Data Privacy: LFPDPPP
Mexico's LFPDPPP data protection law was significantly overhauled in **March 2025**. Key requirements for fleet operations:
- Express consent required for location tracking (qualifies as personal data)
- ARCO rights: drivers can access and request deletion of their tracking data
- Defined data retention periods with mandatory deletion
- Fines: ~$1,206 to ~$3.86M for violations
- Must appoint a data protection officer

### Connected Vehicle Security: Upstream Security
**Upstream Security** (Israel, backed by Renault, Nissan, Hyundai, Volvo Group) leads connected vehicle cybersecurity:
- Cloud-based vehicle SOC using ML and digital twin technology
- Real-time anomaly detection -- agentless, monitoring existing data feeds without vehicle modifications
- Relevant at scale (2,000+ vehicles) when the fleet becomes a target for cyber attacks

---

*Recovery cost estimates based on industry benchmarks for Mexican fleet operations. Actual costs depend on geographic coverage, driver cooperation, and legal complexity.*
