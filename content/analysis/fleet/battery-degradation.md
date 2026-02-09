# LAFA: Battery Degradation & Longevity

**Last updated:** February 6, 2026
**Scope:** LFP battery performance in CDMX climate, SOH projections for intensive gig use, residual value implications.

---

## 1. Why CDMX Is Ideal for LFP Batteries

**Altitude (2,240m):**
- Electric motors unaffected by altitude (unlike ICE which lose ~3% power per 1,000 ft)
- Air density ~22% lower → reduced aerodynamic drag → slightly improved highway efficiency
- No direct effect on battery chemistry
- **Net impact: NEUTRAL to SLIGHTLY POSITIVE**

**Temperature (year-round 15-25C):**

| Temperature | Calendar Degradation | Cycle Degradation |
|-------------|---------------------|-------------------|
| 5C | 0.5x (slower) | 1.2x (slight increase) |
| 15C | 0.7x (slower) | 0.9x (near optimal) |
| **25C (baseline)** | 1.0x | 1.0x |
| 35C | 1.8x (faster) | 1.3x (faster) |
| 45C | 3.5x (much faster) | 2.0x (much faster) |

CDMX's 15-25C range = near-optimal for LFP. No extreme heat events. Minimal active thermal management needed.

**Comparison:** Phoenix AZ (45C+): 2-3x faster degradation. Northern China/Canada (-20C): reduced capacity. CDMX is **among the best climates globally for battery longevity.**

## 2. LFP Battery Characteristics (Geely/JAC/GAC Fleet)

| Metric | Value |
|--------|-------|
| Cycle life to 80% SOH | 3,000-5,000 cycles |
| Calendar degradation | ~1-2% per year at moderate temperatures |
| Operating range | Optimal 15-35C |
| Cost vs NMC | Lower per kWh |
| Energy density vs NMC | ~20% lower (heavier, less range per kg) |

JAC sources batteries from CATL and Guoxuan High-Tech (both LFP). JAC packs are conventional module-based (not CTP like BYD Blade). Degradation profiles comparable for LFP chemistry.

Note: Specific battery chemistry for Geely and GAC models in LAFA fleet is TBD — may vary.

## 3. Degradation Projection (Intensive Gig Use)

**Assumptions:** ~100,000 km/year, ~300 charge cycles/year, LFP chemistry, CDMX temperatures

| Year | Capacity Loss | SOH | Remaining Range (from 250km) |
|------|--------------|-----|------------------------------|
| 1 | ~2-3% | 97-98% | ~243-245 km |
| 2 | ~2-3% more | 94-96% | ~235-240 km |
| 3 | ~2-3% more | 91-94% | ~228-235 km |
| 4 | ~2-3% more | **88-92%** | **~220-230 km** |

After 4 years / 400,000 km: **88-92% SOH remaining** — well above the 80% industry threshold.

## 4. Residual Value Implications

| Timeframe | SOH | Residual Value (% of MXN $400K) | MXN |
|-----------|-----|--------------------------------|-----|
| 3 years / 300-360K km | 91-94% | 25-35% | $100,000-140,000 |
| 4 years / 400-480K km | 88-92% | 18-28% | $72,000-112,000 |

**Key insight for LTO:** At lease completion (48 months), the driver receives a vehicle with significant remaining useful life (battery at 88-92%). Strong value proposition.

**Tariff tailwind:** If 50% tariffs make new Chinese EVs more expensive, used EV residual values could **increase** — positive for LAFA's balance sheet. *→ For tariff impact on vehicle costs, see [tariff-analysis.md](tariff-analysis.md) §3.*

---

## 5. Implications for LAFA

- **Set an 85% SOH floor for LTO.** If a vehicle drops below 85% SOH (State of Health -- percentage of original battery capacity) before the 48-month contract ends, LAFA should have a replacement or compensation clause. With CDMX projections (88-92% at 4 years), this would be a rare event but must be documented.
- **Do not retire vehicles at 4 years -- the battery supports continued use.** With 88-92% SOH after 400,000 km, vehicles have significant post-lease useful life. A vehicle exiting the LTO program can rotate into DaE or be sold on the secondary market with ~220-230 km range -- sufficient for urban gig work.
- **Implement DoD (Depth of Discharge -- depth of discharge per cycle) monitoring from day one.** Although LFP is tolerant of full charges, keeping DoD below 90% (not discharging below 10% SOC) can extend life by an additional 20-30%. This is controllable in the DaE program (LAFA manages charging) and should be a recommendation for LTO drivers.
- **CDMX is a non-obvious competitive advantage.** Operators in hot climates (Monterrey at 40C+, tropical Cancun) would face 1.5-2x more degradation. If LAFA expands to Monterrey or coastal cities, it must recalculate projections -- CDMX's thermal advantage is not transferable.
- **Residual value at 4 years (MXN $72,000-112,000) is the financial floor of the LTO model.** If the driver completes all 48 payments, they receive a vehicle worth that amount. If they default earlier, LAFA recovers an asset worth more than the remaining debt -- the arrendamiento financiero (financial lease) structure is well-secured.
- **Quantify the Geely gap:** The battery chemistry of Geely models in the LAFA fleet is TBD. If Geely uses NMC instead of LFP, degradation would be 1.5-2x faster (1,000-2,000 cycles vs 3,000-5,000). **Confirm with JJ before scaling the Geely fleet.**

---

---

## 6. Battery Analytics Platforms

Battery analytics platforms serve different fleet needs at different maturity levels:

### ACCURE Battery Intelligence (Aachen, Germany, $34.6M funded)
Fleet-specific safety monitoring with 20+ safety indicators. Claims to detect critical behavior "weeks before it becomes dangerous." Fleet customer Berlin's BVG (1,600 e-buses) validates transit-scale deployment.

### TWAICE (Munich, $15K/year per site)
Digital twin technology with physics-based plus AI/ML predictive models. Suitable for fleets wanting simulation-based degradation forecasting without building in-house ML.

### AVILOO (Austria, with presence in Mexico and Brazil)
Independent point-in-time diagnostics. TUV-certified FLASH test delivers SoH assessment in 3 minutes via OBD-2. Discovered that after 100,000 km, battery SoH can vary by **up to 30%** between vehicles of the same model. For lease-to-own residual valuation, AVILOO certificates increase dealer margins by **EUR 550-1,100 per vehicle**.

---

## 7. OEM Data Access Challenge

| OEM | Data Access | Quality |
|-----|------------|---------|
| **Tesla** | Best API: real-time Fleet Telemetry streaming at 500ms intervals | Excellent |
| **BYD** | No public fleet API. Data access requires negotiated partnerships or aftermarket solutions like AutoPi OBD devices | Poor |
| **Smartcar** | Unified API aggregator across 40+ automakers, usage-based pricing | Good for supported OEMs, but BYD support remains limited |
| **Geely/JAC/GAC** | Unknown. Likely similar to BYD -- proprietary systems with limited fleet API access | TBD |

This data access gap is precisely why companies like VEMO invest heavily in proprietary analytics (ZEE platform, 35South acquisition).

**For LAFA's fleet (Geely, JAC, GAC):** Aftermarket telematics devices (Teltonika FMC130 with CAN bus decoding) are likely the primary data source until OEM partnerships are negotiated. *--> See [fleet-technology.md](fleet-technology.md) for hardware options.*

---

## 8. Lease-to-Own Residual Value: Battery Rotation Strategy

- **Rotate vehicles at 80% SoH** for ride-hailing use. Below this threshold, reduced range impacts driver productivity.
- **Battery replacement outside warranty:** $13,000-17,000 depending on model.
- **BYD's 150,000 km battery warranty limit is critical** -- a ride-hailing vehicle doing 60,000 km/year exhausts this in roughly 2.5 years, well before the 8-year duration. Negotiate fleet-specific extended warranties directly.
- **AVILOO certificates at lease completion** provide independent, TUV-certified SoH verification -- adds EUR 550-1,100 per vehicle in resale value and reduces disputes with LTO drivers completing their contracts.

---

*Degradation projections are based on published LFP cycle life data and CDMX climate conditions. Actual results will depend on charging patterns, depth of discharge, and vehicle-specific battery management systems.*
