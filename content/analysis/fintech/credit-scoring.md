# LAFA: Credit Scoring Framework

**Last updated:** February 6, 2026
**Scope:** Identity verification (MetaMap), credit bureau integration (Circulo de Credito), open banking (Belvo), MVP pipeline, alternative data sources for gig workers, warm-start strategy.

---

## 1. The Challenge

~60% of Mexico's population is "thin file" or no-file at credit bureaus. Gig workers are disproportionately underbanked. Bureau data alone is insufficient — hence the need for alternative data.

**Key terms used in this document:**
- **SOFOM** (Sociedad Financiera de Objeto Multiple): Mexico's standard legal vehicle for non-bank financial institutions (fintechs, leasing companies). A SOFOM ENR (Entidad No Regulada) can issue credit and leases without full banking regulation. LAFA likely needs SOFOM status (or an authorized partner) to access credit bureaus.
- **SIC** (Sociedad de Informacion Crediticia): Mexico's authorized credit bureaus. There are two: Buro de Credito and Circulo de Credito. Access requires SOFOM registration or partnership with a registered entity.

## 2. Available Tools

**Identity Verification — MetaMap (formerly Mati)**
- 350+ verification tools with direct access to Mexican government sources
- Verifies: CURP, INE, RFC, Cedula Profesional
- Facial biometric matching
- Acquired by Incode (June 2024)
- Cost: ~USD $2-5 per full KYC flow

**Credit Bureau — Circulo de Credito**
- One of Mexico's two authorized SICs (alongside Buro de Credito)
- Fintech Score product: ML-based, continuously retrained for Mexican market
- Partnership with Credolab: behavioral scoring using smartphone metadata for thin-file applicants
- FICO Score 4 based on Circulo data — 200M+ scores sold
- Access requires SOFOM registration or authorized partner
- Cost: ~MXN $30-100 per consultation

**Open Banking — Belvo**
- Dominant open banking API in LatAm ("LatAm's Plaid")
- Coverage: 60+ institutions in Mexico, 90%+ of personal/business bank accounts
- Critical capability: integrates with **gig economy platforms** (Uber, Rappi)
- SAT (tax authority) integration — access fiscal data (key: post-2021 reform, gig workers have tax records)
- Lenders using Belvo report **30% increase in credit acceptance rates**
- Cost: ~USD $0.10-1.00 per API call

## 3. Minimum Viable Pipeline

```
Step 1: MetaMap KYC (INE/CURP/RFC + facial biometric)
Step 2: Circulo de Credito bureau pull (even thin-file has partial data)
Step 3: Belvo open banking + SAT fiscal data
Step 4: Ride-hailing platform verification (via Belvo or screenshot OCR)
Step 5: ML scoring model (XGBoost on combined features)
Step 6: Rules engine + human review for edge cases

Total cost per application: MXN $92-305 (~USD $5-15)
Total time: <60 minutes (mostly automated)
```

At 3-5 applications per approved driver, customer acquisition cost for credit verification: MXN $275-1,525 per approved driver.

## 4. Alternative Data Sources for Gig Workers

| Data Source | Access Method | Signal Value |
|-------------|-------------|-------------|
| Uber/DiDi trip history | Screenshot + OCR, or data export | Rating, trips, tenure, earnings |
| Platform earnings statements | PDF upload + extraction | Income verification |
| SAT fiscal data | Belvo Fiscal API | Declared income from platform work |
| IMSS registration | Belvo Employment API | Formal employment status (post-2025 reform) |
| Mobile phone data | Credolab/Tiaxa SDK (with consent) | App usage, mobility, behavioral signals |
| CFE payment history | Belvo or direct API | Utility payment regularity |
| Device data | Phone model, OS, apps | Income/sophistication proxy |

## 5. Cold-Start vs. Warm-Start

**Warm-start advantage:** Credit scoring (P2, Track C) is scheduled for Month 7-9 of the roadmap (not Month 1) specifically because LAFA will have accumulated 6-7 months of internal payment data from Track A foundation. This transforms the cold-start problem: the model v1 can train on real LAFA portfolio data (payment history, telematics, collections outcomes), not synthetic data.

*→ For OCN's AI underwriting benchmark (single-digit defaults, <90 min approval), see [competitive-landscape.md](../market/competitive-landscape.md) §1.*

---

---

## Implications for LAFA

- **Prioritize data sources in this order:** (1) Internal LAFA data (payments, telematics, collections -- already accumulated by Mo 6-8), (2) Belvo SAT/fiscal (gig workers now have records post-2025 reform), (3) Circulo de Credito (even thin-file applicants have partial data), (4) MetaMap KYC (identity, not scoring). The reason: internal data is free, proprietary, and more predictive of payment behavior within LAFA than any external score.
- **The DaE to LTO upgrade path is the most powerful scoring channel.** A driver with 6 months as a Driver-as-Employee has payment history, telematics, and a proven relationship with LAFA. Converting them to LTO with that data is pure warm-start -- no bureau or open banking needed for the initial decision.
- **SOFOM is a legal blocker, not a technical one.** Without SOFOM (or a partnership with a registered entity), LAFA cannot query Circulo de Credito or report payment behavior. This limits both scoring and the ability to build credit history for drivers. **Confirm with JJ: does LAFA have SOFOM status or is it in process?**
- **Do not build an ML model before Mo 6.** With <150 payment observations and 2 months of LTO operation, any statistical model would be pure overfitting. Heuristic rules (min. 3 months as DaE, no delinquency >7 days, platform rating >4.5) are better than ML at this stage.
- **Total cost per approved driver: MXN $275-1,525.** At 3-5 applications per approved driver and MXN $92-305 per application. This is the credit verification CAC -- it must be included in the LTO model's unit economics.

---

---

## 6. Alternative Credit Platforms for LatAm Gig Workers

### Palenca (YC S21, Mexico City HQ)
Payroll API for the gig economy, integrating with Uber, Rappi, DiDi, and others. Workers authorize sharing their platform earnings data, enabling lenders to underwrite based on verified income rather than credit history. Operates across Mexico, Colombia, Chile, Argentina, Peru, and Brazil. Strategic investment from Serasa Experian.

### Bankuish (Miami, Mexico City, Sao Paulo)
Generates a Bankuish Score (300-850) analyzing digital work history from gig platforms. Major banks including **Santander, BBVA, and Sabadell** accept Bankuish Score for underwriting. Won the 4YFN25 Award at MWC Barcelona.

### Truora (YC W19, Colombian startup)
Background checks across Mexico, Colombia, Peru, and other LatAm markets -- criminal records, identity verification via INE/RENAPO, traffic fines, PEP screening. DiDi and Rappi are customers. Combined with Palenca, these two platforms provide comprehensive alternative KYC for exactly the driver demographic that fleet-for-drivers companies serve.

---

## 7. Payment Collection Rails

In Mexico, where only 37% of adults have bank accounts and 70% of ride-hailing transactions are cash, a multi-rail payment strategy is essential:

| Rail | Description | Best For |
|------|------------|----------|
| **SPEI** | Mexico's real-time payment system (3.8B transactions in 2023). Free for individuals. | Primary for weekly automated debits from banked drivers |
| **OXXO Pay** | 22,000+ convenience stores. Drivers deposit using a reference number, system credits payment in real-time. | Essential for unbanked drivers who accumulate cash |
| **Conekta** | Mexican-native gateway (clients: Google, Uber, Netflix). Supports cards, OXXO, SPEI in a single integration. 2.9% + MXN $2.50 per card transaction. | Unified gateway across all rails |
| **Direct platform deductions** | Negotiate with Uber/DiDi to deduct lease payments from driver earnings before disbursement. | Gold standard -- near-zero default risk (Moove's model) |

---

## 8. EV Driver Training Curriculum

Driver training for EVs covers:
- **Regenerative braking:** Increases range 8-25% when used optimally
- **Battery management:** Maintain 20-80% charge for longevity
- **Charging protocols:** When to use L2 vs DC fast, how to maximize off-peak rates
- **Energy-efficient driving:** Smooth acceleration, HVAC management, route planning

Build a custom LMS with these modules -- estimated 2-4 weeks for core curriculum development.

---

*Cost estimates based on publicly available pricing. Actual costs depend on volume agreements and integration complexity. SOFOM registration or authorized partner required for bureau access.*
